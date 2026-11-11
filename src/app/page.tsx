import Link from "next/link";
import { CtaCard } from "@/components/cta-card";
import { Circled, Reveal } from "@/components/reveal";
import { ScrubText } from "@/components/motion/scrub-text";
import { Testimonials } from "@/components/testimonials";
import { WorkCard } from "@/components/work-card";
import { faqs, results, services, stack, stats, steps, whatIf } from "@/content/site";
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
      <section className="site-wrap pb-16 pt-[150px] sm:pt-[161px]">
        <Reveal>
          <h1 className="display max-w-[1216px] text-[56px] leading-[1] sm:text-[88px] lg:text-[120px]">
            Smart design &amp; dev for <Circled>ambitious</Circled> brands.
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-12 max-w-[740px] text-[22px] font-light leading-[1.2] sm:mt-[76px] sm:text-[32px]">
            We&apos;re a startup design &amp; development agency helping brands launch intuitive, user-centric digital
            products with clarity and purpose.
          </p>
          <Link href="#process" className="group mt-6 inline-flex items-center gap-3">
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

      {/* Services */}
      <section id="services" className="bg-night text-white">
        <div className="site-wrap py-[120px]">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="label">What we do</p>
              <h2 className="display mt-6 text-[44px] leading-[1.1] sm:text-[64px]">Design &amp; consulting services</h2>
              <p className="mt-6 max-w-[380px] text-[18px] font-light leading-[1.4] text-white/70">
                From first sketch to shipped product. Pick one service or bring us in end to end.
              </p>
            </Reveal>
            <ol className="border-t border-night-line md:col-span-7">
              {services.map((s) => (
                <Reveal as="li" key={s.title} className="grid gap-3 border-b border-night-line py-8 sm:grid-cols-12 sm:gap-6">
                  <h3 className="text-[24px] font-light leading-[1.2] sm:col-span-5">{s.title}</h3>
                  <p className="text-[15px] font-light leading-[1.6] text-white/65 sm:col-span-7">{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          <div id="process" className="mt-[120px] scroll-mt-28">
            <Reveal>
              <p className="label">How we work</p>
            </Reveal>
            <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((p, i) => (
                <Reveal as="li" key={p.step} delay={i * 100} className="border-t border-night-line pt-6">
                  <span className="text-[14px] text-muted">{p.step}</span>
                  <h3 className="display mt-6 text-[36px] leading-none">{p.title}</h3>
                  <p className="mt-4 text-[15px] font-light leading-[1.6] text-white/65">{p.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="mt-[120px] grid grid-cols-2 gap-y-12 border-t border-night-line pt-12 md:grid-cols-4">
            {stats.map((s) => (
              <Reveal key={s.label}>
                <p className="display text-[64px] leading-none sm:text-[84px]">{s.value}</p>
                <p className="mt-3 text-[14px] text-white/60">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What if */}
      <section className="py-[120px] sm:py-[160px]">
        <div className="mx-auto w-full max-w-[1180px] px-[clamp(20px,5vw,80px)]">
          <ScrubText
            as="h2"
            text="Push past the limits of your current product."
            className="display max-w-[972px] text-[44px] leading-[1.1] sm:text-[64px]"
          />
          <div className="mt-16 grid gap-10 md:grid-cols-[324px_1fr]">
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
        <div className="grid gap-12 md:grid-cols-[336px_1fr] md:gap-[170px]">
          <Reveal>
            <h2 className="display text-[48px] leading-[1.1] sm:text-[64px]">
              Frequently asked <Circled>questions</Circled>
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
                  <span aria-hidden="true" className="faq-icon mt-0.5 text-[22px] font-light leading-none transition-transform duration-300">
                    +
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

      {/* Tools */}
      <section className="site-wrap pb-[120px]" aria-label="Tools we use">
        <Reveal>
          <p className="label text-center text-muted">Tools we design and build with</p>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 items-center gap-y-10 sm:grid-cols-3 md:grid-cols-5">
          {stack.map((t, i) => (
            <Reveal as="li" key={t} delay={i * 80} className="text-center text-[24px] font-medium tracking-[-0.02em] text-ink/80">
              {t}
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Results */}
      <section className="pb-[160px]" aria-labelledby="results-title">
        <div className="mx-auto w-full max-w-[1180px] px-[clamp(20px,5vw,80px)]">
          <Reveal>
            <p id="results-title" className="label">
              Recent client results
            </p>
          </Reveal>
          <ul className="mt-10 space-y-8">
            {results.map((r) => (
              <Reveal as="li" key={r.text}>
                <Link href={r.href} className="display block text-[30px] leading-[1.2] transition-opacity hover:opacity-60 sm:text-[40px]">
                  {r.text}
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <Link href="/case-studies" className="group mt-14 inline-flex items-center gap-6">
              <Arrow className="text-accent transition-transform duration-300 group-hover:translate-x-1" />
              <span className="display text-[32px] leading-none sm:text-[40px]">Read the case studies</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaCard />
    </>
  );
}
