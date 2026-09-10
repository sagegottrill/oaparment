import Link from "next/link";
import { BOOK_NOW_HREF } from "@/lib/booking";

const commonQuestions = [
  {
    q: "How many rooms do your shortlet apartments have?",
    a: "Our shortlet property features a duplex with two separate three-bedroom apartments, each beautifully furnished and fully ensuite to provide guests with maximum comfort and privacy.",
  },
  {
    q: "How safe are your apartments?",
    a: "Safety is our top priority. All apartments are in secure locations and feature locks, CCTV surveillance, and in some cases, on-site security.",
  },
  {
    q: "Can I extend my stay after booking?",
    a: "Yes, you can! Simply contact us before your checkout date, and we will confirm availability and update your booking.",
  },
  {
    q: "What does the service charge or caution fee cover?",
    a: "It covers cleaning, security, and the general maintenance of common areas.",
  },
  {
    q: "Are the apartments suitable for events?",
    a: "Small gatherings may be allowed in certain units, but large parties are not permitted unless approved in advance.",
  },
  {
    q: "Is there a minimum or maximum stay period?",
    a: "Yes. The minimum stay is usually one or two nights, depending on the apartment. You can stay for as long as the apartment is available.",
  },
  {
    q: "Can I bring extra guests after booking?",
    a: "Each premium suite sleeps up to 6 guests across 3 ensuite bedrooms. If you need to adjust your guest count, contact us in advance so we can confirm availability.",
  },
  {
    q: "What makes your shortlet different?",
    a: "Our apartments offer more privacy, space, and flexibility. You get a fully equipped home to yourself, not just a room, making it ideal for families, business travellers, and anyone who values comfort.",
  },
] as const;

const amenitiesQuestions = [
  {
    q: "Do you have 24-hour electricity?",
    a: "Yes, the property is powered by a robust solar energy system that provides round-the-clock electricity, even during power outages.",
  },
  {
    q: "How can guests help ensure the inverter stays charged overnight?",
    a: "To maintain overnight power, please help by switching off unnecessary lights, air conditioners, and high-energy appliances during the day. This ensures the inverter remains fully charged by sunset for uninterrupted nighttime comfort.",
  },
  {
    q: "Is there reliable internet access?",
    a: "Absolutely. Each apartment has high-speed Wi-Fi, suitable for work, streaming, and video calls.",
  },
  {
    q: "What appliances are in the kitchen?",
    a: "The kitchen includes a refrigerator, gas cooker, microwave, electric kettle, cookware, dishes, and cutlery—everything you need to prepare and enjoy your meals.",
  },
  {
    q: "Is housekeeping included?",
    a: "Cleaning service is available on request. Daily or weekly cleaning options can be arranged at the time of booking or during your stay.",
  },
] as const;

const bookingQuestions = [
  {
    q: "How can I book a stay?",
    a: "You can book directly through our website, via WhatsApp, email, or through Airbnb/Booking.com if available. We offer daily, weekly, and monthly rental options.",
  },
  {
    q: "What are the check-in and check-out times?",
    a: "Standard check-in is at 2:00 PM and check-out is at 11:00 AM. However, we’re flexible—early check-in or late check-out can often be arranged upon request.",
  },
  {
    q: "Do you require a security deposit?",
    a: "Yes, a refundable security deposit is collected at check-in. It’s returned in full after checkout, provided no damage or rule violations occur.",
  },
  {
    q: "What forms of payment do you accept?",
    a: "We accept bank transfers and secure online payments. Payment details will be provided at the time of booking.",
  },
] as const;

function FaqSection({
  title,
  items,
}: {
  title: string;
  items: readonly { q: string; a: string }[];
}) {
  return (
    <div className="faq-block">
      <h2>{title}</h2>
      <div className="flex-col gap-md">
        {items.map((faq) => (
          <details key={faq.q} className="faq-item">
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Helpful answers</p>
          <h1>Frequently Asked Questions</h1>
          <p>Clear answers on stays, amenities, and booking — so you can reserve with confidence.</p>
        </div>
      </section>

      <section className="container section-pad content-narrow">
        <FaqSection title="Common questions" items={commonQuestions} />
        <FaqSection title="Amenities & utilities" items={amenitiesQuestions} />
        <FaqSection title="Booking & check-in" items={bookingQuestions} />
      </section>

      <section className="page-cta-band">
        <div className="container content-narrow" style={{ textAlign: "center" }}>
          <h2>Reserve a spot with us</h2>
          <p>Experience comfort, convenience, and peace of mind when you book your next stay.</p>
          <Link href={BOOK_NOW_HREF} className="btn btn-primary">
            Book Now
          </Link>
        </div>
      </section>
    </main>
  );
}
