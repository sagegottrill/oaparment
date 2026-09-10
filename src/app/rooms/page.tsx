import Link from "next/link";
import { formatNaira, suites } from "@/lib/suites";

export default function RoomsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Suites</p>
          <h1 style={{ margin: 0 }}>Our rooms</h1>
          <p>Two premium 3-bedroom ensuite suites in Ilaro.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="grid grid-cols-2 gap-lg">
          {suites.map((suite) => (
            <Link key={suite.id} href={`/rooms/${suite.id}`} className="card room-card">
              <div
                className="room-card-media"
                style={{ backgroundImage: `url(${suite.images[0]})` }}
              />
              <div className="room-card-body">
                <h3>{suite.title}</h3>
                <p>
                  Up to {suite.maxGuests} guests · From <strong>{formatNaira(suite.pricePerNight)}</strong> / night
                </p>
                <span className="room-card-cta">View & book →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
