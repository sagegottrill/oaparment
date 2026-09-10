export default function GalleryPage() {
  const galleryItems = [
    { title: "Premium Master Bedroom", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Luxury Guest Bedroom", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Modern En-Suite Bathroom", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Spacious Master Suite", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Master Bedroom Setup", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Bedroom Entertainment Setup", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Custom Wooden Wardrobes", image: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Natural Light & Premium Curtains", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Elegant Dining Space", image: "https://images.unsplash.com/photo-1617806118233-18e1c12e4023?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Air-Conditioned Comfort", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Plush King-Size Bedding", image: "https://images.unsplash.com/photo-1536514072410-5019a3c69182?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Serene Guest Suite", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Elegant Window Treatments", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "High-Pressure Rainfall Shower", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Glass-Enclosed Shower & Vanity", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Premium Executive Living Room", image: "https://images.unsplash.com/photo-1542314831-c53cd3816002?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
  ];

  return (
    <main>
      {/* Page Header */}
      <section className="page-hero">
        <h1 style={{ fontSize: '3rem', margin: 0, marginBottom: 'var(--spacing-md)' }}>Our Gallery</h1>
        <a href="https://wa.link/ubsow7" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: 'var(--spacing-sm) var(--spacing-xl)' }}>
          Book Now
        </a>
      </section>

      {/* Gallery Grid */}
      <section className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
        <div className="grid gap-md" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {galleryItems.map((item, index) => (
            <div key={index} className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', borderRadius: 'var(--radius-lg)' }}>
              <div 
                style={{ 
                  height: '250px', 
                  backgroundImage: `url(${item.image})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  transition: 'transform 0.3s ease'
                }}
                className="gallery-image"
              />
              <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--color-surface)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--color-text)' }}>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        .gallery-image:hover {
          transform: scale(1.05);
        }
      `}} />
    </main>
  );
}
