"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Thin reading-progress bar under the header on case study pages.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-[88px] z-50 h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
