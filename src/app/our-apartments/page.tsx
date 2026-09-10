import Link from "next/link";

export default function OurApartmentsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1 style={{ margin: 0 }}>Our Apartments</h1>
        </div>
      </section>

      <section className="container section-pad">
        <div className="card rate-card" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            className="rate-card-image"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)",
            }}
          />
          <div className="rate-card-body">
            <h2 style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", marginBottom: "var(--spacing-sm)" }}>3 Bedroom Premium Suite</h2>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: "var(--spacing-xl)" }}>
              ₦150,000 <span style={{ fontSize: "1rem", color: "var(--color-text-muted)", fontWeight: 400 }}>/ night</span>
            </div>
            <Link href="/rooms/unit-a" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
