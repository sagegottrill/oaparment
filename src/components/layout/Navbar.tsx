import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="glass" style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <div className="container flex items-center justify-between" style={{ padding: "var(--spacing-md)" }}>
        <Link href="/" className="flex items-center gap-sm" style={{ color: "var(--color-brand-green)" }}>
          <Image src="/logo.jpeg" alt="The O' Apartments" width={44} height={44} style={{ objectFit: "contain" }} />
          <span style={{ fontSize: "1.2rem", fontWeight: 700 }}>The O&apos; Apartments</span>
        </Link>
        <nav className="flex gap-md items-center" style={{ fontSize: "0.9rem", flexWrap: "wrap" }}>
          <Link href="/">Home</Link>
          <Link href="/rates">Rates</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/our-apartments">Apartments</Link>
          <Link href="/amenities">Amenities</Link>
          <Link href="/blog">Our Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact-us">Contact Us</Link>
          <Link href="/login" className="btn btn-outline" style={{ padding: "var(--spacing-xs) var(--spacing-sm)", fontSize: "0.8rem" }}>
            Sign in
          </Link>
          <Link href="/checkout" className="btn btn-primary" style={{ padding: "var(--spacing-xs) var(--spacing-md)" }}>
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
