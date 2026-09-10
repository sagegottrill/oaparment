import Link from "next/link";
import { apt } from "@/lib/apartment-images";

export default async function RoomDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const room = {
    id,
    title: "3 Bedroom Premium Suite",
    price: 150000,
    rating: 4.9,
    description:
      "Experience affordable luxury in our premium suite. Enjoy hotel-grade comfort, private ensuites, and a fully fitted kitchen designed for travelers who want style and convenience in Ilaro.",
    amenities: ["Free Wi-Fi", "Air Conditioning", "King Bed", "Fitted Kitchen", "Solar Power", "Secure Parking"],
    images: [apt.bedroom1, apt.living5, apt.bathroom1, apt.kitchen1],
  };

  return (
    <main className="container section-pad">
      <div className="room-gallery" style={{ marginBottom: "var(--spacing-xl)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
        <div className="room-gallery-main" style={{ backgroundImage: `url(${room.images[0]})` }} />
        <div className="room-gallery-side">
          <div style={{ backgroundImage: `url(${room.images[1]})` }} />
          <div style={{ backgroundImage: `url(${room.images[2]})` }} />
          <div className="room-gallery-more">
            <span style={{ fontWeight: 600 }}>+ More Photos</span>
          </div>
          <div style={{ backgroundImage: `url(${room.images[3]})` }} />
        </div>
      </div>

      <div className="room-detail-grid">
        <div>
          <h1 style={{ marginBottom: "var(--spacing-xs)" }}>{room.title}</h1>
          <p style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "var(--spacing-lg)" }}>
            <span style={{ color: "var(--color-primary)" }}>★</span> {room.rating} · Guest favorite
          </p>

          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              borderBottom: "1px solid var(--color-border)",
              padding: "var(--spacing-lg) 0",
              marginBottom: "var(--spacing-lg)",
            }}
          >
            <p style={{ margin: 0, color: "var(--color-text)" }}>{room.description}</p>
          </div>

          <h3>Amenities</h3>
          <ul className="grid grid-cols-2 gap-sm" style={{ listStyle: "none", padding: 0 }}>
            {room.amenities.map((amenity) => (
              <li key={amenity} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--color-primary)" }}>✓</span> {amenity}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="card" style={{ padding: "var(--spacing-lg)", position: "sticky", top: "90px" }}>
            <div style={{ marginBottom: "var(--spacing-md)" }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>₦{room.price.toLocaleString()}</span>
              <span style={{ color: "var(--color-text-muted)" }}>/night</span>
            </div>

            <div className="flex-col gap-sm" style={{ marginBottom: "var(--spacing-lg)" }}>
              <div className="booking-dates">
                <input type="date" className="input" aria-label="Check-in" />
                <input type="date" className="input" aria-label="Check-out" />
              </div>
              <select className="input" aria-label="Guests">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
                <option>5 Guests</option>
                <option>6 Guests</option>
              </select>
            </div>

            <Link href="/checkout" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Reserve
            </Link>

            <p style={{ textAlign: "center", marginTop: "var(--spacing-sm)", fontSize: "0.875rem" }}>You won&apos;t be charged yet</p>
          </div>
        </div>
      </div>
    </main>
  );
}
