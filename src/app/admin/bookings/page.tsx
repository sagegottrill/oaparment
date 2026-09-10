"use client";

import { useEffect, useState, useTransition } from "react";
import { formatNaira, getSuite } from "@/lib/suites";
import { createClient } from "@/lib/supabase/client";
import type { Booking } from "@/lib/supabase/types";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  async function load() {
    setLoading(true);
    const supabase = createClient();
    const { data, error: loadError } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (loadError) setError(loadError.message);
    else setBookings(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  function updateStatus(id: string, status: Booking["status"]) {
    startTransition(async () => {
      setError("");
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "Update failed");
        return;
      }
      await load();
    });
  }

  const filtered = bookings.filter((booking) => {
    const haystack = `${booking.guest_name} ${booking.guest_email} ${booking.suite_id} ${booking.status}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <div>
      <div className="admin-page-head">
        <h1>Bookings</h1>
        <input
          className="input admin-search"
          placeholder="Search guest, email, suite…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {error ? <p className="form-error">{error}</p> : null}

      <div className="card admin-panel">
        {loading ? (
          <p>Loading bookings…</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Guest</th>
                  <th>Suite</th>
                  <th>Dates</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7}>No bookings found.</td>
                  </tr>
                ) : (
                  filtered.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id.slice(0, 8)}</td>
                      <td>
                        <strong>{booking.guest_name}</strong>
                        <br />
                        <small>{booking.guest_email}</small>
                        <br />
                        <small>{booking.guest_phone}</small>
                      </td>
                      <td>{getSuite(booking.suite_id)?.title ?? booking.suite_id}</td>
                      <td>
                        {booking.check_in} – {booking.check_out}
                        <br />
                        <small>{booking.nights} night(s)</small>
                      </td>
                      <td>{formatNaira(Number(booking.total))}</td>
                      <td>
                        <span className={`status-pill status-${booking.status}`}>
                          {booking.status}
                        </span>
                        <br />
                        <small>{booking.payment_status}</small>
                      </td>
                      <td>
                        <div className="flex gap-sm" style={{ flexWrap: "wrap" }}>
                          {booking.status === "pending" ? (
                            <button
                              className="btn btn-primary btn-compact"
                              disabled={pending}
                              onClick={() => updateStatus(booking.id, "confirmed")}
                            >
                              Confirm
                            </button>
                          ) : null}
                          {booking.status === "confirmed" ? (
                            <button
                              className="btn btn-outline btn-compact"
                              disabled={pending}
                              onClick={() => updateStatus(booking.id, "completed")}
                            >
                              Complete
                            </button>
                          ) : null}
                          {booking.status !== "cancelled" ? (
                            <button
                              className="btn btn-outline btn-compact btn-danger"
                              disabled={pending}
                              onClick={() => updateStatus(booking.id, "cancelled")}
                            >
                              Cancel
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
