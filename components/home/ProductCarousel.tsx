"use client";

import Image from "next/image";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { products } from "@/data/products";
import "swiper/css";
import "swiper/css/effect-fade";

const heroProducts = products.slice(0, 5);

export function ProductCarousel() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-premium">
      <div className="absolute inset-5 rounded-[1.5rem] border border-white/60" />
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={650}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop
        allowTouchMove={false}
        className="aspect-[4/5] overflow-hidden rounded-[1.45rem] sm:aspect-[5/4] lg:aspect-[4/5]"
      >
        {heroProducts.map((product) => (
          <SwiperSlide key={product.slug}>
            <div className="relative h-full w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
                priority={product.slug === "ghee"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-leaf/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/88 p-4 backdrop-blur">
                <p className="font-heading text-2xl font-bold text-leaf">{product.name}</p>
                <p className="mt-1 text-sm text-leaf/70">{product.shortDescription}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
