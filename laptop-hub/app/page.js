import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import OfferBanner from "@/components/OfferBanner";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Reveal from "@/components/Reveal";
import { getFeaturedProducts } from "@/data/products";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <Hero />
      <Categories />

      {/* Featured products */}
      <section className="container-x py-16 lg:py-20" aria-labelledby="featured-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Featured products</span>
            <h2
              id="featured-heading"
              className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl"
            >
              This week&apos;s most wanted laptops
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Eight machines our team actually recommends — from a PKR 1.89 Lac
              student pick to a 240Hz gaming flagship.
            </p>
          </div>
          <Link href="/products" className="link-underline shrink-0 text-sm">
            Browse all laptops
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((product, index) => (
            <Reveal key={product.id} delay={Math.min(index, 4) * 60} className="h-full">
              <ProductCard product={product} priority={index < 4} />
            </Reveal>
          ))}
        </div>
      </section>

      <OfferBanner />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}
