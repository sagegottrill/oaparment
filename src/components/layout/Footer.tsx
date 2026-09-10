import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-brand-green)",
        color: "var(--color-text-light)",
        borderTop: "none",
        marginTop: "auto",
        padding: "var(--spacing-3xl) 0",
      }}
    >
      <div className="container grid grid-cols-4 gap-xl">
        <div>
          <h3 style={{ color: "var(--color-primary)" }}>The O&apos; Apartments</h3>
          <p style={{ color: "rgba(255,255,255,0.85)" }}>
            Enjoy a taste of luxury in Ilaro. Designed for travelers who value style and convenience.
          </p>
        </div>
        <div>
          <h4 style={{ color: "var(--color-text-light)" }}>Explore</h4>
          <ul className="flex-col gap-sm" style={{ listStyle: "none" }}>
            <li>
              <Link href="/our-apartments">Our Apartments</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: "var(--color-text-light)" }}>Contact Us</h4>
          <ul className="flex-col gap-sm" style={{ listStyle: "none", fontSize: "0.875rem" }}>
            <li>
              3 Tunji Otegbeye Street, Ona Egbo,
              <br />
              Ilaro, Ogun State
            </li>
            <li>
              <a href="tel:08075963676">08075963676</a> | <a href="tel:07060922880">07060922880</a>
            </li>
            <li>
              <a href="mailto:info@oapartment.com">info@oapartment.com</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: "var(--color-text-light)" }}>Social Media</h4>
          <ul className="flex-col gap-sm" style={{ listStyle: "none" }}>
            <li>
              <a href="https://www.instagram.com/theoapartment" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://web.facebook.com/theoapartments" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@theoapartment" target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container" style={{ textAlign: "center", marginTop: "var(--spacing-2xl)" }}>
        <p style={{ color: "rgba(255,255,255,0.65)" }}>
          &copy; {new Date().getFullYear()} The O&apos; Apartments — All rights reserved
        </p>
      </div>
    </footer>
  );
}
