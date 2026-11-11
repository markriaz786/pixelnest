import Link from "next/link";

// White "Let's talk" card that overlaps the dark footer.
export function CtaCard() {
  return (
    <section aria-label="Start a project" className="relative">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-night" aria-hidden="true" />
      <div className="site-wrap relative">
        <div className="mx-auto flex max-w-[1020px] flex-col gap-8 bg-white px-8 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-20 sm:py-20">
          <p className="max-w-[300px] text-[14px] leading-[1.6] text-ink-2">
            Tell us about your product, goals or challenges, even if you&apos;re not sure what the next step is. No
            pitch, no strings attached.
          </p>
          <Link href="/contact" className="display link-line self-start pb-1 text-[56px] leading-none sm:self-auto sm:text-[64px]">
            Let&apos;s talk
          </Link>
        </div>
      </div>
    </section>
  );
}
