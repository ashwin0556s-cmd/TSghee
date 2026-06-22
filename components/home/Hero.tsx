import { ArrowRight, Truck } from "lucide-react";
import { business } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { ProductCarousel } from "@/components/home/ProductCarousel";

export function Hero() {
  return (
    <section className="container-page grid min-h-[calc(100vh-5rem)] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
      <div>
        <p className="mb-4 font-tamil text-lg font-bold text-accent md:text-xl">{business.tamilBlessing}</p>
        <h1 className="font-heading text-6xl font-black leading-[0.92] text-primary sm:text-7xl lg:text-8xl">
          {business.name}
        </h1>
        <p className="mt-6 text-2xl font-semibold text-leaf md:text-3xl">{business.tagline}</p>
        <p className="mt-5 max-w-xl text-base leading-8 text-leaf/72 md:text-lg">{business.description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/products" className="w-full sm:w-auto">
            Order Now <ArrowRight size={18} />
          </Button>
          <Button href="/products#milk" variant="ghost" className="w-full sm:w-auto">
            <Truck size={18} /> Milk Door Delivery
          </Button>
        </div>
        <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
          {["Farm Fresh", "Traditional", "No Preservatives"].map((item) => (
            <div key={item} className="rounded-2xl bg-white/75 p-4 text-center text-xs font-bold uppercase tracking-wide text-leaf shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </div>
      <ProductCarousel />
    </section>
  );
}
