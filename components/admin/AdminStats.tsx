import { useEffect, useState } from "react";

export function AdminStats() {
  const [loading, setLoading] = useState(true);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [orderCount, setOrderCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          fetch("/api/admin/stats/products"),
          fetch("/api/admin/stats/orders"),
        ]);

        if (!productsRes.ok || !ordersRes.ok) {
          throw new Error("Unable to load stats.");
        }

        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();

        setProductCount(productsData.count ?? 0);
        setOrderCount(ordersData.count ?? 0);
      } catch {
        setError("Unable to load admin stats.");
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-card">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-leaf/70">Admin summary</p>
      {loading ? (
        <p className="mt-4 text-sm text-leaf/70">Loading stats…</p>
      ) : error ? (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-cream p-5 text-center">
            <p className="text-3xl font-bold text-leaf">{productCount}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-leaf/70">Visible products</p>
          </div>
          <div className="rounded-3xl bg-cream p-5 text-center">
            <p className="text-3xl font-bold text-leaf">{orderCount}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-leaf/70">Orders saved</p>
          </div>
        </div>
      )}
    </div>
  );
}
