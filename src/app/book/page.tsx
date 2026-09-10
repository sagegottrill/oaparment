import { Suspense } from "react";
import BookingPanel from "@/components/booking/BookingPanel";
import { apt } from "@/lib/apartment-images";

export const metadata = {
  title: "Book your stay | The O' Apartments",
  description: "Choose Unit A, Unit B, or both suites, pick dates, and pay securely with Flutterwave.",
};

export default function BookPage() {
  return (
    <main className="book-page">
      <section className="book-hero">
        <div className="container book-wide">
          <p className="eyebrow">The O&apos; Apartments · Ilaro</p>
          <h1>Book a premium stay</h1>
          <p>
            Two fully furnished 3-bedroom ensuite suites. Reserve one unit or both, choose your dates, and checkout with
            Flutterwave in minutes.
          </p>
          <div className="book-hero-strip" aria-hidden="true">
            <div style={{ backgroundImage: `url(${apt.living7})` }} />
            <div style={{ backgroundImage: `url(${apt.bedroom10})` }} />
            <div style={{ backgroundImage: `url(${apt.kitchen2})` }} />
            <div style={{ backgroundImage: `url(${apt.living5})` }} />
          </div>
        </div>
      </section>

      <section className="container book-wide section-pad">
        <Suspense
          fallback={
            <div className="booking-panel">
              <p>Loading booking…</p>
            </div>
          }
        >
          <BookingPanel />
        </Suspense>
      </section>
    </main>
  );
}
