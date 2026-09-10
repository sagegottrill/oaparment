"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/my-account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setNotice(error.message);
        return;
      }

      await fetch("/api/auth/bootstrap", { method: "POST" });

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (profile?.role === "admin") {
          router.replace("/admin");
          router.refresh();
          return;
        }
      }

      router.replace(next.startsWith("/") ? next : "/my-account");
      router.refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-screen">
      <div className="auth-card">
        <Link href="/" aria-label="The O' Apartments home" style={{ display: "inline-block", marginBottom: "var(--spacing-md)" }}>
          <Image src="/logo.png" alt="The O' Apartments" width={200} height={52} className="brand-logo" priority />
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
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
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

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="auth-screen"><div className="auth-card"><p>Loading…</p></div></main>}>
      <LoginForm />
    </Suspense>
  );
}
