"use client";

import {
  Backpack,
  Headphones,
  Keyboard,
  Monitor,
  Mouse,
  Package,
  Plus,
  Usb,
} from "lucide-react";
import { formatPKR } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ICONS = { Mouse, Keyboard, Backpack, Usb, Monitor, Headphones };

export default function AccessoryCard({ accessory }) {
  const { addItem } = useCart();
  const Icon = ICONS[accessory.icon] ?? Package;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-card p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-50 via-white to-accent-500/10 ring-1 ring-line">
        <div
          aria-hidden="true"
          className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-200/40 blur-2xl"
        />
        <Icon
          className="relative h-16 w-16 text-brand-600 transition duration-300 group-hover:scale-110"
          strokeWidth={1.3}
          aria-hidden="true"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 ring-1 ring-line">
          In stock
        </span>
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
        {accessory.brand}
      </p>
      <h3 className="mt-1 font-display text-[15px] font-bold leading-snug text-ink">
        {accessory.name}
      </h3>
      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted">
        {accessory.blurb}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-4">
        <p className="font-display text-base font-extrabold text-ink">
          {formatPKR(accessory.price)}
        </p>
        <button
          type="button"
          onClick={() => addItem(accessory, 1)}
          className="btn-primary !px-3 !py-2 text-[12px]"
          aria-label={`Add ${accessory.name} to cart`}
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add
        </button>
      </div>
    </article>
  );
}
