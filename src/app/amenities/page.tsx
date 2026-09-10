export default function AmenitiesPage() {
  const amenities = [
    { title: "Security", description: "Our properties are equipped with secure access, CCTV coverage, and on-site guards to give you complete peace of mind during your stay.", icon: "🛡️" },
    { title: "Fully equipped kitchen", description: "Every apartment comes with modern kitchenware, so you can prepare your favorite meals just the way you like them.", icon: "🍳" },
    { title: "Wifi", description: "Stay connected wherever you are. Whether you’re working remotely or streaming your favorite shows, our fast and stable internet keeps you online without interruption.", icon: "📶" },
    { title: "Entertainment", description: "Control lighting, air conditioning, and entertainment with ease through our smart home systems designed for convenience.", icon: "📺" },
    { title: "Customer support", description: "Whether you need assistance checking in or have a late-night question, our support team is available around the clock to make your stay smooth and stress-free.", icon: "💬" },
    { title: "House keeping on request", description: "Housekeeping available on request to keep your stay fresh, clean, and comfortable whenever you need it.", icon: "🧹" },
    { title: "Peaceful, noise-free environment", description: "Enjoy a calm, noise-free environment designed to help you relax, unwind, and feel completely at peace.", icon: "🤫" },
    { title: "Private Bathrooms", description: "Each room comes with a private ensuite bathroom, giving you complete comfort, privacy, and convenience every stay.", icon: "🚿" },
    { title: "Easy Payment", description: "Hassle-Free Payments for a Smooth Booking.", icon: "💳" },
    { title: "24/7 electricity with solar energy", description: "Enjoy uninterrupted power supply with reliable 24/7 electricity supported by efficient solar energy systems.", icon: "☀️" },
  ];

  return (
    <main>
      {/* Page Header */}
      <section className="page-hero">
        <h1 style={{ fontSize: '3rem', margin: 0, marginBottom: 'var(--spacing-sm)' }}>Amenities</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Everything you need for a relaxing stay, from spotless rooms to on-call support, all designed to make you feel at home.
        </p>
      </section>

      {/* Amenities Grid */}
      <section className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
        <div className="grid grid-cols-3 gap-xl">
          {amenities.map((amenity, index) => (
            <div key={index} className="card" style={{ padding: 'var(--spacing-xl)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>{amenity.icon}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-sm)', color: 'var(--color-brand-green)' }}>{amenity.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>{amenity.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section style={{ backgroundColor: 'var(--color-surface-alt)', padding: 'var(--spacing-3xl) 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-brand-green)' }}>Daily and weekly bookings available!</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>
            Whether you’re booking for a night, a week, or a month, we offer flexible plans that fit your schedule and budget.
          </p>
          <a href="https://wa.link/ubsow7" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: 'var(--spacing-sm) var(--spacing-xl)', fontSize: '1.1rem' }}>
            Book with us!
          </a>
        </div>
      </section>
    </main>
  );
}
