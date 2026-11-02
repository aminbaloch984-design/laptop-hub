import Link from "next/link";
import { Compass, Home, Laptop } from "lucide-react";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] items-center justify-center py-16">
      <div className="w-full max-w-lg rounded-3xl border border-line bg-card p-8 text-center shadow-soft sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
          <Compass className="h-7 w-7" aria-hidden="true" />
        </span>
        <p className="mt-5 font-display text-5xl font-extrabold tracking-tight text-ink">
          404
        </p>
        <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">
          This page took a wrong turn
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          The page you are looking for does not exist, or the laptop may have been
          removed from the catalogue.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back home
          </Link>
          <Link href="/products" className="btn-ghost">
            <Laptop className="h-4 w-4" aria-hidden="true" />
            Browse laptops
          </Link>
        </div>
      </div>
    </div>
  );
}
