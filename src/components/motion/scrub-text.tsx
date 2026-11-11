"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Words fill from faint to full ink as the text scrolls through the viewport.
export function ScrubText({
  as: Tag = "p",
  text,
  className = "",
}: {
  as?: "p" | "h2" | "h3";
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current!.querySelectorAll("[data-word]"),
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: { trigger: ref.current, start: "top 85%", end: "bottom 45%", scrub: 0.6 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const words = text.split(" ");
  return (
    <Tag ref={ref as React.Ref<never>} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} data-word aria-hidden="true">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
