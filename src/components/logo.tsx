import Image from "next/image";
import Link from "next/link";

// Brand files live in /public/brand:
//   logo-dark.png  ink wordmark, for light backgrounds
//   logo-light.png white wordmark, for dark backgrounds
//   logo-mark.png  icon only
//   logo-3d.png    3D icon, used as a brand accent
export function Logo({ tone = "dark", className = "h-7 w-auto" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label="Pixelnest Solutions, home">
      <Image
        src={tone === "dark" ? "/brand/logo-dark.png" : "/brand/logo-light.png"}
        alt="Pixelnest"
        width={4611}
        height={782}
        preload
        sizes="200px"
        className={className}
      />
    </Link>
  );
}
