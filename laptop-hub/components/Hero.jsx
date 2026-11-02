import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";

const BRAND_NAMES = ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer", "MSI"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden mesh-hero">
      {/* Decorative grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(60% 60% at 50% 40%, black, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(60% 60% at 50% 40%, black, transparent 100%)",
        }}
      />

      <div className="container-x relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        {/* Copy */}
        <div className="max-w-xl">
          <span className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            2026 lineup · official warranty
          </span>

          <h1 className="mt-5 font-display text-[40px] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[54px] lg:text-[64px]">
            Find Your <span className="gradient-text">Perfect Laptop</span>
          </h1>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-slate-600 sm:text-base">
            Discover powerful laptops for gaming, business, creativity and everyday
            productivity — genuine stock, transparent PKR pricing and expert advice
            from people who actually use them.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary !px-6 !py-3.5 text-[15px]">
              Explore Laptops
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/products?sort=price-asc" className="btn-ghost !px-6 !py-3.5 text-[15px]">
              Shop Now
            </Link>
          </div>

          {/* Trust row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-medium text-slate-600">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-600" aria-hidden="true" />
              1-year official warranty
            </span>
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4 text-brand-600" aria-hidden="true" />
              Nationwide delivery
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-brand-600" aria-hidden="true" />
              100% genuine stock
            </span>
          </div>

          {/* Brand strip */}
          <div className="mt-10 border-t border-line pt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Authorised for
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
              {BRAND_NAMES.map((brand) => (
                <span
                  key={brand}
                  className="font-display text-sm font-bold tracking-tight text-slate-400 transition hover:text-slate-600"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -right-6 -top-8 h-40 w-40 rounded-full bg-brand-400/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-10 -left-8 h-44 w-44 rounded-full bg-accent-400/25 blur-3xl"
          />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white p-2 shadow-lift ring-1 ring-line">
            <div className="relative aspect-[4/3.2] overflow-hidden rounded-[1.6rem] bg-slate-100">
              <Image
                src="/images/products/macbook-pro.jpg"
                alt="Premium laptop on a desk, available at LaptopHub"
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />

              {/* Floating spec chip */}
              <div className="absolute left-4 top-4 animate-float rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white backdrop-blur-md">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/70">
                  Now in stock
                </p>
                <p className="font-display text-sm font-bold">M3 Pro · 18GB · 512GB</p>
              </div>

              {/* Rating chip */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-ink shadow-sm backdrop-blur">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                4.9 · 2,400+ reviews
              </div>

              {/* Price card */}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl bg-white/95 p-3.5 shadow-lift backdrop-blur">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">
                    Featured this week
                  </p>
                  <p className="mt-0.5 font-display text-[15px] font-bold text-ink">
                    MacBook Pro 14 · M3 Pro
                  </p>
                  <p className="text-[11px] text-muted">Space Black · 14.2&quot; XDR</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-base font-extrabold text-ink">PKR 6.49 Lacs</p>
                  <Link
                    href="/products/macbook-pro-14-m3-pro"
                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:text-brand-700"
                  >
                    View deal
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stat pills */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { value: "500+", label: "Models in stock" },
              { value: "4.9/5", label: "Buyer rating" },
              { value: "12", label: "Cities delivered" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-line bg-white/80 px-3 py-2.5 text-center backdrop-blur"
              >
                <p className="font-display text-base font-extrabold text-ink">{stat.value}</p>
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
