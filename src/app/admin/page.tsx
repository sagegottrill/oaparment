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

  const { count: pendingKyc } = await supabase
    .from("kyc_submissions")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  return (
    <div>
      <div className="admin-page-head">
        <h1>Dashboard</h1>
        <div className="flex gap-sm">
          <Link href="/admin/kyc" className="btn btn-primary btn-compact">
            Review KYC {pendingKyc ? `(${pendingKyc})` : ""}
          </Link>
          <Link href="/admin/bookings" className="btn btn-outline btn-compact">
            Manage bookings
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-md" style={{ marginBottom: "var(--spacing-2xl)" }}>
        <div className="card admin-stat">
          <h3>Total bookings</h3>
          <p>{totalBookings ?? 0}</p>
        </div>
        <div className="card admin-stat">
          <h3>Revenue (MTD)</h3>
          <p>{formatNaira(revenueMtd)}</p>
        </div>
        <div className="card admin-stat">
          <h3>Active suites</h3>
          <p>{activeSuites}</p>
        </div>
      </div>

      {pendingKyc ? (
        <div className="card admin-panel" style={{ marginBottom: "var(--spacing-2xl)", borderColor: "var(--color-primary)" }}>
          <div className="flex justify-between items-center">
            <p style={{ margin: 0 }}>
              <strong>{pendingKyc}</strong> guest ID submission{pendingKyc === 1 ? "" : "s"} awaiting review.
            </p>
            <Link href="/admin/kyc" className="btn btn-primary btn-compact">
              Review now
            </Link>
          </div>
        </div>
      ) : null}

      <div className="card admin-panel">
        <div className="admin-page-head" style={{ marginBottom: "var(--spacing-md)" }}>
          <h2 style={{ margin: 0 }}>Recent bookings</h2>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room</th>
                <th>Dates</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(bookings ?? []).length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    No bookings yet. When guests pay with Flutterwave, they appear here.
                  </td>
                </tr>
              ) : (
                (bookings ?? []).map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.guest_name}</td>
                    <td>{getSuite(booking.suite_id)?.title ?? booking.suite_id}</td>
                    <td>
                      {booking.check_in} – {booking.check_out}
                    </td>
                    <td>{formatNaira(Number(booking.total))}</td>
                    <td>
                      <span className={`status-pill status-${booking.status}`}>{booking.status}</span>
                      <br />
                      <small>{booking.payment_status}</small>
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
