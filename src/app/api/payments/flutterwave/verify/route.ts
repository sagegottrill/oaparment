import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyFlutterwaveTransaction } from "@/lib/flutterwave";

async function markBookingPaid(txRef: string, txId: string, amount: number) {
  const admin = createAdminClient();

  const { data: booking, error: findError } = await admin
    .from("bookings")
    .select("*")
    .eq("flutterwave_tx_ref", txRef)
    .maybeSingle();

  if (findError) throw new Error(findError.message);
  if (!booking) throw new Error("Booking not found for this payment reference.");

  const expected = Number(booking.total);
  if (Math.round(expected * 100) !== Math.round(amount * 100)) {
    throw new Error("Paid amount does not match booking total.");
  }

  if (booking.payment_status === "paid") {
    return booking;
  }

  const { data: updated, error: updateError } = await admin
    .from("bookings")
    .update({
      payment_status: "paid",
      status: booking.status === "pending" ? "confirmed" : booking.status,
      flutterwave_tx_id: txId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", booking.id)
    .select("*")
    .single();

  if (updateError || !updated) {
    throw new Error(updateError?.message ?? "Could not update booking payment.");
  }

  return updated;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      transactionId?: string | number;
      txRef?: string;
      status?: string;
    };

    if (!body.transactionId) {
      return NextResponse.json({ error: "transactionId is required." }, { status: 400 });
    }

    if (body.status && body.status !== "successful" && body.status !== "completed") {
      return NextResponse.json(
        { error: "Payment was not successful.", paid: false },
        { status: 400 }
      );
    }

    const verified = await verifyFlutterwaveTransaction(body.transactionId);

    if (verified.status !== "successful") {
      return NextResponse.json(
        { error: "Flutterwave reports payment was not successful.", paid: false, verified },
        { status: 400 }
      );
    }

    if (verified.currency !== "NGN") {
      return NextResponse.json({ error: "Unexpected payment currency.", paid: false }, { status: 400 });
    }

    if (body.txRef && body.txRef !== verified.txRef) {
      return NextResponse.json({ error: "Transaction reference mismatch.", paid: false }, { status: 400 });
    }

    const booking = await markBookingPaid(
      verified.txRef,
      String(verified.id),
      verified.amount
    );

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
