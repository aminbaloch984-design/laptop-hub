"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | success
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

    if (!valid) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // Demo only — connect this to your email provider (Mailchimp, Resend, etc.).
    setStatus("success");
    setMessage("You're on the list. Watch your inbox for the next drop.");
    setEmail("");
  };

  return (
    <section className="container-x pb-4 pt-4 lg:pb-8" aria-labelledby="newsletter-heading">
      <div className="relative overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-accent-500/10 p-7 sm:p-10 lg:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-200/40 blur-3xl"
        />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="eyebrow">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Newsletter
            </span>
            <h2
              id="newsletter-heading"
              className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-[34px]"
            >
              Get first access to new stock and price drops
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              One email a week: fresh arrivals, genuine discounts and buying guides.
              No spam, unsubscribe any time.
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status !== "idle") {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
                placeholder="you@example.com"
                className="field flex-1 !bg-white/90"
                aria-invalid={status === "error"}
                aria-describedby="newsletter-message"
              />
              <button type="submit" className="btn-dark shrink-0 !px-6">
                Subscribe
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>

            <p
              id="newsletter-message"
              role="status"
              aria-live="polite"
              className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${
                status === "error"
                  ? "text-rose-600"
                  : status === "success"
                    ? "text-emerald-600"
                    : "text-slate-500"
              }`}
            >
              {status === "success" ? (
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              ) : null}
              {message || "Join 8,000+ subscribers. We never share your address."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
