import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Handshake,
  Microscope,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "About Us",
  description:
    "LaptopHub is a Pakistan-first laptop store built on genuine stock, honest advice and after-sales support that actually answers.",
};

const VALUES = [
  {
    icon: BadgeCheck,
    title: "Genuine, always",
    text: "Authorised distribution only. Every serial number is verifiable and every unit ships with a stamped warranty card.",
  },
  {
    icon: Handshake,
    title: "Advice, not upselling",
    text: "We will happily recommend a PKR 1.89 Lac laptop if that is what your workload needs. Commission never decides.",
  },
  {
    icon: Microscope,
    title: "Tested before dispatch",
    text: "Battery health, panel uniformity, ports, thermals and keyboard — checked on the bench, not just in the listing.",
  },
  {
    icon: ShieldCheck,
    title: "Support after the sale",
    text: "Free setup help for 30 days, plus direct access to our service desk for warranty claims and upgrades.",
  },
];

const STEPS = [
  {
    title: "Source",
    text: "We buy through authorised distributors and verified import channels — never grey-market stock with unclear provenance.",
  },
  {
    title: "Inspect",
    text: "Each unit is unboxed, bench-tested and photographed. Anything that fails a check goes back, not to you.",
  },
  {
    title: "Deliver",
    text: "Sealed, insured and tracked. Karachi and Lahore usually see next-day delivery; the rest of Pakistan within three days.",
  },
];

const FAQS = [
  {
    q: "Are the laptops brand new and sealed?",
    a: "Yes. Every laptop listed on LaptopHub is brand new unless the listing explicitly says otherwise. You receive a sealed box with an official warranty card and a matching serial number.",
  },
  {
    q: "Do you offer cash on delivery?",
    a: "COD is available in Karachi, Lahore, Islamabad and Rawalpindi for orders up to PKR 5,00,000. Above that, we use bank transfer or card payment with order verification.",
  },
  {
    q: "What does the warranty cover?",
    a: "The standard 1-year manufacturer warranty covers hardware faults. Accidental damage and liquid damage are not covered unless you add the optional protection plan at checkout.",
  },
  {
    q: "Can I return a laptop if I change my mind?",
    a: "Unopened boxes can be returned within 7 days for a full refund. Opened units are covered by the manufacturer warranty and our diagnostic service, but not by change-of-mind returns.",
  },
  {
    q: "Do you offer installment plans?",
    a: "Yes — 0% installment plans for 3, 6 and 12 months are available through partner banks and wallet providers, subject to approval. Our team can pre-check your eligibility on WhatsApp.",
  },
  {
    q: "Do you sell to companies and schools?",
    a: "We do. Bulk orders of 10+ units get dedicated account management, consolidated invoicing and optional imaging before dispatch. Contact us with your requirement.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="mesh-hero border-b border-line">
        <div className="container-x py-12 lg:py-16">
          <span className="eyebrow">Our story</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[56px]">
            A laptop store built by people who actually use laptops
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            LaptopHub started in 2019 as a two-person repair bench in Karachi. Today
            we ship genuine, bench-tested machines across Pakistan — with the same
            rule as day one: tell people the truth about what they are buying.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container-x py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-slate-100 shadow-soft">
              <Image
                src="/images/products/creator-workspace.jpg"
                alt="LaptopHub team testing a laptop in the workshop"
                fill
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-4 rounded-2xl border border-line bg-white p-4 shadow-lift sm:left-6">
              <p className="font-display text-2xl font-extrabold text-ink">7 years</p>
              <p className="text-[11px] font-medium text-muted">
                of honest laptop retail
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Why we exist
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                Buying a laptop in Pakistan should not feel like a gamble. Too often it
                means unclear specs, inflated &ldquo;market&rdquo; prices and sellers who
                disappear the moment something goes wrong.
              </p>
              <p>
                We built the opposite: a small catalogue we can stand behind, pricing
                in plain PKR, and a support line that answers. If a model is not right
                for you, we say so — even when it costs us the sale.
              </p>
            </div>

            <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                { value: "12k+", label: "Orders delivered" },
                { value: "4.9/5", label: "Average rating" },
                { value: "12", label: "Cities served" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-2xl font-extrabold text-ink">
                    {stat.value}
                  </dt>
                  <dd className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-x pb-14 lg:pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">What we stand for</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Four rules we do not bend
          </h2>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.title} delay={index * 60} className="h-full">
                <article className="h-full rounded-2xl border border-line bg-card p-6 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    {value.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-14 lg:py-20">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <span className="eyebrow">How we work</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Three steps between the warehouse and your desk
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                No drop-shipping, no mystery boxes. Every machine passes through our
                own bench before it is listed.
              </p>
              <Link href="/products" className="link-underline mt-5 text-sm">
                See what is in stock
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ol className="space-y-4">
              {STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-line bg-card p-5 shadow-soft"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink font-display text-sm font-extrabold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Shipping & warranty */}
      <section className="container-x py-14 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <article
            id="shipping"
            className="scroll-mt-28 rounded-2xl border border-line bg-card p-6 shadow-soft sm:p-8"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Truck className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink">
              Shipping &amp; delivery
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              {[
                "Free delivery on orders above PKR 2,00,000.",
                "Karachi & Lahore: next working day for orders before 2pm.",
                "Islamabad, Rawalpindi & Faisalabad: 1–2 working days.",
                "Other cities: 2–3 working days, fully insured and tracked.",
                "COD available up to PKR 5,00,000 in major cities.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article
            id="warranty"
            className="scroll-mt-28 rounded-2xl border border-line bg-card p-6 shadow-soft sm:p-8"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink">
              Warranty &amp; returns
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              {[
                "1-year official manufacturer warranty on every laptop.",
                "Warranty claims handled by our service desk, not a call centre.",
                "7-day return on unopened boxes with no restocking fee.",
                "Dead-on-arrival units replaced within 48 hours.",
                "Optional accidental damage protection available at checkout.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 bg-white py-14 lg:py-20">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Questions we get every week
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Still unsure about something? Message us on WhatsApp — we usually
                reply within ten minutes during business hours.
              </p>
              <Link href="/contact" className="btn-primary mt-5">
                Ask a question
              </Link>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-line bg-card px-5 py-4 shadow-soft"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-sm font-bold text-ink">
                    {faq.q}
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-45 group-open:bg-brand-600 group-open:text-white">
                      <span aria-hidden="true" className="text-base leading-none">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="container-x scroll-mt-24 py-14 lg:py-16">
        <div className="rounded-2xl border border-line bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600">
              <Boxes className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-ink">
                Privacy at a glance
              </h2>
              <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-slate-600">
                We collect only the details needed to fulfil your order — name, phone,
                delivery address and payment confirmation. We never sell customer data,
                and marketing emails are opt-in with a one-click unsubscribe. This demo
                storefront stores your cart locally in your own browser; nothing is sent
                to a server.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
