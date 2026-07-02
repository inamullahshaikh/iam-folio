import { skillCategories, skillsSubtitle } from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";
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
      className="reveal-section section-pad border-t border-white/5 bg-bg-elevated/30"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Skills"
          highlight="& Tools"
          subtitle={skillsSubtitle}
          headingId="skills-heading"
        />

        <div className="scene-3d grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <article
              key={category.id}
              className="split-panel-soft split-shell surface-3d surface-3d-soft surface-3d-card rounded-2xl border border-white/8 bg-bg/80 p-5 transition-all duration-200 hover:border-accent/30 hover:shadow-[0_0_24px_rgba(139,92,246,0.12)]"
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
