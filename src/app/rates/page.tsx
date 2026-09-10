import Link from "next/link";

export default function RatesPage() {
  const units = [
    {
      id: "unit-a",
      title: "Unit A - 3 Bedroom Premium Suite",
      price: "₦150,000",
      guests: "Up to 6 Guests",
      features: [
        "Fully Fitted Kitchen",
        "Private En-Suite Bathrooms",
        "Heating & Air Conditioning",
        "24/7 Solar Power & Security"
      ],
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "unit-b",
      title: "Unit B - 3 Bedroom Premium Suite",
      price: "₦150,000",
      guests: "Up to 6 Guests",
      features: [
        "Fully Fitted Kitchen",
        "Private En-Suite Bathrooms",
        "Heating & Air Conditioning",
        "24/7 Solar Power & Security"
      ],
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Transparent pricing</p>
          <h1>Rates</h1>
          <p>
            <Link href="/">Home</Link> &gt; Rates
          </p>
        </div>
      </section>

      {/* Rates Content */}
      <section className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
        <div className="flex-col gap-xl" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {units.map((unit) => (
            <div key={unit.id} className="card flex" style={{ overflow: 'hidden' }}>
              <div style={{ flex: 1, minHeight: '250px', backgroundImage: `url(${unit.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div style={{ flex: 1.5, padding: 'var(--spacing-xl)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-xs)' }}>{unit.title}</h2>
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{unit.price}</span>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginLeft: '8px' }}>Per Night / {unit.guests}</span>
                  </div>
                  
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--spacing-lg)' }}>
                    {unit.features.map((feature, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.95rem' }}>
                        <span style={{ color: 'var(--color-brand-green)' }}>✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link href={`/rooms/${unit.id}`} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Book {unit.title.split(' - ')[0]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
