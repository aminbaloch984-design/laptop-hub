"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Zap } from "lucide-react";
import { formatPKR } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Stars from "@/components/Stars";

export default function ProductCard({ product, priority = false }) {
  const { addItem } = useCart();

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-slate-100"
        aria-label={`View ${product.brand} ${product.name}`}
      >
        <Image
          src={product.image}
          alt={`${product.brand} ${product.name} laptop`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.05]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        {product.badge ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
            <Zap className="h-3 w-3 text-accent-400" aria-hidden="true" />
            {product.badge}
          </span>
        ) : null}

        {discount > 0 ? (
          <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            -{discount}%
          </span>
        ) : null}

        <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm backdrop-blur">
          {product.brand}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[17px] font-bold leading-snug text-ink">
            <Link
              href={`/products/${product.id}`}
              className="transition hover:text-brand-600"
            >
              {product.name}
            </Link>
          </h3>
          <Stars rating={product.rating} size={12} className="mt-1 shrink-0" />
        </div>

        <p className="mt-1 line-clamp-1 text-xs font-medium text-muted">
          {product.processor}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="chip !px-2.5 !py-0.5 !text-[11px]">{product.ram}GB RAM</span>
          <span className="chip !px-2.5 !py-0.5 !text-[11px]">{product.storage}</span>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="font-display text-lg font-extrabold tracking-tight text-ink">
                {formatPKR(product.price)}
              </p>
              {product.oldPrice ? (
                <p className="text-xs font-medium text-slate-400 line-through">
                  {formatPKR(product.oldPrice)}
                </p>
              ) : null}
            </div>
            <span
              className={`pb-0.5 text-[11px] font-semibold ${
                product.stock <= 5 ? "text-rose-500" : "text-emerald-600"
              }`}
            >
              {product.stock <= 5 ? `Only ${product.stock} left` : "In stock"}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => addItem(product, 1)}
              className="btn-primary !px-3 !py-2.5 text-[13px]"
            >
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              Add to Cart
            </button>
            <Link
              href={`/products/${product.id}`}
              className="btn-ghost !px-3 !py-2.5 text-[13px]"
            >
              Details
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
