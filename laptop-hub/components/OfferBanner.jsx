import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";

export default function OfferBanner() {
  return (
    <section className="container-x py-16 lg:py-20">
      <div className="relative overflow-hidden rounded-[2rem] mesh-dark shadow-glow">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(70% 70% at 30% 50%, black, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(70% 70% at 30% 50%, black, transparent 100%)",
          }}
        />

        <div className="relative grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-300 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Limited-time offer
            </span>

            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[44px]">
              Upgrade Your Setup Today
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
              Save up to 15% on selected gaming and creator laptops, and get a free
              premium sleeve with every order above PKR 3,00,000.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/products?sort=discount"
                className="btn bg-white text-ink hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Shop the sale
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Clock3 className="h-4 w-4 text-accent-400" aria-hidden="true" />
                Ends Sunday midnight
              </span>
            </div>

            <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                { value: "15%", label: "Max discount" },
                { value: "0%", label: "Installments*" },
                { value: "24h", label: "Karachi delivery" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="font-display text-xl font-extrabold text-white">
                    {item.value}
                  </dt>
                  <dd className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/15">
              <Image
                src="/images/products/gaming-rgb.jpg"
                alt="Gaming laptop on offer at LaptopHub"
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/60 via-ink/10 to-transparent" />
            </div>

            <div className="absolute -left-3 bottom-5 rounded-2xl bg-white p-3.5 shadow-lift sm:-left-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">
                Bundle bonus
              </p>
              <p className="mt-1 font-display text-sm font-bold text-ink">
                Free sleeve + mouse
              </p>
              <p className="text-[11px] text-muted">On orders above PKR 3 Lacs</p>
            </div>

            <div className="absolute -right-2 top-5 grid h-16 w-16 place-items-center rounded-full bg-accent-500 text-center font-display text-sm font-extrabold leading-none text-ink shadow-lg sm:-right-4 sm:h-20 sm:w-20 sm:text-base">
              <span>
                -15%
                <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-wide">
                  off
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-slate-400">
        *0% installment plans are offered by partner banks and subject to approval.
      </p>
    </section>
  );
}
