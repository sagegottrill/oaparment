export const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=3%20Tunji%20Otegbeye%20Street%2C%20Ona%20Egbo%2C%20Ilaro%2C%20Ogun%20State&z=16&output=embed";

export default function LocationMap({ title = "The O' Apartments location" }: { title?: string }) {
  return (
    <div className="map-embed">
      <iframe
        title={title}
        src={MAP_EMBED_SRC}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
