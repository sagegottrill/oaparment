import Link from "next/link";
import { BOOK_NOW_HREF } from "@/lib/booking";

const amenities = [
  {
    title: "Security",
    description:
      "Our properties are equipped with secure access, CCTV coverage, and on-site guards to give you complete peace of mind during your stay.",
    icon: "🛡️",
  },
  {
    title: "Fully equipped kitchen",
    description:
      "Every apartment comes with modern kitchenware, so you can prepare your favorite meals just the way you like them.",
    icon: "🍳",
  },
  {
    title: "Wifi",
    description:
      "Stay connected wherever you are. Whether you’re working remotely or streaming your favorite shows, our fast and stable internet keeps you online without interruption.",
    icon: "📶",
  },
  {
    title: "Entertainment",
    description:
      "Control lighting, air conditioning, and entertainment with ease through our smart home systems designed for convenience.",
    icon: "📺",
  },
  {
    title: "Customer support",
    description:
      "Whether you need assistance checking in or have a late-night question, our support team is available around the clock to make your stay smooth and stress-free.",
    icon: "💬",
  },
  {
    title: "House keeping on request",
    description:
      "Housekeeping available on request to keep your stay fresh, clean, and comfortable whenever you need it.",
    icon: "🧹",
  },
  {
    title: "Peaceful, noise-free environment",
    description:
      "Enjoy a calm, noise-free environment designed to help you relax, unwind, and feel completely at peace.",
    icon: "🤫",
  },
  {
    title: "Private Bathrooms",
    description:
      "Each room comes with a private ensuite bathroom, giving you complete comfort, privacy, and convenience every stay.",
    icon: "🚿",
  },
  {
    title: "Easy Payment",
    description: "Hassle-Free Payments for a Smooth Booking.",
    icon: "💳",
  },
  {
    title: "24/7 electricity with solar energy",
    description:
      "Enjoy uninterrupted power supply with reliable 24/7 electricity supported by efficient solar energy systems.",
    icon: "☀️",
  },
] as const;

export default function AmenitiesPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Stay essentials</p>
          <h1>Amenities</h1>
          <p>
            Everything you need for a relaxing stay — spotless rooms, reliable power, and on-call support designed to
            feel like home.
          </p>
        </div>
      </section>

      <section className="container book-wide section-pad">
        <div className="amenities-grid">
          {amenities.map((amenity) => (
            <article key={amenity.title} className="card amenity-card">
              <div className="amenity-card-icon" aria-hidden>
                {amenity.icon}
              </div>
              <h3>{amenity.title}</h3>
              <p>{amenity.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-cta-band">
        <div className="container content-narrow" style={{ textAlign: "center" }}>
          <h2>Daily and weekly bookings available</h2>
          <p>
            Whether you’re booking for a night, a week, or a month, we offer flexible plans that fit your schedule and
            budget.
          </p>
          <Link href={BOOK_NOW_HREF} className="btn btn-primary">
            Book Now
          </Link>
        </div>
      </section>
    </main>
  );
}
