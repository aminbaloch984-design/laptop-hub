import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

const SOCIALS = [
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-ink text-slate-300">
      <div className="container-x py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Company */}
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="LaptopHub home">
              <span className="relative h-11 w-11 overflow-hidden rounded-xl ring-1 ring-white/10">
                <Image
                  src="/images/logo.png"
                  alt="LaptopHub logo"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                Laptop<span className="text-accent-400">Hub</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Pakistan&apos;s premium laptop destination. Genuine stock, official
              warranties and expert advice for gamers, businesses and creators — from
              Karachi to Islamabad.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-slate-300 ring-1 ring-white/10 transition hover:bg-brand-600 hover:text-white hover:ring-brand-500"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Quick links
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { label: "All laptops", href: "/products" },
                { label: "Gaming laptops", href: "/products?category=gaming" },
                { label: "Business laptops", href: "/products?category=business" },
                { label: "Accessories", href: "/accessories" },
                { label: "About us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer support */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Customer support
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { label: "Track your order", href: "/contact" },
                { label: "Shipping & delivery", href: "/about#shipping" },
                { label: "Returns & warranty", href: "/about#warranty" },
                { label: "Bulk & corporate orders", href: "/contact" },
                { label: "FAQs", href: "/about#faq" },
                { label: "Privacy policy", href: "/about#privacy" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-slate-400">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden="true" />
                <span>
                  Shop 24, Tech Avenue,<br />
                  Clifton Block 5, Karachi
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden="true" />
                <a href="tel:+922111111222" className="transition hover:text-white">
                  +92 21 111 112 222
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden="true" />
                <a
                  href="mailto:hello@laptophub.pk"
                  className="transition hover:text-white"
                >
                  hello@laptophub.pk
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Visa", "Mastercard", "Easypaisa", "JazzCash", "COD"].map((method) => (
                <span
                  key={method}
                  className="rounded-md bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 ring-1 ring-white/10"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LaptopHub. All rights reserved.</p>
          <p>
            Demo storefront — product data and prices are sample content for
            presentation.
          </p>
        </div>
      </div>
    </footer>
  );
}
