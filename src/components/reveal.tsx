"use client";

import { useEffect, useRef } from "react";
import { splitHeadings } from "./motion/text-reveals";

// Fades children in when they scroll into view. Content stays visible
// without JavaScript because the hidden state needs the `js` class on <html>.
export function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
}: {
  as?: "div" | "section" | "li" | "p" | "h1" | "h2" | "span";
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    const unsplit = splitHeadings(el);
    return () => {
      io.disconnect();
      unsplit();
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

// A word shown as a selected layer in a design tool: a thin coral frame with
// four square handles. It draws in when its Reveal parent comes into view.
export function Selected({ children }: { children: React.ReactNode }) {
  return (
    <span className="selected relative inline-block whitespace-nowrap">
      {children}
      <span aria-hidden="true" className="selected-frame">
        <i data-c="tl" />
        <i data-c="tr" />
        <i data-c="bl" />
        <i data-c="br" />
      </span>
    </span>
  );
}
