import Link from "next/link";

/** Persistent Book Now CTA used on page bottoms / heroes */
export default function BookNowCta({
  title = "Ready to reserve your stay?",
  subtitle = "Premium 3-bedroom suites from ₦150,000 per night in Ilaro.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="book-now-cta">
      <div className="container book-now-cta-inner">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="book-now-cta-actions">
          <Link href="/rooms/unit-a" className="btn btn-primary">
            Book Now
          </Link>
          <a href="https://wa.link/ubsow7" target="_blank" rel="noopener noreferrer" className="btn btn-outline book-now-wa">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
