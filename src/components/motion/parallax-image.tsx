"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

// Image that drifts inside its frame as the page scrolls, and optionally
// grows from slightly inset to full width as it enters the viewport.
export function ParallaxImage({
  src,
  alt,
  width,
  height,
  sizes,
  preload = false,
  className = "",
  frameClassName = "",
  grow = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  preload?: boolean;
  className?: string;
  frameClassName?: string;
  grow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const clip = useTransform(enter, [0, 1], ["inset(0% 6% 0% 6%)", "inset(0% 0% 0% 0%)"]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-paper-2 ${frameClassName}`}
      style={grow && !reduce ? { clipPath: clip } : undefined}
    >
      <motion.div className="h-full w-full" style={reduce ? undefined : { y, scale: 1.14 }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          preload={preload}
          className={`h-full w-full object-cover ${className}`}
        />
      </motion.div>
    </motion.div>
  );
}
