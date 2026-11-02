"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Laptops", href: "/products" },
  { label: "Gaming Laptops", href: "/products?category=gaming" },
  { label: "Business Laptops", href: "/products?category=business" },
  { label: "Accessories", href: "/accessories" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, hydrated } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);

  // Close panels whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Escape to close + lock scroll while a panel is open.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen) {
      const id = window.setTimeout(() => searchInputRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
  }, [searchOpen]);

  const submitSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    setSearchOpen(false);
    router.push(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products");
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/products?")) return false; // handled by "All Laptops"
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Announcement strip */}
      <div className="bg-ink text-slate-300">
        <div className="container-x flex h-9 items-center justify-between gap-4 text-[11px] font-medium sm:text-xs">
          <p className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5 text-accent-400" aria-hidden="true" />
            <span>Free nationwide delivery over PKR 2,00,000</span>
          </p>
          <div className="hidden items-center gap-5 sm:flex">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-accent-400" aria-hidden="true" />
              1-year official warranty
            </span>
            <a
              href="tel:+922111111222"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-accent-400" aria-hidden="true" />
              +92 21 111 112 222
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line/80 bg-white/85 backdrop-blur-xl">
        <div className="container-x flex h-[72px] items-center gap-3 lg:gap-6">
          {/* Brand */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label="LaptopHub home"
          >
            <span className="relative h-11 w-11 overflow-hidden rounded-xl ring-1 ring-line transition group-hover:ring-brand-300">
              <Image
                src="/images/logo.png"
                alt="LaptopHub logo"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[22px] font-extrabold tracking-tight text-ink">
                Laptop<span className="text-brand-600">Hub</span>
              </span>
              <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-muted sm:block">
                Premium laptop store
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="ml-2 hidden items-center gap-0.5 xl:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
                  isActive(link.href)
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-ink"
              aria-label="Search laptops"
            >
              <Search className="h-[19px] w-[19px]" aria-hidden="true" />
            </button>

            <Link
              href="/cart"
              className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-ink"
              aria-label={`Shopping cart${hydrated && count ? `, ${count} items` : ""}`}
            >
              <ShoppingCart className="h-[19px] w-[19px]" aria-hidden="true" />
              {hydrated && count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                  {count > 99 ? "99+" : count}
                </span>
              ) : null}
            </Link>

            <Link href="/products" className="btn-primary ml-1 hidden !px-4 !py-2.5 lg:inline-flex">
              Shop Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-10 w-10 place-items-center rounded-xl text-ink transition hover:bg-slate-100 xl:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen ? (
          <div
            id="mobile-menu"
            className="border-t border-line bg-white shadow-lift xl:hidden"
          >
            <nav className="container-x grid gap-1 py-4" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive(link.href)
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                </Link>
              ))}
              <Link href="/products" className="btn-primary mt-2 w-full">
                Shop Now
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      {/* Search overlay */}
      {searchOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/50 px-4 pt-24 backdrop-blur-sm sm:pt-32"
          role="dialog"
          aria-modal="true"
          aria-label="Search laptops"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSearchOpen(false);
          }}
        >
          <div className="w-full max-w-2xl animate-fade-up rounded-3xl border border-line bg-white p-4 shadow-lift sm:p-6">
            <form onSubmit={submitSearch} className="flex items-center gap-3">
              <Search className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by model, brand or spec — e.g. MacBook, RTX 4060"
                className="h-12 flex-1 bg-transparent text-base text-ink placeholder:text-slate-400 focus:outline-none"
                aria-label="Search query"
              />
              <button type="submit" className="btn-primary !px-4 !py-2.5">
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-slate-500 hover:bg-slate-100"
                aria-label="Close search"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </form>

            <div className="mt-4 border-t border-line pt-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                Popular searches
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["MacBook", "Gaming", "RTX 4060", "Under 3 lacs", "ThinkPad", "OLED"].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        router.push(`/products?q=${encodeURIComponent(term)}`);
                      }}
                      className="chip transition hover:border-brand-300 hover:text-brand-700"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
