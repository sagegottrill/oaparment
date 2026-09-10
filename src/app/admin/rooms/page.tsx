"use client";

import { useEffect, useState, useTransition } from "react";
import { formatNaira } from "@/lib/suites";
import { createClient } from "@/lib/supabase/client";
import type { Suite } from "@/lib/supabase/types";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Suite[]>([]);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  async function load() {
    const supabase = createClient();
    const { data, error: loadError } = await supabase
      .from("suites")
      .select("*")
      .order("id", { ascending: true });

    if (loadError) {
      setError(loadError.message);
      return;
    }
    setRooms(data ?? []);
  }

  useEffect(() => {
    void load();
  }, []);

  function toggleActive(id: string, active: boolean) {
    startTransition(async () => {
      setError("");
      const response = await fetch("/api/admin/rooms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active: !active }),
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
      <div
        className="flex justify-between items-center gap-md"
        style={{ marginBottom: "var(--spacing-xl)", flexWrap: "wrap" }}
      >
        <h1 style={{ margin: 0 }}>Room Management</h1>
      </div>

      {error ? <p className="form-notice">{error}</p> : null}

      <div className="card" style={{ padding: "var(--spacing-lg)" }}>
        <div className="table-wrap">
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "var(--spacing-sm)" }}>ID</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Room Title</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Price/Night</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Caution</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Status</th>
                <th style={{ padding: "var(--spacing-sm)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "var(--spacing-sm)" }}>
                    No suites found.
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "var(--spacing-sm)" }}>{room.id}</td>
                    <td style={{ padding: "var(--spacing-sm)" }}>{room.title}</td>
                    <td style={{ padding: "var(--spacing-sm)" }}>
                      {formatNaira(Number(room.price_per_night))}
                    </td>
                    <td style={{ padding: "var(--spacing-sm)" }}>
                      {formatNaira(Number(room.caution_fee))}
                    </td>
                    <td style={{ padding: "var(--spacing-sm)" }}>
                      <span style={{ color: room.active ? "var(--color-success)" : "#F59E0B" }}>
                        {room.active ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td style={{ padding: "var(--spacing-sm)" }}>
                      <button
                        className="btn btn-outline"
                        style={{ padding: "var(--spacing-xs) var(--spacing-sm)", fontSize: "0.875rem" }}
                        disabled={pending}
                        onClick={() => toggleActive(room.id, room.active)}
                      >
                        {room.active ? "Hide" : "Activate"}
                      </button>
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
