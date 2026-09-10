import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Reserve a stay</p>
          <h1>Book now</h1>
          <p>Premium 3-bedroom suites from ₦150,000 per night.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="card account-panel" style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2>Choose your apartment</h2>
          <p>Select a unit, then complete guest details. Online payment and calendar blocking go live with Supabase.</p>
          <div className="flex gap-md" style={{ flexWrap: "wrap" }}>
            <Link href="/rates" className="btn btn-primary">
              View rates
            </Link>
            <Link href="/our-apartments" className="btn btn-outline">
              See apartments
            </Link>
            <a className="btn btn-outline" href="https://wa.link/ubsow7" target="_blank" rel="noopener noreferrer">
              Book on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
