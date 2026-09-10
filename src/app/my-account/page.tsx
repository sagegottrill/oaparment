"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Booking } from "@/lib/supabase/types";
import { formatNaira, getSuite } from "@/lib/suites";

function statusLabel(status: string, payment: string) {
  if (payment === "paid" && status === "confirmed") return "Confirmed & paid";
  if (payment === "pending") return "Awaiting payment";
  if (payment === "failed") return "Payment failed";
  return `${status} / ${payment}`;
}

export default function MyAccountPage() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("guest");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  async function load() {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login?next=/my-account";
      return;
    }

    setEmail(user.email ?? "");
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, phone, role")
      .eq("id", user.id)
      .maybeSingle();

    setFullName(profile?.full_name ?? "");
    setPhone(profile?.phone ?? "");
    setRole(profile?.role ?? "guest");

    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setBookings(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      setMessage("");
      setError("");
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          phone,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        setError(updateError.message);
        return;
      }
      setMessage("Profile saved.");
    });
  }

  if (loading) {
    return (
      <main className="container section-pad">
        <p>Loading your account…</p>
      </main>
    );
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Your stay</p>
          <h1>My account</h1>
          <p>
            Signed in as {fullName || email}
            {role === "admin" ? " · Admin" : ""}
          </p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="account-grid">
          <div className="card account-panel">
            <h2>Profile</h2>
            <form className="auth-form" onSubmit={saveProfile}>
              <label>
                Full name
                <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </label>
              <label>
                Email
                <input className="input" value={email} disabled />
              </label>
              <label>
                Phone
                <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="080..." />
              </label>
              <button className="btn btn-primary" type="submit" disabled={pending}>
                {pending ? "Saving…" : "Save profile"}
              </button>
            </form>
            {error ? <p className="form-error">{error}</p> : null}
            {message ? <p className="form-success">{message}</p> : null}
          </div>

          <div className="card account-panel">
            <h2>Your bookings</h2>
            {!bookings.length ? (
              <p>No bookings yet. Book a suite and pay with Flutterwave to see it here.</p>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Suite</th>
                      <th>Dates</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{getSuite(booking.suite_id)?.title ?? booking.suite_id}</td>
                        <td>
                          {booking.check_in} → {booking.check_out}
                        </td>
                        <td>{formatNaira(Number(booking.total))}</td>
                        <td>{statusLabel(booking.status, booking.payment_status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex gap-md" style={{ flexWrap: "wrap", marginTop: "var(--spacing-md)" }}>
              <Link href="/book" className="btn btn-primary">
                Book again
              </Link>
              {role === "admin" ? (
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
        </div>
      </section>
    </main>
  );
}
