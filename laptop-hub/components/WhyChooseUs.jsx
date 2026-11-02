import { BadgeCheck, Headset, ShieldCheck, Wrench } from "lucide-react";
import Reveal from "@/components/Reveal";

const FEATURES = [
  {
    icon: BadgeCheck,
    title: "Genuine Products",
    text: "Every laptop is sourced through authorised distributors with a verifiable serial number and official warranty card.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    text: "Encrypted checkout, cash-on-delivery verification and a 7-day no-questions return window on unopened units.",
  },
  {
    icon: Wrench,
    title: "Quality Assurance",
    text: "Each unit is bench-tested for display, battery health, ports and thermals before it leaves our warehouse.",
  },
  {
    icon: Headset,
    title: "Customer Support",
    text: "Real humans on WhatsApp and phone, seven days a week — plus free setup help for the first 30 days.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="container-x py-16 lg:py-20" aria-labelledby="why-heading">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Why LaptopHub</span>
        <h2
          id="why-heading"
          className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl"
        >
          Confidence, included with every order
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          A laptop is a serious purchase. We built the boring, careful parts of the
          process so you can focus on choosing the right machine.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Reveal key={feature.title} delay={index * 70} className="h-full">
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-500">
                  <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {feature.text}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
