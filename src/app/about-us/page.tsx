import Link from "next/link";
import LocationMap from "@/components/LocationMap";
import { BOOK_NOW_HREF } from "@/lib/booking";

export default function AboutUsPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Our story</p>
          <h1>About us</h1>
          <p>Short stays in Ilaro with hotel comfort and the warmth of home.</p>
        </div>
      </section>

      <section className="container book-wide section-pad">
        <div className="grid grid-cols-2 gap-xl items-center">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 style={{ fontSize: "clamp(1.85rem, 4vw, 2.5rem)", marginBottom: "var(--spacing-md)" }}>
              Home away from home
            </h2>
            <p style={{ fontSize: "1.08rem", marginBottom: "var(--spacing-md)" }}>
              At O’Apartments Ilaro, we’re redefining short-term stays for anyone searching for hotels in Ilaro. Our
              stylish, affordable duplex features two separate three-bedroom all-ensuite apartments that feel just like
              home, offering the perfect mix of comfort and class.
            </p>
            <p style={{ fontSize: "1.08rem", color: "var(--color-text-muted)" }}>
              Conveniently located in Ogun State and in close proximity to the Dangote Cement Factory, our apartments
              deliver top-notch hospitality, modern amenities, and peaceful spaces designed for rest and convenience.
            </p>

            <div className="flex items-center gap-md" style={{ marginTop: "var(--spacing-lg)", flexWrap: "wrap" }}>
              <div className="trust-pill">
                <span className="trust-pill-score">★ 4.9</span>
                <span>Trust Score</span>
              </div>
              <Link href={BOOK_NOW_HREF} className="btn btn-primary">
                Book Now
              </Link>
            </div>
          </div>

          <div
            className="home-media"
            style={{
              backgroundImage: "url(/apartments/20250712_115703.jpg)",
            }}
          />
        </div>
      </section>

      <section className="section-pad" style={{ backgroundColor: "var(--color-brand-green)" }}>
        <div className="container book-wide grid grid-cols-3 gap-lg">
          {[
            { icon: "🎯", title: "Our mission", copy: "Shortlet spaces with warm, reliable hospitality." },
            { icon: "👁️", title: "Our vision", copy: "Turning short stays into lasting, easy memories." },
            { icon: "✨", title: "Our process", copy: "Simple booking and careful guest care every visit." },
          ].map((item) => (
            <div
              key={item.title}
              className="card account-panel"
              style={{
                textAlign: "center",
                backgroundColor: "var(--color-brand-green-light)",
                borderColor: "var(--color-brand-green-light)",
              }}
            >
              <div style={{ fontSize: "2.25rem", marginBottom: "var(--spacing-md)" }} aria-hidden>
                {item.icon}
              </div>
              <h3 style={{ color: "var(--color-primary)", marginBottom: "var(--spacing-sm)" }}>{item.title}</h3>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.85)" }}>{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container book-wide section-pad">
        <div className="grid grid-cols-2 gap-xl items-center">
          <LocationMap title="The O' Apartments on Google Maps" />

          <div>
            <h2 style={{ fontSize: "clamp(1.85rem, 4vw, 2.5rem)", marginBottom: "var(--spacing-md)" }}>
              In the heart of Ilaro, Ogun State
            </h2>
            <p style={{ fontSize: "1.08rem", marginBottom: "var(--spacing-md)" }}>
              Centrally located in Ilaro, Ogun State, just a few minutes from Dangote Cement, shopping centres, banks,
              eateries, and major roads.
            </p>
            <p style={{ fontSize: "1.08rem", color: "var(--color-text-muted)", marginBottom: "var(--spacing-xl)" }}>
              Whether you are visiting, attending an event, or exploring the area, everything you need is close by. If
              you are searching for the best hotel in Ilaro, our short-stay apartments offer the perfect mix of comfort,
              convenience, and easy access to key destinations.
            </p>

            <div className="card about-contact-card">
              <p style={{ fontWeight: 600, margin: "0 0 var(--spacing-xs) 0" }}>Contact us for bookings</p>
              <p style={{ margin: "0 0 var(--spacing-sm) 0" }}>
                3 Tunji Otegbeye Street, Ona Egbo, Ilaro, Ogun State
              </p>
              <a
                href="https://wa.link/ubsow7"
                target="_blank"
                rel="noopener noreferrer"
                className="about-whatsapp"
              >
                <span aria-hidden>💬</span> +2348075963676 | +2347060922880
              </a>
              <div style={{ marginTop: "1rem" }}>
                <Link href={BOOK_NOW_HREF} className="btn btn-primary">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
