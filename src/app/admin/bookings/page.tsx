"use client";

import { useEffect, useState, useTransition } from "react";
import { formatNaira, getSuite } from "@/lib/suites";
import { createClient } from "@/lib/supabase/client";
import type { Booking } from "@/lib/supabase/types";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  async function load() {
    const supabase = createClient();
    const { data, error: loadError } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (loadError) {
      setError(loadError.message);
      return;
    }
    setBookings(data ?? []);
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

  return (
    <div>
      <h1 style={{ marginBottom: "var(--spacing-xl)" }}>Bookings Management</h1>
      {error ? <p className="form-notice">{error}</p> : null}

      <div className="card" style={{ padding: "var(--spacing-lg)" }}>
        <div className="table-wrap">
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "var(--spacing-sm)" }}>Booking ID</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Guest</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Room</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Dates</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Amount</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Status</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "var(--spacing-sm)" }}>
                    No bookings yet.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "var(--spacing-sm)" }}>{booking.id.slice(0, 8)}</td>
                    <td style={{ padding: "var(--spacing-sm)" }}>
                      {booking.guest_name}
                      <br />
                      <small>{booking.guest_email}</small>
                    </td>
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
                    <td style={{ padding: "var(--spacing-sm)" }}>
                      <div className="flex gap-sm" style={{ flexWrap: "wrap" }}>
                        {booking.status === "pending" && (
                          <button
                            className="btn btn-primary"
                            style={{ padding: "var(--spacing-xs) var(--spacing-sm)", fontSize: "0.875rem" }}
                            disabled={pending}
                            onClick={() => updateStatus(booking.id, "confirmed")}
                          >
                            Confirm
                          </button>
                        )}
                        {booking.status !== "cancelled" && (
                          <button
                            className="btn btn-outline"
                            style={{
                              padding: "var(--spacing-xs) var(--spacing-sm)",
                              fontSize: "0.875rem",
                              color: "var(--color-error)",
                              borderColor: "var(--color-error)",
                            }}
                            disabled={pending}
                            onClick={() => updateStatus(booking.id, "cancelled")}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
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
