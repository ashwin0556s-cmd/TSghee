
import { ProductCard } from "@/components/products/ProductCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/data/products";

export function ProductsOverview() {
  return (
    <AnimatedSection className="bg-white py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Available products"
          title="Daily dairy, premium taste"
          copy="Choose from fresh dairy products with multiple quantity variants. Milk home delivery is available."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/products" variant="secondary">
            View All Products
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
