import Link from "next/link";
import { CtaCard } from "@/components/cta-card";
import { Selected, Reveal } from "@/components/reveal";
import { ServicesBento } from "@/components/bento/services-bento";
import { ScrubText } from "@/components/motion/scrub-text";
import { PixelCluster } from "@/components/pixel-cluster";
import { ProcessSection } from "@/components/process-section";
import { Testimonials } from "@/components/testimonials";
import { WorkCard } from "@/components/work-card";
import { faqs, results, whatIf } from "@/content/site";
import { caseStudies } from "@/content/work";

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 40 14" aria-hidden="true" className={`h-[14px] w-[40px] ${className}`}>
    <path d="M0 7h38M32 1l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export default function Home() {
  const [lead, ...rest] = caseStudies;

  return (
    <>
      {/* Hero */}
      <section className="site-wrap relative pb-16 pt-[150px] sm:pt-[161px]">
        <PixelCluster />
        <Reveal>
          <h1 className="display max-w-[1216px] text-[56px] leading-[1] sm:text-[88px] lg:text-[120px]">
            Smart design &amp; dev for <Selected>ambitious</Selected> brands.
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-12 max-w-[740px] text-[22px] font-light leading-[1.2] sm:mt-[76px] sm:text-[32px]">
            We&apos;re a startup design &amp; development agency helping brands launch intuitive, user-centric digital
            products with clarity and purpose.
          </p>
          <Link href="#process" className="group mt-4 inline-flex items-center gap-3 py-2">
            <Arrow className="text-accent transition-transform duration-300 group-hover:translate-x-1" />
            <span className="label">Learn about our process</span>
          </Link>
        </Reveal>
      </section>

      {/* Work */}
      <section id="work" aria-label="Selected work" className="site-wrap">
        <Reveal>
          <WorkCard study={lead} preload />
        </Reveal>
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {rest.map((s, i) => (
            <Reveal key={s.slug} delay={i * 120}>
              <WorkCard study={s} size="half" />
            </Reveal>
          ))}
        </div>
        <div className="flex justify-center pb-[120px] pt-16">
          <Link href="/case-studies" className="display link-line pb-1 text-[40px] leading-none sm:text-[48px]">
            See more work
          </Link>
        </div>
      </section>

      {/* Services: a bento of small product UI */}
      <section id="services" className="site-wrap scroll-mt-28 pb-[120px]">
        <div className="grid gap-6 border-t border-line pt-[120px] md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <p className="label">What we do</p>
            <h2 className="display mt-6 text-[44px] leading-[1.1] sm:text-[64px]">Design &amp; build services</h2>
          </Reveal>
          <Reveal className="md:col-span-5 md:pb-2" delay={120}>
            <p className="max-w-[420px] text-[18px] font-light leading-[1.4] text-ink-2">
              From first sketch to shipped product. Pick one service or bring us in end to end.
            </p>
          </Reveal>
        </div>
        <div className="mt-14">
          <ServicesBento />
        </div>
      </section>

      {/* Process and numbers */}
      <ProcessSection />

      {/* What if */}
      <section className="py-[120px] sm:py-[160px]">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(20px,5vw,96px)]">
          <ScrubText
            as="h2"
            text="Push past the limits of your current product."
            className="display max-w-[972px] text-[44px] leading-[1.1] sm:text-[64px]"
          />
          <div className="mt-16 grid gap-10 lg:grid-cols-[324px_1fr]">
            <Reveal>
              <p className="label">What if…</p>
            </Reveal>
            <div>
              <ul className="grid gap-x-24 gap-y-14 sm:grid-cols-2">
                {whatIf.map((q, i) => (
                  <Reveal as="li" key={q} delay={(i % 2) * 120} className="max-w-[276px] border-t border-line pt-4">
                    <p className="text-[22px] font-light leading-[1.2] sm:text-[24px]">{q}</p>
                  </Reveal>
                ))}
              </ul>
              <Reveal>
                <p className="mt-20 max-w-[648px] text-[22px] font-light leading-[1.2] sm:text-[24px]">
                  If any of these would move your business forward, reach out and tell us what you&apos;re building.
                </p>
                <Link href="/contact" className="display link-line mt-10 inline-block pb-1 text-[56px] leading-none sm:text-[64px]">
                  Let&apos;s chat
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="site-wrap" aria-label="Testimonials">
        <Reveal>
          <Testimonials />
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="site-wrap scroll-mt-28 py-[120px] sm:py-[160px]">
        <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-[120px] xl:grid-cols-[336px_1fr] xl:gap-[170px]">
          <Reveal>
            <h2 className="display text-[48px] leading-[1.1] sm:text-[64px]">
              Frequently asked <Selected>questions</Selected>
            </h2>
            <p className="mt-10 text-[22px] font-light leading-[1.2] sm:text-[24px]">
              If you have more questions, we&apos;re happy to answer them. Don&apos;t hesitate to reach out.
            </p>
          </Reveal>
          <Reveal className="border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-[18px] font-medium leading-[1.3] sm:text-[20px]">
                  {f.q}
                  <span aria-hidden="true" className="faq-icon pixel-plus mt-1.5">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                </summary>
                <div className="max-w-[670px] space-y-4 pb-8 text-[15px] font-light leading-[1.6]">
                  {f.a.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </Reveal>
        </div>
      </section>


      {/* Results */}
      <section className="pb-[160px]" aria-labelledby="results-title">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(20px,5vw,96px)]">
          <Reveal>
            <p id="results-title" className="label">
              Recent client results
            </p>
          </Reveal>
          <ul className="mt-10 border-t border-line">
            {results.map((r) => (
              <Reveal as="li" key={r.client}>
                <Link
                  href={r.href}
                  className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-1 border-b border-line py-8 sm:grid-cols-[220px_minmax(0,1fr)_auto] sm:gap-x-10"
                >
                  <span className="display text-[56px] leading-none tabular-nums sm:text-[72px]">{r.figure}</span>
                  <span className="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1">
                    <span className="block text-[13px] font-medium uppercase tracking-[0.1em] text-muted">{r.client}</span>
                    <span className="mt-1 block text-[18px] font-light leading-[1.35] sm:text-[20px]">{r.text}</span>
                  </span>
                  <Arrow className="col-start-2 row-span-2 row-start-1 text-ink/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent sm:col-start-3 sm:row-span-1" />
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <Link href="/case-studies" className="group mt-8 inline-flex items-center gap-3 py-2">
              <Arrow className="text-accent transition-transform duration-300 group-hover:translate-x-1" />
              <span className="label">Read the case studies</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaCard />
    </>
  );
}
