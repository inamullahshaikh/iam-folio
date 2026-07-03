type SectionHeadingProps = {
  title: string;
  highlight?: string;
  subtitle?: string;
  headingId?: string;
};

export default function SectionHeading({
  title,
  highlight,
  subtitle,
  headingId,
}: SectionHeadingProps) {
  const headingText = `${title}${highlight ? ` ${highlight}` : ""}`;

  return (
    <div className="heading-motion relative mb-8 text-center sm:mb-14">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl sm:h-32 sm:w-64"
        aria-hidden
      />
      <h2
        id={headingId}
        className="split-heading relative text-balance text-2xl font-bold tracking-tight text-text sm:text-4xl"
      >
        <span className="split-heading-ghost" aria-hidden>
          {headingText}
        </span>
        <span className="split-copy">{title}</span>
        {highlight && <span className="text-gradient-violet split-copy">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="relative mx-auto mt-3 max-w-2xl text-pretty px-1 text-sm leading-relaxed text-text-muted sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
