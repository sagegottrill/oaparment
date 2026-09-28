import Link from "next/link";
import HomeHeroCarousel from "@/components/home/HomeHeroCarousel";
import { apt } from "@/lib/apartment-images";
import { BOOK_NOW_HREF } from "@/lib/booking";

const heroImages = [
  apt.exterior1,
  apt.living7,
  apt.bedroom10,
  apt.kitchen2,
  apt.parking1,
  apt.living5,
];

const features = [
  ["❄️", "Air Conditioned"],
  ["⚡", "24/7 Solar Power"],
  ["🛡️", "CCTV Security"],
  ["📶", "Fast, Free Wi-Fi"],
  ["🍳", "Fully Fitted Kitchen"],
  ["🌡️", "Heating & Climate Control"],
  ["📺", "Entertainment System"],
  ["🚗", "Spacious Car Park"],
] as const;

const testimonials = [
  {
    name: "Tunde Adeyemi",
    quote:
      "My stay at O’Apartment was perfect. The room felt fresh and welcoming, and the décor was beautiful. I loved how quiet the place was, and the bed was really comfortable. Everything I needed was right there, and checking in was super easy and smooth.",
  },
  {
    name: "Grace O.",
    quote:
      "I booked this shortlet during my trip, and honestly, it felt like a home away from home. The place was spotless, and way better than I expected for the price. The host was super friendly and responsive too. I’ll definitely stay here again whenever I’m back! totally worth it",
  },
  {
    name: "Chinedu Okafor",
    quote:
      "I had an amazing stay at O’Apartment. The place was super clean, cozy, and exactly like the pictures. The host was friendly and always available. Everything worked perfectly, from the Wi-Fi to the air conditioning. I’d definitely come back again and recommend it to friends.",
  },
  {
    name: "Aisha Bello",
    quote:
      "I absolutely loved my time at O’Apartment. The apartment was bright, clean, and very comfortable. I appreciated the fast Wi-Fi and the thoughtful setup. It honestly felt like home. The location was also great, close to everything I needed during my short visit.",
  },
  {
    name: "Opeyemi Agbebi",
    quote:
      "I visited Ilaro for a business trip and stayed at O’Apartment for three nights. I came across the apartment through their social media and decided to give it a try, and honestly, it exceeded my expectations. The environment was very peaceful and comfortable, and it genuinely felt like a home away from home. I particularly appreciated the 24/7 power supply, the cleanliness of the apartment, and how close it is to Federal Polytechnic, Ilaro. The cleaning service was also impressive and consistent throughout my stay. Everything was well organised, and I had a really comfortable experience. I would definitely consider staying here again whenever I’m in Ilaro.",
  },
  {
    name: "Anthony Okpala",
    quote:
      "I had a very comfortable stay at O’Apartment. One thing I really appreciated was the attention given to security. The apartment felt safe and secure throughout my stay, and the existing security measures gave me peace of mind. I would only suggest adding physical security personnel to the existing security arrangements, as I believe this would provide an additional level of comfort for guests, especially those staying for several days or arriving late. Beyond that, the apartment was clean, peaceful and well maintained. The staff were also helpful, and I had a pleasant experience overall. I would definitely consider staying here again.",
  },
  {
    name: "Otaigbe Imadegbelo",
    quote:
      "My stay at O’Apartment was a really good experience. What I enjoyed most was that the apartment actually had the feel of a proper home rather than just a place to sleep. The sitting room was comfortable, and the kitchen had the basic utensils and facilities I needed during my stay. The apartment was neat and well arranged, and having a reliable power supply made everything even more convenient. I also liked the quiet environment, especially after a busy day. It was easy to settle in and feel comfortable. I had a good stay and would gladly recommend O’Apartment to anyone visiting Ilaro.",
  },
  {
    name: "Temidayo Adegoroye",
    quote:
      "I really enjoyed my stay at O’Apartment. The apartment was clean, comfortable and well organised, and I particularly appreciated having Wi-Fi available during my stay. It made it easy for me to stay connected and attend to some of my work while I was there. The sitting area was also comfortable, and the overall environment was peaceful. The location is convenient, especially for anyone who needs to be around Federal Polytechnic, Ilaro. The cleaning service was also good, and everything was kept in good condition. It was a pleasant stay, and I would definitely come back.",
  },
  {
    name: "Oluwasonmi Ogbonnaiye",
    quote:
      "I had a very pleasant experience staying at O’Apartment. The apartment was spacious, neat and comfortable, and I liked how everything was arranged to make the stay convenient. The bedroom was comfortable, the sitting room was a nice place to relax, and the apartment generally had a warm and homely feel. The environment was also quiet, which I really appreciated. The cleaning was well done, and the 24/7 electricity was another advantage. I also found the location convenient for getting around Ilaro. Overall, I enjoyed my stay and would recommend O’Apartment to anyone looking for a comfortable short-term stay.",
  },
] as const;

