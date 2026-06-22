import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

export function ProductGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
