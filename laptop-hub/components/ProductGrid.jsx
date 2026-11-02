"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { BRANDS, CATEGORIES, PRICE_BANDS, PRODUCTS, RAM_OPTIONS } from "@/data/products";
import { buildQuery } from "@/lib/filters";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export default function ProductGrid({ initial }) {
  const [filters, setFilters] = useState(initial);
  const [searchInput, setSearchInput] = useState(initial.q);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Debounce the keyword box into the filter state.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setFilters((prev) =>
        prev.q === searchInput ? prev : { ...prev, q: searchInput }
      );
    }, 280);
    return () => window.clearTimeout(id);
  }, [searchInput]);

  // Keep filters shareable without triggering a router navigation (which would
  // remount the grid and steal focus while typing).
  useEffect(() => {
    const query = buildQuery(filters);
    const next = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;

    if (`${window.location.pathname}${window.location.search}` !== next) {
      window.history.replaceState(null, "", next);
    }
  }, [filters]);

  const toggleArrayValue = (key, value) => {
    setFilters((prev) => {
      const list = prev[key];
      const exists = list.includes(value);
      return {
        ...prev,
        [key]: exists ? list.filter((item) => item !== value) : [...list, value],
      };
    });
  };

  const clearAll = () => {
    setFilters({ q: "", category: "", brands: [], bands: [], rams: [], sort: "featured" });
    setSearchInput("");
  };

  const results = useMemo(() => {
    const keyword = filters.q.trim().toLowerCase();

    const filtered = PRODUCTS.filter((product) => {
      if (filters.category && product.category !== filters.category) return false;

      if (filters.brands.length && !filters.brands.includes(product.brand)) {
        return false;
      }

      if (filters.rams.length && !filters.rams.includes(product.ram)) {
        return false;
      }

      if (filters.bands.length) {
        const inBand = filters.bands.some((bandId) => {
          const band = PRICE_BANDS.find((item) => item.id === bandId);
          return band && product.price >= band.min && product.price < band.max;
        });
        if (!inBand) return false;
      }

      if (keyword) {
        const haystack = [
          product.name,
          product.brand,
          product.processor,
          product.gpu,
          product.storage,
          product.display,
          product.category,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(keyword)) return false;
      }

      return true;
    });

    switch (filters.sort) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered.sort(
          (a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating
        );
    }
  }, [filters]);

  const activeChips = useMemo(() => {
    const chips = [];
    if (filters.q.trim()) {
      chips.push({ key: "q", label: `“${filters.q.trim()}”`, clear: () => { setSearchInput(""); setFilters((p) => ({ ...p, q: "" })); } });
    }
    if (filters.category) {
      const category = CATEGORIES.find((item) => item.slug === filters.category);
      chips.push({
        key: "category",
        label: category ? category.short : filters.category,
        clear: () => setFilters((p) => ({ ...p, category: "" })),
      });
    }
    filters.brands.forEach((brand) =>
      chips.push({
        key: `brand-${brand}`,
        label: brand,
        clear: () => toggleArrayValue("brands", brand),
      })
    );
    filters.bands.forEach((bandId) => {
      const band = PRICE_BANDS.find((item) => item.id === bandId);
      chips.push({
        key: `band-${bandId}`,
        label: band ? band.label : bandId,
        clear: () => toggleArrayValue("bands", bandId),
      });
    });
    filters.rams.forEach((ram) =>
      chips.push({
        key: `ram-${ram}`,
        label: `${ram}GB RAM`,
        clear: () => toggleArrayValue("rams", ram),
      })
    );
    return chips;
  }, [filters]);

  const hasFilters = activeChips.length > 0 || filters.sort !== "featured";

  const filterPanel = (
    <div className="space-y-6">
      {/* Category */}
      <fieldset>
        <legend className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
          Category
        </legend>
        <div className="mt-3 space-y-1">
          <button
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, category: "" }))}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] font-medium transition ${
              !filters.category
                ? "bg-brand-50 text-brand-700"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            All categories
            <span className="text-[11px] text-slate-400">{PRODUCTS.length}</span>
          </button>
          {CATEGORIES.map((category) => {
            const count = PRODUCTS.filter((p) => p.category === category.slug).length;
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    category: prev.category === category.slug ? "" : category.slug,
                  }))
                }
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] font-medium transition ${
                  filters.category === category.slug
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {category.short}
                <span className="text-[11px] text-slate-400">{count}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Brand */}
      <fieldset className="border-t border-line pt-5">
        <legend className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
          Brand
        </legend>
        <div className="mt-3 space-y-2">
          {BRANDS.map((brand) => {
            const checked = filters.brands.includes(brand);
            return (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-2.5 text-[13px] font-medium text-slate-600"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleArrayValue("brands", brand)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 accent-brand-600 focus:ring-brand-500"
                />
                {brand}
                <span className="ml-auto text-[11px] text-slate-400">
                  {PRODUCTS.filter((p) => p.brand === brand).length}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Price */}
      <fieldset className="border-t border-line pt-5">
        <legend className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
          Price range
        </legend>
        <div className="mt-3 space-y-2">
          {PRICE_BANDS.map((band) => (
            <label
              key={band.id}
              className="flex cursor-pointer items-center gap-2.5 text-[13px] font-medium text-slate-600"
            >
              <input
                type="checkbox"
                checked={filters.bands.includes(band.id)}
                onChange={() => toggleArrayValue("bands", band.id)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 accent-brand-600 focus:ring-brand-500"
              />
              {band.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* RAM */}
      <fieldset className="border-t border-line pt-5">
        <legend className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
          Memory
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {RAM_OPTIONS.map((ram) => {
            const active = filters.rams.includes(ram);
            return (
              <button
                key={ram}
                type="button"
                onClick={() => toggleArrayValue("rams", ram)}
                aria-pressed={active}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-line bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700"
                }`}
              >
                {ram}GB
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={clearAll}
        disabled={!hasFilters}
        className="btn-ghost w-full !py-2.5 text-[13px]"
      >
        Reset all filters
      </button>
    </div>
  );

  return (
    <div className="container-x py-10 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-line bg-card p-5 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-sm font-bold text-ink">Filters</p>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                >
                  Clear all
                </button>
              ) : null}
            </div>
            {filterPanel}
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <label htmlFor="product-search" className="sr-only">
                Search products
              </label>
              <input
                id="product-search"
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search by model, brand, processor…"
                className="field !py-2.5 pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen((open) => !open)}
                className="btn-ghost !py-2.5 lg:hidden"
                aria-expanded={filtersOpen}
                aria-controls="mobile-filters"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Filters
                {activeChips.length ? (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                    {activeChips.length}
                  </span>
                ) : null}
              </button>

              <label htmlFor="sort" className="sr-only">
                Sort products
              </label>
              <select
                id="sort"
                value={filters.sort}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, sort: event.target.value }))
                }
                className="field !w-auto !py-2.5 pr-8 text-[13px] font-semibold"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile filters */}
          {filtersOpen ? (
            <div
              id="mobile-filters"
              className="mt-4 rounded-2xl border border-line bg-card p-5 shadow-soft lg:hidden"
            >
              {filterPanel}
            </div>
          ) : null}

          {/* Result meta + chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <p className="text-[13px] font-medium text-muted">
              <span className="font-bold text-ink">{results.length}</span>{" "}
              {results.length === 1 ? "laptop" : "laptops"} found
            </p>
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={chip.clear}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700 transition hover:bg-brand-100"
              >
                {chip.label}
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            ))}
            {hasFilters ? (
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] font-semibold text-slate-500 underline-offset-2 hover:text-ink hover:underline"
              >
                Clear all
              </button>
            ) : null}
          </div>

          {/* Grid */}
          {results.length > 0 ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((product, index) => (
                <Reveal key={product.id} delay={Math.min(index, 5) * 50} className="h-full">
                  <ProductCard product={product} priority={index < 3} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                No laptops match those filters
              </h3>
              <p className="mt-1.5 max-w-sm text-sm text-muted">
                Try widening your price range, removing a brand or searching for a
                different model.
              </p>
              <button type="button" onClick={clearAll} className="btn-primary mt-6">
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
