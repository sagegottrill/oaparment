"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/rooms", label: "Rooms" },
  { href: "/admin/bookings", label: "Bookings" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <button type="button" className="admin-menu-btn" onClick={() => setOpen((value) => !value)}>
        {open ? "Close menu" : "Admin menu"}
      </button>

      <aside className={open ? "admin-sidebar open" : "admin-sidebar"}>
        <div className="admin-brand">
          <Link href="/" aria-label="The O' Apartments home">
            <Image
              src="/logo.png"
              alt="The O' Apartments"
              width={160}
              height={40}
              className="admin-brand-logo"
            />
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
          <button
            type="button"
            className="admin-link"
            onClick={() => {
              setOpen(false);
              void handleSignOut();
            }}
            disabled={signingOut}
            style={{ textAlign: "left", background: "transparent", border: 0, cursor: "pointer", width: "100%" }}
          >
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
          <Link href="/" className="admin-link" onClick={() => setOpen(false)}>
            Back to site
          </Link>
        </nav>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
