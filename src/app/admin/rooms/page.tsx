"use client";

import { useEffect, useState, useTransition } from "react";
import { formatNaira } from "@/lib/suites";
import { createClient } from "@/lib/supabase/client";
import type { Suite } from "@/lib/supabase/types";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Suite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [drafts, setDrafts] = useState<Record<string, { price: string; caution: string }>>({});

  async function load() {
    setLoading(true);
    const supabase = createClient();
    const { data, error: loadError } = await supabase.from("suites").select("*").order("id");
    if (loadError) setError(loadError.message);
    else {
      setRooms(data ?? []);
      const next: Record<string, { price: string; caution: string }> = {};
      for (const room of data ?? []) {
        next[room.id] = {
          price: String(room.price_per_night),
          caution: String(room.caution_fee),
        };
      }
      setDrafts(next);
    }
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  function saveRoom(id: string, active?: boolean) {
    startTransition(async () => {
      setError("");
      const draft = drafts[id];
      const response = await fetch("/api/admin/rooms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          active,
          pricePerNight: draft ? Number(draft.price) : undefined,
          cautionFee: draft ? Number(draft.caution) : undefined,
        }),
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
      <div className="admin-page-head">
        <h1>Rooms</h1>
      </div>
      {error ? <p className="form-error">{error}</p> : null}

      <div className="card admin-panel">
        {loading ? (
          <p>Loading suites…</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Price / night</th>
                  <th>Caution</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length === 0 ? (
                  <tr>
                    <td colSpan={6}>No suites found in Supabase.</td>
                  </tr>
                ) : (
                  rooms.map((room) => (
                    <tr key={room.id}>
                      <td>{room.id}</td>
                      <td>{room.title}</td>
                      <td>
                        <input
                          className="input input-compact"
                          value={drafts[room.id]?.price ?? ""}
                          onChange={(event) =>
                            setDrafts((prev) => ({
                              ...prev,
                              [room.id]: {
                                price: event.target.value,
                                caution: prev[room.id]?.caution ?? String(room.caution_fee),
                              },
                            }))
                          }
                        />
                        <small>{formatNaira(Number(drafts[room.id]?.price || room.price_per_night))}</small>
                      </td>
                      <td>
                        <input
                          className="input input-compact"
                          value={drafts[room.id]?.caution ?? ""}
                          onChange={(event) =>
                            setDrafts((prev) => ({
                              ...prev,
                              [room.id]: {
                                price: prev[room.id]?.price ?? String(room.price_per_night),
                                caution: event.target.value,
                              },
                            }))
                          }
                        />
                      </td>
                      <td>
                        <span className={room.active ? "status-pill status-confirmed" : "status-pill status-pending"}>
                          {room.active ? "Active" : "Hidden"}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-sm" style={{ flexWrap: "wrap" }}>
                          <button
                            className="btn btn-primary btn-compact"
                            disabled={pending}
                            onClick={() => saveRoom(room.id)}
                          >
                            Save prices
                          </button>
                          <button
                            className="btn btn-outline btn-compact"
                            disabled={pending}
                            onClick={() => saveRoom(room.id, !room.active)}
                          >
                            {room.active ? "Hide" : "Activate"}
                          </button>
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
