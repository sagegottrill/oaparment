"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice("");
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.user) {
        await supabase.from("profiles").update({ full_name: fullName }).eq("id", data.user.id);
      }

      if (data.session) {
        await fetch("/api/auth/bootstrap", { method: "POST" });
        router.replace("/my-account");
        router.refresh();
        return;
      }

      setNotice("Account created. Check your email to confirm, then sign in.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-screen">
      <div className="auth-card">
        <Link
          href="/"
          aria-label="The O' Apartments home"
          style={{ display: "inline-block", marginBottom: "var(--spacing-md)" }}
        >
          <Image src="/logo.png" alt="The O' Apartments" width={220} height={56} className="brand-logo" priority />
        </Link>
        <p className="eyebrow">Create account</p>
        <h1>Join The O&apos; Apartments</h1>
        <p>Save stays, checkout faster, and view your booking history.</p>

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
          <label>
            Confirm password
            <input
              className="input"
              type="password"
              required
              minLength={6}
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              placeholder="Repeat password"
            />
          </label>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>

        {error ? <p className="form-error">{error}</p> : null}
        {notice ? (
          <p className="form-success">
            {notice} <Link href="/login">Sign in</Link>
          </p>
        ) : null}

        <p className="auth-footer">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
