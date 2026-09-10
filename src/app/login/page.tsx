"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      "Sign-in is ready to connect. Paste your Supabase URL and anon key next and this form will authenticate for real."
    );
  }

  return (
    <main className="auth-screen">
      <div className="auth-card">
        <Link href="/" aria-label="The O' Apartments home" style={{ display: "inline-block", marginBottom: "var(--spacing-md)" }}>
          <Image src="/logo.jpeg" alt="The O' Apartments" width={200} height={52} className="brand-logo" priority />
        </Link>
        <p className="eyebrow">Guest access</p>
        <h1>Welcome back</h1>
        <p>Sign in to manage bookings, invoices, and your stay details.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              className="input"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@email.com"
            />
          </label>
          <label>
            Password
            <input
              className="input"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Sign in
          </button>
        </form>

        {notice ? <p className="form-notice">{notice}</p> : null}

        <p className="auth-footer">
          New guest? <Link href="/register">Create an account</Link>
          <br />
          Staff? <Link href="/admin">Admin dashboard</Link>
        </p>
      </div>
    </main>
  );
}
