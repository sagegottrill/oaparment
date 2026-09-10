"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/rooms", label: "Rooms" },
  { href: "/admin/bookings", label: "Bookings" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-shell">
      <button type="button" className="admin-menu-btn" onClick={() => setOpen((value) => !value)}>
        {open ? "Close menu" : "Admin menu"}
      </button>

      <aside className={open ? "admin-sidebar open" : "admin-sidebar"}>
        <div className="admin-brand">
          <Link href="/" aria-label="The O' Apartments home">
            <Image src="/logo.jpeg" alt="The O' Apartments" width={180} height={48} className="brand-logo" />
          </Link>
        </div>

        <nav className="admin-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "admin-link active" : "admin-link"}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="admin-link" onClick={() => setOpen(false)}>
            Sign in
          </Link>
          <Link href="/" className="admin-link" onClick={() => setOpen(false)}>
            Back to site
          </Link>
        </nav>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
