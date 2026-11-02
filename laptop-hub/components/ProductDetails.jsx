"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BatteryCharging,
  Check,
  ChevronRight,
  Cpu,
  HardDrive,
  MemoryStick,
  Minus,
  Monitor,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Weight,
  Zap,
} from "lucide-react";
import { formatPKR } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Stars from "@/components/Stars";

const SPEC_ROWS = (product) => [
  { label: "Processor", value: product.processor },
  { label: "Memory", value: `${product.ram}GB RAM` },
  { label: "Storage", value: product.storage },
  { label: "Graphics", value: product.gpu },
  { label: "Display", value: product.display },
  { label: "Operating system", value: product.os },
  { label: "Battery life", value: product.battery },
  { label: "Weight", value: product.weight },
  { label: "Colour", value: product.color },
  { label: "Warranty", value: "1-year official warranty" },
];

export default function ProductDetails({ product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const inStock = product.stock > 0;

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push("/cart");
  };

  const keySpecs = [
    { icon: Cpu, label: "Processor", value: product.processor },
    { icon: MemoryStick, label: "Memory", value: `${product.ram}GB RAM` },
    { icon: HardDrive, label: "Storage", value: product.storage },
    { icon: Monitor, label: "Display", value: product.display },
    { icon: BatteryCharging, label: "Battery", value: product.battery },
    { icon: Weight, label: "Weight", value: product.weight },
  ];

  return (
    <div className="container-x py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="transition hover:text-ink">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <Link href="/products" className="transition hover:text-ink">
          All laptops
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <Link
          href={`/products?category=${product.category}`}
          className="capitalize transition hover:text-ink"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="font-semibold text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-2 shadow-soft">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 92vw"
                className="object-cover"
              />
              {product.badge ? (
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                  <Zap className="h-3 w-3 text-accent-400" aria-hidden="true" />
                  {product.badge}
                </span>
              ) : null}
              {discount > 0 ? (
                <span className="absolute right-4 top-4 rounded-full bg-rose-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Save {discount}%
                </span>
              ) : null}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { icon: ShieldCheck, label: "Genuine unit" },
              { icon: Truck, label: "Ships in 24h" },
              { icon: RotateCcw, label: "7-day returns" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-2 py-2.5 text-[11px] font-semibold text-slate-600"
                >
                  <Icon className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                  {item.label}
                </div>
              );
            })}
          </div>

          {/* Key spec strip */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {keySpecs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.label}
                  className="rounded-xl border border-line bg-card p-3"
                >
                  <Icon className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {spec.label}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[11.5px] font-semibold leading-snug text-ink">
                    {spec.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
              {product.brand}
            </span>
            <span className="chip capitalize">{product.category}</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${
                inStock
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-600"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-emerald-500" : "bg-rose-500"}`}
              />
              {inStock ? `In stock · ${product.stock} units` : "Out of stock"}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-[40px]">
            {product.brand} {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Stars rating={product.rating} size={15} showValue />
            <span className="text-xs text-muted">
              ({product.reviewCount} verified reviews)
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {product.description}
          </p>

          <div className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-soft">
            <div className="flex flex-wrap items-end gap-3">
              <p className="font-display text-[34px] font-extrabold leading-none tracking-tight text-ink">
                {formatPKR(product.price)}
              </p>
              {product.oldPrice ? (
                <>
                  <p className="text-sm font-medium text-slate-400 line-through">
                    {formatPKR(product.oldPrice)}
                  </p>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                    You save {formatPKR(product.oldPrice - product.price)}
                  </span>
                </>
              ) : null}
            </div>
            <p className="mt-1.5 text-xs text-muted">
              Inclusive of all taxes · 0% installment plans available at checkout
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-12 w-fit items-center rounded-xl border border-line">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  disabled={quantity <= 1}
                  className="grid h-full w-11 place-items-center rounded-l-xl text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span
                  className="grid h-full w-12 place-items-center border-x border-line text-sm font-bold text-ink"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((value) => Math.min(product.stock, value + 1))
                  }
                  disabled={quantity >= product.stock}
                  className="grid h-full w-11 place-items-center rounded-r-xl text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => addItem(product, quantity)}
                disabled={!inStock}
                className="btn-primary h-12 flex-1"
              >
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!inStock}
                className="btn-dark h-12 flex-1"
              >
                Buy Now
              </button>
            </div>

            <ul className="mt-5 grid gap-2 border-t border-line pt-4 text-[12px] text-slate-600">
              <li className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-brand-600" aria-hidden="true" />
                Free delivery in Karachi &amp; Lahore · 2–3 days nationwide
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-600" aria-hidden="true" />
                Official 1-year warranty with local service support
              </li>
              <li className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-brand-600" aria-hidden="true" />
                7-day return on unopened boxes — no restocking fee
              </li>
            </ul>
          </div>

          {/* Highlights */}
          <div className="mt-6">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
              Why this model
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {product.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-600"
                >
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Full specifications */}
      <section className="mt-14" aria-labelledby="specs-heading">
        <h2
          id="specs-heading"
          className="font-display text-2xl font-extrabold tracking-tight text-ink"
        >
          Full specifications
        </h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-card">
          <dl className="grid sm:grid-cols-2">
            {SPEC_ROWS(product).map((row, index) => (
              <div
                key={row.label}
                className={`flex items-start justify-between gap-4 px-5 py-4 text-sm ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                } ${index < SPEC_ROWS(product).length - 1 ? "border-b border-line" : ""}`}
              >
                <dt className="font-medium text-muted">{row.label}</dt>
                <dd className="text-right font-semibold text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
