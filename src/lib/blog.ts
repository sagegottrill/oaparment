import { apt } from "@/lib/apartment-images";

export type BlogPost = {
  id: string;
  category: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "corporate-retreats",
    category: "Real Estate",
    title: "The Ultimate Guide to Corporate Retreats and Remote Work Stays",
    date: "May 21, 2026",
    author: "The O' Apartments",
    excerpt:
      "In today’s remote-first world, your work environment doesn’t have to be a traditional office building.",
    image: apt.living5,
    body: [
      "In today’s remote-first world, your work environment doesn’t have to be a traditional office building. More teams are choosing short-stay apartments for corporate retreats, project sprints, and focused remote work weeks — and Ilaro is becoming a smart option for companies near Ogun’s industrial corridor.",
      "At The O’ Apartments, our 3-bedroom ensuite suites give teams space to work by day and rest at night. Fast Wi-Fi, 24/7 solar power, a fully fitted kitchen, and a calm living area make collaboration easier without hotel-room limitations.",
      "Whether you are planning an offsite near Dangote Cement or hosting visiting consultants, a private apartment keeps everyone comfortable, private, and productive. Flexible booking also means you can stay for a weekend workshop or an extended assignment.",
      "Ready to host your next retreat? Book Unit A or Unit B and arrive to a ready-made workspace that still feels like home.",
    ],
  },
  {
    id: "shortlet-vs-hotels",
    category: "Real Estate",
    title: "Shortlet Apartments vs. Luxury Hotels: Which is Better for Your Stay?",
    date: "May 21, 2026",
    author: "The O' Apartments",
    excerpt: "The way we travel has completely changed. While luxury hotels used to be the absolute",
    image: apt.bedroom1,
    body: [
      "The way we travel has completely changed. While luxury hotels used to be the absolute default for comfort, many guests now prefer shortlet apartments that combine hotel-grade finish with the privacy and space of a real home.",
      "A hotel room is great for one night. But when you need a kitchen, a proper living room, ensuite bedrooms for family or colleagues, and the freedom to settle in, an apartment wins. You control your schedule, cook when you want, and enjoy quieter evenings.",
      "The O’ Apartments in Ilaro is built for that mix: Smart TV entertainment, air conditioning, secure parking, and solar-backed power so your stay stays smooth. You get sophistication without feeling like a guest trapped in a single room.",
      "If you want hotel comfort with home warmth — especially for multi-night stays — a shortlet suite is usually the better value and the better experience.",
    ],
  },
  {
    id: "choose-ilaro",
    category: "Properties",
    title: "Top Reasons to Choose Ilaro for Your Next Weekend Getaway",
    date: "May 21, 2026",
    author: "The O' Apartments",
    excerpt: "When planning a weekend escape from the hustle and bustle of city life, Ilaro offers",
    image: apt.exterior1,
    body: [
      "When planning a weekend escape from the hustle and bustle of city life, Ilaro offers a calmer pace without cutting you off from the essentials. Banks, eateries, and major routes are close by, and the town’s location in Ogun State makes it convenient for both leisure and work trips.",
      "Guests visiting for business around the Dangote Cement Factory corridor often need a reliable base: private ensuite rooms, steady power, fast internet, and parking they can trust. That is exactly what our premium suites provide.",
      "Beyond work, Ilaro is ideal for short family stays and quiet getaways. Fully furnished apartments mean you unpack once, unwind in a serene living area, and enjoy home-style comfort after a day out.",
      "Looking for hotels in Ilaro but want more space? Book The O’ Apartments and enjoy affordable luxury that feels intentional from check-in to check-out.",
    ],
  },
];

export function getBlogPost(id: string) {
  return blogPosts.find((post) => post.id === id) ?? null;
}
