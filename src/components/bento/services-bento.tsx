"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  Avatar,
  Badge,
  Bar,
  Chart,
  Connector,
  Count,
  Icon,
  Stage,
  States,
  Text,
  Window,
  brandMarks,
  useReducedMotion,
} from "@/stageshow/kit";
import type { Act, Rect } from "@/stageshow/kit";
import "./services-bento.css";

// Pixelnest's services as a bento (Stageshow, references/bento.md).
//
//   Tile       Span   Kind        The one thing                       Moves
//   SaaS       2 × 1  Hero UI     a dashboard, the revenue chart       chart draws, revenue rolls
//   Stat       1 × 1  Stat        "+36%", the one dark tile            counts up
//   Mobile     1 × 1  Component   a send card with fee and arrival     Send turns Sent
//   System     1 × 1  Diagram     three tokens wired into a button     lines draw, button takes the style
//   Brand      1 × 1  Object      three swatch chips                   they fan out
//   Tools      2 × 1  Collection  the tools we build in, off the edge  rise in, staggered
//   Audit      1 × 1  Component   a findings list                      the top finding turns Fixed
//
// One window in the grid (the hero's). Neighbors differ in kind across and
// down. Each picture is its own Stage at 1:1, filling the slot under its copy
// (one gap below it); UI starts at the top of the slot and runs off the
// bottom, centered objects sit in the middle. Each tile plays once as the
// grid scrolls in, 110ms after the one before it.

const STEP = 110;
const LEAD = 450;
const ACCENT = "#f0532f";

type Beat = { on: boolean };
const before: Beat = { on: false };
const after: Beat = { on: true };
const beat = (i: number) => async (a: Act<Beat>) => {
  await a.wait(LEAD + i * STEP);
  await a.set({ on: true });
};

const stageProps = { initial: before, poster: after, play: "once" as const, accent: ACCENT, className: "pb-stage" };

// The tile owns the crop: the Stage takes the slot's own size, so it never
// slices a picture before the tile edge.
function useSlot() {
  const ref = useRef<HTMLDivElement>(null);
  // null until measured: a Stage drawn at a guessed size would measure its
  // targets there and keep connectors pointing at the old layout
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => {
      const r = node.getBoundingClientRect();
      setSize({ w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, size] as const;
}

function Tile({
  area,
  n,
  title,
  children,
  render,
}: {
  area: string;
  n: string;
  title: ReactNode;
  children: ReactNode;
  render: (size: { w: number; h: number }) => ReactNode;
}) {
  const [slot, size] = useSlot();
  return (
    <section className={`pb-tile pb-tile--${area}`}>
      <div className="pb-copy">
        <span className="pb-n">{n}</span>
        <h3 className="pb-title">{title}</h3>
        <p className="pb-body">{children}</p>
      </div>
      <div ref={slot} className="pb-picture">
        {size && render(size)}
      </div>
    </section>
  );
}

function useInView<T extends Element>(delay: number) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        t = window.setTimeout(() => setSeen(true), delay);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [delay]);
  return [ref, seen] as const;
}

/* ---------------- SaaS (hero) ---------------- */

const formatUsd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const REVENUE = [18, 22, 20, 27, 25, 31, 29, 36, 34, 41, 39, 48];

