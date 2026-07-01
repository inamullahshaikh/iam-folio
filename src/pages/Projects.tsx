import { useMemo, useState } from "react";
import { projects, type Category } from "../data/portfolio";
import ProjectRow from "../components/ProjectRow";
import { usePageMeta } from "../lib/usePageMeta";

const filters: { label: string; value: Category | "All" }[] = [
  { label: "All", value: "All" },
  { label: "AI/ML", value: "AI/ML" },
  { label: "Full-Stack", value: "Full-Stack" },
  { label: "DevOps", value: "DevOps" },
  { label: "Other", value: "Other" },
];

export default function Projects() {
  usePageMeta({
    title: "Projects | Inamullah Shaikh",
    description:
      "Projects across web, cloud, desktop, AI/ML, databases, and systems. Each with a short write-up.",
  });

  const [active, setActive] = useState<Category | "All">("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(active)),
    [active]
  );

  return (
    <div className="mx-auto max-w-[1100px] px-6 pt-16 pb-4">
      <h1 className="text-[2rem] font-semibold text-ink">Projects</h1>
      <p className="mt-3 max-w-[620px] text-ink-soft">
        Web apps, cloud deployments, desktop tools, AI projects, and systems
        coursework. Each row links to a write-up.
      </p>

      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-b border-line pb-4 text-sm"
      >
        {filters.map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={active === f.value}
            onClick={() => setActive(f.value)}
            className={
              active === f.value
                ? "font-medium text-rust"
                : "text-ink-faint transition-colors hover:text-ink"
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-2 border-t border-line">
        {visible.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
