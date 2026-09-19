import { skillCategories, skillsSubtitle } from "../data/portfolio";
import { useReveal, revealSectionClass } from "../hooks/useReveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="skills" ref={ref} className={`${revealSectionClass} section-pad`} aria-labelledby="skills-heading">
      <div className="reveal-content mx-auto max-w-[1200px]">
        <SectionHeading title="The toolbox" subtitle={skillsSubtitle} headingId="skills-heading" />

        <dl className="tile divide-y divide-line px-7 md:px-12">
          {skillCategories.map((category) => (
            <div key={category.id} className="grid gap-3 py-6 md:grid-cols-[1fr_2fr] md:gap-12">
              <dt className="text-[17px] font-semibold text-text">{category.title}</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-2 text-[17px] text-text-muted">
                {category.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
