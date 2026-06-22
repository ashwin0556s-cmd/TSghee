import { BadgeCheck, Leaf, Milk, Utensils } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const items = [
  { title: "Farm Fresh", copy: "Fresh dairy essentials made for daily family use.", icon: Milk },
  { title: "No Preservatives", copy: "Simple products with a clean and honest dairy taste.", icon: Leaf },
  { title: "Traditional Method", copy: "Prepared with care for authentic South Indian kitchens.", icon: Utensils },
  { title: "Daily Production", copy: "Fresh batches and convenient supply for homes.", icon: BadgeCheck },
];

export function WhyChooseUs() {
  return (
    <AnimatedSection className="bg-cream py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why choose us"
          title="Built on freshness and trust"
          copy="A local dairy store in Tiruchirapalli focused on purity, tradition and simple ordering."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="group rounded-[1.5rem] bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition duration-300 group-hover:bg-accent group-hover:text-leaf">
                  <Icon size={26} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-leaf">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-leaf/68">{item.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
