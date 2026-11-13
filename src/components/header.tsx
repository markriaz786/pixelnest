"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-paper transition-shadow duration-300 ${
        scrolled && !open ? "shadow-[0_1px_0_var(--line)]" : ""
      }`}
    >
      <div className="site-wrap flex h-[88px] items-center justify-between">
        <Logo className="h-7 w-auto sm:h-8" />

        <nav aria-label="Main" className="hidden items-center gap-12 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link text-[16px] leading-5">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="relative -mr-2 grid size-11 place-items-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-px w-6 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`}
          />
          <span
            className={`absolute h-px w-6 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`}
          />
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-88px)] overflow-y-auto bg-paper lg:hidden">
        <nav aria-label="Mobile" className="site-wrap flex flex-col pt-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display border-b border-line py-5 text-[44px] leading-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
