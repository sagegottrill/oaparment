import Link from "next/link";

export default function OurApartmentsPage() {
  return (
    <main>
      {/* Page Header */}
      <section className="page-hero">
        <h1 style={{ fontSize: '3rem', margin: 0 }}>Our Apartments</h1>
      </section>

      {/* Apartment Content */}
      <section className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
        <div className="card flex" style={{ maxWidth: '900px', margin: '0 auto', overflow: 'hidden', padding: 0 }}>
          <div style={{ flex: 1, minHeight: '300px', backgroundImage: 'url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div style={{ flex: 1, padding: 'var(--spacing-2xl)', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'var(--color-surface)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>3 Bedroom Premium Suite</h2>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 'var(--spacing-xl)' }}>
              ₦150,000 <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>/ night</span>
            </div>
            
            <Link href="/rooms/unit-a" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: 'var(--spacing-sm) var(--spacing-xl)' }}>
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
