"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Package,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { formatPKR } from "@/data/products";
import {
  FREE_SHIPPING_THRESHOLD,
  useCart,
} from "@/context/CartContext";

export default function CartView() {
  const {
    items,
    hydrated,
    subtotal,
    shipping,
    total,
    count,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [order, setOrder] = useState(null);

  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const placeOrder = () => {
    const orderId = `LH-${Date.now().toString().slice(-6)}`;
    setOrder({ id: orderId, total, items: count });
    clearCart();
  };

  /* ----------------------------- Order success ---------------------------- */
  if (order) {
    return (
      <div className="container-x py-16 lg:py-24">
        <div className="mx-auto max-w-lg rounded-3xl border border-line bg-card p-8 text-center shadow-soft sm:p-10">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink">
            Order placed
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Thank you! Your demo order <strong className="text-ink">#{order.id}</strong>{" "}
            has been recorded. A confirmation would normally be emailed to you.
          </p>

          <dl className="mt-6 space-y-2 rounded-2xl bg-slate-50 p-4 text-left text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Items</dt>
              <dd className="font-semibold text-ink">{order.items}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Order total</dt>
              <dd className="font-semibold text-ink">{formatPKR(order.total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd className="font-semibold text-ink">2–3 working days</dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className="btn-primary flex-1">
              Continue shopping
            </Link>
            <Link href="/contact" className="btn-ghost flex-1">
              Contact support
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------- Loading ------------------------------- */
  if (!hydrated) {
    return (
      <div className="container-x py-12">
        <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-2xl border border-line bg-white"
              />
            ))}
          </div>
          <div className="h-80 animate-pulse rounded-2xl border border-line bg-white" />
        </div>
      </div>
    );
  }

  /* -------------------------------- Empty --------------------------------- */
  if (items.length === 0) {
    return (
      <div className="container-x py-16 lg:py-24">
        <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center sm:p-12">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
            <ShoppingBag className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Add a laptop to get started — or browse the collections to see what is in
            stock this week.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/products" className="btn-primary">
              Browse laptops
            </Link>
            <Link href="/products?category=gaming" className="btn-ghost">
              Gaming picks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------- Cart ---------------------------------- */
  return (
    <div className="container-x py-10 lg:py-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
            <Link href="/" className="transition hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-ink">Cart</span>
          </nav>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Shopping Cart
          </h1>
          <p className="mt-2 text-sm text-muted">
            {count} {count === 1 ? "item" : "items"} · prices include all applicable
            taxes
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-rose-600"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          Clear cart
        </button>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-4 shadow-soft sm:flex-row sm:items-center"
            >
              <Link
                href={`/products/${item.id}`}
                className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-32"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                ) : (
                  <span className="grid h-full w-full place-items-center text-brand-600">
                    <Package className="h-8 w-8" aria-hidden="true" />
                  </span>
                )}
              </Link>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                  {item.brand}
                </p>
                <h2 className="mt-0.5 font-display text-[15px] font-bold leading-snug text-ink">
                  <Link href={`/products/${item.id}`} className="hover:text-brand-600">
                    {item.name}
                  </Link>
                </h2>
                <p className="mt-1 truncate text-xs text-muted">
                  {[item.processor, item.ram ? `${item.ram}GB RAM` : null, item.storage]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <p className="mt-1.5 text-xs font-semibold text-slate-500">
                  {formatPKR(item.price)} each
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-3">
                <div className="flex h-10 items-center rounded-xl border border-line">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="grid h-full w-9 place-items-center rounded-l-xl text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <span className="grid h-full w-9 place-items-center border-x border-line text-xs font-bold text-ink">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className="grid h-full w-9 place-items-center rounded-r-xl text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-display text-[15px] font-extrabold text-ink">
                    {formatPKR(item.price * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 transition hover:text-rose-600"
                  >
                    <Trash2 className="h-3 w-3" aria-hidden="true" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="rounded-2xl border border-line bg-card p-5 shadow-soft lg:sticky lg:top-24">
          <h2 className="font-display text-base font-bold text-ink">Order summary</h2>

          {/* Free shipping progress */}
          <div className="mt-4 rounded-xl bg-slate-50 p-3">
            <p className="text-[11px] font-medium text-slate-600">
              {remainingForFreeShipping > 0 ? (
                <>
                  Add{" "}
                  <strong className="text-ink">
                    {formatPKR(remainingForFreeShipping)}
                  </strong>{" "}
                  more for free delivery
                </>
              ) : (
                <span className="font-semibold text-emerald-600">
                  Free delivery unlocked
                </span>
              )}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-semibold text-ink">{formatPKR(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd className="font-semibold text-ink">
                {shipping === 0 ? (
                  <span className="text-emerald-600">Free</span>
                ) : (
                  formatPKR(shipping)
                )}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3">
              <dt className="font-display text-base font-bold text-ink">Total</dt>
              <dd className="font-display text-lg font-extrabold text-ink">
                {formatPKR(total)}
              </dd>
            </div>
          </dl>

          <button type="button" onClick={placeOrder} className="btn-primary mt-5 w-full">
            <PackageCheck className="h-4 w-4" aria-hidden="true" />
            Proceed to Checkout
          </button>

          <Link
            href="/products"
            className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Continue shopping
          </Link>

          <ul className="mt-5 space-y-2.5 border-t border-line pt-4 text-[11px] text-slate-500">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
              Secure checkout · 1-year official warranty
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
              Nationwide delivery in 2–3 working days
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
