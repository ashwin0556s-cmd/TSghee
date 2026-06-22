"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { formatCurrency } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const [variantLabel, setVariantLabel] = useState(product.variants[0].label);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.label === variantLabel) ?? product.variants[0],
    [product.variants, variantLabel],
  );

  const total = selectedVariant.price * quantity;
  const checkoutHref = `/checkout?product=${product.slug}&variant=${encodeURIComponent(selectedVariant.label)}&quantity=${quantity}`;

  return (
    <section className="container-page grid gap-8 py-10 md:py-16 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white shadow-premium md:aspect-[5/4] lg:aspect-[4/5]">
        <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
      </div>

      <div className="flex flex-col justify-center rounded-[2rem] bg-white p-6 shadow-card md:p-10">
        {product.highlight ? (
          <span className="mb-4 w-fit rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-leaf">
            {product.highlight}
          </span>
        ) : null}
        <h1 className="font-heading text-5xl font-bold text-leaf md:text-6xl">{product.name}</h1>
        <p className="mt-5 text-base leading-8 text-leaf/70">{product.description}</p>

        <div className="mt-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-leaf/50">Choose quantity variant</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {product.variants.map((variant) => (
              <button
                key={variant.label}
                type="button"
                className={`focus-ring rounded-2xl border p-4 text-left transition ${
                  variant.label === selectedVariant.label
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                    : "border-primary/12 bg-cream text-leaf hover:border-primary/35"
                }`}
                onClick={() => setVariantLabel(variant.label)}
              >
                <span className="block text-sm font-bold">{variant.label}</span>
                <span className="mt-1 block text-lg font-black">{formatCurrency(variant.price)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-cream p-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf/50">Quantity</p>
            <div className="mt-3">
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf/50">Total</p>
            <p className="mt-2 text-3xl font-black text-primary">{formatCurrency(total)}</p>
          </div>
        </div>

        <Button href={checkoutHref} className="mt-7 w-full">
          <ShoppingBag size={19} />
          Buy Now
        </Button>
      </div>
    </section>
  );
}
