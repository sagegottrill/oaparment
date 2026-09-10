"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      "Registration is ready. Once Supabase Auth is connected, this will create a guest account."
    );
  }

  return (
    <main className="auth-screen">
      <div className="auth-card">
        <Link href="/" aria-label="The O' Apartments home" style={{ display: "inline-block", marginBottom: "var(--spacing-md)" }}>
          <Image src="/logo.jpeg" alt="The O' Apartments" width={200} height={52} className="brand-logo" priority />
        </Link>
        <p className="eyebrow">Create account</p>
        <h1>Join The O&apos; Apartments</h1>
        <p>Save stays, complete checkout faster, and view your booking history.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input
              className="input"
              type="text"
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Your name"
            />
          </label>
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
              placeholder="At least 6 characters"
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Create account
          </button>
        </form>

        {notice ? <p className="form-notice">{notice}</p> : null}

        <p className="auth-footer">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
