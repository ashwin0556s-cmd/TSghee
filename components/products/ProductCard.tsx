import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function ProductCard({ product }: { product: Product }) {
  const firstVariant = product.variants[0];

  return (
    <article id={product.slug} className="group overflow-hidden rounded-[1.5rem] bg-cream shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium">
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        {product.highlight ? (
          <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-leaf shadow-sm">
            {product.highlight}
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="font-heading text-2xl font-bold text-leaf">{product.name}</h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-leaf/68">{product.shortDescription}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf/45">From</p>
            <p className="text-lg font-bold text-primary">{formatCurrency(firstVariant.price)}</p>
            <p className="text-xs text-leaf/55">{firstVariant.label}</p>
          </div>
          <Button href={`/products/${product.slug}`} variant="ghost" className="min-h-10 px-4">
            View <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </article>
  );
}
