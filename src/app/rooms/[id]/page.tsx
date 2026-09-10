import Link from "next/link";
import BookingWidget from "@/components/booking/BookingWidget";
import SuiteTabs from "@/components/booking/SuiteTabs";
import { formatNaira, getSuite } from "@/lib/suites";

export default async function RoomDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const suite = getSuite(id);
  const [main, ...thumbs] = suite.images;

  return (
    <main>
      <section className="container" style={{ paddingTop: "var(--spacing-lg)" }}>
        <p className="suite-breadcrumb">
          <Link href="/">O&apos;apartment</Link>
          <span> &gt; </span>
          <Link href="/rates">Products</Link>
          <span> &gt; </span>
          <span>{suite.title}</span>
        </p>
      </section>

      <section className="container suite-layout">
        <div>
          <div className="suite-gallery">
            <div className="suite-gallery-main" style={{ backgroundImage: `url(${main})` }} />
            <div className="suite-gallery-thumbs">
              {thumbs.slice(0, 4).map((image) => (
                <div key={image} style={{ backgroundImage: `url(${image})` }} />
              ))}
            </div>
          </div>

          <h1 className="suite-title">{suite.title}</h1>
          <p className="suite-price-intro">
            From: <strong>{formatNaira(suite.pricePerNight)}</strong>/night
          </p>

          <SuiteTabs suite={suite} />
        </div>

        <BookingWidget suite={suite} />
      </section>
    </main>
  );
}
