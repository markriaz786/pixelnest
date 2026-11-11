"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/content/site";
import { Logo3D } from "./motion/logo-3d";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const t = testimonials[i];

  return (
    <div
      className="relative grid overflow-hidden bg-night text-white md:grid-cols-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative z-10 flex flex-col gap-10 px-6 py-14 sm:p-20 md:col-span-7">
        <p className="label">Client praise</p>
        <h2 className="display text-[44px] leading-[1.08] sm:text-[64px]">
          Trusted by teams who ship.
        </h2>
        <figure aria-live="polite" className="min-h-[9.5rem]">
          <blockquote key={i} className="fade-in max-w-[544px] text-[24px] font-light leading-[1.3] sm:text-[32px]">
            {t.quote}
          </blockquote>
          <figcaption key={`c${i}`} className="fade-in mt-5 text-[16px] font-medium text-muted">
            {t.name}, {t.role}
          </figcaption>
        </figure>
        <div className="flex gap-2" role="group" aria-label="Choose testimonial">
          {testimonials.map((x, n) => (
            <button
              key={x.name}
              type="button"
              aria-pressed={n === i}
              aria-label={`Show testimonial from ${x.name}`}
              onClick={() => setI(n)}
              className="group py-3"
            >
              <span
                className={`block h-[2px] w-8 transition-colors ${n === i ? "bg-white" : "bg-white/25 group-hover:bg-white/60"}`}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="relative min-h-[22rem] md:col-span-5 md:min-h-0">
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(91,69,255,0.28),transparent_72%)]" />
        <Logo3D />
      </div>
    </div>
  );
}
