"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Big serif headings inside a <Reveal> animate line by line. ScrubText
// headings (they carry an aria-label) and anything marked data-no-split keep
// their own motion. Keep in step with the matching rule in globals.css.
const SELECTOR = ":is(h1, h2).display:not([aria-label]):not([data-no-split]):not([data-split])";

// Each line rises from behind its own mask as the heading scrolls into view,
// one after another. Once played, the split is undone so the heading is plain
// text again (and the selection handles aren't clipped). Called by <Reveal>
// after its own content has hydrated; returns a cleanup.
export function splitHeadings(root: HTMLElement) {
  const heads = [...(root.matches(SELECTOR) ? [root] : []), ...root.querySelectorAll<HTMLElement>(SELECTOR)];
  if (!heads.length) return () => {};
  heads.forEach((h) => h.setAttribute("data-split", ""));

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => heads.forEach((h) => h.removeAttribute("data-split"));
  }

  let cancelled = false;
  const splits: SplitText[] = [];
  const tweens: gsap.core.Tween[] = [];

  // Wait for the web fonts so lines break where they will finally sit
  document.fonts.ready.then(() => {
    if (cancelled) return;
    for (const el of heads) {
      const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
      splits.push(split);
      el.setAttribute("data-split", "ready");
      tweens.push(
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onComplete: () => split.revert(),
        }),
      );
    }
  });

  return () => {
    cancelled = true;
    tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
    splits.forEach((s) => s.revert());
    heads.forEach((h) => h.removeAttribute("data-split"));
  };
}
