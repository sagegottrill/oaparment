import Link from "next/link";
import { apt } from "@/lib/apartment-images";
import { getBookableSuiteIds } from "@/lib/suite-availability";

export const dynamic = "force-dynamic";

const units = [
  {
    id: "unit-a" as const,
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
    id: "unit-b" as const,
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
];

export default async function OurApartmentsPage() {
  const availability = await getBookableSuiteIds();
  const visibleUnits = units.filter((unit) => availability[unit.id]);
  const bothAvailable = availability["unit-a"] && availability["unit-b"];

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Choose your suite</p>
          <h1>Our Apartments</h1>
          <p>Two premium 3-bedroom ensuite suites — pick Unit A or Unit B, then select your dates.</p>
        </div>
      </section>

      <section className="container book-wide section-pad">
        <div className="flex-col gap-xl" style={{ maxWidth: "980px", margin: "0 auto" }}>
          {visibleUnits.length === 0 ? (
            <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
              <h2 style={{ marginBottom: "0.5rem" }}>No suites available</h2>
              <p style={{ color: "var(--color-text-muted)" }}>Please check back soon or message us on WhatsApp.</p>
            </div>
          ) : (
            visibleUnits.map((unit) => (
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
            ))
          )}

          {bothAvailable ? (
            <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
              <h2 style={{ marginBottom: "0.5rem" }}>Need both suites?</h2>
              <p style={{ marginBottom: "1rem", color: "var(--color-text-muted)" }}>
                Book Unit A and Unit B together for larger groups — up to 12 guests.
              </p>
              <Link href="/book?suite=both" className="btn btn-primary">
                Book both suites
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
