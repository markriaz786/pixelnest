"use client";

import { Timer } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Bar,
  Chart,
  Code,
  Count,
  Icon,
  LockScreen,
  Notification,
  Phone,
  Stage,
  Text,
  Window,
} from "@/stageshow/kit";
import type { Act } from "@/stageshow/kit";
import "./services-bento.css";

// Pixelnest's services as a bento (Stageshow, references/bento.md).
//
//   Tile          Span   Kind         The one thing                          Moves
//   Product       2 × 1  Hero UI      dashboard + phone, one payment          chart draws, then the phone's notification lands
//   Stat          1 × 1  Stat         "+36%", the one dark tile               counts up
//   Systems       1 × 1  Diagram      tokens → library → components           lines draw in order, a pulse travels them
//   Research      1 × 1  Canvas       interview notes, a named cursor         Maya drags a note into the cluster, its count rolls
//   Branding      1 × 1  Object       a type specimen                         weight eases light → medium
//   Web           2 × 1  Hero UI 2    code with two collaborators, app tiles  lines arrive, cursors move in
//   Audits        1 × 1  Icon         one large thin icon and a sentence      draws itself on hover
//
// Window chrome appears on the two wide tiles only. Neighbors differ in kind
// across and down. Each picture is its own Stage at 1:1, sized to the slot
// under its copy. Tiles play once as the grid scrolls in, staggered.

const STEP = 110;
// Every tile loops: play the story, hold the payoff, ease back, play again
const HOLD = 3200;
const TOP = 26; // the gutter between a picture's slot edge and its content
const LEAD = 450;
const CORAL = "#f0532f";
// A warm charcoal lock screen: dark enough for white system text, and it
// leaves the coral stat tile beside it as the one accent
const WARM_WALL = "linear-gradient(165deg, #6f6259 0%, #3d342e 55%, #1f1b18 100%)";
const PEOPLE = { maya: "#c2417f", ana: "#2f8f83", jon: "#4d63d6" };

const formatUsd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

// The tile owns the crop: a Stage takes the slot's measured size, and is drawn
// only once that size is known, so targets are never measured at a guess.
function useSlot() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => {
      const r = node.getBoundingClientRect();
      setSize({ w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}

type Ground = "pixels" | "dots" | "blush" | "stone" | "butter" | "dusk";

// A field of scattered pixels: gray squares on charcoal with a little ember
// at the foot, the brand's own grid as a ground. Deterministic, so server and client agree.
function PixelField({ w, h }: { w: number; h: number }) {
  const cell = 14;
  const cols = Math.ceil(w / cell);
  const rows = Math.ceil(h / cell);
  const cells = [];
  const rand = (x: number, y: number, k: number) => ((Math.sin(x * 12.9898 + y * 78.233 + k * 37.719) * 43758.5453) % 1 + 1) % 1;
  // Low contrast against the charcoal, so the field stays in the background
  const grays = ["#262422", "#2a2826", "#2e2c29", "#33312e", "#383633"];
  const embers = ["#5a2b20", "#743524", "#93402a"];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // Scattered gray squares over the whole field, the charcoal between them;
      // denser toward the bottom. A few ember squares glow in only along the
      // bottom rows, scattered among the gray.
      const depth = y / Math.max(1, rows - 1);
      const shown = rand(x, y, 1) < 0.16 + depth * 0.22;
      let color = "transparent";
      if (shown) {
        const warm = depth > 0.6 && rand(x, y, 2) < (depth - 0.6) * 1.5;
        color = warm
          ? embers[Math.floor(rand(x, y, 3) * embers.length)]
          : grays[Math.floor(rand(x, y, 4) * grays.length)];
      }
      cells.push(<i key={`${x}-${y}`} style={{ background: color }} />);
    }
  }
  return (
    <div className="pb-pixels" aria-hidden style={{ gridTemplateColumns: `repeat(${cols}, ${cell}px)` }}>
      {cells}
    </div>
  );
}

