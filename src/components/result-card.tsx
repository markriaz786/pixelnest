"use client";

import { Count } from "@/stageshow/kit";
import { testimonials } from "@/content/site";
import "./result-card.css";

type Metric = (typeof testimonials)[number]["metric"];

const COLS = 14;
const ROWS = 8;

const fmt = (m: Metric) => (n: number) =>
  m.format === "x" ? `${n.toFixed(1)}×` : m.format === "-%" ? `${Math.round(n)}%` : `${Math.round(n)}`;

// Resample a trend to COLS columns, each a height in pixels (1..ROWS)
function columns(trend: number[]) {
  const max = Math.max(...trend) * 1.04;
  return Array.from({ length: COLS }, (_, c) => {
    const t = (c / (COLS - 1)) * (trend.length - 1);
    const i = Math.floor(t);
    const v = trend[i] + (trend[Math.min(i + 1, trend.length - 1)] - trend[i]) * (t - i);
    return Math.max(1, Math.round((v / max) * ROWS));
  });
}

// The client's result as a pixel illustration: a faint pixel field, and a card
// whose chart is built from square pixels that light up coral, column by
// column, when the quote changes. The figure rolls to match.
export function ResultCard({ index }: { index: number }) {
  const m = testimonials[index].metric;
  const cols = columns(m.trend);

  return (
    <div className="pn-result" aria-hidden>
      <div className="pr-field" />
      <div className="pr-card">
        <div className="pr-top">
          <span key={m.label} className="pr-label fade-in">
            {m.label}
          </span>
          <span className="pr-note">{m.note}</span>
        </div>
        <div className="pr-value">
          {m.format === "-%" && <span className="pr-sign">−</span>}
          <Count value={m.value} format={fmt(m)} duration={900} />
          {m.format === "hrs" && <span className="pr-unit">hrs</span>}
        </div>
        <div className="pr-pixels" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {Array.from({ length: ROWS }).flatMap((_, r) =>
            cols.map((h, c) => {
              const row = ROWS - 1 - r; // 0 = bottom
              const lit = row < h;
              const top = row === h - 1;
              return (
                <i
                  key={`${r}-${c}`}
                  data-lit={lit || undefined}
                  data-top={top || undefined}
                  style={{ transitionDelay: `${c * 35 + row * 25}ms`, opacity: lit ? 0.45 + (c / COLS) * 0.55 : undefined }}
                />
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}
