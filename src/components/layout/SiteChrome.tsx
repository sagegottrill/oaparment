"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

function isBareLayout(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  );
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
      <Footer />
    </>
  );
}
