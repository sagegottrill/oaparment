import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { KYC_BUCKET } from "@/lib/kyc";

export async function assertAdmin(): Promise<{ admin: ReturnType<typeof createAdminClient> } | { error: NextResponse }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    return { error: NextResponse.json({ error: "Admin only" }, { status: 403 }) };
  }

  return { admin: createAdminClient() };
}

/**
 * PATCH /api/admin/kyc
 * Body: { id, status: "approved" | "rejected" | "pending", reviewNote? }
 */
export async function PATCH(request: Request) {
  const guard = await assertAdmin();
  if ("error" in guard) return guard.error;

  const body = (await request.json()) as {
    id?: string;
    status?: "approved" | "rejected" | "pending";
    reviewNote?: string;
  };

  if (!body.id || !body.status) {
    return NextResponse.json({ error: "id and status are required" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await guard.admin
    .from("kyc_submissions")
    .update({
      status: body.status,
      review_note: body.reviewNote?.trim() || null,
      reviewed_by: user?.id ?? null,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.id)
    .select("id, status")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ submission: data });
}

/**
 * GET /api/admin/kyc?path=<storage path>
 * Streams a private ID document through a short-lived signed URL.
 */
export async function GET(request: Request) {
  const guard = await assertAdmin();
  if ("error" in guard) return guard.error;

  const path = new URL(request.url).searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "path is required" }, { status: 400 });
  }

  const { data, error } = await guard.admin.storage
    .from(KYC_BUCKET)
    .createSignedUrl(path, 60);

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Document not found" }, { status: 404 });
  }

  return NextResponse.json({ signedUrl: data.signedUrl });
}
