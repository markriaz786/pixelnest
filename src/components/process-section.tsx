"use client";

import { Compass, FlaskConical, PenTool, Route, type LucideIcon } from "lucide-react";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Count } from "@/stageshow/kit";
import { stats, steps } from "@/content/site";
import { Reveal } from "./reveal";

const ICONS: LucideIcon[] = [Compass, Route, PenTool, FlaskConical];

function Stat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const n = parseInt(value, 10);
  const suffix = value.replace(String(n), "");
  return (
    <div ref={ref} className="pn-proc-stat">
      <p className="display text-[64px] leading-none sm:text-[84px]">
        <Count value={seen || reduce ? n : 0} duration={1100 + delay} />
        {suffix}
      </p>
      <p className="mt-4 text-[14px] text-white/60">{label}</p>
    </div>
  );
}

export function ProcessSection() {
  const track = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 85%", "end 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  // Width, not scale, so the pixels keep their square shape as the row fills
  const fill = useTransform(progress, (v) => `${Math.max(0, Math.min(1, v)) * 100}%`);

  return (
    <section className="bg-night text-white">
      <div className="site-wrap py-[120px]">
        <div id="process" className="scroll-mt-28">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-7">
              <p className="label">How we work</p>
              <h2 className="display mt-6 text-[44px] leading-[1.1] sm:text-[64px]">Four steps, no surprises.</h2>
            </Reveal>
            <Reveal className="md:col-span-5 md:pb-2" delay={120}>
              <p className="max-w-[420px] text-[18px] font-light leading-[1.4] text-white/65">
                Clear milestones and open communication, so you always know where your project stands.
              </p>
            </Reveal>
          </div>

          <ol ref={track} className="pn-proc relative mt-16">
            {/* The thread through the icons, filling coral as you scroll */}
            <span aria-hidden className="pn-proc-thread">
              <motion.span className="pn-proc-thread-fill" style={{ width: fill }} />
            </span>

            {steps.map((p, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal as="li" key={p.step} delay={i * 100} className="pn-proc-step group">
                  <div className="flex items-center justify-between">
                    <span className="pn-proc-icon">
                      <Icon size={22} strokeWidth={1.25} aria-hidden />
                    </span>
                    <span className="text-[13px] tabular-nums text-white/45">{p.step}</span>
                  </div>
                  <h3 className="display mt-10 text-[34px] leading-none">{p.title}</h3>
                  <p className="mt-4 text-[15px] font-light leading-[1.6] text-white/65">{p.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.outputs.map((o) => (
                      <li key={o} className="pn-proc-tag">
                        {o}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <div className="pn-proc-stats mt-[120px]">
          {stats.map((s, i) => (
            <Stat key={s.label} value={s.value} label={s.label} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
