export default function FaqPage() {
  const commonQuestions = [
    {
      q: "How many rooms do your shortlet apartments have?",
      a: "Our shortlet property features a duplex with two separate three-bedroom apartments, each beautifully furnished and fully ensuite to provide guests with maximum comfort and privacy."
    },
    {
      q: "How safe are your apartments?",
      a: "Safety is our top priority. All apartments are in secure locations and feature locks, CCTV surveillance, and in some cases, on-site security."
    },
    {
      q: "Can I extend my stay after booking?",
      a: "Yes, you can! Simply contact us before your checkout date, and we will confirm availability and update your booking."
    },
    {
      q: "What does the service charge or caution fee cover?",
      a: "It covers cleaning, security, and the general maintenance of common areas."
    },
    {
      q: "Are the apartments suitable for events?",
      a: "Small gatherings may be allowed in certain units, but large parties are not permitted unless approved in advance."
    },
    {
      q: "Is there a minimum or maximum stay period?",
      a: "Yes. The minimum stay is usually one or two nights, depending on the apartment. You can stay for as long as the apartment is available."
    },
    {
      q: "Can I bring extra guests after booking?",
      a: "Each room has a strict maximum occupancy of 2 guests, and no additional guests are permitted to sleep in the living room or other common areas. If you need to adjust your guest count, please contact us in advance so we can confirm whether your booking can accommodate the change."
    },
    {
      q: "What makes your shortlet different?",
      a: "Our apartments offer more privacy, space, and flexibility. You get a fully equipped home to yourself, not just a room, making it ideal for families, business travellers, and anyone who values comfort."
    }
  ];

  const amenitiesQuestions = [
    {
      q: "Do you have 24-hour electricity?",
      a: "Yes, the property is powered by a robust solar energy system that provides round-the-clock electricity, even during power outages."
    },
    {
      q: "How can guests help ensure the inverter stays charged overnight?",
      a: "To maintain overnight power, please help by switching off unnecessary lights, air conditioners, and high-energy appliances during the day. This ensures the inverter remains fully charged by sunset for uninterrupted nighttime comfort."
    },
    {
      q: "Is there reliable internet access?",
      a: "Absolutely. Each apartment has high-speed Wi-Fi, suitable for work, streaming, and video calls."
    },
    {
      q: "What appliances are in the kitchen?",
      a: "The kitchen includes a refrigerator, gas cooker, microwave, electric kettle, cookware, dishes, and cutlery—everything you need to prepare and enjoy your meals."
    },
    {
      q: "Is housekeeping included?",
      a: "Cleaning service is available on request. Daily or weekly cleaning options can be arranged at the time of booking or during your stay."
    }
  ];

  const bookingQuestions = [
    {
      q: "How can I book a stay?",
      a: "You can book directly through our website, via WhatsApp, email, or through Airbnb/Booking.com if available. We offer daily, weekly, and monthly rental options."
    },
    {
      q: "What are the check-in and check-out times?",
      a: "Standard check-in is at 2:00 PM and check-out is at 11:00 AM. However, we’re flexible—early check-in or late check-out can often be arranged upon request."
    },
    {
      q: "Do you require a security deposit?",
      a: "Yes, a refundable security deposit is collected at check-in. It’s returned in full after checkout, provided no damage or rule violations occur."
    },
    {
      q: "What forms of payment do you accept?",
      a: "We accept bank transfers and secure online payments. Payment details will be provided at the time of booking."
    }
  ];

  return (
    <main>
      {/* Page Header */}
      <section className="page-hero">
        <h1 style={{ fontSize: '3rem', margin: 0, marginBottom: 'var(--spacing-sm)' }}>Frequently Asked Questions</h1>
      </section>

      {/* FAQ Sections */}
      <section className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)', maxWidth: '900px' }}>
        
        {/* Common Questions */}
        <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
          <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid var(--color-border)', paddingBottom: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xl)' }}>
            Common questions!
          </h2>
          <div className="flex-col gap-md">
            {commonQuestions.map((faq, index) => (
              <details key={index} style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-brand-green)', outline: 'none' }}>
                  {faq.q}
                </summary>
                <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Amenities & Utilities */}
        <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
          <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid var(--color-border)', paddingBottom: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xl)' }}>
            Amenities & utilities!
          </h2>
          <div className="flex-col gap-md">
            {amenitiesQuestions.map((faq, index) => (
              <details key={index} style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-brand-green)', outline: 'none' }}>
                  {faq.q}
                </summary>
                <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Booking & Check-in */}
        <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
          <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid var(--color-border)', paddingBottom: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xl)' }}>
            Booking & Check-in
          </h2>
          <div className="flex-col gap-md">
            {bookingQuestions.map((faq, index) => (
              <details key={index} style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-brand-green)', outline: 'none' }}>
                  {faq.q}
                </summary>
                <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
          <a href="/faq-2" className="hover-link" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>See more FAQs →</a>
        </div>
      </section>

      {/* Banner */}
      <section style={{ backgroundColor: 'var(--color-surface-alt)', padding: 'var(--spacing-3xl) 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-brand-green)' }}>Reserve a spot with us!</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>
            Experience comfort, convenience, and peace of mind when you book your next stay with us.
          </p>
          <a href="/rooms/unit-a" className="btn btn-primary" style={{ padding: 'var(--spacing-sm) var(--spacing-xl)', fontSize: '1.1rem' }}>
            Book Now
          </a>
        </div>
      </section>
    </main>
  );
}
