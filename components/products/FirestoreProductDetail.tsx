"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { getAdminProductBySlug } from "@/lib/firestoreProducts";
import { ProductDetail } from "@/components/products/ProductDetail";

export function FirestoreProductDetail({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminProductBySlug(slug)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="container-page py-16 text-leaf">Loading product...</div>;
  }

  if (!product) {
    return <div className="container-page py-16 text-leaf">Product not found.</div>;
  }

  return <ProductDetail product={product} />;
}
