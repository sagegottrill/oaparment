import Link from "next/link";
import { galleryItems } from "@/lib/apartment-images";
import { BOOK_NOW_HREF } from "@/lib/booking";

export default function GalleryPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Inside the suites</p>
          <h1>Our Gallery</h1>
          <p>Living spaces, ensuite retreats, kitchens, and quiet corners — a closer look at The O&apos; Apartments.</p>
          <div style={{ marginTop: "1.25rem" }}>
            <Link href={BOOK_NOW_HREF} className="btn btn-primary">
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <section className="container book-wide section-pad">
        <div className="gallery-mosaic">
          {galleryItems.map((item, index) => (
            <figure
              key={item.image}
              className={`gallery-mosaic-item${index % 5 === 0 ? " is-tall" : ""}${index % 7 === 3 ? " is-wide" : ""}`}
            >
              <div className="gallery-mosaic-image" style={{ backgroundImage: `url(${item.image})` }} />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>

        <div className="page-cta">
          <h2>Stay where the photos come from</h2>
          <p>Reserve Unit A, Unit B, or both — flexible nightly stays in Ilaro.</p>
          <Link href={BOOK_NOW_HREF} className="btn btn-primary">
            Book Now
          </Link>
        </div>
      </section>
    </main>
  );
}
