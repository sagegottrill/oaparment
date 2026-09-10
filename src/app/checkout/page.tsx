"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { BOOK_NOW_HREF } from "@/lib/booking";
import { formatNaira, getSuite } from "@/lib/suites";

function formatDisplayDate(value: string | null) {
  if (!value) return null;
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function CheckoutContent() {
  const router = useRouter();
  const params = useSearchParams();
  const suite = getSuite(params.get("suite") ?? "unit-a");
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const nights = Number(params.get("nights") ?? 0);
  const rooms = Number(params.get("rooms") ?? 1);
  const adults = Number(params.get("adults") ?? 1);
  const children = Number(params.get("children") ?? 0);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const hasDates = Boolean(checkIn && checkOut && nights > 0);

  useEffect(() => {
    if (!hasDates) {
      router.replace(`/rooms/${suite.id}`);
    }
  }, [hasDates, router, suite.id]);

  const stayTotal = suite.pricePerNight * Math.max(nights, 1) * Math.max(rooms, 1);
  const total = stayTotal + suite.cautionFee;

  const whatsappMessage = useMemo(() => {
    const lines = [
      `Hello The O' Apartments, I'd like to book ${suite.title}.`,
      `Check-in: ${checkIn ?? "-"}`,
      `Check-out: ${checkOut ?? "-"}`,
      `Nights: ${nights}`,
      `Rooms: ${rooms}, Adults: ${adults}, Children: ${children}`,
      `Stay: ${formatNaira(stayTotal)}`,
      `Caution fee: ${formatNaira(suite.cautionFee)}`,
      `Total: ${formatNaira(total)}`,
    ];
    return `https://wa.me/2348075963676?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [suite, checkIn, checkOut, nights, rooms, adults, children, stayTotal, total]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/checkout/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suiteId: suite.id,
          checkIn,
          checkOut,
          nights,
          rooms,
          adults,
          children,
          guestName: String(form.get("name") ?? ""),
          guestEmail: String(form.get("email") ?? ""),
          guestPhone: String(form.get("phone") ?? ""),
          notes: String(form.get("notes") ?? ""),
        }),
      });

      const payload = (await response.json()) as { paymentLink?: string; error?: string };
      if (!response.ok || !payload.paymentLink) {
        setNotice(payload.error ?? "Could not start payment.");
        return;
      }

      window.location.href = payload.paymentLink;
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  if (!hasDates) {
    return (
      <main className="container section-pad">
        <p>Taking you to pick your dates…</p>
        <Link href={BOOK_NOW_HREF} className="btn btn-primary">
          Choose dates
        </Link>
      </main>
    );
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Complete booking</p>
          <h1>Checkout</h1>
          <p>{suite.title}</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="checkout-grid">
          <div className="card account-panel">
            <h2>Guest details</h2>
            <p style={{ marginBottom: "var(--spacing-md)" }}>
              Pay securely with Flutterwave. Your booking is confirmed after successful payment.
            </p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <label>
                Full name
                <input className="input" name="name" required placeholder="Your full name" />
              </label>
              <label>
                Email
                <input className="input" type="email" name="email" required placeholder="you@email.com" />
              </label>
              <label>
                Phone
                <input className="input" type="tel" name="phone" required placeholder="080..." />
              </label>
              <label>
                Special requests
                <textarea className="input" name="notes" rows={4} placeholder="Arrival time, preferences..." />
              </label>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Opening payment…" : `Pay ${formatNaira(total)}`}
              </button>
            </form>
            {notice ? <p className="form-notice">{notice}</p> : null}
            <p style={{ marginTop: "var(--spacing-md)", fontSize: "0.9rem" }}>
              Prefer chat only?{" "}
              <a href={whatsappMessage} target="_blank" rel="noopener noreferrer">
                Open WhatsApp with stay summary
              </a>
            </p>
          </div>

          <div className="card account-panel">
            <h2>Stay summary</h2>
            <ul className="checkout-summary">
              <li>
                <span>Suite</span>
                <strong>{suite.title}</strong>
              </li>
              <li>
                <span>Check in</span>
                <strong>{formatDisplayDate(checkIn)}</strong>
              </li>
              <li>
                <span>Check out</span>
                <strong>{formatDisplayDate(checkOut)}</strong>
              </li>
              <li>
                <span>Nights</span>
                <strong>{nights}</strong>
              </li>
              <li>
                <span>Rooms / Adults / Children</span>
                <strong>
                  {rooms} / {adults} / {children}
                </strong>
              </li>
              <li>
                <span>Stay total</span>
                <strong>{formatNaira(stayTotal)}</strong>
              </li>
              <li>
                <span>Refundable caution fee</span>
                <strong>{formatNaira(suite.cautionFee)}</strong>
              </li>
              <li className="checkout-total">
                <span>Total</span>
                <strong>{formatNaira(total)}</strong>
              </li>
            </ul>
            <Link href={`/rooms/${suite.id}`} className="btn btn-outline" style={{ width: "100%", marginTop: "var(--spacing-md)" }}>
              Edit dates
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<main className="container section-pad"><p>Loading checkout…</p></main>}>
      <CheckoutContent />
    </Suspense>
  );
}
