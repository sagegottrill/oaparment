import LocationMap from "@/components/LocationMap";

export default function AboutUsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Our story</p>
          <h1>About us</h1>
          <p>Short stays in Ilaro with hotel comfort and the warmth of home.</p>
        </div>
      </section>

      <section className="container" style={{ padding: "var(--spacing-3xl) var(--spacing-md)" }}>
        <div className="grid grid-cols-2 gap-xl items-center">
          <div>
            <span
              style={{
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "var(--color-text-muted)",
              }}
            >
              Who We Are
            </span>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "var(--spacing-md)" }}>Home away from home</h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "var(--spacing-md)" }}>
              At O’Apartments Ilaro, we’re redefining short-term stays for anyone searching for hotels in Ilaro. Our
              stylish, affordable duplex features two separate three-bedroom all-ensuite apartments that feel just like
              home, offering the perfect mix of comfort and class.
            </p>
            <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)" }}>
              Conveniently located in Ogun State and in close proximity to the Dangote Cement Factory, our apartments
              deliver top-notch hospitality, modern amenities, and peaceful spaces designed for rest and convenience.
            </p>

            <div className="flex items-center gap-md" style={{ marginTop: "var(--spacing-lg)" }}>
              <div
                style={{
                  backgroundColor: "var(--color-surface-hover)",
                  padding: "var(--spacing-sm) var(--spacing-md)",
                  borderRadius: "var(--radius-full)",
                }}
              >
                <span style={{ fontWeight: 700, color: "var(--color-primary)", marginRight: "8px" }}>★ 4.9</span>
                <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>Trust Score</span>
              </div>
            </div>
          </div>

          <div
            className="home-media"
            style={{
              borderRadius: "var(--radius-lg)",
              backgroundImage: "url(/apartments/20250712_115703.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </section>

      <section className="section-pad" style={{ backgroundColor: "var(--color-brand-green)" }}>
        <div className="container grid grid-cols-3 gap-lg">
          <div
            className="card account-panel"
            style={{
              textAlign: "center",
              backgroundColor: "var(--color-brand-green-light)",
              borderColor: "var(--color-brand-green-light)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "var(--spacing-md)" }}>🎯</div>
            <h3 style={{ color: "var(--color-primary)", marginBottom: "var(--spacing-sm)" }}>Our mission</h3>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.85)" }}>Shortlet spaces with warm, reliable hospitality.</p>
          </div>
          <div
            className="card account-panel"
            style={{
              textAlign: "center",
              backgroundColor: "var(--color-brand-green-light)",
              borderColor: "var(--color-brand-green-light)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "var(--spacing-md)" }}>👁️</div>
            <h3 style={{ color: "var(--color-primary)", marginBottom: "var(--spacing-sm)" }}>Our vision</h3>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.85)" }}>Turning short stays into lasting, easy memories.</p>
          </div>
          <div
            className="card account-panel"
            style={{
              textAlign: "center",
              backgroundColor: "var(--color-brand-green-light)",
              borderColor: "var(--color-brand-green-light)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "var(--spacing-md)" }}>✨</div>
            <h3 style={{ color: "var(--color-primary)", marginBottom: "var(--spacing-sm)" }}>Our process</h3>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.85)" }}>Simple booking and careful guest care every visit.</p>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "var(--spacing-3xl) var(--spacing-md)" }}>
        <div className="grid grid-cols-2 gap-xl items-center">
          <LocationMap title="The O' Apartments on Google Maps" />

          <div>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "var(--spacing-md)" }}>In the Heart of Ilaro, Ogun state</h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "var(--spacing-md)" }}>
              Centrally located in Ilaro, Ogun State, just a few minutes from Dangote Cement, shopping centres, banks,
              eateries, and major roads.
            </p>
            <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", marginBottom: "var(--spacing-xl)" }}>
              Whether you are visiting, attending an event, or exploring the area, everything you need is close by. If
              you are searching for the best hotel in Ilaro, our short-stay apartments offer the perfect mix of comfort,
              convenience, and easy access to key destinations.
            </p>

            <div
              className="card"
              style={{ backgroundColor: "var(--color-surface-alt)", padding: "var(--spacing-lg)", border: "none" }}
            >
              <p style={{ fontWeight: 600, margin: "0 0 var(--spacing-xs) 0" }}>Contact us for bookings</p>
              <p style={{ margin: "0 0 var(--spacing-sm) 0" }}>
                3 Tunji Otegbeye Street, Ona Egbo, Ilaro, Ogun State
              </p>
              <a
                href="https://wa.link/ubsow7"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--color-brand-green)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}
              >
                <span style={{ color: "#25D366", fontSize: "1.5rem" }}>💬</span> +2348075963676 | +2347060922880
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
