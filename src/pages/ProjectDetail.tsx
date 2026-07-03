import { useEffect, type ReactNode } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CursorBackground from "../components/CursorBackground";
import {
  formatTechCategory,
  getAdjacentProjects,
  getPortfolioProjectBySlug,
  personal,
  projectSlug,
  projectsCopy,
} from "../data/portfolio";

function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-text-muted">
      {label}
    </span>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-white/8 pt-10 first:border-t-0 first:pt-0">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const project = getPortfolioProjectBySlug(slug);

  useEffect(() => {
    if (!project) return;
    document.title = `${project.name} — ${personal.full_name}`;
    window.scrollTo(0, 0);
    return () => {
      document.title = `${personal.full_name} — Software Engineer`;
    };
  }, [project]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const { prev, next } = getAdjacentProjects(slug);
  const { github, live_demo } = project.links;
  const hasLinks = Boolean(github || live_demo);
  const techGroups = Object.entries(project.techStackGrouped);

  return (
    <div className="relative isolate min-h-dvh">
      <CursorBackground />
      <Navbar />

      <main className="relative z-10 pt-[calc(4.5rem+env(safe-area-inset-top))]">
        <article className="section-pad pb-8">
          <div className="mx-auto max-w-4xl">
            <button
              type="button"
              onClick={() => navigate({ pathname: "/", hash: "projects" })}
              className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"
            >
              <span aria-hidden>←</span>
              {projectsCopy.backToProjects}
            </button>

            <header className="mt-8">
              <p className="text-xs font-medium uppercase tracking-wider text-accent">
                {projectsCopy.pageEyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
                {project.name}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-text-muted">
                {project.tagline}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
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

              {(project.status || project.dateRange) && (
                <dl className="mt-6 flex flex-wrap gap-6 text-sm">
                  {project.status && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
                        Status
                      </dt>
                      <dd className="mt-1 text-text-muted">{project.status}</dd>
                    </div>
                  )}
                  {project.dateRange && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
                        Timeline
                      </dt>
                      <dd className="mt-1 text-text-muted">{project.dateRange}</dd>
                    </div>
                  )}
                </dl>
              )}
            </header>

            {project.image ? (
              <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0911] p-3 sm:p-4">
                <img
                  src={project.image}
                  alt={`${project.name} preview`}
                  className="aspect-video w-full rounded-xl object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : null}

            <div className="mt-12 space-y-10">
              {project.problem && (
                <DetailSection title={projectsCopy.sections.problem}>
                  <p className="text-base leading-relaxed text-text-muted sm:text-[1.05rem]">
                    {project.problem}
                  </p>
                </DetailSection>
              )}

              {project.solution && (
                <DetailSection title={projectsCopy.sections.solution}>
                  <p className="text-base leading-relaxed text-text-muted sm:text-[1.05rem]">
                    {project.solution}
                  </p>
                </DetailSection>
              )}

              {project.architecture && (
                <DetailSection title={projectsCopy.sections.architecture}>
                  <p className="text-base leading-relaxed text-text-muted sm:text-[1.05rem]">
                    {project.architecture.description}
                  </p>
                  {project.architecture.dataFlow && (
                    <p className="mt-4 rounded-xl border border-white/8 bg-white/[0.02] p-4 font-mono text-xs leading-relaxed text-text-muted sm:text-sm">
                      {project.architecture.dataFlow}
                    </p>
                  )}
                  {project.architecture.components.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {project.architecture.components.map((component) => (
                        <li
                          key={component}
                          className="flex gap-3 text-sm leading-relaxed text-text-muted sm:text-base"
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
                </DetailSection>
              )}

              {project.highlights.length > 0 && (
                <DetailSection title={projectsCopy.sections.highlights}>
                  <ul className="space-y-3">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-relaxed text-text-muted sm:text-base"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </DetailSection>
              )}

              <DetailSection title={projectsCopy.sections.techStack}>
                {techGroups.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {techGroups.map(([category, tags]) => (
                      <div
                        key={category}
                        className="card-surface bg-white/[0.02] p-4 sm:p-5"
                      >
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">
                          {formatTechCategory(category)}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <TechTag key={`${category}-${tag}`} label={tag} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {project.techTags.map((tag) => (
                      <TechTag key={tag} label={tag} />
                    ))}
                  </div>
                )}
              </DetailSection>

              {hasLinks && (
                <div className="flex flex-wrap gap-3 border-t border-white/8 pt-10">
                  {live_demo && (
                    <a
                      href={live_demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                    >
                      {projectsCopy.liveDemo}
                    </a>
                  )}
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-text transition-all duration-200 hover:border-accent/50"
                    >
                      {projectsCopy.github}
                    </a>
                  )}
                </div>
              )}
            </div>

            <nav
              className="mt-16 grid gap-4 border-t border-white/8 pt-10 sm:grid-cols-2"
              aria-label="Project navigation"
            >
              {prev ? (
                <Link
                  to={`/projects/${projectSlug(prev.id)}`}
                  className="card-surface group p-4 transition-colors hover:border-accent/30 sm:p-5"
                >
                  <span className="text-xs uppercase tracking-wider text-text-muted">
                    {projectsCopy.prevProject}
                  </span>
                  <span className="mt-2 block font-medium text-text group-hover:text-accent">
                    {prev.name}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  to={`/projects/${projectSlug(next.id)}`}
                  className="card-surface group p-4 text-right transition-colors hover:border-accent/30 sm:p-5"
                >
                  <span className="text-xs uppercase tracking-wider text-text-muted">
                    {projectsCopy.nextProject}
                  </span>
                  <span className="mt-2 block font-medium text-text group-hover:text-accent">
                    {next.name}
                  </span>
                </Link>
              ) : null}
            </nav>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
