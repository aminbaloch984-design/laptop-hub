import Link from "next/link";
import { ChevronRight, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { ACCESSORIES } from "@/data/accessories";
import AccessoryCard from "@/components/AccessoryCard";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Accessories",
  description:
    "Keyboards, mice, hubs, monitors and bags — carefully chosen accessories to complete your laptop setup at LaptopHub.",
};

export default function AccessoriesPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="container-x py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
            <Link href="/" className="transition hover:text-ink">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-semibold text-ink">Accessories</span>
          </nav>

          <div className="mt-4 max-w-2xl">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Accessories
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              The small things that make a big difference — tested by our team and
              stocked because we actually use them.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
              Free delivery over PKR 2 Lacs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
              Genuine products
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PackageCheck className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
              7-day returns
            </span>
          </div>
        </div>
      </section>

      <section className="container-x py-10 lg:py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACCESSORIES.map((accessory, index) => (
            <Reveal key={accessory.id} delay={index * 50} className="h-full">
              <AccessoryCard accessory={accessory} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-card p-6 text-center shadow-soft sm:p-8">
          <h2 className="font-display text-xl font-extrabold tracking-tight text-ink">
            Looking for a bundle?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
            Buy a laptop with any two accessories and our team will apply a 5%
            bundle discount manually on your order confirmation.
          </p>
          <Link href="/contact" className="btn-primary mt-5">
            Ask about bundles
          </Link>
        </div>
      </section>
    </>
  );
}
