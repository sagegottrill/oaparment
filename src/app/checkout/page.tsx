"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { BOOK_NOW_HREF } from "@/lib/booking";
import { openFlutterwaveCheckout } from "@/lib/flutterwave-inline";
import { KYC_ACCEPTED_MIME_TYPES, KYC_ID_TYPES, KYC_MAX_DOCUMENT_BYTES, isKycDocumentAccepted } from "@/lib/kyc";
import { createClient } from "@/lib/supabase/client";
import { cautionFeeForStay, formatNaira, getSuite, lastNightFromCheckout, nightsBetween } from "@/lib/suites";

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
  const suiteId = params.get("suite");
  const suite = getSuite(suiteId ?? "");
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const rooms = Math.max(1, Number(params.get("rooms") ?? 1));
  const adults = Math.max(1, Number(params.get("adults") ?? 1));
  const children = Math.max(0, Number(params.get("children") ?? 0));
  const bothSuites = params.get("both") === "1" || rooms >= 2;
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [idType, setIdType] = useState<string>("");
  const [idNumber, setIdNumber] = useState("");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const hasDates = Boolean(suite && checkIn && checkOut && nights > 0);

  useEffect(() => {
    if (!suite) {
      router.replace("/book");
      return;
    }
    if (!hasDates) {
      router.replace(`/book?suite=${suite.id}`);
    }
  }, [hasDates, router, suite]);

  useEffect(() => {
    const supabase = createClient();
    void supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) return;
      setEmail(user.email ?? "");
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("id", user.id)
        .maybeSingle();
      if (profile?.full_name) setName(profile.full_name);
      if (profile?.phone) setPhone(profile.phone);
    });
  }, []);

  const stayTotal = (suite?.pricePerNight ?? 0) * Math.max(nights, 1) * rooms;
  const cautionTotal = cautionFeeForStay(suite?.cautionFee ?? 0);
  const total = stayTotal + cautionTotal;

  const whatsappMessage = useMemo(() => {
    const lines = [
      `Hello The O' Apartments, I'd like to book ${bothSuites ? "Unit A + Unit B" : suite?.title ?? "a suite"}.`,
      `Check-in: ${checkIn ?? "-"}`,
      `Last night: ${checkOut ? lastNightFromCheckout(checkOut) : "-"}`,
      `Leave by: ${checkOut ?? "-"} 11:00 AM`,
      `Nights: ${nights}`,
      `Suites: ${rooms}, Adults: ${adults}, Children: ${children}`,
      `Stay: ${formatNaira(stayTotal)}`,
      `Caution fee: ${formatNaira(cautionTotal)}`,
      `Total: ${formatNaira(total)}`,
    ];
    return `https://wa.me/2348075963676?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [suite, bothSuites, checkIn, checkOut, nights, rooms, adults, children, stayTotal, cautionTotal, total]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!suite || !checkIn || !checkOut) {
      setError("Missing stay details. Please choose dates again.");
      return;
    }
    if (!idType || !idNumber.trim() || !idDocument) {
      setError("A valid government ID (number and document upload) is required to book.");
      return;
    }
    setLoading(true);
    setNotice("");
    setError("");

    try {
      const form = new FormData();
      form.set("suiteId", suite.id);
      form.set("checkIn", checkIn);
      form.set("checkOut", checkOut);
      form.set("rooms", String(rooms));
      form.set("adults", String(adults));
      form.set("children", String(children));
      form.set("guestName", name);
      form.set("guestEmail", email);
      form.set("guestPhone", phone);
      form.set(
        "notes",
        bothSuites ? [`Both suites (Unit A + Unit B)`, notes].filter(Boolean).join("\n") : notes
      );
      form.set("idType", idType);
      form.set("idNumber", idNumber.trim());
      form.set("idDocument", idDocument);

      const response = await fetch("/api/checkout/initialize", { method: "POST", body: form });

      const payload = (await response.json()) as {
        paymentLink?: string;
        txRef?: string;
        total?: number;
        error?: string;
      };
      if (!response.ok || !payload.txRef || typeof payload.total !== "number") {
        setError(payload.error ?? "Could not start Flutterwave payment.");
        return;
      }

      setNotice("Opening Flutterwave…");
      try {
        await openFlutterwaveCheckout({
          txRef: payload.txRef,
          amount: payload.total,
          customer: {
            email,
            name,
            phonenumber: phone,
          },
          meta: {
            suite_id: suite.id,
          },
          title: "The O Apartments",
          description: bothSuites ? "Unit A + Unit B" : suite.title,
          redirectUrl: `${window.location.origin}/checkout/success`,
        });
      } catch {
        if (!payload.paymentLink) {
          setError("Could not open Flutterwave checkout. Please try again.");
          return;
        }
        setNotice("Redirecting to Flutterwave…");
        window.location.href = payload.paymentLink;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  if (!suite) {
    return (
      <main className="container section-pad">
        <p>Suite not found.</p>
      </main>
    );
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
          <p className="eyebrow">Secure checkout</p>
          <h1>Pay with Flutterwave</h1>
          <p>{bothSuites ? "Unit A + Unit B (both premium suites)" : suite.title}</p>
        </div>
      </section>

      <section className="container book-wide section-pad">
        <div className="checkout-grid">
          <div className="card account-panel">
            <h2>Guest details</h2>
            <p style={{ marginBottom: "var(--spacing-md)" }}>
              Complete payment securely via Flutterwave. Your booking confirms after successful payment.
            </p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <label>
                Full name
                <input
                  className="input"
                  name="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                />
              </label>
              <label>
                Email
                <input
                  className="input"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@email.com"
                />
              </label>
              <label>
                Phone
                <input
                  className="input"
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9+ \-]{8,}"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="080..."
                />
              </label>
              <label>
                Special requests
                <textarea
                  className="input"
                  name="notes"
                  rows={4}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Arrival time, preferences..."
                />
              </label>
              <div className="kyc-section">
                <h3 style={{ margin: 0 }}>Identity verification (required)</h3>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                  Nigerian regulations require every guest to provide a valid government-issued ID. Your booking is
                  not blocked by our review — but the submission itself is compulsory.
                </p>
                <label>
                  ID type
                  <select
                    className="input"
                    name="idType"
                    required
                    value={idType}
                    onChange={(event) => setIdType(event.target.value)}
                  >
                    <option value="" disabled>
                      Select ID type…
                    </option>
                    {KYC_ID_TYPES.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  ID number
                  <input
                    className="input"
                    name="idNumber"
                    required
                    value={idNumber}
                    onChange={(event) => setIdNumber(event.target.value)}
                    placeholder="Exactly as shown on the ID"
                  />
                </label>
                <label>
                  ID document (photo or PDF, max 5 MB)
                  <input
                    className="input"
                    type="file"
                    name="idDocument"
                    required
                    accept={KYC_ACCEPTED_MIME_TYPES.join(",")}
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null;
                      if (file && !isKycDocumentAccepted(file)) {
                        setError(`“${file.name}” must be a JPG, PNG, WebP, or PDF under ${Math.round(KYC_MAX_DOCUMENT_BYTES / (1024 * 1024))} MB.`);
                        event.target.value = "";
                        setIdDocument(null);
                        return;
                      }
                      setError("");
                      setIdDocument(file);
                    }}
                  />
                </label>
                {idDocument ? (
                  <p className="form-success" style={{ margin: 0 }}>
                    Attached: {idDocument.name}
                  </p>
                ) : null}
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Opening Flutterwave…" : `Pay ${formatNaira(total)}`}
              </button>
            </form>
            {error ? <p className="form-error">{error}</p> : null}
            {notice ? <p className="form-success">{notice}</p> : null}
            <p style={{ marginTop: "var(--spacing-md)", fontSize: "0.9rem" }}>
              Need help first?{" "}
              <a href={whatsappMessage} target="_blank" rel="noopener noreferrer">
                Message front desk on WhatsApp
              </a>
            </p>
          </div>

          <div className="card account-panel checkout-summary-panel">
            <h2>Stay summary</h2>
            <ul className="checkout-summary">
              <li>
                <span>Suite</span>
                <strong>{bothSuites ? "Unit A + Unit B" : suite.title}</strong>
              </li>
              <li>
                <span>Check in</span>
                <strong>{formatDisplayDate(checkIn)}</strong>
              </li>
              <li>
                <span>Last night in suite</span>
                <strong>{formatDisplayDate(checkOut ? lastNightFromCheckout(checkOut) : null)}</strong>
              </li>
              <li>
                <span>Leave by</span>
                <strong>{formatDisplayDate(checkOut)} · 11:00 AM</strong>
              </li>
              <li>
                <span>Nights</span>
                <strong>{nights}</strong>
              </li>
              <li>
                <span>Suites / Adults / Children</span>
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
                <strong>{formatNaira(cautionTotal)}</strong>
              </li>
              <li className="checkout-total">
                <span>Total</span>
                <strong>{formatNaira(total)}</strong>
              </li>
            </ul>
            <Link
              href={`/book?suite=${bothSuites ? "both" : suite.id}&checkIn=${checkIn}&checkOut=${checkOut}&rooms=${rooms}&adults=${adults}&children=${children}`}
              className="btn btn-outline"
              style={{ width: "100%", marginTop: "var(--spacing-md)" }}
            >
              Edit stay details
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="container section-pad">
          <p>Loading secure checkout…</p>
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
