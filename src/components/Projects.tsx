import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  featuredProjects,
  secondaryProjects,
  projectFilters,
  projectSlug,
  projectsCopy,
  type ProjectFilter,
  type PortfolioProject,
} from "../data/portfolio";
import { useReveal, revealSectionClass } from "../hooks/useReveal";
import SectionHeading from "./SectionHeading";
import Chevron from "./Chevron";

const TAG_LIMIT = 6;

function FeaturedTile({ project, wide }: { project: PortfolioProject; wide: boolean }) {
  const { github, live_demo } = project.links;
  const href = `/projects/${projectSlug(project.id)}`;

  return (
    <motion.article
      className={`tile flex min-h-[22rem] flex-col overflow-hidden transition-colors duration-200 ease-[ease] hover:bg-[#232325] ${wide ? "md:col-span-2" : ""}`}
      initial={{ opacity: 0, transform: "translateY(32px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link to={href} className="group flex flex-1 flex-col p-8 md:p-10" aria-label={`${project.name} case study`}>
        <p className="text-sm font-semibold text-text-muted">
          {project.isFinalYearProject ? projectsCopy.finalYearBadge : project.categories.slice(0, 2).join(" · ")}
        </p>
        <h3 className="mt-2 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.015em] text-text md:text-[2.25rem]">
          {project.name}
        </h3>
        <p
          className={`mt-3 text-[17px] leading-snug text-text-muted text-pretty ${wide ? "max-w-[52ch]" : "max-w-[40ch]"}`}
        >
          {project.tagline}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-10">
          {project.techTags.slice(0, TAG_LIMIT).map((tag) => (
            <li key={tag} className="rounded-full bg-white/[0.06] px-3 py-1.5 text-[13px] text-text">
              {tag}
            </li>
          ))}
          {project.techTags.length > TAG_LIMIT && (
            <li className="rounded-full px-3 py-1.5 text-[13px] text-text-muted">
              +{project.techTags.length - TAG_LIMIT}
            </li>
          )}
        </ul>
      </Link>

      <div className="flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-line px-8 py-5 text-[15px] md:px-10">
        <Link to={href} className="group inline-flex items-center gap-1 text-accent hover:underline">
          Learn more <Chevron />
        </Link>
        {live_demo && (
          <a
            href={live_demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-accent hover:underline"
          >
            {projectsCopy.liveDemo} <Chevron />
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-accent hover:underline"
          >
            {projectsCopy.github} <Chevron />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function SecondaryRow({ project }: { project: PortfolioProject }) {
  return (
    <li>
      <Link
        to={`/projects/${projectSlug(project.id)}`}
        className="group flex items-center justify-between gap-6 px-7 py-5 transition-colors hover:bg-white/[0.03] md:px-10"
      >
        <span className="min-w-0">
          <span className="block text-[17px] font-semibold text-text">{project.name}</span>
          <span className="mt-1 block text-sm leading-snug text-text-muted">{project.tagline}</span>
        </span>
        <span className="text-accent">
          <Chevron />
        </span>
      </Link>
    </li>
  );
}

export default function Projects() {
  const ref = useReveal<HTMLElement>();
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const filteredFeatured = useMemo(() => featuredProjects.filter((p) => p.matchesFilter(filter)), [filter]);
  const filteredSecondary = useMemo(() => secondaryProjects.filter((p) => p.matchesFilter(filter)), [filter]);

  return (
    <section id="projects" ref={ref} className={`${revealSectionClass} section-pad`} aria-labelledby="projects-heading">
      <div className="reveal-content mx-auto max-w-[1200px]">
        <SectionHeading title="Selected work" subtitle={projectsCopy.subtitle} headingId="projects-heading" />

        <div
          className="mb-10 inline-flex max-w-full flex-wrap gap-1 rounded-full bg-bg-elevated p-1"
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
              className={`press relative rounded-full px-5 py-2 text-sm ${
                filter === tab.id ? "text-text" : "text-text-muted hover:text-text"
              }`}
            >
              {filter === tab.id && (
                <motion.span
                  layoutId="project-filter-pill"
                  className="absolute inset-0 rounded-full bg-[#3a3a3c]"
                  transition={{ type: "spring", duration: 0.35, bounce: 0 }}
                  aria-hidden
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={filter}
          initial={{ opacity: 0, filter: "blur(2px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        >
          {filteredFeatured.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {filteredFeatured.map((project, i) => (
                <FeaturedTile
                  key={project.id}
                  project={project}
                  wide={i === 0 || (i === filteredFeatured.length - 1 && i % 2 === 1)}
                />
              ))}
            </div>
          ) : (
            <div className="tile px-8 py-16 text-center">
              <p className="mx-auto max-w-[48ch] text-[17px] leading-snug text-text-muted">
                {projectsCopy.emptyCategory}
              </p>
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="press mt-6 inline-flex min-h-11 items-center rounded-full bg-button px-6 text-[17px] text-white hover:bg-button-hover"
              >
                Show all
              </button>
            </div>
          )}

          {filteredSecondary.length > 0 && (
            <div className="mt-3 tile overflow-hidden">
              <h3 className="px-7 pt-10 pb-4 text-2xl font-semibold tracking-[-0.015em] text-text md:px-10">
                {projectsCopy.moreTitle}
              </h3>
              <ul className="divide-y divide-line border-t border-line pb-2">
                {filteredSecondary.map((project) => (
                  <SecondaryRow key={project.id} project={project} />
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