export default function Home() {
  return (
    <main>
      <HomeHeroCarousel images={heroImages}>
        <div className="home-hero-copy">
          <p
            style={{
              fontSize: "clamp(1.35rem, 3vw, 1.85rem)",
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "var(--color-primary)",
              marginBottom: "var(--spacing-sm)",
            }}
          >
            The O&apos;apartments
          </p>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 1.08,
              marginBottom: "var(--spacing-md)",
              color: "var(--color-text-light)",
            }}
          >
            Enjoy a Taste of Luxury in Ilaro
          </h1>
          <p style={{ fontSize: "1.08rem", marginBottom: "var(--spacing-xl)", color: "rgba(255,255,255,0.88)" }}>
            Welcome to The O’ Apartments, where luxury meets effortless comfort. Designed for travelers who value style
            and convenience, our beautifully curated spaces combine hotel-grade sophistication with the warmth and
            privacy of home.
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
              Premium Suites From
            </span>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-text-light)" }}>
              ₦150,000 <span style={{ fontSize: "1rem", color: "var(--color-primary)", fontWeight: 400 }}>/ night</span>
            </div>
          </div>

          <div className="flex gap-md" style={{ flexWrap: "wrap" }}>
            <Link href={BOOK_NOW_HREF} className="btn btn-primary">
              Book Now
            </Link>
          </div>
        </div>
      </HomeHeroCarousel>

      <section className="section-pad" style={{ backgroundColor: "var(--color-surface)" }}>
        <div className="container book-wide grid grid-cols-2 gap-xl items-center">
          <div
            className="home-media"
            style={{
              backgroundImage: `url(${apt.living3})`,
            }}
          />

          <div>
            <p className="eyebrow">Features</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", color: "var(--color-brand-green)", marginBottom: "var(--spacing-md)" }}>
              Ready to book your stay?
            </h2>
            <p style={{ lineHeight: 1.7, maxWidth: "38rem" }}>
              Looking for hotels in Ilaro? Discover your perfect short-stay apartment in Ilaro, Ogun State. Our fully
              furnished, private ensuite apartments are designed for travelers, professionals, and local guests who want
              the luxury of a hotel in Ilaro and the comfort of home — all in one place. Located in the heart of Ogun
              State, just minutes away from key routes, top attractions, and the Dangote Cement Factory. Experience
              affordable luxury with flexible booking options and exceptional comfort that feels just like home.
            </p>

            <div className="home-feature-chips">
              {features.map(([icon, label]) => (
                <div key={label} className="home-feature-chip">
                  <span aria-hidden>{icon}</span> {label}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-md" style={{ marginTop: "var(--spacing-lg)" }}>
              <span style={{ fontSize: "2.6rem", fontWeight: 700, color: "var(--color-text)", lineHeight: 1 }}>4.9</span>
              <div>
                <div style={{ color: "var(--color-primary-dark)", fontSize: "1.1rem" }}>★★★★★</div>
                <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Trust Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ backgroundColor: "var(--color-brand-green)" }}>
        <div className="container book-wide">
          <div
            className="flex justify-between items-center"
            style={{ marginBottom: "clamp(1.75rem, 4vw, 2.75rem)", gap: "var(--spacing-lg)", flexWrap: "wrap" }}
          >
            <div>
              <p className="eyebrow" style={{ color: "var(--color-primary)" }}>
                The O&apos;apartment
              </p>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  maxWidth: "640px",
                  margin: 0,
                  color: "var(--color-text-light)",
                }}
              >
                See where comfort meets modern design!
              </h2>
            </div>
            <Link href="/gallery" className="btn btn-primary">
              View our gallery
            </Link>
          </div>

          <div
            className="card split-feature"
            style={{ backgroundColor: "var(--color-brand-green-light)", borderColor: "var(--color-brand-green-light)" }}
          >
            <div
              className="feature-photo"
              style={{
                backgroundImage: `url(${apt.living5})`,
              }}
            />
            <div className="feature-copy">
              <h3 style={{ color: "var(--color-text-light)" }}>Serene Living Area</h3>
              <p style={{ color: "rgba(255,255,255,0.85)" }}>
                A fully furnished living area designed for relaxation and style. Features a Smart TV, ambient lighting,
                and an off-plan dining area.
              </p>
              <p style={{ color: "rgba(255,255,255,0.85)" }}>
                Step into a fully furnished living area designed for both relaxation and style. Every detail has been
                intentionally curated, from the cozy seating and elegant finishes to ensure your comfort takes center
                stage. Each room features a plush, well-dressed bed, ambient lighting, and cooling air conditioning to
                ensure uninterrupted rest.
              </p>
              <ul className="soft-list" style={{ color: "rgba(255,255,255,0.85)" }}>
                <li>Smart TV</li>
                <li>Ambient lighting</li>
                <li>Open-plan dining area</li>
              </ul>
              <Link href="/gallery" className="btn btn-primary" style={{ marginTop: "var(--spacing-md)" }}>
                View Living Space
              </Link>
            </div>
          </div>

          <div
            className="card split-feature"
            style={{ backgroundColor: "var(--color-brand-green)", borderColor: "var(--color-brand-green)" }}
          >
            <div className="feature-copy">
              <h3 style={{ color: "var(--color-text-light)" }}>Private En-Suite Retreat</h3>
              <p style={{ color: "rgba(255,255,255,0.85)" }}>
                With spacious wardrobes, clean, modern finishes, and a neatly fitted bathroom just steps away,
                convenience is built into every corner. It&apos;s your personal sanctuary designed to make every night
                feel like a five-star stay.
              </p>
              <p style={{ color: "rgba(255,255,255,0.85)" }}>
                Spacious wardrobes, modern finishes, and a neatly fitted bathroom designed for your comfort.
              </p>
              <ul className="soft-list" style={{ color: "rgba(255,255,255,0.85)" }}>
                <li>Comfy Bed Setup</li>
                <li>Fan</li>
                <li>Wardrobe</li>
                <li>A/C</li>
                <li>Toilet</li>
                <li>Bathroom</li>
              </ul>
              <Link href={BOOK_NOW_HREF} className="btn btn-primary" style={{ marginTop: "var(--spacing-md)" }}>
                Book This Room
              </Link>
            </div>
            <div
              className="feature-photo"
              style={{
                backgroundImage: `url(${apt.bedroom10})`,
              }}
            />
          </div>

          <div
            className="card split-feature"
            style={{ backgroundColor: "var(--color-brand-green-light)", borderColor: "var(--color-brand-green-light)" }}
          >
            <div
              className="feature-photo"
              style={{
                backgroundImage: `url(${apt.parking1})`,
              }}
            />
            <div className="feature-copy">
              <h3 style={{ color: "var(--color-text-light)" }}>Stress-Free Parking</h3>
              <p style={{ color: "rgba(255,255,255,0.85)" }}>
                Secure on-site parking with plenty of room for your vehicle. Safe, accessible, with a spacious layout
                and concrete floor.
              </p>
              <p style={{ color: "rgba(255,255,255,0.85)" }}>
                Spacious parking space — secure on-site parking with plenty of room for your vehicle. Safe, accessible,
                and stress-free.
              </p>
              <ul className="soft-list" style={{ color: "rgba(255,255,255,0.85)" }}>
                <li>Spacious layout</li>
                <li>Secured</li>
                <li>Concrete floor</li>
              </ul>
              <Link href="/amenities" className="btn btn-primary" style={{ marginTop: "var(--spacing-md)" }}>
                View Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ backgroundColor: "var(--color-surface)" }}>
        <div className="container book-wide">
          <div style={{ textAlign: "center", marginBottom: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            <p className="eyebrow">O&apos;apartment</p>
            <h2>
              Our <span style={{ color: "var(--color-primary-dark)" }}>facilities</span>
            </h2>
            <p>Indulge in modern comforts designed to elevate your stay.</p>
          </div>

          <div className="grid grid-cols-2 gap-xl">
            {[
              {
                title: "Fully furnished rooms",
                copy:
                  "Our fully functional 2-3 bedroom apartments blend style and practicality, offering everything you need for a seamless stay.",
                image: apt.bedroom1,
              },
              {
                title: "Cozy Lighting",
                copy:
                  "Soft light from our chandelier spreads across the room, wrapping every corner in warmth and quiet beauty.",
                image: apt.lighting,
              },
              {
                title: "Smart Tv",
                copy:
                  "Experience convenience with our Smart TV, designed for streaming, relaxation, and pure enjoyment anytime.",
                image: apt.living5,
              },
              {
                title: "Water heater",
                copy:
                  "Enjoy uninterrupted warmth with our efficient water heater, ensuring hot showers and comfort anytime you need.",
                image: apt.bathroom1,
              },
            ].map((item) => (
              <div key={item.title} className="card home-facility-card">
                <h3>{item.title}</h3>
                <div className="home-facility-image" style={{ backgroundImage: `url(${item.image})` }} />
                <p>{item.copy}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center" style={{ marginTop: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            <Link href="/amenities" className="btn btn-primary">
              Our amenities
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ backgroundColor: "var(--color-primary-light)" }}>
        <div className="container book-wide">
          <div style={{ textAlign: "center", marginBottom: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            <p className="eyebrow">Client Testimonials</p>
            <h2 style={{ margin: 0 }}>Our Customers Feedback</h2>
            <p>Our guests checked in, checked out, and had plenty to say.</p>
          </div>

          <div className="grid grid-cols-2 gap-xl">
            {testimonials.map((item) => (
              <div key={item.name} className="card home-testimonial-card">
                <p>“{item.quote}”</p>
                <div style={{ color: "var(--color-primary-dark)", marginBottom: "var(--spacing-sm)" }}>★★★★★</div>
                <h4 style={{ margin: 0 }}>{item.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
