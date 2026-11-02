import Link from "next/link";
import {
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us",
  description:
    "Talk to the LaptopHub team in Karachi — phone, WhatsApp, email or visit our Clifton store. We reply within one business day.",
};

const CHANNELS = [
  {
    icon: Phone,
    label: "Call us",
    value: "+92 21 111 112 222",
    href: "tel:+922111111222",
    note: "Mon–Sat, 11am – 9pm",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+92 300 111 2222",
    href: "https://wa.me/923001112222",
    note: "Fastest response · usually under 10 min",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@laptophub.pk",
    href: "mailto:hello@laptophub.pk",
    note: "Replies within one business day",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="container-x py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
            <Link href="/" className="transition hover:text-ink">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-semibold text-ink">Contact</span>
          </nav>

          <div className="mt-4 max-w-2xl">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Contact LaptopHub
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Questions about a model, an order or a bulk purchase? A real person
              answers — no ticket queues, no scripted bots.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <ContactForm />

          <div className="space-y-4">
            {CHANNELS.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.label}
                  href={channel.href}
                  className="group flex items-start gap-4 rounded-2xl border border-line bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                      {channel.label}
                    </span>
                    <span className="mt-1 block truncate font-display text-sm font-bold text-ink">
                      {channel.value}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-muted">
                      {channel.note}
                    </span>
                  </span>
                </a>
              );
            })}

            <div className="rounded-2xl border border-line bg-card p-5 shadow-soft">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    Visit the store
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-ink">
                    Shop 24, Tech Avenue,
                    <br />
                    Clifton Block 5, Karachi
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                    Mon–Sat 11am–9pm · Sun 2pm–8pm
                  </p>
                  <a
                    href="https://maps.google.com/?q=Clifton+Block+5+Karachi"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                  >
                    Get directions →
                  </a>
                </div>
              </div>

              {/* Stylised map */}
              <div className="relative mt-4 h-36 overflow-hidden rounded-xl bg-gradient-to-br from-brand-50 via-white to-accent-500/10 ring-1 ring-line">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(37,99,235,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,.12) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute left-[18%] top-0 h-full w-2 rotate-12 bg-brand-200/50"
                />
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-[62%] h-2 w-full -rotate-6 bg-brand-200/50"
                />
                <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-600 text-white shadow-lg ring-4 ring-white">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Response promise */}
        <div className="mt-10 grid gap-4 rounded-2xl border border-line bg-ink p-6 text-white sm:grid-cols-3 sm:p-8">
          {[
            { value: "< 10 min", label: "WhatsApp reply time" },
            { value: "1 day", label: "Email response promise" },
            { value: "7 days", label: "Support availability" },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-display text-2xl font-extrabold">{item.value}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
