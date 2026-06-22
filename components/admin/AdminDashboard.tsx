"use client";

import { useEffect, useState } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminProductForm } from "@/components/admin/AdminProductForm";
import { AdminProductList } from "@/components/admin/AdminProductList";
import { AdminOrdersList } from "@/components/admin/AdminOrdersList";
import { AdminStats } from "@/components/admin/AdminStats";
import { Button } from "@/components/ui/Button";

export function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/status", {
      method: "GET",
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => setAuthenticated(Boolean(data.authenticated)))
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    setAuthenticated(false);
    setMessage("Logged out successfully.");
  }

  if (loading) {
    return <div className="container-page py-16 text-leaf">Checking admin session...</div>;
  }

  return (
    <section className="container-page py-10 md:py-16">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-accent">Admin access</p>
        <h1 className="font-heading text-5xl font-bold text-leaf md:text-6xl">Admin sign in</h1>
        <p className="mt-4 text-base leading-7 text-leaf/70">
          Sign in to manage which products appear on the Products page. Your session is protected with a server-side cookie.
        </p>
      </div>

      {authenticated ? (
        <>
          <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_1.6fr]">
            <AdminStats />
            <div className="rounded-[2rem] bg-white p-6 shadow-card">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-leaf">Admin session is active.</p>
                <Button variant="secondary" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
              {message ? <p className="mt-4 text-sm font-semibold text-primary">{message}</p> : null}
            </div>
          </div>

          <div className="mb-8 grid gap-8">
            <AdminProductForm />
            <AdminProductList />
            <AdminOrdersList />
          </div>
        </>
      ) : (
        <div className="rounded-[2rem] bg-white p-6 shadow-card max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-leaf/70">Sign in</p>
          <p className="mt-3 text-sm leading-6 text-leaf/80">
            Use your admin email and password to access product management. Login is required before items can be added or edited.
          </p>
          <AdminLoginForm onSuccess={() => setAuthenticated(true)} />
          <p className="mt-5 text-sm text-leaf/60">
            If this is your first time, admin credentials are configured in your environment variables. Contact the site owner if you do not have them.
          </p>
        </div>
      )}
    </section>
  );
}
