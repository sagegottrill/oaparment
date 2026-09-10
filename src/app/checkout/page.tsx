"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { formatNaira, getSuite } from "@/lib/suites";

function CheckoutContent() {
  const params = useSearchParams();
  const suite = getSuite(params.get("suite") ?? "unit-a");
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const nights = Number(params.get("nights") ?? 1);
  const rooms = Number(params.get("rooms") ?? 1);
  const adults = Number(params.get("adults") ?? 1);
  const children = Number(params.get("children") ?? 0);

  const stayTotal = suite.pricePerNight * Math.max(nights, 1) * Math.max(rooms, 1);
  const total = stayTotal + suite.cautionFee;

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
            <form className="auth-form">
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
              <button className="btn btn-primary" type="submit">
                Confirm booking request
              </button>
            </form>
            <p style={{ marginTop: "var(--spacing-md)", fontSize: "0.9rem" }}>
              Or book instantly on WhatsApp:{" "}
              <a href="https://wa.link/ubsow7" target="_blank" rel="noopener noreferrer">
                Chat with us
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
                <strong>{checkIn ?? "Select dates"}</strong>
              </li>
              <li>
                <span>Check out</span>
                <strong>{checkOut ?? "Select dates"}</strong>
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
