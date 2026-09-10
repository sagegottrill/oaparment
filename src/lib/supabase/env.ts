export function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }
  return url;
}

export function getSupabaseAnonKey() {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY (or PUBLISHABLE_KEY)");
  }
  return key;
}

export function getAppUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.VERCEL_URL?.replace(/^/, "https://") ??
    "http://localhost:3000"
  );
}

/** Flutterwave must fetch this URL from the public internet — localhost logos always break. */
export function getFlutterwaveLogoUrl() {
  const override = process.env.FLUTTERWAVE_LOGO_URL?.trim();
  if (override) return override;

  const base = getAppUrl().replace(/\/$/, "");
  const isLocal = /localhost|127\.0\.0\.1/i.test(base);
  const isHttps = /^https:\/\//i.test(base);
  if (!isHttps || isLocal) return undefined;

  return `${base}/logo-mark.png`;
}
