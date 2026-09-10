import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex" style={{ minHeight: "100vh" }}>
      <aside
        style={{
          width: "250px",
          backgroundColor: "var(--color-surface)",
          borderRight: "1px solid var(--color-border)",
          padding: "var(--spacing-lg)",
        }}
      >
        <div style={{ marginBottom: "var(--spacing-2xl)" }}>
          <h2 style={{ color: "var(--color-brand-green)", margin: 0 }}>O&apos; Admin</h2>
        </div>

        <nav className="flex-col gap-sm">
          <Link href="/admin" className="btn btn-outline" style={{ justifyContent: "flex-start", width: "100%", border: "none" }}>
            Dashboard
          </Link>
          <Link href="/admin/rooms" className="btn btn-outline" style={{ justifyContent: "flex-start", width: "100%", border: "none" }}>
            Rooms
          </Link>
          <Link href="/admin/bookings" className="btn btn-outline" style={{ justifyContent: "flex-start", width: "100%", border: "none" }}>
            Bookings
          </Link>
          <Link href="/login" className="btn btn-outline" style={{ justifyContent: "flex-start", width: "100%", border: "none", marginTop: "var(--spacing-xl)" }}>
            Sign in
          </Link>
          <Link href="/" className="btn btn-outline" style={{ justifyContent: "flex-start", width: "100%", border: "none" }}>
            Back to site
          </Link>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "var(--spacing-xl)", backgroundColor: "var(--color-background)" }}>
        {children}
      </main>
    </div>
  );
}
