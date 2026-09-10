import type { createAdminClient } from "@/lib/supabase/admin";
import { getSuite } from "@/lib/suites";

type AdminClient = ReturnType<typeof createAdminClient>;

export type CheckoutSuite = {
  id: string;
  title: string;
  pricePerNight: number;
  cautionFee: number;
  maxGuests: number;
  maxRooms: number;
};

export async function loadCheckoutSuite(
  admin: AdminClient,
  suiteId: string
): Promise<{ suite: CheckoutSuite } | { error: string }> {
  const catalog = getSuite(suiteId);
  if (!catalog) {
    return { error: "Unknown suite selected." };
  }

  const { data, error } = await admin
    .from("suites")
    .select("id, slug, title, price_per_night, caution_fee, max_guests, max_rooms, active")
    .or(`id.eq.${catalog.id},slug.eq.${catalog.slug}`)
    .maybeSingle();

  if (error) {
    return {
      suite: {
        id: catalog.id,
        title: catalog.title,
        pricePerNight: catalog.pricePerNight,
        cautionFee: catalog.cautionFee,
        maxGuests: catalog.maxGuests,
        maxRooms: catalog.maxRooms,
      },
    };
  }

  if (!data) {
    return {
      suite: {
        id: catalog.id,
        title: catalog.title,
        pricePerNight: catalog.pricePerNight,
        cautionFee: catalog.cautionFee,
        maxGuests: catalog.maxGuests,
        maxRooms: catalog.maxRooms,
      },
    };
  }

  if (data.active === false) {
    return { error: "This suite is not available for booking right now." };
  }

  return {
    suite: {
      id: data.id,
      title: data.title,
      pricePerNight: Number(data.price_per_night),
      cautionFee: Number(data.caution_fee),
      maxGuests: data.max_guests,
      maxRooms: Math.max(1, data.max_rooms),
    },
  };
}

function occupiesSuite(booking: { suite_id: string; rooms: number }, suiteId: string) {
  if (booking.rooms >= 2) return true;
  return booking.suite_id === suiteId;
}

export async function assertStayAvailable(
  admin: AdminClient,
  input: { suiteId: string; rooms: number; checkIn: string; checkOut: string }
): Promise<string | null> {
  const { data, error } = await admin
    .from("bookings")
    .select("suite_id, rooms, check_in, check_out, status, payment_status")
    .neq("status", "cancelled")
    .in("payment_status", ["pending", "paid"])
    .lt("check_in", input.checkOut)
    .gt("check_out", input.checkIn);

  if (error) {
    return null;
  }

  const needed = input.rooms >= 2 ? ["unit-a", "unit-b"] : [input.suiteId];

  for (const suiteId of needed) {
    const taken = (data ?? []).some((booking) => occupiesSuite(booking, suiteId));
    if (taken) {
      return "Those dates are already reserved. Please choose different dates or the other suite.";
    }
  }

  return null;
}