function Dashboard({ on, wide, width }: { on: boolean; wide: boolean; width: number }) {
  // Compact: the window is whole across (stage minus two 22px gutters), the
  // card inside it loses 16px window padding and 16px card padding each side.
  // Wide: stage minus two 32px gutters, the 148px sidebar, 32px content
  // padding, 32px card padding, a 12px gap and a 140px bar card.
  const chartW = wide ? Math.max(200, Math.min(380, width - 428)) : Math.max(180, width - 44 - 64);
  const body = (
    <div className="pb-dash">
      <div className="pb-dash-grid">
        <div className="pb-card">
          <div className="pb-card-top">
            <Text className="pb-card-label">Revenue YTD</Text>
            <Badge tone="success" className="pb-pill">
              +18%
            </Badge>
          </div>
          <div className="pb-card-value">
            <Count value={on ? 48920 : 31200} duration={1100} format={formatUsd} />
          </div>
          <Chart data={REVENUE} width={chartW} height={wide ? 92 : 80} show={on} area dot className="pb-chart" />
        </div>
        {wide && (
          <div className="pb-card pb-card--side">
            <Bar w={64} h={6} tone={3} />
            <Bar w={92} h={14} r={4} tone={4} />
            <div className="pb-bars">
              {[34, 52, 40, 64, 46, 72, 58].map((h, i) => (
                <span key={i} className="pb-bars-col" style={{ height: on ? h : 10 }} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="pb-dash-rows">
        {[96, 72, 110].map((w, i) => (
          <div key={i} className="pb-dash-row">
            <Bar w={20} h={20} r={10} tone={2} />
            <Bar w={w} h={6} tone={3} />
            <Bar w={44} h={6} tone={2} className="pb-dash-row-end" />
          </div>
        ))}
      </div>
    </div>
  );

  if (!wide)
    return (
      <Window title="Dashboard" className="pb-window pb-window--compact">
        {body}
      </Window>
    );
  return (
    <Window
      className="pb-window"
      title="Dashboard"
      sidebarWidth={148}
      sidebar={
        <nav className="pb-side" aria-hidden>
          {[58, 46, 66, 50].map((w, i) => (
            <span key={i} className="pb-nav" data-active={i === 0 || undefined}>
              <Bar w={12} h={12} r={3} tone={i === 0 ? 4 : 2} />
              <Bar w={w} h={6} tone={i === 0 ? 4 : 2} />
            </span>
          ))}
        </nav>
      }
    >
      {body}
    </Window>
  );
}

function Saas() {
  return (
    <Tile
      area="saas"
      n="01"
      title={<>SaaS &amp; web apps</>}
      render={({ w, h }) => (
        <Stage<Beat> width={w} height={h} script={beat(0)} {...stageProps}>
          {(s) => <Dashboard on={s.on} wide={w >= 560} width={w} />}
        </Stage>
      )}
    >
      Dashboards and B2B platforms your team can read at a glance.
    </Tile>
  );
}

/* ---------------- Stat ---------------- */

function Stat() {
  const reduced = useReducedMotion();
  const [ref, seen] = useInView<HTMLDivElement>(LEAD + STEP);
  return (
    <section className="pb-tile pb-tile--stat">
      <div ref={ref} className="pb-stat">
        <span className="pb-stat-lead">Task efficiency, up</span>
        <span className="pb-stat-number">
          +<Count value={seen || reduced ? 36 : 0} duration={1200} format={(n) => `${Math.round(n)}%`} />
        </span>
        <span className="pb-stat-label">after our MoneyFlow and CaseIQ redesigns.</span>
      </div>
    </section>
  );
}

/* ---------------- Mobile (component) ---------------- */

function Mobile() {
  return (
    <Tile
      area="mobile"
      n="02"
      title={<>Mobile apps</>}
      render={({ w, h }) => (
        <Stage<Beat> width={w} height={h} script={beat(2)} {...stageProps}>
          {(s) => (
            <div className="pb-send">
              <div className="pb-send-who">
                <Avatar name="Ana Ruiz" size={36} tone="ink" />
                <Text className="pb-send-name">Ana Ruiz</Text>
                <span className="pb-send-amount">$120</span>
              </div>
              <div className="pb-send-detail">
                <span>Fee</span>
                <span>$0.00</span>
              </div>
              <div className="pb-send-detail">
                <span>Arrives</span>
                <span>Today</span>
              </div>
              <span className="pb-btn" data-on={s.on || undefined}>
                <States
                  value={s.on ? "done" : "ask"}
                  states={{
                    ask: <span className="pb-btn-label">Send $120</span>,
                    done: (
                      <span className="pb-btn-label">
                        <Icon name="check" size={14} /> Sent
                      </span>
                    ),
                  }}
                />
              </span>
              <div className="pb-send-more">
                <Bar w={92} h={6} tone={2} />
                <Bar w={40} h={6} tone={2} />
              </div>
            </div>
          )}
        </Stage>
      )}
    >
      Calm flows that feel safe to use.
    </Tile>
  );
}

/* ---------------- Design system (diagram) ---------------- */

const TOKENS = ["color.primary", "radius.md", "space.4"];

function System() {
  return (
    <Tile
      area="system"
      n="03"
      title={<>Design systems</>}
      render={({ w, h }) => (
        <Stage<Beat> width={w} height={h} script={beat(3)} {...stageProps}>
          {(s, rect) => {
            const right = (r: Rect) => ({ x: r.x + r.width, y: r.y + r.height / 2 });
            const left = (r: Rect) => ({ x: r.x, y: r.y + r.height / 2 });
            const to = rect("button");
            // Connectors sit at the stage root, where rect() coordinates start
            return (
              <>
                <div className="pb-system">
                  <div className="pb-tokens">
                    {TOKENS.map((t) => (
                      <span key={t} className="pb-token" data-target={`t-${t}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="pb-preview" data-target="button" data-on={s.on || undefined}>
                    Get started
                  </span>
                </div>
                {to &&
                  TOKENS.map((t) => {
                    const from = rect(`t-${t}`);
                    return from ? (
                      <Connector key={t} from={right(from)} to={left(to)} route="step" show={s.on} className="pb-line" />
                    ) : null;
                  })}
              </>
            );
          }}
        </Stage>
      )}
    >
      One change, every screen.
    </Tile>
  );
}

/* ---------------- Branding (object) ---------------- */

const PALETTE = [
  { name: "Ink", color: "#161613" },
  { name: "Paper", color: "#ece9e1" },
  { name: "Ember", color: ACCENT },
];

// A type specimen: the display face easing from light to medium weight,
// with its name and the identity's three colors.
function Brand() {
  return (
    <Tile
      area="brand"
      n="04"
      title={<>Branding</>}
      render={({ w, h }) => (
        <Stage<Beat> width={w} height={h} script={beat(4)} {...stageProps}>
          {(s) => (
            <div className="pb-specimen" data-on={s.on || undefined}>
              <span className="pb-specimen-glyph">Aa</span>
              <div className="pb-specimen-foot">
                <span className="pb-specimen-name">Newsreader</span>
                <span className="pb-specimen-dots" aria-label="Ink, Paper and Ember">
                  {PALETTE.map((c) => (
                    <i key={c.name} style={{ background: c.color }} title={c.name} />
                  ))}
                </span>
              </div>
            </div>
          )}
        </Stage>
      )}
    >
      Identities that hold up everywhere.
    </Tile>
  );
}

/* ---------------- Tools (collection) ---------------- */

const TOOLS: { name: string; src: string }[] = [
  { name: "Figma", src: "/brand/tools/figma.png" },
  { name: "Framer", src: "/brand/tools/framer.png" },
  { name: "Webflow", src: "/brand/tools/webflow.png" },
  { name: "React", src: "/brand/tools/react.png" },
  { name: "ProtoPie", src: "/brand/tools/protopie.png" },
  { name: "Vercel", src: brandMarks.vercel.light },
  { name: "GitHub", src: brandMarks.github.light },
];

// Space the tiles so the stage edge always cuts one through its middle,
// never a sliver: pad + k × (size + gap) + size / 2 = width.
const TOOL = 112;
function toolGap(width: number, pad: number) {
  const run = width - pad - TOOL / 2;
  const k = Math.max(1, Math.floor(run / (TOOL + 14)));
  return Math.min(40, run / k - TOOL);
}

function Tools() {
  return (
    <Tile
      area="tools"
      n="05"
      title={<>Websites &amp; MVPs</>}
      render={({ w, h }) => (
        <Stage<Beat> width={w} height={h} script={beat(5)} {...stageProps}>
          {(s) => (
            <div className="pb-tools" data-on={s.on || undefined} style={{ gap: toolGap(w, w < 560 ? 22 : 32) }}>
              {TOOLS.map((t, i) => (
                <span key={t.name} className="pb-tool" title={t.name} style={{ "--i": i } as React.CSSProperties}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.src} alt={t.name} width={48} height={48} />
                </span>
              ))}
            </div>
          )}
        </Stage>
      )}
    >
      Designed and shipped in Framer, Webflow or React.
    </Tile>
  );
}

/* ---------------- UX audit (component) ---------------- */

function Audit() {
  return (
    <Tile
      area="audit"
      n="06"
      title={<>UX audits</>}
      render={({ w, h }) => (
        <Stage<Beat> width={w} height={h} script={beat(6)} {...stageProps}>
          {(s) => (
            <div className="pb-audit">
              <div className="pb-audit-row">
                <Text className="pb-audit-name">Pay button below the fold</Text>
                <States
                  value={s.on ? "fixed" : "high"}
                  align="end"
                  states={{
                    high: (
                      <Badge tone="danger" className="pb-pill">
                        High
                      </Badge>
                    ),
                    fixed: (
                      <Badge tone="success" className="pb-pill" icon={<Icon name="check" size={12} />}>
                        Fixed
                      </Badge>
                    ),
                  }}
                />
              </div>
              <div className="pb-audit-row">
                <Text className="pb-audit-name">Low-contrast labels</Text>
                <Badge tone="warning" className="pb-pill">
                  Medium
                </Badge>
              </div>
              {[118, 92, 104].map((bw, i) => (
                <div key={i} className="pb-audit-row">
                  <Bar w={bw} h={6} tone={3} />
                  <Bar w={46} h={20} r={10} tone={1} />
                </div>
              ))}
            </div>
          )}
        </Stage>
      )}
    >
      Find what slows users down.
    </Tile>
  );
}

export function ServicesBento() {
  return (
    <div className="pn-bento">
      <div className="pb-grid">
        <Saas />
        <Stat />
        <Mobile />
        <System />
        <Brand />
        <Tools />
        <Audit />
      </div>
    </div>
  );
}
