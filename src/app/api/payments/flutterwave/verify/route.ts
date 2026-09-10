import { NextResponse } from "next/server";
import { markBookingFailed, markBookingPaid } from "@/lib/payments";
import { verifyFlutterwaveTransaction } from "@/lib/flutterwave";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      transactionId?: string | number;
      txRef?: string;
      status?: string;
    };

    if (!body.transactionId) {
      if (body.txRef) await markBookingFailed(body.txRef).catch(() => undefined);
      return NextResponse.json({ error: "Missing transaction details from Flutterwave.", paid: false }, { status: 400 });
    }

    if (body.status && !["successful", "completed"].includes(body.status)) {
      if (body.txRef) await markBookingFailed(body.txRef).catch(() => undefined);
      return NextResponse.json({ error: "Payment was not successful.", paid: false }, { status: 400 });
    }

    const verified = await verifyFlutterwaveTransaction(body.transactionId);

    if (verified.status !== "successful") {
      await markBookingFailed(verified.txRef).catch(() => undefined);
      return NextResponse.json(
        { error: "Flutterwave reports payment was not successful.", paid: false },
        { status: 400 }
      );
    }

    if (verified.currency !== "NGN") {
      return NextResponse.json({ error: "Unexpected payment currency.", paid: false }, { status: 400 });
    }

    if (body.txRef && body.txRef !== verified.txRef) {
      return NextResponse.json({ error: "Transaction reference mismatch.", paid: false }, { status: 400 });
    }

    const booking = await markBookingPaid(verified.txRef, String(verified.id), verified.amount);

    return NextResponse.json({
      paid: true,
      booking: {
        id: booking.id,
        suiteId: booking.suite_id,
        guestName: booking.guest_name,
        guestEmail: booking.guest_email,
        checkIn: booking.check_in,
        checkOut: booking.check_out,
        nights: booking.nights,
        total: booking.total,
        status: booking.status,
        paymentStatus: booking.payment_status,
        txRef: booking.flutterwave_tx_ref,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment verification failed";
    return NextResponse.json({ error: message, paid: false }, { status: 500 });
  }
}
