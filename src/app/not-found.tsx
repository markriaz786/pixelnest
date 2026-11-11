import Link from "next/link";

export default function NotFound() {
  return (
    <section className="site-wrap flex min-h-[70dvh] flex-col justify-center pb-24 pt-[161px]">
      <p className="label text-muted">404</p>
      <h1 className="display mt-8 text-[56px] leading-[1] sm:text-[88px] lg:text-[120px]">Page not found.</h1>
      <Link href="/" className="display link-line mt-12 self-start pb-1 text-[40px] leading-none">
        Back home
      </Link>
    </section>
  );
}
