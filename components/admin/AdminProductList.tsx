"use client";

import { useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { AdminProductEditModal } from "@/components/admin/AdminProductEditModal";

type AdminProduct = Product & { id: string };

export function AdminProductList() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await fetch("/api/admin/products?list=true", {
        credentials: "same-origin",
      });

      if (!response.ok) throw new Error("Unable to load products.");

      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(typeof err === "string" ? err : "Unable to load products.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });

      if (!response.ok) throw new Error("Unable to delete product.");

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(typeof err === "string" ? err : "Unable to delete product.");
    }
  }

  if (loading) {
    return <p className="text-center text-leaf/70">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="text-center text-leaf/70">No products added yet.</p>;
  }

  return (
    <>
      <div className="rounded-[2rem] bg-white p-6 shadow-card md:p-8">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-leaf/70">Your Products</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="rounded-2xl border border-primary/15 bg-cream p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <h3 className="font-heading text-lg font-bold text-leaf">{product.name}</h3>
              <p className="mt-1 text-xs text-leaf/60">{product.category}</p>
              <p className="mt-2 text-sm text-primary font-semibold">
                From {formatCurrency(product.variants[0]?.price || 0)}
              </p>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="ghost"
                  className="flex-1 text-xs"
                  onClick={() => {
                    setEditingProduct(product);
                  }}
                >
                  <Edit2 size={16} /> Edit
                </Button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={16} className="inline mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingProduct && (
        <AdminProductEditModal
          product={editingProduct}
          onClose={() => {
            setEditingProduct(null);
          }}
          onSave={() => {
            setEditingProduct(null);
            loadProducts();
          }}
        />
      )}
    </>
  );
}
