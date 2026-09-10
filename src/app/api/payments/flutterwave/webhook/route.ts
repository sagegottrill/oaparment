import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isValidFlutterwaveWebhook, verifyFlutterwaveTransaction } from "@/lib/flutterwave";

export async function POST(request: Request) {
  const signature = request.headers.get("verif-hash");
  if (!isValidFlutterwaveWebhook(signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as {
      data?: {
        id?: number;
        tx_ref?: string;
        status?: string;
        amount?: number;
        currency?: string;
      };
      event?: string;
    };

    const data = payload.data;
    if (!data?.id || !data.tx_ref) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const verified = await verifyFlutterwaveTransaction(data.id);
    if (verified.status !== "successful" || verified.currency !== "NGN") {
      return NextResponse.json({ ok: true, paid: false });
    }

    const admin = createAdminClient();
    const { data: booking } = await admin
      .from("bookings")
      .select("id, total, payment_status, status")
      .eq("flutterwave_tx_ref", verified.txRef)
      .maybeSingle();

    if (!booking) {
      return NextResponse.json({ ok: true, missing: true });
    }

    if (Math.round(Number(booking.total) * 100) !== Math.round(verified.amount * 100)) {
      return NextResponse.json({ ok: true, amountMismatch: true });
    }

    if (booking.payment_status !== "paid") {
      await admin
        .from("bookings")
        .update({
          payment_status: "paid",
          status: booking.status === "pending" ? "confirmed" : booking.status,
          flutterwave_tx_id: String(verified.id),
          updated_at: new Date().toISOString(),
        })
        .eq("id", booking.id);
    }

    return NextResponse.json({ ok: true, paid: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
