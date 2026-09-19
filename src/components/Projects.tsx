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

function FeaturedTile({ project, wide }: { project: PortfolioProject; wide: boolean }) {
  const { github, live_demo } = project.links;
  const href = `/projects/${projectSlug(project.id)}`;

  return (
    <motion.article
      className={`tile flex flex-col overflow-hidden ${wide ? "md:col-span-2" : ""}`}
      initial={{ opacity: 0, transform: "translateY(32px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="px-7 pt-12 text-center md:px-12 md:pt-14">
        <p className="text-sm font-semibold text-text-muted">
          {project.isFinalYearProject ? projectsCopy.finalYearBadge : project.categories.slice(0, 2).join(" · ")}
        </p>
        <h3 className="mt-2 text-[2rem] font-semibold leading-[1.1] tracking-[-0.015em] text-text md:text-[2.5rem]">
          {project.name}
        </h3>
        <p className="mx-auto mt-3 max-w-[38ch] text-lg leading-snug text-text-muted text-pretty md:text-[19px]">
          {project.tagline}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[17px]">
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
      </div>

      <Link to={href} tabIndex={-1} aria-hidden className="group mt-10 block flex-1 px-7 md:px-12">
        {project.image ? (
          <motion.img
            src={project.image}
            alt=""
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
            className="mx-auto aspect-[16/10] w-full max-w-[880px] rounded-t-2xl object-cover object-top transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <ul className="mx-auto flex max-w-[720px] flex-wrap justify-center gap-2 pb-12">
            {project.techTags.map((tag) => (
              <li key={tag} className="rounded-full bg-white/[0.06] px-4 py-2 text-sm text-text">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </Link>
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
