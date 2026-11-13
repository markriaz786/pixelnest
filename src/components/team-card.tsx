"use client";

import Image from "next/image";
import { useId, useState, type CSSProperties } from "react";
import "./team-card.css";

export type Member = {
  name: string;
  role: string;
  bio?: string;
  skills?: string[];
  photo?: string; // a path in /public, e.g. "/team/name.jpg"
  links?: { label: string; href: string }[];
  lead?: boolean; // featured first, on a dark card
};

// Solid grounds for the placeholder headshots
const TONES = ["#ece6dc", "#f2e2d8", "#f3ebd5"];

// A tall card: the name over two lines, the role, and a small square
// headshot tucked into the corner. On hover (or the +/− button on touch)
// the headshot wipes away and the bio comes in.
export function TeamCard({ tone = 0, ...m }: Member & { tone?: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const [first, ...rest] = m.name.split(/\s+/);
  const live = m.links?.filter((l) => l.href) ?? [];
  const style = {
    "--tm-shot": m.lead ? "#33302c" : TONES[tone % TONES.length],
    "--tm-fg": m.lead ? "rgb(246 244 238 / 0.18)" : "rgb(22 22 19 / 0.1)",
  } as CSSProperties;

  return (
    <article className="tm-card" data-lead={m.lead || undefined} data-open={open || undefined} style={style}>
      <h3 className="tm-name display">
        {first}
        <br />
        {rest.join(" ")}
      </h3>
      <p className="tm-role">
        {m.lead && <span className="tm-badge">Lead</span>}
        {m.role}
      </p>

      <div id={id} className="tm-bio">
        {m.bio && <p>{m.bio}</p>}
        {m.skills && m.skills.length > 0 && (
          <ul className="tm-chips" aria-label={`${m.name}'s focus`}>
            {m.skills.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
        {live.length > 0 && (
          <ul className="flex gap-5 text-[14px]">
            {live.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-line inline-block py-1">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="tm-shot">
        {m.photo ? (
          <Image src={m.photo} alt={m.name} fill sizes="160px" className="object-cover" />
        ) : (
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet" role="img" aria-label={`${m.name} (photo coming soon)`}>
            <circle cx="50" cy="42" r="17" fill="var(--tm-fg)" />
            <path d="M14 100c0-22 16-36 36-36s36 14 36 36Z" fill="var(--tm-fg)" />
          </svg>
        )}
      </div>

      <button
        type="button"
        className="tm-toggle"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? `Hide ${first}'s bio` : `Read ${first}'s bio`}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 33 33" aria-hidden>
          <circle cx="16.5" cy="16.5" r="16" fill="none" stroke="currentColor" opacity="0.25" />
          <path d="M11.5 16.5h10" stroke="currentColor" strokeWidth="1.2" />
          <path className="tm-plus" d="M16.5 11.5v10" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
    </article>
  );
}
