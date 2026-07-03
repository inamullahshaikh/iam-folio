import { experienceBullets, experienceCopy, experienceSummary, featuredExperience } from "../data/portfolio";
import { useReveal, revealSectionClass } from "../hooks/useReveal";
import SectionHeading from "./SectionHeading";

function formatDateRange(startDate: string, endDate: string) {
  const [startYear, startMonth] = startDate.split("-").map(Number);
  const [endYear, endMonth] = endDate.split("-").map(Number);
  const start = new Date(startYear, startMonth - 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
  const end = new Date(endYear, endMonth - 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
  return `${start} - ${end}`;
}

export default function Experience() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="experience"
      ref={ref}
      className={`${revealSectionClass} section-pad border-t border-white/5 bg-bg-elevated/30`}
      aria-labelledby="experience-heading"
    >
      <div className="reveal-content mx-auto max-w-6xl">
        <SectionHeading
          title="Experience"
          subtitle={experienceCopy.subtitle}
          headingId="experience-heading"
        />

        <article className="card-surface p-4 sm:p-8">
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-8">
            <div className="border-l-2 border-accent pl-4">
              <p className="text-sm font-medium text-accent">
                {formatDateRange(
                  featuredExperience.start_date,
                  featuredExperience.end_date
                )}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-text">
                {featuredExperience.role}
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                {featuredExperience.company}
              </p>
              <p className="mt-1 text-sm text-text-muted">
                {featuredExperience.location}
              </p>
            </div>

            <div>
              <p className="text-base leading-relaxed text-text-muted">
                {experienceSummary}
              </p>

              <ul className="mt-6 space-y-3">
                {experienceBullets.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-text-muted"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
