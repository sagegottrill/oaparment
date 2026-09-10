import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAppUrl, getFlutterwaveLogoUrl } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { assertStayAvailable, loadCheckoutSuite } from "@/lib/checkout-suite";
import { initializeFlutterwavePayment } from "@/lib/flutterwave";
import { cautionFeeForStay, nightsBetween } from "@/lib/suites";

function makeTxRef() {
  return `OA-${Date.now()}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

export async function POST(request: Request) {
  let bookingId: string | null = null;
  let admin: ReturnType<typeof createAdminClient> | null = null;

  try {
    const body = (await request.json()) as {
      suiteId?: string;
      checkIn?: string;
      checkOut?: string;
      rooms?: number;
      adults?: number;
      children?: number;
      guestName?: string;
      guestEmail?: string;
      guestPhone?: string;
      notes?: string;
    };

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

    const loaded = await loadCheckoutSuite(admin, body.suiteId ?? "");
    if ("error" in loaded) {
      return NextResponse.json({ error: loaded.error }, { status: 400 });
    }
    const suite = loaded.suite;

    const checkIn = body.checkIn;
    const checkOut = body.checkOut;
    const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
    const rooms = Math.min(suite.maxRooms, Math.max(1, Number(body.rooms ?? 1)));
    const adults = Math.max(1, Number(body.adults ?? 1));
    const children = Math.max(0, Number(body.children ?? 0));
    const guestName = (body.guestName ?? "").trim();
    const guestEmail = (body.guestEmail ?? "").trim().toLowerCase();
    const guestPhone = (body.guestPhone ?? "").trim();
    const notes = (body.notes ?? "").trim() || null;

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
      await admin
        .from("bookings")
        .update({
          payment_status: "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", bookingId);
    }
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
