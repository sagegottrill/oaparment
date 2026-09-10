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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "reset">("signin");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice("");
    setError("");

    try {
      const supabase = createClient();

      if (mode === "reset") {
        const origin = window.location.origin;
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${origin}/login`,
        });
        if (resetError) {
          setError(resetError.message);
          return;
        }
        setNotice("Password reset email sent. Check your inbox.");
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
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
        <p className="eyebrow">{mode === "signin" ? "Guest access" : "Reset password"}</p>
        <h1>{mode === "signin" ? "Welcome back" : "Forgot password"}</h1>
        <p>
          {mode === "signin"
            ? "Sign in to manage bookings and complete checkout faster."
            : "Enter your email and we’ll send a reset link."}
        </p>

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
          {mode === "signin" ? (
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
          ) : null}
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Send reset link"}
          </button>
        </form>

        {error ? <p className="form-error">{error}</p> : null}
        {notice ? <p className="form-success">{notice}</p> : null}

        <p className="auth-footer">
          {mode === "signin" ? (
            <>
              <button type="button" className="linkish" onClick={() => setMode("reset")}>
                Forgot password?
              </button>
              <br />
              New guest? <Link href="/register">Create an account</Link>
            </>
          ) : (
            <button type="button" className="linkish" onClick={() => setMode("signin")}>
              Back to sign in
            </button>
          )}
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="auth-screen">
          <div className="auth-card">
            <p>Loading…</p>
          </div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
