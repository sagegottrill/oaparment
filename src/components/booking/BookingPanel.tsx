"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { formatNaira, nightsBetween, suites, type SuiteProduct } from "@/lib/suites";

type SuiteChoice = "unit-a" | "unit-b" | "both";

function toInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(value: string, days: number) {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + days);
  return toInputDate(date);
}

function formatLongDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function resolveChoice(choice: SuiteChoice): {
  suite: SuiteProduct;
  rooms: number;
  label: string;
  maxGuests: number;
} {
  if (choice === "both") {
    const suite = suites[0];
    return {
      suite,
      rooms: 2,
      label: "Unit A + Unit B",
      maxGuests: suite.maxGuests * 2,
    };
  }
  const suite = suites.find((item) => item.id === choice) ?? suites[0];
  return {
    suite,
    rooms: 1,
    label: choice === "unit-a" ? "Unit A" : "Unit B",
    maxGuests: suite.maxGuests,
  };
}

type BookingPanelProps = {
  initialSuite?: SuiteProduct;
  embedded?: boolean;
};

export default function BookingPanel({ initialSuite, embedded = false }: BookingPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const today = useMemo(() => toInputDate(new Date()), []);

  const [choice, setChoice] = useState<SuiteChoice>(() => {
    if (initialSuite?.id === "unit-b") return "unit-b";
    if (initialSuite?.id === "unit-a") return "unit-a";
    return "unit-a";
  });
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDays(today, 1));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [error, setError] = useState("");
  const [hydratedFromUrl, setHydratedFromUrl] = useState(false);

  const { suite, rooms, label, maxGuests } = resolveChoice(choice);
  const nights = nightsBetween(checkIn, checkOut);
  const guestCount = adults + children;
  const stayTotal = suite.pricePerNight * Math.max(nights, 1) * rooms;
  const cautionTotal = suite.cautionFee * rooms;
  const grandTotal = stayTotal + cautionTotal;
  const canContinue = nights >= 1 && guestCount >= 1 && guestCount <= maxGuests;

  useEffect(() => {
    if (initialSuite?.id === "unit-a" || initialSuite?.id === "unit-b") {
      setChoice(initialSuite.id);
    }
  }, [initialSuite?.id]);

  useEffect(() => {
    if (hydratedFromUrl || embedded) return;
    const suiteParam = searchParams.get("suite");
    const roomsParam = Number(searchParams.get("rooms") ?? 1);
    const checkInParam = searchParams.get("checkIn");
    const checkOutParam = searchParams.get("checkOut");
    const adultsParam = Number(searchParams.get("adults") ?? 0);
    const childrenParam = Number(searchParams.get("children") ?? 0);

    if (roomsParam >= 2 || suiteParam === "both") setChoice("both");
    else if (suiteParam === "unit-b") setChoice("unit-b");
    else if (suiteParam === "unit-a") setChoice("unit-a");

    if (checkInParam) setCheckIn(checkInParam);
    if (checkOutParam) setCheckOut(checkOutParam);
    if (adultsParam >= 1) setAdults(adultsParam);
    if (childrenParam >= 0 && searchParams.has("children")) setChildren(childrenParam);
    setHydratedFromUrl(true);
  }, [embedded, hydratedFromUrl, searchParams]);

  function bumpGuests(kind: "adults" | "children", delta: number) {
    if (kind === "adults") {
      const next = Math.min(maxGuests, Math.max(1, adults + delta));
      if (next + children > maxGuests) {
        setChildren(Math.max(0, maxGuests - next));
      }
      setAdults(next);
    } else {
      const next = Math.min(maxGuests - adults, Math.max(0, children + delta));
      setChildren(next);
    }
    setError("");
  }

  function selectChoice(next: SuiteChoice) {
    setChoice(next);
    const resolved = resolveChoice(next);
    if (adults + children > resolved.maxGuests) {
      setAdults(Math.min(adults, resolved.maxGuests));
      setChildren(Math.max(0, Math.min(children, resolved.maxGuests - Math.min(adults, resolved.maxGuests))));
    }
    setError("");
  }

  function continueToCheckout() {
    if (!canContinue) {
      if (nights < 1) setError("Choose a check-out at least one night after check-in.");
      else if (guestCount > maxGuests) setError(`This selection allows up to ${maxGuests} guests.`);
      else setError("Complete your stay details to continue.");
      return;
    }

    const href = `/checkout?suite=${suite.id}&checkIn=${checkIn}&checkOut=${checkOut}&nights=${Math.max(nights, 1)}&rooms=${rooms}&adults=${adults}&children=${children}${choice === "both" ? "&both=1" : ""}`;
    router.push(href);
  }

  const pickerOptions: { id: SuiteChoice; title: string; detail: string; image: string }[] = [
    {
      id: "unit-a",
      title: "Unit A",
      detail: `${formatNaira(suites[0].pricePerNight)}/night · up to 6 guests`,
      image: suites[0].images[0],
    },
    {
      id: "unit-b",
      title: "Unit B",
      detail: `${formatNaira(suites[1].pricePerNight)}/night · up to 6 guests`,
      image: suites[1].images[0],
    },
    {
      id: "both",
      title: "Both suites",
      detail: `${formatNaira(suites[0].pricePerNight * 2)}/night · up to 12 guests`,
      image: suites[0].images[1] ?? suites[0].images[0],
    },
  ];

  return (
    <div className={embedded ? "booking-panel is-embedded" : "booking-panel"}>
      {!embedded ? (
        <div className="booking-panel-intro">
          <p className="eyebrow">Book your stay</p>
          <h2>Pick a suite, dates & guests</h2>
          <p>Reserve Unit A, Unit B, or both premium suites — then pay securely with Flutterwave.</p>
        </div>
      ) : null}

      <div className={embedded ? "booking-suite-picker has-three is-compact" : "booking-suite-picker has-three"}>
        {pickerOptions.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === choice ? "booking-suite-option active" : "booking-suite-option"}
            onClick={() => selectChoice(item.id)}
          >
            {embedded ? null : (
              <span className="booking-suite-option-media" style={{ backgroundImage: `url(${item.image})` }} />
            )}
            <span className="booking-suite-option-copy">
              <strong>{item.title}</strong>
              {embedded ? null : <small>{item.detail}</small>}
            </span>
          </button>
        ))}
      </div>

      <div className="booking-panel-grid">
        <div className="booking-panel-controls">
          <div className="booking-date-grid">
            <label className="booking-date-card">
              <span>Check in</span>
              <strong>{formatLongDate(checkIn)}</strong>
              <input
                className="booking-date-native"
                type="date"
                value={checkIn}
                min={today}
                aria-label="Check-in date"
                onChange={(event) => {
                  const nextIn = event.target.value || today;
                  setCheckIn(nextIn);
                  setError("");
                  if (nightsBetween(nextIn, checkOut) < 1) setCheckOut(addDays(nextIn, 1));
                }}
              />
            </label>

            <div className="booking-nights-badge" aria-live="polite">
              <strong>{Math.max(nights, 1)}</strong>
              <span>{Math.max(nights, 1) === 1 ? "night" : "nights"}</span>
            </div>

            <label className="booking-date-card">
              <span>Check out</span>
              <strong>{formatLongDate(checkOut)}</strong>
              <input
                className="booking-date-native"
                type="date"
                value={checkOut}
                min={addDays(checkIn, 1)}
                aria-label="Check-out date"
                onChange={(event) => {
                  setCheckOut(event.target.value || addDays(checkIn, 1));
                  setError("");
                }}
              />
            </label>
          </div>

          <div className="booking-stepper-card">
            <div className="booking-stepper-row">
              <div>
                <strong>Adults</strong>
                <small>Up to {maxGuests} guests for {label}</small>
              </div>
              <div className="booking-stepper-controls">
                <button type="button" aria-label="Fewer adults" disabled={adults <= 1} onClick={() => bumpGuests("adults", -1)}>
                  –
                </button>
                <strong>{adults}</strong>
                <button
                  type="button"
                  aria-label="More adults"
                  disabled={adults + children >= maxGuests}
                  onClick={() => bumpGuests("adults", 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="booking-stepper-row">
              <div>
                <strong>Children</strong>
                <small>Optional</small>
              </div>
              <div className="booking-stepper-controls">
                <button
                  type="button"
                  aria-label="Fewer children"
                  disabled={children <= 0}
                  onClick={() => bumpGuests("children", -1)}
                >
                  –
                </button>
                <strong>{children}</strong>
                <button
                  type="button"
                  aria-label="More children"
                  disabled={adults + children >= maxGuests}
                  onClick={() => bumpGuests("children", 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-summary-card">
          <p className="booking-summary-kicker">Stay summary</p>
          <h3>{choice === "both" ? "Both premium suites" : suite.title}</h3>
          <ul>
            <li>
              <span>Selection</span>
              <strong>{label}</strong>
            </li>
            <li>
              <span>Dates</span>
              <strong>
                {formatLongDate(checkIn)} → {formatLongDate(checkOut)}
              </strong>
            </li>
            <li>
              <span>Guests</span>
              <strong>
                {adults} adults{children ? ` · ${children} children` : ""}
              </strong>
            </li>
            <li>
              <span>Stay total</span>
              <strong>{formatNaira(stayTotal)}</strong>
            </li>
            <li>
              <span>Caution fee</span>
              <strong>{formatNaira(cautionTotal)}</strong>
            </li>
            <li className="booking-summary-total">
              <span>Total due now</span>
              <strong>{formatNaira(grandTotal)}</strong>
            </li>
          </ul>

          {error ? <p className="form-error">{error}</p> : null}

          <button type="button" className="btn btn-primary booking-cta" onClick={continueToCheckout}>
            Continue to secure checkout
          </button>
          <p className="booking-summary-note">Pay with Flutterwave · WhatsApp support available</p>
          {embedded ? null : choice !== "both" ? (
            <Link href={`/rooms/${suite.id}`} className="booking-suite-link">
              View suite photos & details →
            </Link>
          ) : (
            <Link href="/our-apartments" className="booking-suite-link">
              Compare Unit A & Unit B →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
