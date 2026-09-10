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
    // Bedroom / sitting room (not water heater)
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

export default function OurApartmentsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Stay with us</p>
          <h1 style={{ margin: 0 }}>Our Apartments</h1>
          <p>Premium short-stay suites in Ilaro — hotel comfort with the privacy of home.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="flex-col gap-xl" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {units.map((unit) => (
            <div key={unit.id} className="card rate-card">
              <div className="rate-card-image" style={{ backgroundImage: `url(${unit.image})` }} />
              <div className="rate-card-body">
                <div>
                  <h2 style={{ fontSize: "clamp(1.2rem, 4vw, 1.5rem)", marginBottom: "var(--spacing-xs)" }}>
                    {unit.title}
                  </h2>
                  <div style={{ marginBottom: "var(--spacing-md)" }}>
                    <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--color-primary)" }}>
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
                <Link href={`/rooms/${unit.id}`} className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                  {unit.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
