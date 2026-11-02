import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Clapperboard,
  Feather,
  Gamepad2,
  GraduationCap,
} from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import Reveal from "@/components/Reveal";

const ICONS = {
  Gamepad2,
  Briefcase,
  GraduationCap,
  Clapperboard,
  Feather,
};

export default function Categories() {
  return (
    <section className="container-x py-16 lg:py-20" aria-labelledby="categories-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow">Shop by category</span>
          <h2
            id="categories-heading"
            className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl"
          >
            Built for the way you work and play
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Five curated collections, each hand-picked by our product team so you
            don&apos;t have to compare a hundred spec sheets.
          </p>
        </div>
        <Link href="/products" className="link-underline shrink-0 text-sm">
          View all laptops
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {CATEGORIES.map((category, index) => {
          const Icon = ICONS[category.icon] ?? Gamepad2;
          const count = PRODUCTS.filter((product) => product.category === category.slug).length;

          return (
            <Reveal key={category.slug} delay={index * 60} className="h-full">
              <Link
                href={`/products?category=${category.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-card p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,.9)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <h3 className="mt-4 font-display text-[15px] font-bold text-ink">
                  {category.name}
                </h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted">
                  {category.blurb}
                </p>

                <span className="mt-4 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  {count} {count === 1 ? "model" : "models"}
                  <ArrowUpRight
                    className="h-4 w-4 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
