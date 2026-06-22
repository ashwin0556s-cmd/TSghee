export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center md:mb-12">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
      <h2 className="font-heading text-4xl font-bold text-leaf md:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-7 text-leaf/70">{copy}</p> : null}
    </div>
  );
}
