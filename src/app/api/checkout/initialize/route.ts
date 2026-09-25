import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAppUrl, getFlutterwaveLogoUrl } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { assertStayAvailable, assertSuitesBookable, loadCheckoutSuite } from "@/lib/checkout-suite";
import { initializeFlutterwavePayment } from "@/lib/flutterwave";
import { cautionFeeForStay, nightsBetween } from "@/lib/suites";
import {
  KYC_BUCKET,
  KYC_ID_TYPES,
  isKycDocumentAccepted,
  kycDocumentPath,
} from "@/lib/kyc";
import type { KycIdType } from "@/lib/supabase/types";

function makeTxRef() {
  return `OA-${Date.now()}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

type KycFields = {
  idType: KycIdType;
  idNumber: string;
  document: File;
};

function readKycFields(form: FormData): KycFields | { error: string } {
  const idType = String(form.get("idType") ?? "");
  const idNumber = String(form.get("idNumber") ?? "").trim();
  const document = form.get("idDocument");

  if (!KYC_ID_TYPES.some((item) => item.value === idType)) {
    return { error: "Select a valid ID type (NIN, international passport, or driver's licence)." };
  }
  if (idNumber.length < 4) {
    return { error: "Enter the ID number exactly as it appears on the document." };
  }
  if (!(document instanceof File) || document.size === 0) {
    return { error: "Upload a photo or scan of the selected ID — it is required to book." };
  }
  if (!isKycDocumentAccepted(document)) {
    return { error: "ID document must be a JPG, PNG, WebP, or PDF under 5 MB." };
  }

  return {
    idType: idType as KycIdType,
    idNumber,
    document,
  };
}

export async function POST(request: Request) {
  let bookingId: string | null = null;
  let admin: ReturnType<typeof createAdminClient> | null = null;

  try {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return NextResponse.json(
        { error: "Checkout must be submitted as a form with your ID document attached." },
        { status: 400 }
      );
    }

    const kyc = readKycFields(form);
    if ("error" in kyc) {
      return NextResponse.json({ error: kyc.error }, { status: 400 });
    }

    function text(name: string) {
      return String(form.get(name) ?? "").trim();
    }

    try {
      admin = createAdminClient();
    } catch {
      return NextResponse.json(
        {
          error:
            "Server is missing SUPABASE_SERVICE_ROLE_KEY. Add it from Supabase → Project Settings → API.",
        },
        { status: 500 }
      );
    }

    const loaded = await loadCheckoutSuite(admin, text("suiteId"));
    if ("error" in loaded) {
      return NextResponse.json({ error: loaded.error }, { status: 400 });
    }
    const suite = loaded.suite;

    const checkIn = text("checkIn") || undefined;
    const checkOut = text("checkOut") || undefined;
    const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
    const rooms = Math.min(suite.maxRooms, Math.max(1, Number(text("rooms") || 1)));
    const adults = Math.max(1, Number(text("adults") || 1));
    const children = Math.max(0, Number(text("children") || 0));
    const guestName = text("guestName");
    const guestEmail = text("guestEmail").toLowerCase();
    const guestPhone = text("guestPhone");
    const notes = text("notes") || null;

    const hidden = await assertSuitesBookable(admin, { suiteId: suite.id, rooms });
    if (hidden) {
      return NextResponse.json({ error: hidden }, { status: 400 });
    }

    if (!checkIn || !checkOut || nights < 1) {
      return NextResponse.json(
        { error: "Valid check-in and check-out dates are required (minimum 1 night)." },
        { status: 400 }
      );
    }
    if (!guestName || !guestEmail || !guestPhone) {
      return NextResponse.json({ error: "Guest name, email, and phone are required." }, { status: 400 });
    }
    if (adults + children > suite.maxGuests * rooms) {
      return NextResponse.json(
        { error: `With ${rooms} suite(s), this stay allows up to ${suite.maxGuests * rooms} guests.` },
        { status: 400 }
      );
    }

    const conflict = await assertStayAvailable(admin, {
      suiteId: suite.id,
      rooms,
      checkIn,
      checkOut,
      guestEmail,
    });
    if (conflict) {
      return NextResponse.json({ error: conflict }, { status: 409 });
    }

    const stayTotal = suite.pricePerNight * nights * rooms;
    const cautionFee = cautionFeeForStay(suite.cautionFee);
    const total = stayTotal + cautionFee;
    const txRef = makeTxRef();

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: booking, error: bookingError } = await admin
      .from("bookings")
      .insert({
        user_id: user?.id ?? null,
        suite_id: suite.id,
        check_in: checkIn,
        check_out: checkOut,
        nights,
        rooms,
        adults,
        children,
        stay_total: stayTotal,
        caution_fee: cautionFee,
        total,
        status: "pending",
        payment_status: "pending",
        guest_name: guestName,
        guest_email: guestEmail,
        guest_phone: guestPhone,
        notes,
        flutterwave_tx_ref: txRef,
      })
      .select("id, flutterwave_tx_ref, total")
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: bookingError?.message ?? "Could not create booking." },
        { status: 500 }
      );
    }

    bookingId = booking.id;

    // Upload the ID document with the admin client — the bucket is private and
    // readable only through short-lived signed URLs generated for admins.
    const documentPath = kycDocumentPath(guestEmail, kyc.document.name);
    const { error: uploadError } = await admin.storage
      .from(KYC_BUCKET)
      .upload(documentPath, kyc.document, {
        contentType: kyc.document.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Could not store the ID document: ${uploadError.message}`);
    }

    const { error: kycError } = await admin.from("kyc_submissions").insert({
      booking_id: booking.id,
      user_id: user?.id ?? null,
      guest_email: guestEmail,
      guest_name: guestName,
      guest_phone: guestPhone,
      id_type: kyc.idType,
      id_number: kyc.idNumber,
      id_document_path: documentPath,
      id_document_name: kyc.document.name,
      id_document_type: kyc.document.type || null,
      id_document_size: kyc.document.size,
      status: "pending",
    });

    if (kycError) {
      throw new Error(`Could not save the ID submission: ${kycError.message}`);
    }

    const logo = getFlutterwaveLogoUrl();
    const payment = await initializeFlutterwavePayment({
      txRef,
      amount: total,
      redirectUrl: `${getAppUrl().replace(/\/$/, "")}/checkout/success`,
      customer: {
        email: guestEmail,
        name: guestName,
        phonenumber: guestPhone,
      },
      meta: {
        booking_id: booking.id,
        suite_id: suite.id,
      },
      customizations: {
        title: "The O Apartments",
        description:
          rooms >= 2
            ? `Unit A + Unit B · ${nights} night(s)`
            : `${suite.title} · ${nights} night(s)`,
        ...(logo ? { logo } : {}),
      },
    });

    return NextResponse.json({
      bookingId: booking.id,
      txRef,
      paymentLink: payment.link,
      total,
      nights,
    });
  } catch (error) {
    if (admin && bookingId) {
      await admin.from("bookings").update({ payment_status: "failed", updated_at: new Date().toISOString() }).eq("id", bookingId);
    }
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
