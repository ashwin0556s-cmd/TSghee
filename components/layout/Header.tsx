"use client";

import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { business } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/layout/LogoMark";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "#contact" },
  { label: "Admin", href: "/admin" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-cream/90 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="min-w-0">
          <LogoMark />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-leaf/75 transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a className="flex items-center gap-2 text-sm font-semibold text-leaf/70" href={`tel:+91${business.whatsapp}`}>
            <Phone size={17} />
            {business.whatsappDisplay}
          </a>
          <Button href="/products" className="min-h-11 px-5">
            <ShoppingBag size={18} />
            Order Now
          </Button>
        </div>

        <button
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-leaf shadow-sm md:hidden"
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-primary/10 bg-cream px-4 py-4 shadow-card md:hidden">
          <div className="container-page flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-leaf"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/products" className="w-full" onClick={() => setOpen(false)}>
              <ShoppingBag size={18} />
              Order Now
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
