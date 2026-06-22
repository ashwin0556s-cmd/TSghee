"use client";

import { useEffect, useState } from "react";
import type { OrderInput } from "@/lib/firestoreOrders";
import { formatCurrency } from "@/lib/utils";

type OrderWithId = OrderInput & { id: string; createdAt?: { seconds: number }; updatedAt?: { seconds: number } };

export function AdminOrdersList() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderWithId[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const response = await fetch("/api/admin/orders", {
        credentials: "same-origin",
      });

      if (!response.ok) throw new Error("Unable to load orders.");

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError(typeof err === "string" ? err : "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(orderId: string, newStatus: string) {
    setUpdating(orderId);

    try {
      const response = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });

      if (!response.ok) throw new Error("Unable to update order.");

      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as never } : o)));
    } catch (err) {
      setError(typeof err === "string" ? err : "Unable to update order.");
    } finally {
      setUpdating(null);
    }
  }

  if (loading) {
    return <p className="text-center text-leaf/70">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center text-leaf/70">No orders yet.</p>;
  }

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-card md:p-8">
      <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-leaf/70">All Orders</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-primary/15 text-left">
            <tr>
              <th className="pb-3 font-semibold text-leaf">Customer</th>
              <th className="pb-3 font-semibold text-leaf">Phone</th>
              <th className="pb-3 font-semibold text-leaf">Product</th>
              <th className="pb-3 font-semibold text-leaf">Qty</th>
              <th className="pb-3 font-semibold text-leaf">Total</th>
              <th className="pb-3 font-semibold text-leaf">Status</th>
              <th className="pb-3 font-semibold text-leaf">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-primary/10 hover:bg-cream">
                <td className="py-3 text-leaf">{order.customerName}</td>
                <td className="py-3 text-leaf">{order.phone}</td>
                <td className="py-3 text-leaf">{order.productName}</td>
                <td className="py-3 text-leaf">{order.quantity}</td>
                <td className="py-3 font-semibold text-primary">{formatCurrency(order.total)}</td>
                <td className="py-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    disabled={updating === order.id}
                    className="rounded-lg border border-primary/15 bg-cream px-2 py-1 text-sm text-leaf"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td className="py-3">
                  <a
                    href={`https://wa.me/91${order.phone}?text=Order%20Update`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-100"
                  >
                    WhatsApp
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
