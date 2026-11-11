"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

// The brand's own 3D logo render, centred in its container. It tilts toward
// the pointer and drifts gently with scroll.
export function Logo3D() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 120, damping: 18 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      mx.set(Math.max(-1, Math.min(1, ((e.clientX - (r.left + r.width / 2)) / r.width) * 2)));
      my.set(Math.max(-1, Math.min(1, ((e.clientY - (r.top + r.height / 2)) / r.height) * 2)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center p-10 [perspective:900px]">
      <motion.div
        className="w-[72%] max-w-[340px]"
        style={reduce ? undefined : { rotateX, rotateY, y, rotate, transformStyle: "preserve-3d" }}
      >
        <Image
          src="/brand/logo-3d.png"
          alt=""
          width={858}
          height={1000}
          sizes="(min-width: 768px) 300px, 55vw"
          className="h-auto w-full drop-shadow-[0_30px_60px_rgba(91,69,255,0.35)]"
        />
      </motion.div>
    </div>
  );
}
