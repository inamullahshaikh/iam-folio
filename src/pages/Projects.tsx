import { useMemo, useState } from "react";
import { projects, type Category } from "../data/portfolio";
import ProjectRow from "../components/ProjectRow";
import { usePageMeta } from "../lib/usePageMeta";
import PageShell from "../components/PageShell";

const filters: { label: string; value: Category | "All" }[] = [
  { label: "All", value: "All" },
  { label: "AI", value: "AI/ML" },
  { label: "Web", value: "Full-Stack" },
  { label: "Cloud", value: "DevOps" },
  { label: "Other", value: "Other" },
];

export default function Projects() {
  usePageMeta({
    title: "Projects | Inamullah Shaikh",
    description: "Web, cloud, desktop, and AI projects.",
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
    <PageShell>
      <h1 className="text-2xl font-semibold text-ink sm:text-[1.75rem]">Projects</h1>

      <div
        role="tablist"
        aria-label="Filter projects"
        className="nav-scroll mt-5 flex gap-3 overflow-x-auto border-b border-line pb-3 text-sm"
      >
        {filters.map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={active === f.value}
            onClick={() => setActive(f.value)}
            className={`shrink-0 whitespace-nowrap ${
              active === f.value ? "font-medium text-rust" : "text-ink-faint"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-1 divide-y divide-line border-t border-line">
        {visible.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </PageShell>
  );
}
