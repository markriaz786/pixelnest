export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <article className="site-wrap pb-[160px] pt-[150px] sm:pt-[161px]">
      <h1 className="display text-[56px] leading-[1] sm:text-[88px]">{title}</h1>
      <p className="label mt-8 text-muted">Last updated {updated}</p>
      <div className="mt-16 grid gap-12 border-t border-line pt-12 md:grid-cols-[336px_1fr] md:gap-[170px]">
        <span className="hidden md:block" />
        <div className="max-w-[670px] space-y-12">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-[20px] font-medium">{s.heading}</h2>
              <div className="mt-4 space-y-4 text-[16px] font-light leading-[1.7]">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
