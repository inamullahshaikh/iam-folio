type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  headingId?: string;
};

export default function SectionHeading({ title, subtitle, headingId }: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16">
      <h2
        id={headingId}
        className="text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.015em] text-text text-balance md:text-[3.5rem]"
      >
        {title}.
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-[46ch] text-lg leading-snug font-medium text-text-muted text-pretty md:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
