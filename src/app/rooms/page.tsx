import Link from "next/link";

export default function RoomsPage() {
  const rooms = [
    { id: 1, title: "Ocean View Suite", price: 450, rating: 4.9, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: "City Penthouse", price: 850, rating: 5.0, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: "Cozy Studio", price: 150, rating: 4.7, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 4, title: "Luxury Villa", price: 1200, rating: 4.9, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <main className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2>Available Rooms</h2>
        <div className="flex gap-sm">
          <input type="text" placeholder="Location" className="input" style={{ width: '200px' }} />
          <input type="date" className="input" style={{ width: '150px' }} />
          <button className="btn btn-primary">Search</button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-lg">
        {rooms.map(room => (
          <Link href={`/rooms/${room.id}`} key={room.id}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ 
                height: '250px', 
                backgroundImage: `url(${room.image})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              }}></div>
              <div style={{ padding: 'var(--spacing-md)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-xs)' }}>{room.title}</h3>
                  <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--color-primary)' }}>★</span> {room.rating}
                  </p>
                </div>
                <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>${room.price}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>/night</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
