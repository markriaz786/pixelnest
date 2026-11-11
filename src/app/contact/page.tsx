import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Circled, Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your product. We'll review your needs and explore how Pixelnest can help.",
};

export default function ContactPage() {
  return (
    <section className="site-wrap pb-[160px] pt-[150px] sm:pt-[161px]">
      <Reveal>
        <h1 className="display text-[56px] leading-[1] sm:text-[88px] lg:text-[120px]">
          Let&apos;s <Circled>talk</Circled>
        </h1>
      </Reveal>

      <div className="mt-20 grid gap-16 md:grid-cols-[336px_1fr] md:gap-[170px]">
        <Reveal>
          <p className="text-[22px] font-light leading-[1.25] sm:text-[24px]">
            Ready to build a better digital product? Tell us about your product, goals or challenges. We&apos;ll review
            your needs and come back within two working days.
          </p>
          <div className="mt-12 space-y-8">
            <div>
              <p className="label text-muted">Mail us</p>
              <a href={`mailto:${site.email}`} className="link-line mt-3 inline-block text-[18px]">
                {site.email}
              </a>
            </div>
            <div>
              <p className="label text-muted">Call us</p>
              <a href={site.phoneHref} className="link-line mt-3 inline-block text-[18px]">
                {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
