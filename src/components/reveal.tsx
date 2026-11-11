"use client";

import { useEffect, useRef } from "react";

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
    return () => io.disconnect();
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

// Coral hand-drawn ellipse around a word.
export function Circled({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 110"
        preserveAspectRatio="none"
        className="scribble pointer-events-none absolute -left-[8%] -top-[18%] h-[136%] w-[116%] overflow-visible"
      >
        <path
          pathLength={1}
          d="M240 14C190 2 92 4 44 20 8 32-2 62 22 82c34 28 152 30 222 14 44-10 60-40 34-62C252 12 180 6 120 10"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
