import { experience } from "../data/portfolio";
import { usePageMeta } from "../lib/usePageMeta";

export default function Experience() {
  usePageMeta({
    title: "Experience | Inamullah Shaikh",
    description:
      "AI Intern at Komatsu Pakistan Soft. Agile, Git-based AI software development across prototype and integration phases.",
  });

  return (
    <div className="mx-auto max-w-[720px] px-6 pt-16 pb-4">
      <h1 className="text-[2rem] font-semibold text-ink">Experience</h1>

      <article className="mt-10 border-t border-line pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="text-xl font-semibold text-ink">
            {experience.role}, {experience.company}
          </h2>
          <span className="font-mono text-sm text-ink-faint">
            {experience.dateRange}
          </span>
        </div>
        <p className="mt-1 font-mono text-[13px] text-ink-faint">
          {experience.location}
        </p>
        <p className="mt-4 text-[17px] leading-[1.7] text-ink-soft">
          {experience.summary}
        </p>

        <h3 className="mt-8 text-sm font-medium uppercase tracking-widest text-ink-faint">
          What I did
        </h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-soft">
          {experience.responsibilities.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <h3 className="mt-8 text-sm font-medium uppercase tracking-widest text-ink-faint">
          Outcomes
        </h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-soft">
          {experience.achievements.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>

        <p className="mt-8 font-mono text-[13.5px] text-ink-faint">
          {experience.technologies.join(" · ")}
        </p>
      </article>
    </div>
  );
}
