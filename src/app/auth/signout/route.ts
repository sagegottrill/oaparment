import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const url = new URL(request.url);
  const next = url.searchParams.get("next") || "/";
  return NextResponse.redirect(new URL(next, url.origin), { status: 303 });
}
