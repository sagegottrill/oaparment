import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Admin only" }, { status: 403 });
  }

  const body = (await request.json()) as {
    id?: string;
    active?: boolean;
    pricePerNight?: number;
    cautionFee?: number;
  };

  if (!body.id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const patch: {
    active?: boolean;
    price_per_night?: number;
    caution_fee?: number;
  } = {};

  if (typeof body.active === "boolean") patch.active = body.active;
  if (typeof body.pricePerNight === "number") patch.price_per_night = body.pricePerNight;
  if (typeof body.cautionFee === "number") patch.caution_fee = body.cautionFee;

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("suites")
    .update(patch)
    .eq("id", body.id)
    .select("id, title, active, price_per_night, caution_fee")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ suite: data });
}
