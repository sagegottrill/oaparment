import Link from "next/link";
import { apt } from "@/lib/apartment-images";

const units = [
  {
    id: "unit-a",
    title: "Unit A – 3 Bedroom Premium Suite",
    price: "₦150,000",
    guests: "Up to 6 Guests",
    features: [
      "Fully Fitted Kitchen",
      "Private En-Suite Bathrooms",
      "Heating & Air Conditioning",
      "24/7 Solar Power & Security",
    ],
    image: apt.living7,
    cta: "Book Unit A",
  },
  {
    id: "unit-b",
    title: "Unit B – 3 Bedroom Premium Suite",
    price: "₦150,000",
    guests: "Up to 6 Guests",
    features: [
      "Fully Fitted Kitchen",
      "Private En-Suite Bathrooms",
      "Heating & Air Conditioning",
      "24/7 Solar Power & Security",
    ],
    image: apt.bedroom10,
    cta: "Book Unit B",
  },
] as const;

export default function RatesPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Transparent pricing</p>
          <h1>Rates</h1>
          <p>Clear nightly rates for both premium suites — no surprises, just comfort.</p>
        </div>
      </section>

      <section className="container book-wide section-pad">
        <div className="flex-col gap-xl" style={{ maxWidth: "980px", margin: "0 auto" }}>
          {units.map((unit) => (
            <div key={unit.id} className="card rate-card">
              <div className="rate-card-image" style={{ backgroundImage: `url(${unit.image})` }} />
              <div className="rate-card-body">
                <div>
                  <h2 style={{ fontSize: "clamp(1.25rem, 4vw, 1.65rem)", marginBottom: "var(--spacing-xs)" }}>
                    {unit.title}
                  </h2>
                  <div style={{ marginBottom: "var(--spacing-md)" }}>
                    <span style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--color-primary)" }}>
                      {unit.price}
                    </span>
                    <span
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "0.9rem",
                        display: "inline-block",
                        marginLeft: "8px",
                      }}
                    >
                      Per Night / {unit.guests}
                    </span>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, marginBottom: "var(--spacing-lg)" }}>
                    {unit.features.map((feature) => (
                      <li
                        key={feature}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px",
                          fontSize: "0.95rem",
                        }}
                      >
                        <span style={{ color: "var(--color-brand-green)" }}>✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
                  <Link href={`/rooms/${unit.id}`} className="btn btn-outline">
                    View details
                  </Link>
                  <Link href={`/book?suite=${unit.id}`} className="btn btn-primary">
                    {unit.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
            <h2 style={{ marginBottom: "0.5rem" }}>Ready to reserve?</h2>
            <p style={{ marginBottom: "1rem", color: "var(--color-text-muted)" }}>
              Pick your suite and dates in a few taps — daily and weekly stays welcome.
            </p>
            <Link href="/book" className="btn btn-primary">
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
