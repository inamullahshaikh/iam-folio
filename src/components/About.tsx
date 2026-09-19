import { longBioParagraphs, aboutQuickFacts, aboutSubtitle } from "../data/portfolio";
import { useReveal, revealSectionClass } from "../hooks/useReveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  const ref = useReveal<HTMLElement>();
  const [lead, ...rest] = longBioParagraphs;

  return (
    <section id="about" ref={ref} className={`${revealSectionClass} section-pad`} aria-labelledby="about-heading">
      <div className="reveal-content mx-auto max-w-[1200px]">
        <SectionHeading title="Get to know me" subtitle={aboutSubtitle} headingId="about-heading" />

        <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
          <dl className="tile divide-y divide-line self-start px-7 md:sticky md:top-16">
            {aboutQuickFacts.map((fact) => (
              <div key={fact.label} className="py-5">
                <dt className="text-sm font-semibold text-text-muted">{fact.label}</dt>
                <dd className="mt-1 text-[17px] leading-snug text-text">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="tile p-7 md:p-12">
            <p className="max-w-[40ch] text-2xl font-semibold leading-snug tracking-[-0.015em] text-text text-pretty md:text-[1.75rem]">
              {lead}
            </p>
            <div className="mt-10 space-y-5 md:columns-2 md:gap-10 md:space-y-0">
              {rest.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-text-muted md:mb-5 md:break-inside-avoid"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
