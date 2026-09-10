import { createAdminClient } from "@/lib/supabase/admin";
import type { Booking } from "@/lib/supabase/types";

export async function markBookingPaid(txRef: string, txId: string, amount: number): Promise<Booking> {
  const admin = createAdminClient();

  const { data: booking, error: findError } = await admin
    .from("bookings")
    .select("*")
    .eq("flutterwave_tx_ref", txRef)
    .maybeSingle();

  if (findError) throw new Error(findError.message);
  if (!booking) throw new Error("Booking not found for this payment reference.");

  if (Math.round(Number(booking.total) * 100) !== Math.round(amount * 100)) {
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

export async function markBookingFailed(txRef: string) {
  const admin = createAdminClient();
  await admin
    .from("bookings")
    .update({
      payment_status: "failed",
      updated_at: new Date().toISOString(),
    })
    .eq("flutterwave_tx_ref", txRef)
    .neq("payment_status", "paid");
}
