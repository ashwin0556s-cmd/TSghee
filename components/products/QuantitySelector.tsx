"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-full border border-primary/15 bg-white">
      <button
        type="button"
        className="focus-ring flex h-12 w-12 items-center justify-center text-leaf transition hover:bg-cream"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, quantity - 1))}
      >
        <Minus size={18} />
      </button>
      <span className="flex h-12 min-w-14 items-center justify-center text-base font-bold text-leaf">{quantity}</span>
      <button
        type="button"
        className="focus-ring flex h-12 w-12 items-center justify-center text-leaf transition hover:bg-cream"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
