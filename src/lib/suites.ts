import { apt } from "@/lib/apartment-images";

export type SuiteProduct = {
  id: string;
  slug: string;
  title: string;
  pricePerNight: number;
  cautionFee: number;
  maxGuests: number;
  maxRooms: number;
  images: string[];
  description: string;
  offers: { icon: string; label: string }[];
  accommodation: string[];
};

export const suites: SuiteProduct[] = [
  {
    id: "unit-a",
    slug: "unit-a",
    title: "3 Bedroom Premium Suite – Unit A",
    pricePerNight: 150000,
    cautionFee: 50000,
    maxGuests: 6,
    maxRooms: 2,
    images: [apt.living7, apt.parking1, apt.kitchen2, apt.bedroom10, apt.living5, apt.bathroom1, apt.bedroom1, apt.dining1],
    description: `Welcome to Unit A at The O’ Apartments, your premier destination for luxury living in the heart of Ilaro. Whether you are visiting for business, a family getaway, or a peaceful retreat, this expansive 3-bedroom premium suite is meticulously designed to offer maximum comfort and uninterrupted tranquility.

Step into a beautifully furnished space where modern aesthetics meet home-like warmth. The open-plan living area is perfect for relaxation, featuring plush seating and a large Smart TV for premium entertainment. When it’s time to dine, you will love the state-of-the-art, fully fitted kitchen, equipped with everything you need to prepare a quick breakfast or a full family dinner.

Each of the three spacious bedrooms is a private sanctuary, complete with premium bedding and its own private en-suite bathroom. Best of all, you can say goodbye to the stress of power outages—your stay is fully supported by our robust 24/7 solar power system, paired with fast, free Wi-Fi to ensure a truly seamless experience.`,
    offers: [
      { icon: "⚡", label: "24/7 Solar Power" },
      { icon: "📶", label: "Fast, Free Wi-Fi" },
      { icon: "🍳", label: "Fully Fitted Kitchen" },
      { icon: "📺", label: "Smart TV" },
      { icon: "🚿", label: "Private En-Suite" },
      { icon: "🛡️", label: "Secure Parking" },
    ],
    accommodation: [
      "3 bedrooms with premium bedding",
      "Private en-suite bathroom in each bedroom",
      "Open-plan living & dining area",
      "Fully fitted kitchen",
      "Air conditioning",
      "24/7 solar power",
      "Fast free Wi-Fi",
      "Secure on-site parking",
      "Minimum 1-night stay",
    ],
  },
  {
    id: "unit-b",
    slug: "unit-b",
    title: "3 Bedroom Premium Suite – Unit B",
    pricePerNight: 150000,
    cautionFee: 50000,
    maxGuests: 6,
    maxRooms: 2,
    images: [apt.bedroom10, apt.living5, apt.kitchen1, apt.bathroom2, apt.living7, apt.parking2, apt.bedroom3, apt.dining2],
    description: `Welcome to Unit B at The O’ Apartments — a matching 3-bedroom premium suite designed for guests who want hotel-grade comfort with the privacy of home in Ilaro.

Enjoy an open living space, fully fitted kitchen, Smart TV entertainment, and three ensuite bedrooms. Your stay is backed by 24/7 solar power, fast Wi-Fi, and secure parking for a smooth, uninterrupted visit.`,
    offers: [
      { icon: "⚡", label: "24/7 Solar Power" },
      { icon: "📶", label: "Fast, Free Wi-Fi" },
      { icon: "🍳", label: "Fully Fitted Kitchen" },
      { icon: "📺", label: "Smart TV" },
      { icon: "🚿", label: "Private En-Suite" },
      { icon: "🛡️", label: "Secure Parking" },
    ],
    accommodation: [
      "3 bedrooms with premium bedding",
      "Private en-suite bathroom in each bedroom",
      "Open-plan living & dining area",
      "Fully fitted kitchen",
      "Air conditioning",
      "24/7 solar power",
      "Fast free Wi-Fi",
      "Secure on-site parking",
      "Minimum 1-night stay",
    ],
  },
];

export function getSuite(id: string): SuiteProduct | null {
  return suites.find((suite) => suite.id === id || suite.slug === id) ?? null;
}

export function requireSuite(id: string): SuiteProduct {
  return getSuite(id) ?? suites[0];
}

export function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function nightsBetween(checkIn: string, checkOut: string) {
  const start = new Date(`${checkIn}T12:00:00`);
  const end = new Date(`${checkOut}T12:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 0);
}
