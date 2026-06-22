"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

export function AdminLoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "same-origin",
      });

      if (!response.ok) {
        const result = await response.json();
        setMessage(result?.error || "Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      onSuccess();
    } catch {
      setMessage("Unable to login. Check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 shadow-premium md:p-8">
      <div className="mb-6 rounded-3xl bg-cream px-6 py-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-leaf/70">Admin access</p>
        <p className="mt-3 text-sm leading-6 text-leaf/80">
          Enter your admin credentials to sign in and manage the product catalog.
        </p>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-leaf">
        Email
        <input
          className="focus-ring min-h-12 rounded-2xl border border-primary/15 bg-cream px-4"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin@example.com"
        />
      </label>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-leaf">
        Password
        <input
          className="focus-ring min-h-12 rounded-2xl border border-primary/15 bg-cream px-4"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
        />
      </label>

      {message ? <p className="mt-5 rounded-2xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">{message}</p> : null}

      <Button className="mt-6 w-full" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Sign in"}
      </Button>
    </form>
  );
}
