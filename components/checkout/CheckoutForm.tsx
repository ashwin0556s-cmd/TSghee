"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/data/products";
import { products } from "@/data/products";
import { getAdminProductBySlug } from "@/lib/firestoreProducts";
import { addOrder } from "@/lib/firestoreOrders";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/products/QuantitySelector";

export function CheckoutForm() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product") ?? "ghee";
  const initialProduct = products.find((item) => item.slug === productSlug) ?? products[0];
  const [product, setProduct] = useState<Product>(initialProduct);
  const [variantLabel, setVariantLabel] = useState(searchParams.get("variant") ?? initialProduct.variants[0].label);
  const [quantity, setQuantity] = useState(Number(searchParams.get("quantity") ?? 1));
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (products.some((item) => item.slug === productSlug)) return;

    getAdminProductBySlug(productSlug).then((firestoreProduct) => {
      if (!firestoreProduct) return;
      setProduct(firestoreProduct);
      setVariantLabel(searchParams.get("variant") ?? firestoreProduct.variants[0].label);
    });
  }, [productSlug, searchParams]);

  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.label === variantLabel) ?? product.variants[0],
    [product.variants, variantLabel],
  );
  const total = selectedVariant.price * quantity;

  async function submitOrder() {
    setSaving(true);
    setMessage("");

    try {
      await addOrder({
        customerName,
        phone,
        address,
        productName: product.name,
        variant: selectedVariant.label,
        quantity,
        total,
        status: "Pending",
      });

      const url = buildWhatsAppOrderUrl({
        customerName,
        phone,
        address,
        productName: product.name,
        variant: selectedVariant.label,
        quantity,
        total,
      });

      window.location.href = url;
    } catch {
      setMessage("Could not save order. Check Firebase setup and try again.");
      setSaving(false);
    }
  }

  const isReady = customerName.trim() && phone.trim() && address.trim();

  return (
    <section className="container-page grid gap-6 py-10 md:py-16 lg:grid-cols-[1fr_0.8fr]">
      <div className="rounded-[2rem] bg-white p-6 shadow-card md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">Checkout</p>
        <h1 className="font-heading text-4xl font-bold text-leaf md:text-5xl">Complete your order</h1>
        <div className="mt-8 grid gap-5">
          <label className="grid gap-2 text-sm font-semibold text-leaf">
            Name
            <input
              className="focus-ring min-h-12 rounded-2xl border border-primary/15 bg-cream px-4 text-base font-normal"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-leaf">
            Phone Number
            <input
              className="focus-ring min-h-12 rounded-2xl border border-primary/15 bg-cream px-4 text-base font-normal"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Mobile number"
              inputMode="tel"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-leaf">
            Address
            <textarea
              className="focus-ring min-h-32 rounded-2xl border border-primary/15 bg-cream px-4 py-3 text-base font-normal"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Delivery address"
            />
          </label>

          <p className="rounded-2xl bg-primary/8 px-4 py-3 text-sm font-semibold leading-6 text-primary">
            No online payment. No platform charge. No hidden fee. Pay only for the product when the seller confirms your order.
          </p>
        </div>
      </div>

      <aside className="rounded-[2rem] bg-leaf p-6 text-white shadow-premium md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Order summary</p>
        <h2 className="mt-3 font-heading text-4xl font-bold">{product.name}</h2>
        <p className="mt-3 text-sm leading-6 text-white/70">{product.shortDescription}</p>

        <div className="mt-7">
          <p className="mb-3 text-sm font-bold text-white/70">Product Details</p>
          <select
            aria-label="Choose product variant"
            className="focus-ring min-h-12 w-full rounded-2xl border border-white/15 bg-white px-4 text-leaf"
            value={variantLabel}
            onChange={(event) => setVariantLabel(event.target.value)}
          >
            {product.variants.map((variant) => (
              <option key={variant.label} value={variant.label}>
                {variant.label} - {formatCurrency(variant.price)}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex items-center justify-between gap-5 rounded-3xl bg-white/10 p-4">
          <div>
            <p className="mb-2 text-sm font-bold text-white/70">Quantity</p>
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white/70">Total</p>
            <p className="mt-2 text-3xl font-black text-accent">{formatCurrency(total)}</p>
          </div>
        </div>

        {message ? <p className="mt-5 rounded-3xl bg-white/10 p-4 text-sm font-semibold text-accent">{message}</p> : null}

        <Button disabled={!isReady || saving} onClick={submitOrder} variant="secondary" className="mt-7 w-full disabled:cursor-not-allowed disabled:opacity-55">
          <MessageCircle size={19} />
          {saving ? "Saving Order..." : "Submit Order on WhatsApp"}
        </Button>
      </aside>
    </section>
  );
}
