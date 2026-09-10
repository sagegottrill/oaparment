"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import BookingPanel from "@/components/booking/BookingPanel";
import SuiteTabs from "@/components/booking/SuiteTabs";
import { formatNaira, suites, type SuiteProduct } from "@/lib/suites";

export default function SuiteProductView({ suite }: { suite: SuiteProduct }) {
  const [activeImage, setActiveImage] = useState(suite.images[0] ?? "");
  const [showMobileBook, setShowMobileBook] = useState(false);
  const thumbs = suite.images.slice(0, 6);

  useEffect(() => {
    setActiveImage(suite.images[0] ?? "");
  }, [suite.id, suite.images]);

  return (
    <main className="suite-page">
      <section className="suite-hero-band">
        <div className="container book-wide">
          <p className="suite-breadcrumb">
            <Link href="/">Home</Link>
            <span> / </span>
            <Link href="/our-apartments">Apartments</Link>
            <span> / </span>
            <span>{suite.id === "unit-a" ? "Unit A" : "Unit B"}</span>
          </p>

          <div className="suite-switcher" role="tablist" aria-label="Choose suite">
            {suites.map((item) => (
              <Link
                key={item.id}
                href={`/rooms/${item.id}`}
                className={item.id === suite.id ? "suite-switch active" : "suite-switch"}
              >
                {item.id === "unit-a" ? "Unit A" : "Unit B"}
              </Link>
            ))}
          </div>

          <div className="suite-hero-copy">
            <div>
              <h1 className="suite-title">{suite.title}</h1>
              <p className="suite-price-intro">
                From <strong>{formatNaira(suite.pricePerNight)}</strong> / night · Up to {suite.maxGuests} guests
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary suite-mobile-book-btn"
              onClick={() => setShowMobileBook(true)}
            >
              Book this suite
            </button>
          </div>
        </div>
      </section>

      <section className="container book-wide suite-layout">
        <div className="suite-main">
          <div className="suite-gallery">
            <div
              className="suite-gallery-main"
              style={{ backgroundImage: `url(${activeImage})` }}
              role="img"
              aria-label={suite.title}
            />
            <div className="suite-gallery-thumbs">
              {thumbs.map((image) => (
                <button
                  key={image}
                  type="button"
                  className={image === activeImage ? "suite-thumb active" : "suite-thumb"}
                  style={{ backgroundImage: `url(${image})` }}
                  aria-label="View suite photo"
                  onClick={() => setActiveImage(image)}
                />
              ))}
            </div>
          </div>

          <SuiteTabs suite={suite} />
        </div>

        <aside className="suite-booking-rail">
          <Suspense
            fallback={
              <div className="booking-panel is-embedded">
                <p>Loading booking…</p>
              </div>
            }
          >
            <BookingPanel initialSuite={suite} embedded />
          </Suspense>
        </aside>
      </section>

      {showMobileBook ? (
        <div className="suite-mobile-sheet" role="dialog" aria-modal="true" aria-label="Book suite">
          <div className="suite-mobile-sheet-backdrop" onClick={() => setShowMobileBook(false)} />
          <div className="suite-mobile-sheet-panel">
            <div className="suite-mobile-sheet-head">
              <h2>Book {suite.id === "unit-a" ? "Unit A" : "Unit B"}</h2>
              <button type="button" className="btn btn-outline btn-compact" onClick={() => setShowMobileBook(false)}>
                Close
              </button>
            </div>
            <Suspense fallback={<p>Loading booking…</p>}>
              <BookingPanel initialSuite={suite} embedded />
            </Suspense>
          </div>
        </div>
      ) : null}

      <div className="suite-mobile-bar">
        <div>
          <strong>{formatNaira(suite.pricePerNight)}</strong>
          <span>/ night</span>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setShowMobileBook(true)}>
          Select dates
        </button>
      </div>
    </main>
  );
}
