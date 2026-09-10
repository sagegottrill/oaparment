import type { Metadata, Viewport } from "next";
import SiteChrome from "@/components/layout/SiteChrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "The O' Apartments | Luxury in Ilaro",
  description:
    "Experience affordable luxury with flexible booking options and exceptional comfort that feels just like home in Ilaro, Ogun State.",
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A3622",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
