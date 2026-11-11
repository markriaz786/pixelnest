import Link from "next/link";
import type { CaseStudy } from "@/content/work";
import { ParallaxImage } from "./motion/parallax-image";

export function WorkCard({
  study,
  size = "large",
  preload = false,
}: {
  study: CaseStudy;
  size?: "large" | "half";
  preload?: boolean;
}) {
  const tags = [study.category, study.kind, study.hasPage ? null : "Case study coming soon"].filter(Boolean).join(", ");

  const body = (
    <>
      <ParallaxImage
        src={study.cover.src}
        alt={study.cover.alt}
        width={study.cover.width}
        height={study.cover.height}
        preload={preload}
        grow={size === "large"}
        sizes={size === "large" ? "(min-width: 1264px) 1216px, 100vw" : "(min-width: 768px) 600px, 100vw"}
        frameClassName={size === "large" ? "aspect-[1216/620]" : "aspect-[592/620]"}
        className="transition-transform duration-[1.2s] ease-out-quint group-hover:scale-[1.03]"
      />
      <p className="mt-6 text-[26px] font-light leading-[1.2] sm:text-[32px]">{study.title}</p>
      <p className="mt-1.5 text-[14px] leading-[1.2]">{tags}</p>
    </>
  );

  return study.hasPage ? (
    <Link href={`/case-studies/${study.slug}`} className="group block">
      {body}
    </Link>
  ) : (
    <div className="group block">{body}</div>
  );
}
