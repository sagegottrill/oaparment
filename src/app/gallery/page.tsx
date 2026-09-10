import { galleryItems } from "@/lib/apartment-images";

export default function GalleryPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1 style={{ margin: 0, marginBottom: "var(--spacing-md)" }}>Our Gallery</h1>
          <a
            href="https://wa.link/ubsow7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Book Now
          </a>
        </div>
      </section>

      <section className="container section-pad">
        <div className="grid gap-md" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {galleryItems.map((item) => (
            <div key={item.image} className="card" style={{ padding: 0, overflow: "hidden", border: "none" }}>
              <div
                className="gallery-image"
                style={{
                  height: "250px",
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div style={{ padding: "var(--spacing-md)", backgroundColor: "var(--color-surface)", textAlign: "center" }}>
                <h3 style={{ fontSize: "1rem", margin: 0, color: "var(--color-text)" }}>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
