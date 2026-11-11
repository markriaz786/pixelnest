import type { Metadata } from "next";
import { CtaCard } from "@/components/cta-card";
import { Reveal } from "@/components/reveal";
import { WorkCard } from "@/components/work-card";
import { caseStudies } from "@/content/work";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "How Pixelnest helps teams design scalable products, improve user experience and drive measurable business outcomes.",
};

export default function CaseStudiesPage() {
  const [lead, ...rest] = caseStudies;
  return (
    <>
      <section className="site-wrap pb-16 pt-[150px] sm:pt-[161px]">
        <Reveal>
          <h1 className="display text-[56px] leading-[1] sm:text-[88px] lg:text-[120px]">Our work</h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-12 max-w-[740px] text-[22px] font-light leading-[1.2] sm:mt-[76px] sm:text-[32px]">
            How we help teams design scalable products, improve user experience and drive measurable business outcomes.
          </p>
        </Reveal>
      </section>

      <section className="site-wrap pb-[160px]" aria-label="Case studies">
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
      </section>

      <CtaCard />
    </>
  );
}
