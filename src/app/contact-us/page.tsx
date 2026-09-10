"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import LocationMap from "@/components/LocationMap";
import { BOOK_NOW_HREF } from "@/lib/booking";

export default function ContactUsPage() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const text = `Hello The O' Apartments,%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0A${encodeURIComponent(message)}`;
    window.open(`https://wa.me/2348075963676?text=${text}`, "_blank");
    setNotice("Opening WhatsApp with your message…");
  }

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Talk to us</p>
          <h1>Contact us</h1>
          <p>We are in Ilaro, Ogun State — a few minutes from Dangote Cement and the main town routes.</p>
        </div>
      </section>

      <section className="container book-wide section-pad">
        <div className="account-grid contact-grid">
          <div className="card account-panel">
            <h2>Visit</h2>
            <p>
              3 Tunji Otegbeye Street, Ona Egbo,
              <br />
              Ilaro, Ogun State
            </p>
            <h2>Call</h2>
            <p>
              <a href="tel:08075963676">08075963676</a>
              <br />
              <a href="tel:07060922880">07060922880</a>
            </p>
            <h2>Email</h2>
            <p>
              <a href="mailto:info@oapartment.com">info@oapartment.com</a>
            </p>
            <Link href={BOOK_NOW_HREF} className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
              Book Now
            </Link>
          </div>
          <div className="card account-panel">
            <h2>Send a message</h2>
            <p style={{ color: "var(--color-text-muted)", marginTop: 0 }}>
              We’ll open WhatsApp with your note so you can finish sending on your phone.
            </p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input className="input" name="name" required placeholder="Your name" />
              </label>
              <label>
                Email
                <input className="input" type="email" name="email" required placeholder="you@email.com" />
              </label>
              <label>
                Message
                <textarea className="input" name="message" rows={5} required placeholder="How can we help?" />
              </label>
              <button className="btn btn-primary" type="submit">
                Send message
              </button>
            </form>
            {notice ? <p className="form-notice">{notice}</p> : null}
          </div>
        </div>

        <div className="contact-map-block">
          <h2>Find us on the map</h2>
          <LocationMap title="The O' Apartments contact map" />
        </div>
      </section>
    </main>
  );
}
