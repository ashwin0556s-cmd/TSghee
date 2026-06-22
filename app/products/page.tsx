import { ClientProductGrid } from "@/components/products/ClientProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Products | TS Ghee Store",
  description: "Browse ghee, butter, paneer, curd, milk, cheese and palkova from TS Ghee Store.",
};

export default function ProductsPage() {
  return (
    <section className="container-page py-12 md:py-16">
      <SectionHeading
        eyebrow="Products"
        title="Choose your dairy essentials"
        copy="Prices are placeholders for now. Each product includes editable amount variants like ml, litre, kg and tin can packs."
      />
      <ClientProductGrid />
    </section>
  );
}
