import { Handshake, Layers, Repeat, Users, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaCard } from "@/components/cta-card";
import { ScrubText } from "@/components/motion/scrub-text";
import { Reveal, Selected } from "@/components/reveal";
import { TeamCard } from "@/components/team-card";
import { industries, principles, site, stack, stats, team } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Pixelnest Solutions is a design and development studio helping startups and growing teams build clear, trustworthy digital products.",
};

const ICONS: LucideIcon[] = [Handshake, Users, Layers, Repeat];

const story = [
  "We're a design and development studio for startups and growing teams. We work across websites, web and mobile apps, and complex B2B and enterprise platforms.",
  "Our team blends strong UX thinking with practical business sense. We aim to be a dependable design partner, not just a service provider.",
];

// The lead is featured on its own; everyone else sits in the grid below
const lead = team.find((m) => m.lead);
const crew = team.filter((m) => m !== lead);

export default function AboutPage() {
  return (
    <>
      <header className="site-wrap pb-20 pt-[150px] sm:pt-[161px]">
        <Reveal>
          <p className="label">About {site.shortName}</p>
          <h1 className="display mt-10 max-w-[1216px] text-[56px] leading-[1] sm:text-[88px] lg:text-[120px]">
            We make complex products feel <Selected>simple</Selected>.
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-12 max-w-[740px] text-[22px] font-light leading-[1.2] sm:mt-[76px] sm:text-[32px]">
            Research, UX strategy, UI, design systems and front-end under one roof, for startups and growing teams
            that want their product to feel clear and trustworthy.
          </p>
        </Reveal>
      </header>

      {/* Numbers */}
      <section aria-label="Pixelnest in numbers" className="site-wrap">
        <dl className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="border-b border-line py-8 pr-6 lg:border-b-0">
              <dt className="label text-muted">{s.label}</dt>
              <dd className="display mt-6 text-[56px] leading-none sm:text-[80px]">{s.value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Story */}
      <section className="site-wrap py-[120px] sm:py-[160px]">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-[120px] xl:grid-cols-[336px_1fr] xl:gap-[170px]">
          <Reveal>
            <h2 className="label pt-2">Who we are</h2>
          </Reveal>
          <div className="space-y-6">
            {story.map((p) => (
              <ScrubText key={p} text={p} className="text-[24px] font-light leading-[1.3] sm:text-[32px]" />
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-night text-white">
        <div className="site-wrap py-[120px]">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-7">
              <p className="label">How we work</p>
              <h2 className="display mt-6 text-[44px] leading-[1.1] sm:text-[64px]">What you can count on.</h2>
            </Reveal>
            <Reveal className="md:col-span-5 md:pb-2" delay={120}>
              <p className="max-w-[420px] text-[18px] font-light leading-[1.4] text-white/65">
                Four promises that shape every project, from a one-week audit to a full product build.
              </p>
            </Reveal>
          </div>
          <ul className="pn-proc mt-16">
            {principles.map((p, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal as="li" key={p.title} delay={i * 100} className="pn-proc-step">
                  <div className="flex items-center justify-between">
                    <span className="pn-proc-icon">
                      <Icon size={22} strokeWidth={1.25} aria-hidden />
                    </span>
                    <span className="text-[13px] tabular-nums text-white/45">0{i + 1}</span>
                  </div>
                  <h3 className="display mt-10 text-[30px] leading-[1.05]">{p.title}</h3>
                  <p className="mt-4 text-[15px] font-light leading-[1.6] text-white/65">{p.body}</p>
                </Reveal>
              );
            })}
          </ul>
          <Reveal>
            <Link href="/#process" className="group mt-12 inline-flex items-center gap-3 py-2">
              <svg viewBox="0 0 40 14" aria-hidden="true" className="h-[14px] w-[40px] text-accent transition-transform duration-300 group-hover:translate-x-1">
                <path d="M0 7h38M32 1l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              <span className="label">See our four-step process</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section id="team" className="site-wrap scroll-mt-28 pt-[120px] sm:pt-[160px]">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-7">
              <p className="label">The team</p>
              <h2 className="display mt-6 text-[44px] leading-[1.1] sm:text-[64px]">The people behind the pixels.</h2>
            </Reveal>
            <Reveal className="md:col-span-5 md:pb-2" delay={120}>
              <p className="max-w-[420px] text-[18px] font-light leading-[1.4] text-ink-2">
                A small, senior team. The people you meet on the first call are the ones who do the work.
              </p>
            </Reveal>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {[lead, ...crew].filter((m) => m !== undefined).map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 110} className="h-full">
                <TeamCard {...m} tone={i - 1} />
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {/* Industries and tools */}
      <section className="site-wrap py-[120px] sm:py-[160px]">
        <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-[120px] xl:grid-cols-[336px_1fr] xl:gap-[170px]">
          <Reveal>
            <h2 className="label pt-2">Where we work</h2>
          </Reveal>
          <div>
            <Reveal>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[32px] font-light leading-[1.25] sm:text-[44px]">
                {industries.map((x, i) => (
                  <li key={x} className="display">
                    {x}
                    {i < industries.length - 1 && <span className="ml-4 text-accent">/</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <p className="label mt-20 text-muted">Tools we build with</p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {stack.map((t) => (
                  <li key={t} className="flex items-center gap-3 border border-line bg-white py-2.5 pl-2.5 pr-4 text-[15px]">
                    <Image src={`/brand/tools/${t.toLowerCase()}.png`} alt="" width={28} height={28} className="size-7" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaCard />
    </>
  );
}
