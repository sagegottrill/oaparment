import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { initializeFlutterwavePayment } from "@/lib/flutterwave";
import { getSuite } from "@/lib/suites";

function appUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    process.env.VERCEL_URL?.replace(/\/$/, "")?.replace(/^/, "https://") ||
    "http://localhost:3000"
  );
}

function makeTxRef() {
  return `OA-${Date.now()}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      suiteId?: string;
      checkIn?: string;
      checkOut?: string;
      nights?: number;
      rooms?: number;
      adults?: number;
      children?: number;
      guestName?: string;
      guestEmail?: string;
      guestPhone?: string;
      notes?: string;
    };

    const suiteId = body.suiteId ?? "unit-a";
    const suite = getSuite(suiteId);
    const checkIn = body.checkIn;
    const checkOut = body.checkOut;
    const nights = Number(body.nights ?? 0);
    const rooms = Math.max(1, Number(body.rooms ?? 1));
    const adults = Math.max(1, Number(body.adults ?? 1));
    const children = Math.max(0, Number(body.children ?? 0));
    const guestName = (body.guestName ?? "").trim();
    const guestEmail = (body.guestEmail ?? "").trim().toLowerCase();
    const guestPhone = (body.guestPhone ?? "").trim();
    const notes = (body.notes ?? "").trim() || null;

    if (!checkIn || !checkOut || nights < 1) {
      return NextResponse.json({ error: "Valid check-in, check-out, and nights are required." }, { status: 400 });
    }
    if (!guestName || !guestEmail || !guestPhone) {
      return NextResponse.json({ error: "Guest name, email, and phone are required." }, { status: 400 });
    }

    const stayTotal = suite.pricePerNight * nights * rooms;
    const cautionFee = suite.cautionFee;
    const total = stayTotal + cautionFee;
    const txRef = makeTxRef();

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let admin;
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

    const payment = await initializeFlutterwavePayment({
      txRef,
      amount: total,
      redirectUrl: `${appUrl()}/checkout/success`,
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
        title: "The O' Apartments",
        description: `${suite.title} · ${nights} night(s)`,
        logo: `${appUrl()}/logo.png`,
      },
    });

    return NextResponse.json({
      bookingId: booking.id,
      txRef,
      paymentLink: payment.link,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
