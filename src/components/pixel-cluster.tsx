"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

// A few coral pixels, like the loose squares in the Pixelnest mark, drifting
// apart slowly as the page scrolls. Decorative only.
const PIXELS = [
  { x: 0, y: 0, s: 14, depth: 1 },
  { x: 34, y: 22, s: 8, depth: 1.8 },
  { x: 58, y: -10, s: 10, depth: 2.6 },
  { x: 22, y: 56, s: 6, depth: 3.2 },
];

export function PixelCluster() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 600], [0, 1]);

  return (
    <div aria-hidden className="pointer-events-none absolute right-[clamp(20px,6vw,96px)] top-[150px] hidden h-24 w-24 md:block">
      {PIXELS.map((p, i) => (
        <Pixel key={i} {...p} drift={drift} still={!!reduce} />
      ))}
    </div>
  );
}

function Pixel({
  x,
  y,
  s,
  depth,
  drift,
  still,
}: {
  x: number;
  y: number;
  s: number;
  depth: number;
  drift: MotionValue<number>;
  still: boolean;
}) {
  const ty = useTransform(drift, (v) => v * -40 * depth);
  const tx = useTransform(drift, (v) => v * 12 * depth);
  const rotate = useTransform(drift, (v) => v * 20 * (depth % 2 ? 1 : -1));
  return (
    <motion.span
      className="absolute block rounded-[2px] bg-accent"
      style={{ left: x, top: y, width: s, height: s, opacity: 1 - depth * 0.15, ...(still ? {} : { x: tx, y: ty, rotate }) }}
    />
  );
}
