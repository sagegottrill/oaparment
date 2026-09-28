"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Testimonial = {
  readonly name: string;
  readonly quote: string;
};

type TestimonialCarouselProps = {
  testimonials: readonly Testimonial[];
  intervalMs?: number;
};

export default function TestimonialCarousel({
  testimonials,
  intervalMs = 6000,
}: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const pages = maxScroll > 4 ? Math.round(track.scrollWidth / track.clientWidth) : 1;
    setPageCount(Math.max(1, pages));
    setActivePage(maxScroll > 4 ? Math.round((track.scrollLeft / maxScroll) * (pages - 1)) : 0);
  }, []);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure, testimonials.length]);

  // Auto-advance one page at a time; guests' hover/touch pauses it.
  useEffect(() => {
    if (testimonials.length < 2 || pageCount < 2) return;
    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track || pausedRef.current) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const atEnd = track.scrollLeft >= maxScroll - 8;
      const nextPage = atEnd ? 0 : Math.min(activePage + 1, pageCount - 1);
      track.scrollTo({ left: (maxScroll / (pageCount - 1)) * nextPage, behavior: "smooth" });
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [activePage, pageCount, intervalMs, testimonials.length]);

  function scrollToPage(pageIndex: number) {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: (maxScroll / (pageCount - 1)) * pageIndex, behavior: "smooth" });
  }

  function nudge(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atEnd = direction === 1 && track.scrollLeft >= maxScroll - 8;
    const atStart = direction === -1 && track.scrollLeft <= 8;
    if (atEnd || atStart) {
      track.scrollTo({ left: atEnd ? 0 : maxScroll, behavior: "smooth" });
      return;
    }
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  }

  if (testimonials.length === 0) return null;

  return (
    <div className="testimonial-carousel">
      {pageCount > 1 ? (
        <button
          type="button"
          className="testimonial-arrow testimonial-arrow-prev"
          aria-label="Previous reviews"
          onClick={() => nudge(-1)}
        >
          ‹
        </button>
      ) : null}

      <div
        ref={trackRef}
        className="testimonial-track"
        onScroll={measure}
        onPointerEnter={() => (pausedRef.current = true)}
        onPointerLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        tabIndex={0}
      >
        {testimonials.map((item) => (
          <article key={item.name} className="card testimonial-card">
            <p>“{item.quote}”</p>
            <div className="testimonial-stars">★★★★★</div>
            <h4>{item.name}</h4>
          </article>
        ))}
      </div>

      {pageCount > 1 ? (
        <button
          type="button"
          className="testimonial-arrow testimonial-arrow-next"
          aria-label="More reviews"
          onClick={() => nudge(1)}
        >
          ›
        </button>
      ) : null}

      {pageCount > 1 ? (
        <div className="testimonial-dots" role="presentation">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              className={index === activePage ? "testimonial-dot active" : "testimonial-dot"}
              aria-label={`Go to reviews page ${index + 1}`}
              onClick={() => scrollToPage(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
