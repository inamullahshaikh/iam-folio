import { useEffect, useRef } from "react";
import type { PortfolioProject } from "../data/portfolio";
import { projectsCopy } from "../data/portfolio";

type ProjectDetailModalProps = {
  project: PortfolioProject | null;
  onClose: () => void;
};

function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-text-muted">
      {label}
    </span>
  );
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { github, live_demo } = project.links;
  const hasLinks = Boolean(github || live_demo);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        className="relative max-h-[88dvh] w-full max-w-3xl overflow-y-auto overscroll-contain custom-scrollbar rounded-t-2xl border border-white/10 bg-bg shadow-[0_0_40px_rgba(139,92,246,0.2)] sm:max-h-[92vh] sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-white/8 bg-bg/95 px-4 py-3 backdrop-blur-xl sm:gap-4 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wider text-accent sm:text-xs">
              Project details
            </p>
            <h2 id="project-detail-title" className="mt-1 text-xl font-semibold text-text sm:text-2xl">
              {project.name}
            </h2>
            <p className="mt-1 text-sm leading-snug text-text-muted">{project.tagline}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-text-muted transition-colors hover:border-accent/40 hover:text-text"
            aria-label={projectsCopy.closeLabel}
          >
            Close
          </button>
        </div>

        <div className="safe-bottom space-y-6 px-4 py-5 sm:space-y-8 sm:px-6 sm:py-6">
          <div className="flex flex-wrap gap-2">
            {project.categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs text-accent"
              >
                {category}
              </span>
            ))}
            {project.isFinalYearProject && (
              <span className="rounded-full border border-accent-cyan/25 bg-accent-cyan/10 px-3 py-1 text-xs text-accent-cyan">
                {projectsCopy.finalYearBadge}
              </span>
            )}
          </div>

          {project.status && (
            <dl className="grid gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
              {project.status && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Status
                  </dt>
                  <dd className="mt-1 text-sm text-text-muted">{project.status}</dd>
                </div>
              )}
            </dl>
          )}

          {project.image ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0911] p-3 sm:p-4">
              <img
                src={project.image}
                alt={`${project.name} preview`}
                className="aspect-video w-full rounded-xl object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : null}

          {project.problem && (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                {projectsCopy.sections.problem}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {project.problem}
              </p>
            </section>
          )}

          {project.solution && (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                {projectsCopy.sections.solution}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {project.solution}
              </p>
            </section>
          )}

          {project.architecture && (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                {projectsCopy.sections.architecture}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {project.architecture.description}
              </p>
              {project.architecture.dataFlow && (
                <p className="mt-3 rounded-xl border border-white/8 bg-white/[0.02] p-3 font-mono text-xs leading-relaxed text-text-muted">
                  {project.architecture.dataFlow}
                </p>
              )}
              {project.architecture.components.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {project.architecture.components.map((component) => (
                    <li
                      key={component}
                      className="flex gap-3 text-sm leading-relaxed text-text-muted"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      <span>{component}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {project.highlights.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                {projectsCopy.sections.highlights}
              </h3>
              <ul className="mt-4 space-y-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-sm leading-relaxed text-text-muted"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              {projectsCopy.sections.techStack}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techTags.map((tag) => (
                <TechTag key={`${project.id}-${tag}`} label={tag} />
              ))}
            </div>
          </section>

          {hasLinks && (
            <div className="flex flex-wrap gap-3 border-t border-white/8 pt-6">
              {live_demo && (
                <a
                  href={live_demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                >
                  {projectsCopy.liveDemo}
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-text transition-all duration-200 hover:border-accent/50"
                >
                  {projectsCopy.github}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
