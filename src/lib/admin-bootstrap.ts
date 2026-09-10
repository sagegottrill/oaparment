import { createAdminClient } from "@/lib/supabase/admin";

/** Promotes matching emails to admin once (server-only). */
export async function maybePromoteAdmin(userId: string, email: string | undefined) {
  if (!email) return false;
  const allow = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (!allow.includes(email.toLowerCase())) return false;

  try {
    const admin = createAdminClient();
    const { error } = await admin
      .from("profiles")
      .update({ role: "admin", updated_at: new Date().toISOString() })
      .eq("id", userId);
    return !error;
  } catch {
    return false;
  }
}
