import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CtaCard } from "@/components/cta-card";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ScrubText } from "@/components/motion/scrub-text";
import { Reveal } from "@/components/reveal";
import { WorkCard } from "@/components/work-card";
import { caseStudies, getCaseStudy, type Shot } from "@/content/work";

export function generateStaticParams() {
  return caseStudies.filter((c) => c.hasPage).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title}: ${study.kind} case study`,
    description: study.summary,
    openGraph: { images: [{ url: study.cover.src, width: study.cover.width, height: study.cover.height }] },
  };
}

function Figure({ shot, preload = false }: { shot: Shot; preload?: boolean }) {
  return (
    <Reveal as="div">
      <figure>
        <div className="overflow-hidden bg-paper-2">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            preload={preload}
            sizes="(min-width: 1264px) 1216px, 100vw"
            className="w-full"
          />
        </div>
        {shot.caption && <figcaption className="mt-4 text-[14px]">{shot.caption}</figcaption>}
      </figure>
    </Reveal>
  );
}

// Two-column text block: label on the left, content on the right.
function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="site-wrap py-[80px] sm:py-[100px]">
      <Reveal className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-[120px] xl:grid-cols-[336px_1fr] xl:gap-[170px]">
        <h2 className="label pt-2">{label}</h2>
        <div>{children}</div>
      </Reveal>
    </section>
  );
}

const lead = "text-[22px] font-light leading-[1.3] sm:text-[24px]";

// The page reads its slug inside <Suspense>, so client navigations to it stay
// instant (Cache Components). Both case studies are still prerendered.
export default function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: PageProps<"/case-studies/[slug]">["params"] }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study || !study.hasPage) notFound();

  const hero = study.hero ?? study.cover;
  const gallery = study.gallery ?? [];
  const others = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <article>
      <ScrollProgress />
      <header className="site-wrap pb-16 pt-[150px] sm:pt-[161px]">
        <Reveal>
          <Link href="/case-studies" className="label hover:opacity-60">
            ← All work
          </Link>
          <h1 className="display mt-10 text-[56px] leading-[1] sm:text-[88px] lg:text-[120px]">{study.title}</h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-12 max-w-[740px] text-[22px] font-light leading-[1.2] sm:text-[32px]">{study.summary}</p>
          <dl className="mt-14 grid grid-cols-2 gap-8 border-t border-line pt-8 md:grid-cols-4">
            {[
              ["Industry", study.category],
              ["Product", study.kind],
              ["Role", study.role],
              ["Timeline", study.timeline],
            ]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-muted">{k}</dt>
                  <dd className="mt-3 text-[16px]">{v}</dd>
                </div>
              ))}
          </dl>
        </Reveal>
      </header>

      <div className="site-wrap">
        <Figure shot={hero} preload />
      </div>

      {study.overview && (
        <Block label="Overview">
          <div className="space-y-6">
            {study.overview.map((p) => (
              <ScrubText key={p} text={p} className={lead} />
            ))}
          </div>
        </Block>
      )}

      {study.scope && (
        <Block label="Work scope">
          <ol className="grid gap-x-16 gap-y-12 sm:grid-cols-2">
            {study.scope.map((s) => (
              <li key={s.title} className="border-t border-line pt-4">
                <h3 className="text-[22px] font-light leading-[1.2] sm:text-[24px]">{s.title}</h3>
                <ul className="mt-4 space-y-2.5 text-[15px] font-light leading-[1.6]">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Block>
      )}

      {study.challenge && (
        <Block label="Challenge">
          {study.challenge.intro && <p className={lead}>{study.challenge.intro}</p>}
          <ol className="mt-10 border-t border-line">
            {study.challenge.points.map((p) => (
              <li key={p.body} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
                {p.title ? (
                  <h3 className="text-[18px] font-medium">{p.title}</h3>
                ) : (
                  <span className="hidden sm:block" />
                )}
                <p className="text-[15px] font-light leading-[1.6]">{p.body}</p>
              </li>
            ))}
          </ol>
          {study.challenge.outro && <p className={`mt-10 ${lead}`}>{study.challenge.outro}</p>}
        </Block>
      )}

      {gallery[0] && (
        <div className="site-wrap">
          <Figure shot={gallery[0]} />
        </div>
      )}

      {study.solution && (
        <Block label="Solution">
          <h3 className="display text-[44px] leading-[1.1] sm:text-[64px]">{study.solution.title}</h3>
          <div className={`mt-8 space-y-6 ${lead}`}>
            {study.solution.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {study.solution.points && (
            <ul className="mt-12 grid gap-x-16 gap-y-8 sm:grid-cols-2">
              {study.solution.points.map((p) => (
                <li key={p} className="border-t border-line pt-4 text-[15px] font-light leading-[1.6]">
                  {p}
                </li>
              ))}
            </ul>
          )}
        </Block>
      )}

      {study.highlight && (
        <Block label={study.highlight.title}>
          <div className={`space-y-6 ${lead}`}>
            {study.highlight.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Block>
      )}

      {gallery.length > 1 && (
        <section className="site-wrap space-y-16 pb-[100px]" aria-label="Project gallery">
          {gallery.slice(1).map((g) => (
            <Figure key={g.src} shot={g} />
          ))}
        </section>
      )}

      {study.results && (
        <section className="bg-night text-white">
          <div className="site-wrap py-[120px]">
            <p className="label">Results</p>
            <div className="mt-12 grid gap-12 sm:grid-cols-3">
              {study.results.map((r) => (
                <Reveal key={r.label} className="border-t border-night-line pt-6">
                  <p className="display text-[72px] leading-none sm:text-[96px]">{r.value}</p>
                  <p className="mt-4 text-[14px] text-white/60">{r.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="site-wrap py-[120px]">
        <div className="flex items-end justify-between gap-6">
          <h2 className="display text-[44px] leading-[1.1] sm:text-[64px]">More work</h2>
          <Link href="/case-studies" className="label pb-3 hover:opacity-60">
            See all
          </Link>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {others.map((o) => (
            <Reveal key={o.slug}>
              <WorkCard study={o} size="half" />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaCard />
    </article>
  );
}
