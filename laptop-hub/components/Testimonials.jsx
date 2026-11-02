import { BadgeCheck, Quote } from "lucide-react";
import Stars from "@/components/Stars";
import Reveal from "@/components/Reveal";

const REVIEWS = [
  {
    name: "Hamza Siddiqui",
    meta: "Karachi · Bought ROG Strix G16",
    initials: "HS",
    rating: 5,
    quote:
      "Ordered on a Thursday night and the laptop reached my office in Clifton before lunch on Saturday. Sealed box, warranty card stamped, and they even helped me set up the display profile.",
  },
  {
    name: "Ayesha Khan",
    meta: "Lahore · Bought MacBook Air 13",
    initials: "AK",
    rating: 5,
    quote:
      "I was nervous about buying a MacBook online, but the team sent a short video of the exact unit before dispatch. Battery health 100%, no surprises. Genuinely the smoothest purchase I've made in Pakistan.",
  },
  {
    name: "Bilal Ahmed",
    meta: "Islamabad · Bought ThinkPad X1 Carbon",
    initials: "BA",
    rating: 5,
    quote:
      "Needed 12 units for our engineering team on a tight timeline. Invoicing was clean, delivery was split across two offices, and support answered every WhatsApp within minutes.",
  },
];

export default function Testimonials() {
  return (
    <section
      className="container-x py-16 lg:py-20"
      aria-labelledby="reviews-heading"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow">Customer reviews</span>
          <h2
            id="reviews-heading"
            className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl"
          >
            Trusted by 2,400+ laptop buyers
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Real feedback from customers across Pakistan. Sample testimonials shown
            for this demo storefront.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 shadow-soft">
          <span className="font-display text-2xl font-extrabold text-ink">4.9</span>
          <div>
            <Stars rating={5} size={13} />
            <p className="mt-0.5 text-[11px] font-medium text-muted">
              Average of 2,418 reviews
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {REVIEWS.map((review, index) => (
          <Reveal key={review.name} delay={index * 80} className="h-full">
            <figure className="relative flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
              <Quote
                className="absolute right-5 top-5 h-8 w-8 text-brand-100"
                aria-hidden="true"
              />
              <Stars rating={review.rating} size={14} />
              <blockquote className="mt-4 flex-1 text-[13.5px] leading-relaxed text-slate-600">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-xs font-bold text-white">
                  {review.initials}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 font-display text-[13px] font-bold text-ink">
                    {review.name}
                    <BadgeCheck
                      className="h-3.5 w-3.5 text-brand-600"
                      aria-label="Verified purchase"
                    />
                  </p>
                  <p className="truncate text-[11px] text-muted">{review.meta}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
