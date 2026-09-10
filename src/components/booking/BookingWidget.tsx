"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatNaira, type SuiteProduct } from "@/lib/suites";

function toInputDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function nightsBetween(checkIn: string, checkOut: string) {
  const start = new Date(`${checkIn}T12:00:00`);
  const end = new Date(`${checkOut}T12:00:00`);
  const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 1);
}

function formatDisplayDate(value: string) {
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

type Props = {
  suite: SuiteProduct;
};

export default function BookingWidget({ suite }: Props) {
  const today = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => {
    const next = new Date();
    next.setDate(next.getDate() + 1);
    return next;
  }, []);

  const [checkIn, setCheckIn] = useState(toInputDate(today));
  const [checkOut, setCheckOut] = useState(toInputDate(tomorrow));
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const nights = nightsBetween(checkIn, checkOut);
  const stayTotal = suite.pricePerNight * nights * rooms;
  const grandTotal = stayTotal + suite.cautionFee;

  function bump(setter: (value: number) => void, value: number, min: number, max: number, delta: number) {
    setter(Math.min(max, Math.max(min, value + delta)));
  }

  const checkoutHref = `/checkout?suite=${suite.id}&checkIn=${checkIn}&checkOut=${checkOut}&nights=${nights}&rooms=${rooms}&adults=${adults}&children=${children}`;

  return (
    <aside className="booking-widget card">
      <div className="booking-price-line">
        <span className="booking-from">From:</span>
        <strong>{formatNaira(suite.pricePerNight)}</strong>
        <span className="booking-per">/night</span>
      </div>

      <div className="booking-date-row">
        <label className="booking-field">
          <span>Check In</span>
          <strong>{formatDisplayDate(checkIn)}</strong>
          <input
            type="date"
            className="input"
            value={checkIn}
            min={toInputDate(today)}
            onChange={(event) => {
              const nextIn = event.target.value;
              setCheckIn(nextIn);
              if (new Date(checkOut) <= new Date(nextIn)) {
                const nextOut = new Date(`${nextIn}T12:00:00`);
                nextOut.setDate(nextOut.getDate() + 1);
                setCheckOut(toInputDate(nextOut));
              }
            }}
          />
        </label>
        <div className="booking-nights-pill">
          <strong>{nights}</strong>
          <span>{nights === 1 ? "night" : "nights"}</span>
        </div>
        <label className="booking-field">
          <span>Check Out</span>
          <strong>{formatDisplayDate(checkOut)}</strong>
          <input
            type="date"
            className="input"
            value={checkOut}
            min={checkIn}
            onChange={(event) => setCheckOut(event.target.value)}
          />
        </label>
      </div>

      <div className="booking-guests">
        <h4>Rooms & Guests</h4>
        {[
          { label: "Rooms", value: rooms, min: 1, max: suite.maxRooms, set: setRooms },
          { label: "Adults", value: adults, min: 1, max: suite.maxGuests, set: setAdults },
          { label: "Children", value: children, min: 0, max: suite.maxGuests, set: setChildren },
        ].map((row) => (
          <div key={row.label} className="booking-stepper">
            <span>{row.label}</span>
            <div className="booking-stepper-controls">
              <button type="button" aria-label={`Decrease ${row.label}`} onClick={() => bump(row.set, row.value, row.min, row.max, -1)}>
                –
              </button>
              <strong>{row.value}</strong>
              <button type="button" aria-label={`Increase ${row.label}`} onClick={() => bump(row.set, row.value, row.min, row.max, 1)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="booking-rate-box">
        <div className="booking-rate-head">
          <div>
            <strong>Standard</strong>
            <ul>
              <li>Minimum 1-night stay</li>
              <li>Non-refundable</li>
              <li>Without Breakfast</li>
            </ul>
          </div>
          <div className="booking-rate-amount">
            <span>Rate details</span>
            <strong>{formatNaira(stayTotal)}</strong>
            <small>
              ({nights} {nights === 1 ? "night" : "nights"}, {rooms} {rooms === 1 ? "room" : "rooms"})
            </small>
          </div>
        </div>
      </div>

      <div className="booking-caution">
        <div>
          <strong>Refundable Caution Fee</strong>
          <p>This fee is fully refundable at checkout if no damage is found in the apartment</p>
        </div>
        <strong>{formatNaira(suite.cautionFee)}</strong>
      </div>

      <div className="booking-total">
        <span>Total due now</span>
        <strong>{formatNaira(grandTotal)}</strong>
      </div>

      <Link href={checkoutHref} className="btn btn-primary booking-cta">
        Book now
      </Link>
    </aside>
  );
}
