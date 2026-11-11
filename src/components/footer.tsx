import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { caseStudies } from "@/content/work";

export function Footer() {
  const social = site.social.filter((s) => s.href);

  const cols = [
    {
      title: "Work",
      links: caseStudies.map((c) => ({
        label: c.title,
        href: c.hasPage ? `/case-studies/${c.slug}` : "/case-studies",
      })),
    },
    {
      title: "Company",
      links: [
        { label: "Services", href: "/#services" },
        { label: "Process", href: "/#process" },
        { label: "FAQ", href: "/#faq" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: site.email, href: `mailto:${site.email}` },
        { label: site.phone, href: site.phoneHref },
        ...social.map((s) => ({ label: s.label, href: s.href })),
      ],
    },
  ];

  return (
    <footer className="bg-night text-paper">
      <div className="site-wrap pb-12 pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <p className="display max-w-[260px] text-[28px] leading-[1.15] md:col-span-3">
            Smart design &amp; dev for ambitious brands.
          </p>
          {cols.map((c) => (
            <div key={c.title} className="md:col-span-3">
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em]">{c.title}</p>
              <ul className="mt-6 space-y-3 text-[15px] text-paper/70">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="break-words hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <Image
            src="/brand/logo-light.png"
            alt="Pixelnest"
            width={4611}
            height={782}
            sizes="(min-width: 1264px) 1216px, 100vw"
            className="h-auto w-full opacity-95"
          />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-night-line pt-8 text-[13px] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Pixelnest Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/legal/privacy-policy" className="hover:text-paper">
              Privacy Policy
            </Link>
            <Link href="/legal/terms-and-conditions" className="hover:text-paper">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
