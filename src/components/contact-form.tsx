"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";

const budgets = ["Under $5k", "$5k–15k", "$15k–40k", "$40k+"];
const needs = ["Product design", "Website", "Branding", "UX audit", "MVP"];

// No form backend yet: submitting opens the visitor's email app with the
// message filled in and addressed to the agency inbox.
export function ContactForm() {
  const [need, setNeed] = useState<string[]>([]);
  const [budget, setBudget] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const name = get("name");
    const company = get("company");
    const body = [
      `Name: ${name}`,
      `Email: ${get("email")}`,
      company && `Company: ${company}`,
      need.length > 0 && `Looking for: ${need.join(", ")}`,
      budget && `Budget: ${budget}`,
      "",
      get("message"),
    ]
      .filter((l) => l !== false && l !== "")
      .join("\n");
    const subject = `New project enquiry from ${name}${company ? ` (${company})` : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const chip = (active: boolean) =>
    `border px-4 py-2 text-[14px] transition-colors ${
      active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
    }`;

  const field =
    "w-full border-b border-line bg-transparent py-3 text-[20px] font-light placeholder:text-muted outline-none transition-colors focus:border-ink";

  return (
    <form onSubmit={onSubmit} className="space-y-12">
      <fieldset>
        <legend className="label">I&apos;m looking for</legend>
        <div className="mt-5 flex flex-wrap gap-2">
          {needs.map((n) => {
            const active = need.includes(n);
            return (
              <button
                key={n}
                type="button"
                aria-pressed={active}
                className={chip(active)}
                onClick={() => setNeed((cur) => (active ? cur.filter((x) => x !== n) : [...cur, n]))}
              >
                {n}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Name</span>
          <input name="name" required autoComplete="name" placeholder="Your name *" className={field} />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="Email *" className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className="sr-only">Company</span>
          <input name="company" autoComplete="organization" placeholder="Company or product" className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className="sr-only">Message</span>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Tell us about your product, goals or challenges *"
            className={`${field} resize-none`}
          />
        </label>
      </div>

      <fieldset>
        <legend className="label">Budget</legend>
        <div className="mt-5 flex flex-wrap gap-2">
          {budgets.map((b) => (
            <button
              key={b}
              type="button"
              aria-pressed={budget === b}
              className={chip(budget === b)}
              onClick={() => setBudget((cur) => (cur === b ? "" : b))}
            >
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[13px] text-muted">
          By sending, you agree to our{" "}
          <Link href="/legal/terms-and-conditions" className="underline underline-offset-4 hover:text-ink">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy-policy" className="underline underline-offset-4 hover:text-ink">
            Privacy Policy
          </Link>
          .
        </p>
        <button type="submit" className="display link-line self-start pb-1 text-[40px] leading-none sm:self-auto">
          Send message
        </button>
      </div>
    </form>
  );
}
