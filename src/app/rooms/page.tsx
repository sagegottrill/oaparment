import Link from "next/link";
import { apt } from "@/lib/apartment-images";

export default function RoomsPage() {
  const rooms = [
    { id: "unit-a", title: "Unit A · 3 Bedroom Premium Suite", price: 150000, rating: 4.9, image: apt.bedroom1 },
    { id: "unit-b", title: "Unit B · 3 Bedroom Premium Suite", price: 150000, rating: 5.0, image: apt.bedroom10 },
    { id: "living", title: "Open Living & Dining", price: 150000, rating: 4.9, image: apt.living5 },
    { id: "suite", title: "Private Ensuite Retreat", price: 150000, rating: 4.8, image: apt.bathroom2 },
  ];

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1 style={{ margin: 0 }}>Our Rooms</h1>
        </div>
      </section>

      <section className="container section-pad">
        <div className="grid grid-cols-2 gap-lg">
          {rooms.map((room) => (
            <Link key={room.id} href={`/rooms/${room.id}`} className="card" style={{ padding: 0 }}>
              <div
                style={{
                  height: "250px",
                  backgroundImage: `url(${room.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div style={{ padding: "var(--spacing-lg)" }}>
                <h3 style={{ marginBottom: "var(--spacing-sm)" }}>{room.title}</h3>
                <p style={{ margin: 0 }}>
                  <span style={{ color: "var(--color-primary)" }}>★</span> {room.rating} · ₦{room.price.toLocaleString()}/night
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
