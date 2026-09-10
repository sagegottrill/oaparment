"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import BookNowCta from "@/components/layout/BookNowCta";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

function isBareLayout(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  );
}

function hideBookCta(pathname: string) {
  return pathname.startsWith("/rooms/") || pathname.startsWith("/checkout");
}

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";

  if (isBareLayout(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      {!hideBookCta(pathname) ? <BookNowCta /> : null}
      <Footer />
    </>
  );
}
