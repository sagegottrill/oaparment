import Link from "next/link";

export default function MyAccountPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Your stay</p>
          <h1>My account</h1>
          <p>Sign in to see bookings, receipts, and upcoming check-in details.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="account-grid">
          <div className="card account-panel">
            <h2>Guest portal</h2>
            <p>
              Your bookings will appear here after login is connected to Supabase. Until then, you can still request a stay from checkout or WhatsApp.
            </p>
            <div className="flex gap-md" style={{ flexWrap: "wrap" }}>
              <Link href="/login" className="btn btn-primary">
                Sign in
              </Link>
              <Link href="/register" className="btn btn-outline">
                Create account
              </Link>
            </div>
          </div>
          <div className="card account-panel">
            <h2>Need help now?</h2>
            <p>Call or message the front desk for same-day bookings in Ilaro.</p>
            <p>
              <a href="tel:08075963676">08075963676</a>
              <br />
              <a href="https://wa.link/ubsow7" target="_blank" rel="noopener noreferrer">
                WhatsApp booking
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
