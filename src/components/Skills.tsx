import { skillCategories, skillsSubtitle } from "../data/portfolio";
import { useReveal, revealSectionClass } from "../hooks/useReveal";
import SectionHeading from "./SectionHeading";

function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-text-muted">
      {label}
    </span>
  );
}

export default function Skills() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="skills"
      ref={ref}
      className={`${revealSectionClass} section-pad border-t border-white/5 bg-bg-elevated/30`}
      aria-labelledby="skills-heading"
    >
      <div className="reveal-content mx-auto max-w-6xl">
        <SectionHeading
          title="Skills"
          highlight="& Tools"
          subtitle={skillsSubtitle}
          headingId="skills-heading"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <article
              key={category.id}
              className="card-surface p-5"
            >
              <h3 className="mb-4 border-b border-accent/25 pb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.tags.map((tag) => (
                  <SkillTag key={tag} label={tag} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
