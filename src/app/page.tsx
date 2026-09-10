import Image from "next/image";
import Link from "next/link";
import { apt } from "@/lib/apartment-images";

export default function Home() {
  return (
    <main>
      <section
        className="home-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(10, 54, 34, 0.92) 0%, rgba(10, 54, 34, 0.72) 48%, rgba(10, 54, 34, 0.35) 100%), url(${apt.exterior1})`,
        }}
      >
        <div className="container">
          <div className="home-hero-copy">
            <Image
              src="/logo.jpeg"
              alt="The O' Apartments"
              width={320}
              height={84}
              className="hero-logo"
              priority
            />
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.08, marginBottom: "var(--spacing-md)", color: "var(--color-text-light)" }}>
              Enjoy a taste of <span style={{ color: "var(--color-primary)" }}>luxury</span> in <span style={{ color: "var(--color-primary)" }}>Ilaro</span>
            </h1>
            <p style={{ fontSize: "1.08rem", marginBottom: "var(--spacing-xl)", color: "rgba(255,255,255,0.88)" }}>
              Beautifully curated short-stay apartments with hotel-grade comfort, soft lighting, and the privacy of a real home — minutes from Dangote Cement and the heart of Ilaro.
            </p>

            <div
              style={{
                borderLeft: "4px solid var(--color-primary)",
                backgroundColor: "rgba(0,0,0,0.28)",
                padding: "var(--spacing-md) var(--spacing-lg)",
                display: "inline-block",
                marginBottom: "var(--spacing-xl)",
                borderRadius: "0 var(--radius-md) var(--radius-md) 0",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  display: "block",
                  marginBottom: "4px",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Premium suites from
              </span>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-text-light)" }}>
                ₦150,000 <span style={{ fontSize: "1rem", color: "var(--color-primary)", fontWeight: 400 }}>/ night</span>
              </div>
            </div>

            <div className="flex gap-md" style={{ flexWrap: "wrap" }}>
              <Link href="/rooms/unit-a" className="btn btn-primary">
                Book now
              </Link>
              <Link href="/our-apartments" className="btn" style={{ backgroundColor: "transparent", border: "1px solid var(--color-primary)", color: "var(--color-primary)" }}>
                Explore apartments
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--color-surface)", padding: "var(--spacing-3xl) 0" }}>
        <div className="container grid grid-cols-2 gap-xl items-center">
          <div
            className="home-media"
            style={{
              backgroundImage: `url(${apt.living3})`,
            }}
          />

          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2 style={{ fontSize: "2.6rem", color: "var(--color-brand-green)", marginBottom: "var(--spacing-md)" }}>
              Book a stay that feels easy
            </h2>
            <p>
              Fully furnished ensuite apartments for travelers, professionals, and local guests who want hotel comfort with home privacy. Flexible booking, quiet rooms, and everything you need already in place.
            </p>

            <div className="grid grid-cols-2 gap-sm" style={{ margin: "var(--spacing-xl) 0" }}>
              {[
                ["❄️", "Air conditioned"],
                ["⚡", "24/7 solar power"],
                ["🛡️", "CCTV security"],
                ["📶", "Fast free Wi‑Fi"],
                ["🍳", "Fitted kitchen"],
                ["🚗", "Spacious parking"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  style={{
                    backgroundColor: "var(--color-surface-alt)",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                  }}
                >
                  <span>{icon}</span> {label}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-md">
              <span style={{ fontSize: "2.6rem", fontWeight: 700, color: "var(--color-text)", lineHeight: 1 }}>4.9</span>
              <div>
                <div style={{ color: "var(--color-primary-dark)", fontSize: "1.1rem" }}>★★★★★</div>
                <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Guest trust score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ backgroundColor: "var(--color-brand-green)" }}>
        <div className="container">
          <div className="flex justify-between items-center" style={{ marginBottom: "var(--spacing-2xl)", gap: "var(--spacing-lg)", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", maxWidth: "560px", margin: 0, color: "var(--color-text-light)" }}>
              Where <span style={{ color: "var(--color-primary)" }}>comfort</span> meets <span style={{ color: "var(--color-primary)" }}>modern design</span>
            </h2>
            <Link href="/gallery" className="btn btn-primary">
              View gallery
            </Link>
          </div>

          <div className="card split-feature" style={{ backgroundColor: "var(--color-brand-green-light)", borderColor: "var(--color-brand-green-light)" }}>
            <div
              className="feature-photo"
              style={{
                backgroundImage: `url(${apt.living5})`,
              }}
            />
            <div className="feature-copy">
              <h3 style={{ color: "var(--color-text-light)" }}>Serene living area</h3>
              <p style={{ color: "rgba(255,255,255,0.85)" }}>
                Soft seating, elegant finishes, and open-plan dining make every evening feel unhurried. Smart TV, ambient lighting, and a calm layout for rest and work.
              </p>
              <ul className="soft-list" style={{ color: "rgba(255,255,255,0.85)" }}>
                <li>📺 Smart TV</li>
                <li>💡 Ambient lighting</li>
                <li>🍽️ Open-plan dining</li>
              </ul>
            </div>
          </div>

          <div className="card split-feature" style={{ backgroundColor: "var(--color-brand-green)", borderColor: "var(--color-brand-green)" }}>
            <div className="feature-copy">
              <h3 style={{ color: "var(--color-text-light)" }}>Private ensuite retreat</h3>
              <p style={{ color: "rgba(255,255,255,0.85)" }}>
                A plush bed, wardrobe space, cooling air conditioning, and a neat bathroom just steps away — your personal sanctuary for a five-star night&apos;s sleep.
              </p>
              <ul className="soft-list" style={{ color: "rgba(255,255,255,0.85)" }}>
                <li>🛏️ Comfortable bed setup</li>
                <li>❄️ Air conditioning</li>
                <li>🚿 Private bathroom</li>
              </ul>
            </div>
            <div
              className="feature-photo"
              style={{
                backgroundImage: `url(${apt.bedroom10})`,
              }}
            />
          </div>

          <div className="card split-feature" style={{ backgroundColor: "var(--color-brand-green-light)", borderColor: "var(--color-brand-green-light)" }}>
            <div
              className="feature-photo"
              style={{
                backgroundImage: `url(${apt.parking1})`,
              }}
            />
            <div className="feature-copy">
              <h3 style={{ color: "var(--color-text-light)" }}>Stress-free parking</h3>
              <p style={{ color: "rgba(255,255,255,0.85)" }}>Secure on-site parking with room for your vehicle. Safe, accessible, and easy when you arrive late.</p>
              <ul className="soft-list" style={{ color: "rgba(255,255,255,0.85)" }}>
                <li>🅿️ Spacious layout</li>
                <li>🔒 Secured compound</li>
                <li>🧱 Concrete flooring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--color-surface)", padding: "var(--spacing-3xl) 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "var(--spacing-2xl)" }}>
            <p className="eyebrow">Comforts included</p>
            <h2>
              Our <span style={{ color: "var(--color-primary-dark)" }}>facilities</span>
            </h2>
            <p>Modern comforts designed to make your stay feel effortless.</p>
          </div>

          <div className="grid grid-cols-2 gap-lg">
            {[
              {
                title: "Fully furnished rooms",
                copy: "2–3 bedroom apartments with everything ready for a seamless stay.",
                image: apt.bedroom1,
              },
              {
                title: "Cozy lighting",
                copy: "Soft chandelier light that wraps every corner in warmth.",
                image: apt.lighting,
              },
              {
                title: "Fitted kitchen",
                copy: "Cook with ease in a fully equipped modern kitchen.",
                image: apt.kitchen1,
              },
              {
                title: "En-suite bathrooms",
                copy: "Reliable hot water and rainfall showers for comfort anytime.",
                image: apt.bathroom1,
              },
            ].map((item) => (
              <div key={item.title} className="card" style={{ padding: "var(--spacing-lg)" }}>
                <h3 style={{ marginBottom: "var(--spacing-md)" }}>{item.title}</h3>
                <div
                  style={{
                    height: "200px",
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "var(--spacing-md)",
                  }}
                />
                <p style={{ margin: 0, color: "var(--color-text)" }}>{item.copy}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center" style={{ marginTop: "var(--spacing-2xl)" }}>
            <Link href="/amenities" className="btn btn-primary">
              Our amenities
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ backgroundColor: "var(--color-primary-light)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "var(--spacing-2xl)" }}>
            <p className="eyebrow">Guest stories</p>
            <h2 style={{ margin: 0 }}>What guests say</h2>
            <p>Clean rooms, warm hosts, and stays that feel like home.</p>
          </div>

          <div className="grid grid-cols-2 gap-lg">
            <div className="card" style={{ padding: "var(--spacing-xl)" }}>
              <p>
                “The place was super clean, cozy, and exactly like the pictures. Wi‑Fi and air conditioning worked perfectly. I’d definitely come back.”
              </p>
              <div style={{ color: "var(--color-primary-dark)", marginBottom: "var(--spacing-sm)" }}>★★★★★</div>
              <h4 style={{ margin: 0 }}>Chinedu Okafor</h4>
            </div>
            <div className="card" style={{ padding: "var(--spacing-xl)" }}>
              <p>
                “Bright, comfortable, and thoughtfully set up. It felt like home, and the location made everything easy during my short visit.”
              </p>
              <div style={{ color: "var(--color-primary-dark)", marginBottom: "var(--spacing-sm)" }}>★★★★★</div>
              <h4 style={{ margin: 0 }}>Aisha Bello</h4>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
