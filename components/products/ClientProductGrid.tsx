"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { products } from "@/data/products";
import { getAdminProducts } from "@/lib/firestoreProducts";
import { ProductCard } from "@/components/products/ProductCard";

export function ClientProductGrid() {
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminProducts()
      .then(setAdminProducts)
      .catch(() => setAdminProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const allProducts = [...products, ...adminProducts];

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {allProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      {loading ? <p className="mt-6 text-center text-sm font-semibold text-leaf/55">Loading added products...</p> : null}
    </>
  );
}
