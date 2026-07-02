import { educationTimeline } from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";
import SectionHeading from "./SectionHeading";

export default function Education() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="education"
      ref={ref}
      className="reveal-section section-pad border-t border-white/5"
      aria-labelledby="education-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Education" headingId="education-heading" />

        <div className="scene-3d space-y-4">
          {educationTimeline.map((item) => (
            <article
              key={`${item.degree}-${item.institution}`}
              className="surface-3d surface-3d-soft surface-3d-card rounded-2xl border border-white/8 bg-bg/80 p-4 sm:p-7"
            >
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-8">
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-sm font-medium text-accent">{item.dateRange}</p>
                  <p className="mt-3 text-sm text-text-muted">{item.status}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-text">{item.degree}</h3>
                  <p className="mt-1 text-sm text-text-muted">{item.institution}</p>
                  <p className="mt-1 text-sm text-text-muted">{item.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
