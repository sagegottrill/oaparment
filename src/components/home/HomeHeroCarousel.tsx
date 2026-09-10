"use client";

import { type ReactNode, useEffect, useState } from "react";

type HomeHeroCarouselProps = {
  images: string[];
  intervalMs?: number;
  children: ReactNode;
};

export default function HomeHeroCarousel({
  images,
  intervalMs = 5000,
  children,
}: HomeHeroCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [images.length, intervalMs]);

  return (
    <section className="home-hero home-hero-carousel">
      {images.map((image, imageIndex) => (
        <div
          key={image}
          className={imageIndex === index ? "home-hero-slide active" : "home-hero-slide"}
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden={imageIndex !== index}
        />
      ))}
      <div className="home-hero-overlay" />
      <div className="container home-hero-content">{children}</div>
      {images.length > 1 ? (
        <div className="home-hero-dots" aria-label="Apartment photo slides">
          {images.map((image, imageIndex) => (
            <button
              key={image}
              type="button"
              className={imageIndex === index ? "home-hero-dot active" : "home-hero-dot"}
              aria-label={`Show photo ${imageIndex + 1}`}
              onClick={() => setIndex(imageIndex)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
