import Link from "next/link";

export default function RoomDetailsPage({ params }: { params: { id: string } }) {
  // Mock data for now
  const room = {
    id: params.id,
    title: "Ocean View Suite",
    price: 450,
    rating: 4.9,
    description: "Experience unparalleled luxury in our Ocean View Suite. Wake up to breathtaking panoramas of the sea, enjoy state-of-the-art amenities, and relax in a beautifully designed space that blends comfort with elegance.",
    amenities: ["Free Wi-Fi", "Ocean View", "King Bed", "Room Service", "Spa Access", "Mini Bar"],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542314831-c53cd3816002?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ]
  };

  return (
    <main className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-2 gap-sm" style={{ marginBottom: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ height: '400px', backgroundImage: `url(${room.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="grid grid-cols-2 gap-sm">
          <div style={{ height: '195px', backgroundImage: `url(${room.images[1]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div style={{ height: '195px', backgroundImage: `url(${room.images[2]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div style={{ height: '195px', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontWeight: 600 }}>+ More Photos</span>
          </div>
          <div style={{ height: '195px', backgroundImage: `url(${room.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-xl">
        <div style={{ gridColumn: 'span 2' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-xs)' }}>{room.title}</h1>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: 'var(--spacing-lg)' }}>
            <span style={{ color: 'var(--color-primary)' }}>★</span> {room.rating} · 124 reviews
          </p>
          
          <div style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: 'var(--spacing-lg) 0', marginBottom: 'var(--spacing-lg)' }}>
            <p style={{ margin: 0, color: 'var(--color-text)' }}>{room.description}</p>
          </div>
          
          <h3>Amenities</h3>
          <ul className="grid grid-cols-2 gap-sm" style={{ listStyle: 'none', padding: 0 }}>
            {room.amenities.map((amenity, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-primary)' }}>✓</span> {amenity}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Booking Card */}
        <div>
          <div className="card" style={{ padding: 'var(--spacing-lg)', position: 'sticky', top: '100px' }}>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>${room.price}</span>
              <span style={{ color: 'var(--color-text-muted)' }}>/night</span>
            </div>
            
            <div className="flex-col gap-sm" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <div className="flex gap-sm">
                <input type="date" className="input" placeholder="Check-in" />
                <input type="date" className="input" placeholder="Check-out" />
              </div>
              <select className="input">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
              </select>
            </div>
            
            <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Reserve
            </Link>
            
            <p style={{ textAlign: 'center', marginTop: 'var(--spacing-sm)', fontSize: '0.875rem' }}>You won't be charged yet</p>
          </div>
        </div>
      </div>
    </main>
  );
}
