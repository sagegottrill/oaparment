"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { BOOK_NOW_HREF } from "@/lib/booking";
import { formatNaira, lastNightFromCheckout } from "@/lib/suites";

type BookingSummary = {
  id: string;
  suiteId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  status: string;
  paymentStatus: string;
  txRef: string | null;
};

function SuccessContent() {
  const params = useSearchParams();
  const status = params.get("status");
  const txRef = params.get("tx_ref");
  const transactionId = params.get("transaction_id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<BookingSummary | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      if (!transactionId) {
        if (status === "cancelled" || status === "failed") {
          setError("Payment was cancelled. You can try again anytime.");
        } else {
          setError("Missing transaction details from Flutterwave.");
        }
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/payments/flutterwave/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transactionId,
            txRef,
            status,
          }),
        });
        const payload = (await response.json()) as {
          paid?: boolean;
          booking?: BookingSummary;
          error?: string;
        };

        if (!response.ok || !payload.paid || !payload.booking) {
          if (!cancelled) setError(payload.error ?? "Could not confirm payment.");
          return;
        }

        if (!cancelled) setBooking(payload.booking);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Verification failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void verify();
    return () => {
      cancelled = true;
    };
  }, [status, txRef, transactionId]);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Payment</p>
          <h1>{booking ? "Booking confirmed" : "Confirming payment"}</h1>
          <p>
            {booking
              ? "Thank you — your stay is paid and confirmed."
              : "Please wait while we verify your Flutterwave payment."}
          </p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="card account-panel" style={{ maxWidth: 640 }}>
          {loading ? <p>Verifying with Flutterwave…</p> : null}
          {!loading && error ? (
            <>
              <p className="form-notice">{error}</p>
              <div className="flex gap-md" style={{ flexWrap: "wrap", marginTop: "var(--spacing-md)" }}>
                <Link href={BOOK_NOW_HREF} className="btn btn-primary">
                  Try again
                </Link>
                <a href="https://wa.link/ubsow7" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                  WhatsApp front desk
                </a>
              </div>
            </>
          ) : null}
          {!loading && booking ? (
            <>
              <ul className="checkout-summary">
                <li>
                  <span>Guest</span>
                  <strong>{booking.guestName}</strong>
                </li>
                <li>
                  <span>Email</span>
                  <strong>{booking.guestEmail}</strong>
                </li>
                <li>
                  <span>Check in</span>
                  <strong>{booking.checkIn}</strong>
                </li>
                <li>
                  <span>Last night in suite</span>
                  <strong>{lastNightFromCheckout(booking.checkOut)}</strong>
                </li>
                <li>
                  <span>Leave by</span>
                  <strong>{booking.checkOut} · 11:00 AM</strong>
                </li>
                <li>
                  <span>Nights</span>
                  <strong>{booking.nights}</strong>
                </li>
                <li>
                  <span>Total paid</span>
                  <strong>{formatNaira(Number(booking.total))}</strong>
                </li>
                <li>
                  <span>Reference</span>
                  <strong>{booking.txRef}</strong>
                </li>
              </ul>
              <div className="flex gap-md" style={{ flexWrap: "wrap", marginTop: "var(--spacing-md)" }}>
                <Link href="/my-account" className="btn btn-primary">
                  My account
                </Link>
                <Link href="/" className="btn btn-outline">
                  Back home
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<main className="container section-pad"><p>Loading…</p></main>}>
      <SuccessContent />
    </Suspense>
  );
}
