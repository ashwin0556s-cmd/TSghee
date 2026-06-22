import { FirestoreProductDetail } from "@/components/products/FirestoreProductDetail";
import { ProductDetail } from "@/components/products/ProductDetail";
import { getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} | TS Ghee Store`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return <FirestoreProductDetail slug={slug} />;
  }

  return <ProductDetail product={product} />;
}
