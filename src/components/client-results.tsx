"use client";

import Link from "next/link";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Count } from "@/stageshow/kit";
import { proof } from "@/content/site";
import { caseStudies } from "@/content/work";
import "./client-results.css";

const ROTATE = 7000;
const CELLS = 30; // one bar at full scale (an index of 140)
const SCALE = 140;

const projects = caseStudies.filter((c) => c.hasPage && c.results?.length && proof[c.slug]);

// "−47%" → -47, "+32%" → 32, "28%" → 28
const parse = (v: string) => Number(v.replace("−", "-").replace(/[^\d.-]/g, ""));
const cells = (index: number) => (index <= 0 ? 0 : Math.max(1, Math.round((index / SCALE) * CELLS)));

function Bar({ index, tone, delay }: { index: number; tone: "before" | "after"; delay: number }) {
  const lit = cells(index);
  return (
    <span className="cr-bar" data-tone={tone}>
      {Array.from({ length: CELLS }, (_, c) => (
        <i key={c} data-lit={c < lit || undefined} style={{ transitionDelay: `${delay + c * 18}ms` }} />
      ))}
    </span>
  );
}

// Each client's measured outcomes as before/after pixel bars, indexed to
// before = 100. The project rotates on its own and pauses on hover.
export function ClientResults() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const card = useRef<HTMLDivElement>(null);
  const seen = useInView(card, { once: true, amount: 0.5 });

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % projects.length), ROTATE);
    return () => clearTimeout(t);
  }, [i, paused, reduce]);

  const p = projects[i];

  return (
    <div
      className="pn-results grid overflow-hidden bg-night text-white md:grid-cols-12"
      data-paused={paused || reduce || undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative z-10 flex flex-col px-6 pb-12 pt-14 sm:px-20 sm:pb-20 sm:pt-20 md:col-span-7">
        <p className="label">Client results</p>
        <h2 className="display mt-8 text-[44px] leading-[1.08] sm:text-[64px]">Results our clients can measure.</h2>

        <div className="mt-12 flex gap-8" role="tablist" aria-label="Choose a project">
          {projects.map((x, n) => (
            <button
              key={x.slug}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-controls="client-result"
              onClick={() => setI(n)}
              className="cr-tab group"
            >
              <span className="cr-tab-track">
                <span key={n === i ? `on${i}` : "off"} className="cr-tab-fill" data-on={n === i || undefined} />
              </span>
              <span className={`mt-3 block text-[15px] transition-colors ${n === i ? "text-white" : "text-white/45 group-hover:text-white/75"}`}>
                {x.title}
              </span>
            </button>
          ))}
        </div>

        <div id="client-result" role="tabpanel" aria-live="polite" className="mt-10 min-h-[9.5rem] sm:min-h-[8.5rem]">
          <p key={p.slug} className="fade-in max-w-[560px] text-[24px] font-light leading-[1.3] sm:text-[32px]">
            {proof[p.slug]}
          </p>
          <p key={`k${p.slug}`} className="fade-in mt-5 text-[15px] text-white/50">
            {p.category} · {p.kind}
          </p>
        </div>

        <Link href={`/case-studies/${p.slug}`} className="group mt-6 inline-flex items-center gap-3 self-start py-2">
          <svg viewBox="0 0 40 14" aria-hidden="true" className="h-[14px] w-[40px] text-accent transition-transform duration-300 group-hover:translate-x-1">
            <path d="M0 7h38M32 1l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span className="label">Read the case study</span>
        </Link>
      </div>

      <div className="cr-side md:col-span-5">
        <div className="cr-field" aria-hidden />
        <div ref={card} className="cr-card">
          <div className="cr-head">
            <span key={p.slug} className="fade-in text-[13px] font-medium text-[#e8e6e1]">
              {p.title}
            </span>
            <span className="cr-legend" aria-hidden>
              <span>
                <i data-tone="before" /> Before
              </span>
              <span>
                <i data-tone="after" /> After
              </span>
            </span>
          </div>

          <ul className="cr-rows">
            {p.results!.map((r, n) => {
              const v = parse(r.value);
              const sign = v < 0 ? "−" : "+";
              return (
                // Rows keep their key across projects so the pixels and
                // figures animate from one client's numbers to the next.
                <li key={n} className="cr-row">
                  <div className="cr-row-top">
                    <span className="text-[13px] text-white/65">{r.label}</span>
                    <span className="cr-value">
                      {sign}
                      <Count value={seen || reduce ? Math.abs(v) : 0} duration={900} />%
                    </span>
                  </div>
                  <Bar index={seen || reduce ? 100 : 0} tone="before" delay={n * 120} />
                  <Bar index={seen || reduce ? 100 + v : 0} tone="after" delay={n * 120 + 160} />
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-[11px] text-white/35">Before indexed to 100</p>
        </div>
      </div>
    </div>
  );
}
