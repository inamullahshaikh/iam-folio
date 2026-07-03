import { longBioParagraphs, aboutQuickFacts, aboutSubtitle, personal } from "../data/portfolio";
import { useReveal, revealSectionClass } from "../hooks/useReveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className={`${revealSectionClass} section-pad relative`}
      aria-labelledby="about-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 glow-spot opacity-50" aria-hidden />

      <div className="reveal-content relative mx-auto max-w-6xl">
        <SectionHeading
          title="About"
          highlight="Me"
          subtitle={aboutSubtitle}
          headingId="about-heading"
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-14 lg:items-start">
          <div className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
            <div className="card-surface overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.12)]">
              <img
                src="/inam-ullah-shaikh.jpeg"
                alt={`${personal.full_name} headshot`}
                width={560}
                height={700}
                className="aspect-[4/5] w-full object-cover object-[center_18%]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div>
            <div className="space-y-5">
              {longBioParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-text-muted sm:text-[1.05rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="card-surface mt-10 space-y-4 bg-bg-elevated/60 p-6">
              {aboutQuickFacts.map((fact) => (
                <div key={fact.label} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
                  <dt className="text-sm font-semibold text-accent">{fact.label}</dt>
                  <dd className="text-sm leading-relaxed break-words text-text-muted">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
