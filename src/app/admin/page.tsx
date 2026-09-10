import Link from "next/link";
import { formatNaira, getSuite } from "@/lib/suites";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  const { count: totalBookings } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true });

  const { data: paidBookings } = await supabase
    .from("bookings")
    .select("total, payment_status, created_at")
    .eq("payment_status", "paid");

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const revenueMtd = (paidBookings ?? [])
    .filter((row) => row.created_at >= monthStart)
    .reduce((sum, row) => sum + Number(row.total), 0);

  const { data: suites } = await supabase.from("suites").select("id, active");
  const activeSuites = (suites ?? []).filter((suite) => suite.active).length;

  return (
    <div>
      <h1 style={{ marginBottom: "var(--spacing-xl)" }}>Dashboard Overview</h1>

      <div className="grid grid-cols-3 gap-md" style={{ marginBottom: "var(--spacing-2xl)" }}>
        <div className="card" style={{ padding: "var(--spacing-md)" }}>
          <h3 style={{ fontSize: "1rem", color: "var(--color-text-muted)" }}>Total Bookings</h3>
          <p style={{ fontSize: "2rem", fontWeight: 700, margin: "var(--spacing-xs) 0 0 0" }}>
            {totalBookings ?? 0}
          </p>
        </div>
        <div className="card" style={{ padding: "var(--spacing-md)" }}>
          <h3 style={{ fontSize: "1rem", color: "var(--color-text-muted)" }}>Revenue (MTD)</h3>
          <p style={{ fontSize: "2rem", fontWeight: 700, margin: "var(--spacing-xs) 0 0 0" }}>
            {formatNaira(revenueMtd)}
          </p>
        </div>
        <div className="card" style={{ padding: "var(--spacing-md)" }}>
          <h3 style={{ fontSize: "1rem", color: "var(--color-text-muted)" }}>Active Suites</h3>
          <p style={{ fontSize: "2rem", fontWeight: 700, margin: "var(--spacing-xs) 0 0 0" }}>
            {activeSuites}
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: "var(--spacing-lg)" }}>
        <div className="flex justify-between items-center gap-md" style={{ marginBottom: "var(--spacing-md)", flexWrap: "wrap" }}>
          <h2 style={{ margin: 0 }}>Recent Bookings</h2>
          <Link href="/admin/bookings" className="btn btn-outline">
            View all
          </Link>
        </div>
        <div className="table-wrap">
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "var(--spacing-sm)" }}>Guest</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Room</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Dates</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Amount</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {(bookings ?? []).length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "var(--spacing-sm)" }}>
                    No bookings yet.
                  </td>
                </tr>
              ) : (
                (bookings ?? []).map((booking) => (
                  <tr key={booking.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "var(--spacing-sm)" }}>{booking.guest_name}</td>
                    <td style={{ padding: "var(--spacing-sm)" }}>{getSuite(booking.suite_id).title}</td>
                    <td style={{ padding: "var(--spacing-sm)" }}>
                      {booking.check_in} – {booking.check_out}
                    </td>
                    <td style={{ padding: "var(--spacing-sm)" }}>{formatNaira(Number(booking.total))}</td>
                    <td style={{ padding: "var(--spacing-sm)" }}>
                      <span
                        style={{
                          color:
                            booking.status === "confirmed"
                              ? "var(--color-success)"
                              : booking.status === "pending"
                                ? "#F59E0B"
                                : "var(--color-error)",
                        }}
                      >
                        {booking.status} / {booking.payment_status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
