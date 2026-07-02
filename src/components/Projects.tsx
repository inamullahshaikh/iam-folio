import { useMemo, useState } from "react";
import {
  featuredProjects,
  secondaryProjects,
  projectFilters,
  projectsCopy,
  type ProjectFilter,
  type PortfolioProject,
} from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";
import ProjectDetailModal from "./ProjectDetailModal";
import SectionHeading from "./SectionHeading";

function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-text-muted">
      {label}
    </span>
  );
}

function ProjectLinks({
  project,
  onLinkClick,
}: {
  project: PortfolioProject;
  onLinkClick: (event: React.MouseEvent) => void;
}) {
  const { github, live_demo } = project.links;

  if (!github && !live_demo) return null;

  return (
    <div className="flex flex-wrap gap-3 pt-4">
          {live_demo && (
        <a
          href={live_demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onLinkClick}
          className="inline-flex min-h-10 items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-hover sm:min-h-0 sm:py-2"
        >
          {projectsCopy.liveDemo}
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onLinkClick}
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-text transition-all duration-200 hover:border-accent/50 sm:min-h-0 sm:py-2"
        >
          {projectsCopy.github}
        </a>
      )}
    </div>
  );
}

function FeaturedCard({
  project,
  onOpen,
}: {
  project: PortfolioProject;
  onOpen: (project: PortfolioProject) => void;
}) {
  const stopPropagation = (event: React.MouseEvent) => event.stopPropagation();
  const hasLinks = Boolean(project.links.github || project.links.live_demo);

  return (
    <article className="group scene-3d split-panel split-shell surface-3d surface-3d-medium surface-3d-card flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-bg/80 transition-all duration-200 hover:border-accent/35 sm:hover:-translate-y-1 sm:hover:shadow-[0_0_28px_rgba(139,92,246,0.15)]">
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="flex w-full flex-1 flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
        aria-label={`View details for ${project.name}`}
      >
        {project.image ? (
          <div className="surface-3d-inner split-layer-up overflow-hidden border-b border-white/10 bg-[#0d0911]">
            <img
              src={project.image}
              alt={`${project.name} preview`}
              className="h-40 w-full object-cover object-top sm:h-44"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}

        <div className="split-layer-down flex flex-1 flex-col p-4 sm:p-6">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-text sm:text-xl">{project.name}</h3>
              <p className="mt-1 text-sm leading-snug text-accent">{project.tagline}</p>
            </div>
            <span className="shrink-0 rounded-full border border-white/10 px-2 py-1 text-[10px] text-text-muted sm:px-2.5 sm:text-xs">
              {projectsCopy.details}
            </span>
          </div>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted line-clamp-4">
            {project.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techTags.slice(0, 6).map((tag) => (
              <TechTag key={`${project.id}-${tag}`} label={tag} />
            ))}
            {project.techTags.length > 6 && (
              <TechTag label={`+${project.techTags.length - 6} more`} />
            )}
          </div>
        </div>
      </button>

      {hasLinks && (
        <div className="border-t border-white/8 px-4 pb-4 sm:px-6 sm:pb-5">
          <ProjectLinks project={project} onLinkClick={stopPropagation} />
        </div>
      )}
    </article>
  );
}

function SecondaryRow({
  project,
  onOpen,
}: {
  project: PortfolioProject;
  onOpen: (project: PortfolioProject) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="scene-3d split-panel-soft split-shell surface-3d surface-3d-soft surface-3d-card flex w-full flex-col gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-4 text-left transition-all duration-200 hover:border-accent/30 hover:bg-white/[0.04] hover:shadow-[0_0_16px_rgba(139,92,246,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5"
        aria-label={`View details for ${project.name}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="block text-sm font-medium text-text sm:text-base">{project.name}</span>
            <p className="mt-1 text-sm leading-snug text-accent">{project.tagline}</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-2">
              {project.summary}
            </p>
          </div>
          <span className="shrink-0 text-xs text-text-muted">{projectsCopy.view}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.techTags.slice(0, 3).map((tag) => (
            <TechTag key={`${project.id}-${tag}`} label={tag} />
          ))}
        </div>
      </button>
    </li>
  );
}

export default function Projects() {
  const ref = useReveal<HTMLElement>();
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(
    null
  );

  const filteredFeatured = useMemo(
    () => featuredProjects.filter((p) => p.matchesFilter(filter)),
    [filter]
  );

  const filteredSecondary = useMemo(
    () => secondaryProjects.filter((p) => p.matchesFilter(filter)),
    [filter]
  );

  return (
    <>
      <section
        id="projects"
        ref={ref}
        className="reveal-section section-pad relative"
        aria-labelledby="projects-heading"
      >
        <div className="pointer-events-none absolute inset-x-0 top-24 h-56 glow-spot opacity-40" aria-hidden />

        <div className="relative mx-auto max-w-6xl">
          <SectionHeading
            title="Featured"
            highlight="Projects"
            subtitle={projectsCopy.subtitle}
            headingId="projects-heading"
          />

          <div
            className="mb-8 flex flex-wrap justify-center gap-1.5 sm:mb-10 sm:gap-2"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {projectFilters.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={filter === tab.id}
                onClick={() => setFilter(tab.id)}
                className={`rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 sm:px-4 sm:text-sm ${
                  filter === tab.id
                    ? "bg-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.35)]"
                    : "border border-white/10 bg-white/[0.03] text-text-muted hover:border-accent/30 hover:text-text"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {filteredFeatured.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredFeatured.map((project) => (
                <FeaturedCard
                  key={project.id}
                  project={project}
                  onOpen={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-white/8 bg-bg-elevated/50 px-6 py-10 text-center text-sm text-text-muted">
              {projectsCopy.emptyCategory}
            </p>
          )}

          {filteredSecondary.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-5 text-lg font-semibold text-text">{projectsCopy.moreTitle}</h3>
              <ul className="space-y-2">
                {filteredSecondary.map((project) => (
                  <SecondaryRow
                    key={project.id}
                    project={project}
                    onOpen={setSelectedProject}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
