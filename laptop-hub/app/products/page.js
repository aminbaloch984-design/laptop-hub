import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import { normalizeFilters } from "@/lib/filters";

export const metadata = {
  title: "All Laptops",
  description:
    "Browse every laptop at LaptopHub — filter by brand, price, memory and category, then compare specs and buy online with nationwide delivery.",
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const initialFilters = normalizeFilters(params);
  // Remount the grid when arriving from an external link with different filters,
  // but not while the user is typing (URL updates use history.replaceState).
  const gridKey = JSON.stringify(initialFilters);

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="container-x py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
            <Link href="/" className="transition hover:text-ink">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-semibold text-ink">All laptops</span>
          </nav>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                All Laptops
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Fourteen hand-picked machines across gaming, business, student,
                creator and ultrabook categories. Filter by what matters, compare
                honestly, buy with confidence.
              </p>
            </div>
            <div className="flex gap-6 text-xs font-medium text-muted">
              <div>
                <p className="font-display text-lg font-extrabold text-ink">14</p>
                <p>Models listed</p>
              </div>
              <div>
                <p className="font-display text-lg font-extrabold text-ink">7</p>
                <p>Brands</p>
              </div>
              <div>
                <p className="font-display text-lg font-extrabold text-ink">1 yr</p>
                <p>Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductGrid key={gridKey} initial={initialFilters} />
    </>
  );
}
