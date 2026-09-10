import { NextResponse } from "next/server";
import { markBookingPaid } from "@/lib/payments";
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
      };
    };

    const data = payload.data;
    if (!data?.id || !data.tx_ref) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const verified = await verifyFlutterwaveTransaction(data.id);
    if (verified.status !== "successful" || verified.currency !== "NGN") {
      return NextResponse.json({ ok: true, paid: false });
    }

    await markBookingPaid(verified.txRef, String(verified.id), verified.amount);
    return NextResponse.json({ ok: true, paid: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook error";
    console.error("[flutterwave webhook]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
