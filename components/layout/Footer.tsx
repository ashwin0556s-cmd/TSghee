import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/business";

export function Footer() {
  return (
    <footer id="contact" className="bg-leaf text-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-heading text-3xl font-black">{business.name}</p>
          <p className="mt-2 font-tamil text-sm font-bold text-accent">{business.tamilBlessing}</p>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/72">{business.address}</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">Contact</h3>
          <div className="space-y-3 text-sm text-white/80">
            <a className="flex items-center gap-3 transition hover:text-white" href={`tel:+91${business.contact}`}>
              <Phone size={18} /> {business.contact}
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" href={`https://wa.me/91${business.whatsapp}`}>
              <MessageCircle size={18} /> WhatsApp {business.whatsappDisplay}
            </a>
            <a className="flex items-center gap-3 transition hover:text-white" href={`mailto:${business.email}`}>
              <Mail size={18} /> {business.email}
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">Visit</h3>
          <div className="space-y-3 text-sm text-white/80">
            <p className="flex items-start gap-3">
              <MapPin className="mt-1 shrink-0" size={18} /> Tiruchirapalli - 620 008
            </p>
            <a className="flex items-center gap-3 transition hover:text-white" href={business.instagram}>
              <Instagram size={18} /> Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        Copyright © {new Date().getFullYear()} TS Ghee Store. All rights reserved.
      </div>
    </footer>
  );
}
