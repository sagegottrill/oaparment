import Link from "next/link";
import { redirect } from "next/navigation";
import { formatNaira, getSuite } from "@/lib/suites";
import { createClient } from "@/lib/supabase/server";

export default async function MyAccountPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/my-account");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, phone")
    .eq("id", user.id)
    .maybeSingle();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Your stay</p>
          <h1>My account</h1>
          <p>
            Signed in as {profile?.full_name || user.email}
            {profile?.role === "admin" ? " · Admin" : ""}
          </p>
        </div>
      </section>

      <section className="container section-pad">
        {params.error === "admin_required" ? (
          <p className="form-notice" style={{ marginBottom: "var(--spacing-md)" }}>
            That area is for staff accounts only.
          </p>
        ) : null}

        <div className="account-grid">
          <div className="card account-panel">
            <h2>Your bookings</h2>
            {!bookings?.length ? (
              <p>No bookings yet. Book a suite and pay with Flutterwave to see it here.</p>
            ) : (
              <div className="table-wrap">
                <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                      <th style={{ padding: "var(--spacing-sm)" }}>Suite</th>
                      <th style={{ padding: "var(--spacing-sm)" }}>Dates</th>
                      <th style={{ padding: "var(--spacing-sm)" }}>Total</th>
                      <th style={{ padding: "var(--spacing-sm)" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                        <td style={{ padding: "var(--spacing-sm)" }}>{getSuite(booking.suite_id).title}</td>
                        <td style={{ padding: "var(--spacing-sm)" }}>
                          {booking.check_in} → {booking.check_out}
                        </td>
                        <td style={{ padding: "var(--spacing-sm)" }}>{formatNaira(Number(booking.total))}</td>
                        <td style={{ padding: "var(--spacing-sm)" }}>
                          {booking.status} / {booking.payment_status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex gap-md" style={{ flexWrap: "wrap", marginTop: "var(--spacing-md)" }}>
              <Link href="/rooms/unit-a" className="btn btn-primary">
                Book again
              </Link>
              {profile?.role === "admin" ? (
                <Link href="/admin" className="btn btn-outline">
                  Admin dashboard
                </Link>
              ) : null}
              <form action="/auth/signout" method="post">
                <button className="btn btn-outline" type="submit">
                  Sign out
                </button>
              </form>
            </div>
          </div>

          <div className="card account-panel">
            <h2>Need help now?</h2>
            <p>Call or message the front desk for same-day bookings in Ilaro.</p>
            <p>
              <a href="tel:08075963676">08075963676</a>
              <br />
              <a href="https://wa.link/ubsow7" target="_blank" rel="noopener noreferrer">
                WhatsApp booking
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
