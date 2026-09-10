"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/rates", label: "Rates" },
  { href: "/about-us", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/our-apartments", label: "Apartments" },
  { href: "/amenities", label: "Amenities" },
  { href: "/blog", label: "Our Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="glass site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand-link" aria-label="The O' Apartments home">
          <Image
            src="/logo.jpeg"
            alt="The O' Apartments"
            width={220}
            height={56}
            className="brand-logo"
            priority
          />
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={open ? "nav-toggle-bar open-top" : "nav-toggle-bar"} />
          <span className={open ? "nav-toggle-bar open-mid" : "nav-toggle-bar"} />
          <span className={open ? "nav-toggle-bar open-bot" : "nav-toggle-bar"} />
        </button>

        <nav className={open ? "site-nav open" : "site-nav"}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          <div className="nav-actions">
            <Link href="/login" className="btn btn-outline nav-btn">
              Sign in
            </Link>
            <Link href="/rooms/unit-a" className="btn btn-primary nav-btn">
              Book Now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
