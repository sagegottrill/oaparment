import { NextResponse } from "next/server";
import { maybePromoteAdmin } from "@/lib/admin-bootstrap";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const promoted = await maybePromoteAdmin(user.id, user.email);
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  return NextResponse.json({
    promoted,
    role: profile?.role ?? "guest",
    fullName: profile?.full_name,
  });
}
