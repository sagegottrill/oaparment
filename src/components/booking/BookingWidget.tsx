"use client";

import Link from "next/link";
import { type MouseEvent, useMemo, useState } from "react";
import { formatNaira, nightsBetween, type SuiteProduct } from "@/lib/suites";

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

export default function BookingWidget({ suite }: { suite: SuiteProduct }) {
  const today = useMemo(() => toInputDate(new Date()), []);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDays(today, 1));
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [error, setError] = useState("");

  const nights = nightsBetween(checkIn, checkOut);
  const maxGuestsAllowed = suite.maxGuests * rooms;
  const guestCount = adults + children;
  const stayTotal = suite.pricePerNight * Math.max(nights, 1) * rooms;
  const cautionTotal = suite.cautionFee * rooms;
  const grandTotal = stayTotal + cautionTotal;
  const canContinue = nights >= 1 && guestCount >= 1 && guestCount <= maxGuestsAllowed;

  function bump(
    setter: (value: number) => void,
    value: number,
    min: number,
    max: number,
    delta: number
  ) {
    setter(Math.min(max, Math.max(min, value + delta)));
    setError("");
  }

  function handleContinue(event: MouseEvent<HTMLAnchorElement>) {
    if (!canContinue) {
      event.preventDefault();
      if (nights < 1) setError("Check-out must be at least one night after check-in.");
      else if (guestCount > maxGuestsAllowed) {
        setError(`With ${rooms} suite(s), you can host up to ${maxGuestsAllowed} guests.`);
      } else setError("Please complete your stay details.");
    }
  }

  const checkoutHref = `/checkout?suite=${suite.id}&checkIn=${checkIn}&checkOut=${checkOut}&nights=${Math.max(nights, 1)}&rooms=${rooms}&adults=${adults}&children=${children}`;

  return (
    <aside className="booking-widget card">
      <div className="booking-widget-head">
        <p className="booking-widget-kicker">Reserve this suite</p>
        <div className="booking-price-line">
          <strong>{formatNaira(suite.pricePerNight)}</strong>
          <span className="booking-per">/ night · per suite</span>
        </div>
      </div>

      <div className="booking-dates-stack">
        <label className="booking-date-field">
          <span>Check in</span>
          <input
            type="date"
            className="booking-date-input"
            value={checkIn}
            min={today}
            onChange={(event) => {
              const nextIn = event.target.value || today;
              setCheckIn(nextIn);
              setError("");
              if (nightsBetween(nextIn, checkOut) < 1) {
                setCheckOut(addDays(nextIn, 1));
              }
            }}
          />
        </label>
        <div className="booking-nights-pill" aria-live="polite">
          <strong>{Math.max(nights, 1)}</strong>
          <span>{Math.max(nights, 1) === 1 ? "night" : "nights"}</span>
        </div>
        <label className="booking-date-field">
          <span>Check out</span>
          <input
            type="date"
            className="booking-date-input"
            value={checkOut}
            min={addDays(checkIn, 1)}
            onChange={(event) => {
              setCheckOut(event.target.value || addDays(checkIn, 1));
              setError("");
            }}
          />
        </label>
      </div>

      <div className="booking-guests">
        <h4>Suites & guests</h4>
        <p className="booking-capacity">
          Book 1 or 2 suites · up to {maxGuestsAllowed} guests for this selection
        </p>
        {[
          { label: "Suites", value: rooms, min: 1, max: suite.maxRooms, set: setRooms },
          { label: "Adults", value: adults, min: 1, max: maxGuestsAllowed, set: setAdults },
          { label: "Children", value: children, min: 0, max: maxGuestsAllowed, set: setChildren },
        ].map((row) => (
          <div key={row.label} className="booking-stepper">
            <span>{row.label}</span>
            <div className="booking-stepper-controls">
              <button
                type="button"
                aria-label={`Decrease ${row.label}`}
                disabled={row.value <= row.min}
                onClick={() => bump(row.set, row.value, row.min, row.max, -1)}
              >
                –
              </button>
              <strong>{row.value}</strong>
              <button
                type="button"
                aria-label={`Increase ${row.label}`}
                disabled={row.value >= row.max}
                onClick={() => bump(row.set, row.value, row.min, row.max, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="booking-rate-box">
        <div className="booking-rate-head">
          <div>
            <strong>Standard rate</strong>
            <ul>
              <li>Minimum 1-night stay</li>
              <li>Non-refundable stay total</li>
              <li>Without breakfast</li>
            </ul>
          </div>
          <div className="booking-rate-amount">
            <span>Stay total</span>
            <strong>{formatNaira(stayTotal)}</strong>
            <small>
              {Math.max(nights, 1)} {Math.max(nights, 1) === 1 ? "night" : "nights"} · {rooms}{" "}
              {rooms === 1 ? "suite" : "suites"}
            </small>
          </div>
        </div>
      </div>

      <div className="booking-caution">
        <div>
          <strong>Refundable caution fee</strong>
          <p>
            {formatNaira(suite.cautionFee)} per suite · fully refundable if no damage is found.
          </p>
        </div>
        <strong>{formatNaira(cautionTotal)}</strong>
      </div>

      <div className="booking-total">
        <span>Total due now</span>
        <strong>{formatNaira(grandTotal)}</strong>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <Link
        href={checkoutHref}
        className={canContinue ? "btn btn-primary booking-cta" : "btn btn-primary booking-cta is-disabled"}
        aria-disabled={!canContinue}
        onClick={handleContinue}
      >
        Continue to checkout
      </Link>
    </aside>
  );
}