function Tile({
  area,
  title,
  children,
  render,
  ground,
}: {
  area: string;
  title: ReactNode;
  children: ReactNode;
  render?: (size: { w: number; h: number }) => ReactNode;
  ground?: Ground;
}) {
  const [slot, size] = useSlot();
  return (
    <section className={`pb-tile pb-tile--${area}`}>
      {render && (
        <div ref={slot} className="pb-picture" data-ground={ground ?? "dusk"}>
          {ground === "pixels" && size && <PixelField w={size.w} h={size.h} />}
          {size && render(size)}
          {/* Crop marks, the first in the accent */}
          <span className="pb-mark" data-at="tl" aria-hidden />
          <span className="pb-mark" data-at="tr" aria-hidden />
          <span className="pb-mark" data-at="bl" aria-hidden />
          <span className="pb-mark" data-at="br" aria-hidden />
        </div>
      )}
      <div className="pb-copy">
        <h3 className="pb-title">{title}</h3>
        <p className="pb-body">{children}</p>
      </div>
    </section>
  );
}

function useInViewOnce<T extends Element>(delay: number) {
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

/* A teammate's cursor with their name riding it */
function Peer({ name, color, x, y, slow, away }: { name: string; color: string; x: number; y: number; slow?: boolean; away?: boolean }) {
  return (
    <span
      className="pb-peer"
      data-slow={slow || undefined}
      data-away={away || undefined}
      style={{ transform: `translate(${x}px, ${y}px)`, "--who": color } as CSSProperties}
    >
      <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden>
        <path d="M1.5 1.5v13.2l3.6-3.3 2.4 5.4 2.4-1-2.4-5.3h5.1Z" fill="var(--who)" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span className="pb-flag">{name}</span>
    </span>
  );
}

/* ---------------- Product design (hero): dashboard + phone ---------------- */

type ProductBeat = { chart: boolean; note: boolean; spec: boolean };
const REVENUE = [18, 22, 20, 27, 25, 31, 29, 36, 34, 41, 39, 48];

async function productScript(a: Act<ProductBeat>) {
  await a.wait(LEAD);
  await a.set({ chart: true });
  await a.wait(1500);
  await a.set({ note: true });
  await a.wait(1100);
  await a.set({ spec: true });
  await a.wait(HOLD);
  await a.set({ spec: false });
  await a.wait(400);
  await a.set({ note: false, chart: false });
  await a.wait(900);
}

function Product() {
  return (
    <Tile
      area="product"
      ground="pixels"
      title="Product design"
      render={({ w, h }) => {
        const wide = w >= 560;
        // Window inset left, off the right of its column and the bottom; the
        // phone straddles its right edge over placeholder rows, not the chart.
        // Narrow enough that the pixel field frames it on the left and below the phone
        // Narrow: inset left by the gutter and run off the right edge
        const winW = wide ? Math.round(w * 0.6) : w + 8;
        // Window and phone centered as one group: the phone overlaps the
        // window's last 70px and is 220px wide
        const groupW = wide ? winW - 70 + 220 : winW;
        const groupX = wide ? Math.round((w - groupW) / 2) : 22;
        // The card and its chart end before the phone's edge (winW - 70)
        const chartW = wide ? Math.max(180, Math.min(300, winW - 148 - 70 - 32 - 34 - 24)) : Math.max(180, winW - 66);
        return (
          <Stage<ProductBeat>
            width={w}
            height={h}
            initial={{ chart: false, note: false, spec: false }}
            poster={{ chart: true, note: true, spec: false }}
            play="loop"
            script={productScript}
            className="pb-stage"
          >
            {(s) => (
              <>
                <Window
                  title="Revenue"
                  className="pb-window"
                  style={{ width: winW, left: groupX }}
                  sidebarWidth={wide ? 148 : undefined}
                  sidebar={
                    wide ? (
                      <nav className="pb-side" aria-hidden>
                        {[58, 46, 66, 50].map((bw, i) => (
                          <span key={i} className="pb-nav" data-active={i === 0 || undefined}>
                            <Bar w={12} h={12} r={3} tone={i === 0 ? 4 : 2} />
                            <Bar w={bw} h={6} tone={i === 0 ? 4 : 2} />
                          </span>
                        ))}
                      </nav>
                    ) : undefined
                  }
                >
                  <div className="pb-dash">
                    <div className="pb-card" style={{ width: wide ? chartW + 34 : undefined }}>
                      <Text className="pb-card-label">This month</Text>
                      <div className="pb-card-value">
                        <span className="pb-spec-target">
                        <Count value={s.chart ? 48920 : 31200} duration={1100} format={formatUsd} />
                        {/* The designer's view: a selected layer with its type spec */}
                        <span className="pb-spec" data-on={s.spec || undefined} aria-hidden>
                          <i data-c="tl" />
                          <i data-c="tr" />
                          <i data-c="bl" />
                          <i data-c="br" />
                          <b>Display · 28px</b>
                          <em>16</em>
                        </span>
                        </span>
                      </div>
                      <Chart data={REVENUE} width={chartW} height={86} show={s.chart} area dot className="pb-chart" />
                    </div>
                    {[96, 72, 110, 84].map((bw, i) => (
                      <div key={i} className="pb-dash-row">
                        <Bar w={20} h={20} r={10} tone={2} />
                        <Bar w={bw} h={6} tone={3} />
                        <Bar w={44} h={6} tone={2} className="pb-dash-row-end" />
                      </div>
                    ))}
                  </div>
                </Window>
                {wide && (
                  <Phone width={220} frame="pro" dark wallpaper={WARM_WALL} className="pb-phone" style={{ left: groupX + winW - 70 }}>
                    <LockScreen size="satellite" stack="top">
                      <div className="pb-banner" data-on={s.note || undefined}>
                        <Notification
                          icon={<Icon name="check" filled size={18} />}
                          title="Payment sent"
                          body="$120.00 to Ana Ruiz, arrives today"
                        />
                      </div>
                    </LockScreen>
                  </Phone>
                )}
              </>
            )}
          </Stage>
        );
      }}
    >
      Web apps and mobile that work as one product, from dashboard to notification.
    </Tile>
  );
}

/* ---------------- Stat ---------------- */

// A stopwatch dial: 60 ticks round a timer, 36% of them lit in a sweep
const TICKS = 60;
const LIT = Math.round(TICKS * 0.36);
// Rounded so server and browser render identical numbers
const r2d = (n: number) => Math.round(n * 100) / 100;

function Stat() {
  const reduce = useReducedMotion();
  const [ref, seen] = useInViewOnce<HTMLDivElement>(LEAD + STEP);
  // Loops like the stage tiles: sweep and count, hold, clear, again
  const [lit, setLit] = useState(true);
  useEffect(() => {
    if (!seen || reduce) return;
    let t = 0;
    const tick = (next: boolean) => {
      t = window.setTimeout(() => {
        setLit(next);
        tick(!next);
      }, next ? 1000 : HOLD + 2800);
    };
    tick(false);
    return () => clearTimeout(t);
  }, [seen, reduce]);
  const on = reduce || (seen && lit);
  return (
    <section className="pb-tile pb-tile--stat">
      <div ref={ref} className="pb-stat" data-on={on || undefined}>
        <div className="pb-dial" aria-hidden>
          <svg viewBox="0 0 160 160" width="160" height="160">
            {Array.from({ length: TICKS }).map((_, i) => {
              const ang = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
              const long = i % 5 === 0;
              const r1 = long ? 62 : 66;
              const r2 = 74;
              return (
                <line
                  key={i}
                  x1={r2d(80 + Math.cos(ang) * r1)}
                  y1={r2d(80 + Math.sin(ang) * r1)}
                  x2={r2d(80 + Math.cos(ang) * r2)}
                  y2={r2d(80 + Math.sin(ang) * r2)}
                  className="pb-tick"
                  data-lit={i < LIT || undefined}
                  style={{ transitionDelay: `${i < LIT ? 300 + i * 40 : 0}ms` }}
                />
              );
            })}
          </svg>
          <span className="pb-dial-icon">
            <Timer size={34} strokeWidth={1.1} />
          </span>
        </div>
        <div>
          <span className="pb-stat-lead">Task efficiency, up</span>
          <span className="pb-stat-number">
            +<Count value={on ? 36 : 0} duration={1200} format={(n) => `${Math.round(n)}%`} />
          </span>
          <span className="pb-stat-label">after our MoneyFlow and CaseIQ redesigns.</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Design systems: a node diagram on a dot grid ---------------- */

function Pill({ x, y, children, dark }: { x: number; y: number; children: ReactNode; dark?: boolean }) {
  return (
    <span className="pb-pill" data-dark={dark || undefined} style={{ left: x, top: y }}>
      {children}
    </span>
  );
}

function Systems() {
  const reduce = useReducedMotion();
  return (
    <Tile
      area="systems"
      ground="dots"
      title="Design systems"
      render={({ w, h }) => {
        // Three rows: tokens, the library, components; columns from the slot
        const cx = [w * 0.2, w * 0.5, w * 0.8];
        const y0 = TOP;
        const y1 = Math.round(h * 0.42);
        const y2 = Math.max(y1 + 80, h - 56);
        const pillH = 32;
        const mid1 = (y0 + pillH + y1) / 2;
        const mid2 = (y1 + pillH + y2) / 2;
        const up = cx.map((x) => `M${x} ${y0 + pillH} V${mid1} H${w / 2} V${y1}`);
        const down = cx.map((x) => `M${w / 2} ${y1 + pillH} V${mid2} H${x} V${y2}`);
        return (
          <Stage<{ on: boolean }> width={w} height={h} initial={{ on: false }} poster={{ on: true }} play="loop" script={async (a) => { await a.wait(LEAD + STEP * 2); await a.set({ on: true }); await a.wait(HOLD + 1200); await a.set({ on: false }); await a.wait(900); }} className="pb-stage">
            {(s) => (
              <>
                <svg className="pb-wires" width={w} height={h} aria-hidden>
                  {[...up, ...down].map((d, i) => (
                    <g key={i}>
                      <path d={d} className="pb-wire-base" />
                      <motion.path
                        d={d}
                        className="pb-wire"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: s.on ? 1 : 0 }}
                        transition={{ duration: 0.7, delay: s.on ? (i < 3 ? 0 : 0.6) + (i % 3) * 0.12 : 0, ease: [0.22, 1, 0.36, 1] }}
                      />
                      {s.on && !reduce && (
                        <circle r="2.6" className="pb-pulse">
                          <animateMotion dur="2.8s" begin={`${1.6 + i * 0.35}s`} repeatCount="indefinite" path={d} />
                        </circle>
                      )}
                    </g>
                  ))}
                </svg>
                {(
                  [
                    ["Color", <span key="c" className="pb-glyph pb-glyph--swatch" />],
                    ["Radius", <span key="r" className="pb-glyph pb-glyph--radius" />],
                    ["Type", <span key="t" className="pb-glyph pb-glyph--type">Aa</span>],
                  ] as const
                ).map(([label, glyph], i) => (
                  <Pill key={label} x={cx[i]} y={y0}>
                    {glyph}
                    {label}
                  </Pill>
                ))}
                <Pill x={w / 2} y={y1} dark>
                  UI library
                </Pill>
                {["Button", "Input", "Card"].map((label, i) => (
                  <Pill key={label} x={cx[i]} y={y2}>
                    {label}
                  </Pill>
                ))}
              </>
            )}
          </Stage>
        );
      }}
    >
      Tokens and components that keep every screen consistent.
    </Tile>
  );
}

/* ---------------- UX research: a named cursor clusters a note ---------------- */

type ResearchBeat = { cursor: "rest" | "card" | "drop" | "away"; moved: boolean; lifted: boolean };

async function researchScript(a: Act<ResearchBeat>) {
  await a.wait(LEAD + STEP * 3 + 300);
  a.put({ cursor: "card" });
  await a.wait(1000);
  a.put({ lifted: true });
  await a.wait(250);
  a.put({ cursor: "drop", moved: true });
  await a.wait(1050);
  a.put({ lifted: false });
  await a.wait(500);
  a.put({ cursor: "away" });
  await a.wait(HOLD);
  a.put({ cursor: "drop" });
  await a.wait(1000);
  a.put({ lifted: true });
  await a.wait(250);
  a.put({ cursor: "card", moved: false });
  await a.wait(1050);
  a.put({ lifted: false });
  await a.wait(400);
  a.put({ cursor: "rest" });
  await a.wait(900);
}

const NOTES = [{ name: "Interview, Ana" }, { name: "Interview, Leo" }];

function Research() {
  return (
    <Tile
      area="research"
      ground="blush"
      title="UX research"
      render={({ w, h }) => {
        const noteW = Math.min(148, Math.round(w * 0.42));
        const noteH = 74;
        const pad = 22;
        // The whole composition (about 230px tall) sits centered in the picture
        const top0 = Math.max(TOP, Math.round((h - 230) / 2));
        const start = { x: pad, y: top0 + noteH + 20 };
        const box = { x: Math.round(w * 0.5), y: top0, w: Math.round(w * 0.5) - pad, h: 0 };
        const drop = { x: box.x + (box.w - noteW) / 2, y: box.y + 92 };
        box.h = drop.y - box.y + noteH + 12;
        return (
          <Stage<ResearchBeat>
            width={w}
            height={h}
            initial={{ cursor: "rest", moved: false, lifted: false }}
            poster={{ cursor: "away", moved: true, lifted: false }}
            play="loop"
            script={researchScript}
            className="pb-stage"
          >
            {(s) => {
              const card = s.moved ? drop : start;
              const cur =
                s.cursor === "card"
                  ? { x: start.x + noteW * 0.6, y: start.y + 34 }
                  : s.cursor === "drop"
                    ? { x: drop.x + noteW * 0.6, y: drop.y + 34 }
                    : s.cursor === "away"
                      ? { x: Math.max(pad + 20, box.x - 64), y: drop.y + 30 }
                      : { x: pad + noteW * 0.5, y: Math.min(start.y + noteH + 40, h - 44) };
              return (
                <>
                  <div className="pb-cluster" style={{ left: box.x, top: box.y, width: box.w, height: box.h }}>
                    <span className="pb-cluster-head">
                      Pain points
                      <span className="pb-cluster-count">
                        <Count value={s.moved && !s.lifted ? 4 : 3} duration={500} />
                      </span>
                    </span>
                    <span className="pb-cluster-note" style={{ top: 40 }}>
                      <span className="pb-quote" data-on={s.moved || undefined}>
                        &ldquo;Where&rsquo;s Transfer?&rdquo;
                      </span>
                    </span>
                  </div>
                  <div className="pb-note-card" style={{ left: pad, top: top0, width: noteW, height: noteH }}>
                    <span className="pb-note-title">{NOTES[0].name}</span>
                    <span className="pb-note-line" style={{ width: "86%" }} />
                    <span className="pb-note-line" style={{ width: "64%" }} />
                  </div>
                  <div
                    className="pb-note-card"
                    data-lifted={s.lifted || undefined}
                    style={{ transform: `translate(${card.x}px, ${card.y}px)`, width: noteW, height: noteH }}
                  >
                    <span className="pb-note-title">{NOTES[1].name}</span>
                    <span className="pb-note-line" style={{ width: "78%" }} />
                    <span className="pb-note-line" style={{ width: "58%" }} />
                  </div>
                  <Peer name="Maya" color={PEOPLE.maya} x={cur.x} y={cur.y} />
                </>
              );
            }}
          </Stage>
        );
      }}
    >
      Interviews and testing, turned into clear themes.
    </Tile>
  );
}

/* ---------------- Branding: a brand-guideline card ---------------- */

const PALETTE = [
  { name: "Ink", color: "#161613", hex: "#161613", text: "#f6f4ee" },
  { name: "Paper", color: "#ece9e1", hex: "#ECE9E1", text: "#161613" },
  { name: "Ember", color: CORAL, hex: "#F0532F", text: "#fff6f0" },
];

// One page of a brand guide: the display face beside the type roles, the
// palette as three bands along the foot. The face eases to its weight; the
// bands rise one after another.
function Brand() {
  return (
    <Tile
      area="brand"
      ground="stone"
      title="Branding"
      render={({ w, h }) => (
        <Stage<{ on: boolean }> width={w} height={h} initial={{ on: false }} poster={{ on: true }} play="loop" script={async (a) => { await a.wait(LEAD + STEP * 4); await a.set({ on: true }); await a.wait(HOLD); await a.set({ on: false }); await a.wait(900); }} className="pb-stage">
          {(s) => (
            <div className="pb-guide" data-on={s.on || undefined}>
              <div className="pb-guide-type">
                <span className="pb-guide-glyph">Aa</span>
                <dl className="pb-guide-roles">
                  <div>
                    <dt>Display</dt>
                    <dd className="pb-guide-serif">Newsreader</dd>
                  </div>
                  <div>
                    <dt>Text</dt>
                    <dd className="pb-guide-sans">Geist</dd>
                  </div>
                </dl>
              </div>
              <div className="pb-guide-bands">
                {PALETTE.map((c, i) => (
                  <div key={c.name} className="pb-band" style={{ background: c.color, color: c.text, "--i": i } as CSSProperties}>
                    <span className="pb-band-name">{c.name}</span>
                    <span className="pb-band-hex">{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Stage>
      )}
    >
      Type, color and voice that hold up everywhere.
    </Tile>
  );
}

/* ---------------- Websites & MVPs: code with collaborators ---------------- */

const CODE = [
  'import { build, review, Deploy } from "@pixelnest/ship"',
  "",
  "export default async function Launch() {",
  '  const site = await build("pixelnest", {',
  '    pages: ["home", "work", "contact"],',
  "  })",
  "  await review(site, { team: true })",
  '  return <Deploy to="production" />',
  "}",
];
// Narrow editors get the same program in lines that fit
const CODE_SHORT = [
  "async function Launch() {",
  '  const site = await build()',
  "  await review(site)",
  "  return <Deploy />",
  "}",
];
// The kit's code block: 11.5px monospace on a 19px line, a 40px number column
const CHAR = 6.95;
const PITCH = 19;
const GUTTER = 40;

type WebBeat = { lines: number; ana: boolean; jon: boolean; deploy: number };

async function webScript(a: Act<WebBeat>) {
  await a.wait(LEAD + STEP * 5);
  for (let n = 1; n <= CODE.length; n++) {
    a.put({ lines: n });
    await a.wait(220);
  }
  await a.wait(300);
  a.put({ ana: true });
  await a.wait(700);
  a.put({ jon: true });
  await a.wait(900);
  // The payoff: it ships
  for (let n = 1; n <= 3; n++) {
    a.put({ deploy: n });
    await a.wait(n === 1 ? 700 : 450);
  }
  await a.wait(HOLD);
  a.put({ deploy: 0, ana: false, jon: false });
  await a.wait(600);
  a.put({ lines: 0 });
  await a.wait(700);
}

const DEPLOY = [
  { mark: "$", text: "pixelnest deploy", kind: "cmd" },
  { mark: "✓", text: "Build complete in 41s", kind: "ok" },
  { mark: "✓", text: "Live on production", kind: "ok" },
];

const APPS = [
  { name: "Framer", src: "/brand/tools/framer.png", x: 0.08, y: 0.04, r: -6 },
  { name: "Webflow", src: "/brand/tools/webflow.png", x: 0.52, y: 0.28, r: 5 },
  { name: "React", src: "/brand/tools/react.png", x: 0.16, y: 0.6, r: 3 },
];

function Web() {
  return (
    <Tile
      area="web"
      ground="dusk"
      title="Websites & MVPs"
      render={({ w, h }) => {
        const wide = w >= 560;
        const editorW = wide ? Math.round(w * 0.64) : w - 44;
        const appsX = 28 + editorW + 24;
        const appsW = w - appsX;
        return (
          <Stage<WebBeat> width={w} height={h} initial={{ lines: 0, ana: false, jon: false, deploy: 0 }} poster={{ lines: CODE.length, ana: true, jon: true, deploy: 3 }} play="loop" script={webScript} className="pb-stage">
            {(s, rect) => {
              // Cursors rest just after a line's last character
              const code = rect("code");
              const lines = wide ? CODE : CODE_SHORT;
              // Name flags stay inside the editor: at most 70px from its right edge
              const maxX = 28 + editorW - 70;
              const at = (line: number) => ({
                x: Math.min(maxX, (code?.x ?? 36) + 8 + GUTTER + lines[line].length * CHAR + 8),
                y: (code?.y ?? 26) + 18 + PITCH * (line + 0.55),
              });
              const ana = at(wide ? 4 : 1);
              const jon = at(wide ? 6 : 2);
              return (
              <>
                <Window title="launch.tsx" className="pb-editor" style={{ width: editorW }}>
                  <div className="pb-code" data-target="code">
                    <Code lines={wide ? CODE : CODE_SHORT} count={s.lines} />
                  </div>
                  <div className="pb-term" aria-label="Deploy output">
                    {DEPLOY.map((d, i) => (
                      <div key={d.text} className="pb-term-line" data-kind={d.kind} data-on={s.deploy > i || undefined}>
                        <span className="pb-term-mark">{d.mark}</span>
                        {d.text}
                      </div>
                    ))}
                  </div>
                </Window>
                <Peer name="Ana" color={PEOPLE.ana} x={s.ana ? ana.x : ana.x + 60} y={s.ana ? ana.y : ana.y + 90} away={!s.ana} />
                <Peer name="Jon" color={PEOPLE.jon} x={s.jon ? jon.x : jon.x + 80} y={s.jon ? jon.y : jon.y + 70} slow away={!s.jon} />
                {wide &&
                  appsW > 120 &&
                  APPS.map((app, i) => (
                    <span
                      key={app.name}
                      className="pb-app"
                      title={app.name}
                      style={{ left: appsX + app.x * appsW, top: app.y * h, "--r": `${app.r}deg`, "--i": i } as CSSProperties}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={app.src} alt={app.name} width={40} height={40} />
                    </span>
                  ))}
              </>
              );
            }}
          </Stage>
        );
      }}
    >
      Marketing sites and first versions, built in Framer, Webflow or React and shipped with your team.
    </Tile>
  );
}

/* ---------------- UX audits: the audit report ---------------- */

// What a client actually receives: a report with a UX score and findings in
// priority order, and the team's sticky note on top. The findings tick off one
// by one and the score climbs as they do.
const FINDINGS = [
  { text: "Pay button below the fold", level: "High" },
  { text: "Labels fail contrast", level: "Med" },
  { text: "No undo after a transfer", level: "Med" },
];

type AuditBeat = { done: number };

async function auditScript(a: Act<AuditBeat>) {
  await a.wait(LEAD + STEP * 6 + 400);
  for (let n = 1; n <= FINDINGS.length; n++) {
    a.put({ done: n });
    await a.wait(650);
  }
  await a.wait(HOLD);
  a.put({ done: 0 });
  await a.wait(900);
}

function Audits() {
  return (
    <Tile
      area="audits"
      ground="butter"
      title="UX audits"
      render={({ w, h }) => {
        const docW = Math.min(290, w - 90);
        const docH = 286;
        const x = Math.round((w - docW) / 2) - 18;
        const y = Math.max(28, Math.round((h - docH) / 2));
        return (
          <Stage<AuditBeat> width={w} height={h} initial={{ done: 0 }} poster={{ done: FINDINGS.length }} play="loop" script={auditScript} className="pb-stage">
            {(s) => {
              const score = [62, 71, 78, 84][s.done];
              return (
                <>
                  <div className="pb-doc" style={{ left: x, top: y, width: docW, height: docH }}>
                    <div className="pb-doc-head">
                      <div>
                        <span className="pb-doc-kicker">Report</span>
                        <span className="pb-doc-title">UX audit · MoneyFlow</span>
                      </div>
                      <span className="pb-doc-score" style={{ "--p": score / 100 } as CSSProperties}>
                        <Count value={score} duration={600} />
                      </span>
                    </div>
                    <ol className="pb-doc-list">
                      {FINDINGS.map((f, i) => (
                        <li key={f.text} data-done={s.done > i || undefined}>
                          <span className="pb-doc-check">{s.done > i && <Icon name="check" size={10} />}</span>
                          <span className="pb-doc-text">{f.text}</span>
                          <span className="pb-doc-level" data-level={f.level}>
                            {f.level}
                          </span>
                        </li>
                      ))}
                    </ol>
                    <div className="pb-doc-lines" aria-hidden>
                      <Bar w="92%" h={5} tone={1} />
                      <Bar w="78%" h={5} tone={1} />
                    </div>
                  </div>
                  <div className="pb-sticky2" style={{ left: x + docW - 96, top: y + docH - 78 }}>
                    <span className="pb-tape" aria-hidden />
                    Fix the Pay button first
                  </div>
                </>
              );
            }}
          </Stage>
        );
      }}
    >
      A clear read on what slows users down, with fixes in priority order.
    </Tile>
  );
}

export function ServicesBento() {
  return (
    <div className="pn-bento">
      <div className="pb-grid">
        <Product />
        <Stat />
        <Systems />
        <Research />
        <Brand />
        <Web />
        <Audits />
      </div>
    </div>
  );
}
