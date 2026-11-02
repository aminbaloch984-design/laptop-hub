"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const SUBJECTS = [
  "Product advice",
  "Order status",
  "Warranty or repair",
  "Bulk / corporate order",
  "Something else",
];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  subject: SUBJECTS[0],
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (form.phone.trim() && !/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) {
      next.phone = "Please enter a valid phone number.";
    }
    if (form.message.trim().length < 10) {
      next.message = "Please add a little more detail (at least 10 characters).";
    }
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    // Demo only — wire this to your API route / CRM / email service.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-line bg-card p-7 text-center shadow-soft sm:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink">
          Message received
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Thanks, {form.name.split(" ")[0] || "there"}. Our team replies within one
          business day — usually much faster during store hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(EMPTY_FORM);
            setSubmitted(false);
          }}
          className="btn-ghost mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-line bg-card p-6 shadow-soft sm:p-8"
    >
      <h2 className="font-display text-xl font-extrabold tracking-tight text-ink">
        Send us a message
      </h2>
      <p className="mt-1.5 text-[13px] text-muted">
        Fill this in and we will get back to you within one business day.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-slate-600">
            Full name *
          </label>
          <input
            id="contact-name"
            value={form.name}
            onChange={update("name")}
            className="field"
            placeholder="Ayesha Khan"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            autoComplete="name"
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1.5 text-[11px] font-medium text-rose-600">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-slate-600">
            Email address *
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={update("email")}
            className="field"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            autoComplete="email"
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-[11px] font-medium text-rose-600">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-semibold text-slate-600">
            Phone / WhatsApp
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            className="field"
            placeholder="+92 300 1234567"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            autoComplete="tel"
          />
          {errors.phone ? (
            <p id="contact-phone-error" className="mt-1.5 text-[11px] font-medium text-rose-600">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold text-slate-600">
            Subject
          </label>
          <select
            id="contact-subject"
            value={form.subject}
            onChange={update("subject")}
            className="field"
          >
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-slate-600">
            Message *
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={update("message")}
            className="field resize-y"
            placeholder="Tell us what you are looking for, your budget and your city…"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
          {errors.message ? (
            <p id="contact-message-error" className="mt-1.5 text-[11px] font-medium text-rose-600">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-slate-500">
          We never share your details. Demo form — no data leaves this page.
        </p>
        <button type="submit" className="btn-primary shrink-0">
          Send message
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
