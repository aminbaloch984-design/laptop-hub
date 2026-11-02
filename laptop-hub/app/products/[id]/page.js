import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, getProductById, getRelatedProducts } from "@/data/products";
import ProductDetails from "@/components/ProductDetails";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "Laptop not found" };
  }

  return {
    title: `${product.brand} ${product.name}`,
    description: `${product.brand} ${product.name} — ${product.processor}, ${product.ram}GB RAM, ${product.storage}. ${product.description.slice(0, 110)}`,
    openGraph: {
      title: `${product.brand} ${product.name} | LaptopHub`,
      description: product.description.slice(0, 160),
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 3);

  return (
    <>
      <ProductDetails product={product} />

      <section className="container-x pb-16" aria-labelledby="related-heading">
        <div className="flex flex-col gap-3 border-t border-line pt-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Keep comparing</span>
            <h2
              id="related-heading"
              className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
            >
              You may also like
            </h2>
          </div>
          <Link href="/products" className="link-underline shrink-0 text-sm">
            View all laptops
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item, index) => (
            <Reveal key={item.id} delay={index * 60} className="h-full">
              <ProductCard product={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
