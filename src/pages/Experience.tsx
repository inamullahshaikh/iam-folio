import { experience } from "../data/portfolio";
import { usePageMeta } from "../lib/usePageMeta";
import PageShell from "../components/PageShell";

export default function Experience() {
  usePageMeta({
    title: "Experience | Inamullah Shaikh",
    description: experience.summary,
  });

  return (
    <PageShell narrow>
      <h1 className="text-2xl font-semibold text-ink">Experience</h1>

      <article className="mt-6 border-t border-line pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-semibold text-ink">
            {experience.role}, {experience.company}
          </h2>
          <span className="font-mono text-xs text-ink-faint">{experience.dateRange}</span>
        </div>
        <p className="mt-3 text-sm text-ink-soft">{experience.summary}</p>
        <ul className="mt-4 list-disc space-y-1 pl-4 text-sm text-ink-soft">
          {experience.responsibilities.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </article>
    </PageShell>
  );
}
