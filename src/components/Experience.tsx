import { educationTimeline, experienceCopy, experiences } from "../data/portfolio";
import { useReveal, revealSectionClass } from "../hooks/useReveal";
import SectionHeading from "./SectionHeading";

function formatMonth(value: string) {
  const [year, month] = value.split("-").map(Number);
  return new Date(year, month - 1).toLocaleString("en-US", { month: "short", year: "numeric" });
}

export default function Experience() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="experience"
      ref={ref}
      className={`${revealSectionClass} section-pad`}
      aria-labelledby="experience-heading"
    >
      <div className="reveal-content mx-auto max-w-[1200px]">
        <SectionHeading title="Where I've worked" subtitle={experienceCopy.subtitle} headingId="experience-heading" />

        <div className="grid gap-3">
          {experiences.map((job) => (
            <article key={job.id} className="tile grid gap-6 p-7 md:grid-cols-[1fr_2fr] md:gap-12 md:p-12">
              <div>
                <p className="tabular-nums text-xs text-text-muted">
                  {formatMonth(job.start_date)} to {formatMonth(job.end_date)}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-text">{job.role}</h3>
                <p className="mt-1 text-sm text-text-muted">
                  {job.company}, {job.location}
                </p>
              </div>
              <div>
                <p className="max-w-[65ch] text-base leading-relaxed text-text-muted">{job.summaryText}</p>
                <ul className="mt-6 divide-y divide-line border-t border-line">
                  {job.bullets.map((item, i) => (
                    <li key={item} className="grid grid-cols-[2.5rem_1fr] py-4 text-[15px] leading-relaxed text-text">
                      <span className="tabular-nums text-xs text-text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <h3 className="mt-20 mb-6 text-[2rem] font-semibold tracking-[-0.015em] text-text">Education.</h3>
        <ul className="tile divide-y divide-line px-7 md:px-12">
          {educationTimeline.map((item) => (
            <li key={`${item.degree}-${item.institution}`} className="grid gap-2 py-6 md:grid-cols-[1fr_2fr] md:gap-12">
              <p className="tabular-nums text-xs text-text-muted">{item.dateRange}</p>
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8">
                <div>
                  <p className="font-medium text-text">{item.degree}</p>
                  <p className="mt-1 text-sm text-text-muted">
                    {item.institution}, {item.location}
                  </p>
                </div>
                <p className="shrink-0 text-sm text-text-muted">{item.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
