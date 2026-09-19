import raw from "../../portfolio_context.json";
import { siteCopy } from "./siteCopy";

export const portfolio = raw;

export const personal = portfolio.personal;
export const identity = portfolio.identity;
export const achievements = portfolio.achievements_and_signals;
export const buildInstructions = portfolio.portfolio_build_instructions;

export const titleOptions = personal.title_options;
export const ctaLine = siteCopy.ctaLine;
export const oneLiner = siteCopy.oneLiner;
export const shortBio = identity.short_bio;
export const contact = personal.contact;
export const heroCopy = siteCopy.hero;
export const aboutSubtitle = siteCopy.aboutSubtitle;
export const educationSubtitle = siteCopy.educationSubtitle;
export const skillsSubtitle = siteCopy.skillsSubtitle;
export const projectsCopy = siteCopy.projects;
export const experienceCopy = siteCopy.experience;
export const contactCopy = siteCopy.contact;
export const footerCopy = siteCopy.footer;

export const stats = [
  { value: 96, suffix: "%", label: siteCopy.stats[0].label },
  { value: achievements.internship_months, suffix: "", label: siteCopy.stats[1].label },
  {
    value: achievements.rag_projects_count + (achievements.llm_agent_projects ?? 0),
    suffix: "",
    label: siteCopy.stats[2].label,
  },
] as const;

export const socialLinks = [
  { id: "github", label: "GitHub", href: contact.github },
  { id: "linkedin", label: "LinkedIn", href: contact.linkedin },
  { id: "email", label: "Email", href: `mailto:${contact.email}` },
  { id: "leetcode", label: "LeetCode", href: contact.leetcode },
] as const;

export const education = portfolio.education;
export const longBioParagraphs = siteCopy.longBioParagraphs;
export const careerInterests = identity.career_interests.slice(0, 3);

const bsDegree = education[0];

export const aboutQuickFacts = [
  {
    label: "Location",
    value: `${personal.location.city}, ${personal.location.country}${
      personal.location.open_to_remote ? siteCopy.aboutQuickFacts.locationSuffix : ""
    }`,
  },
  {
    label: "Education",
    value: `${bsDegree.institution}, ${bsDegree.degree.replace("Bachelor of Science in ", "BS ")}, graduated June 2026`,
  },
  {
    label: "Current focus",
    value: siteCopy.aboutQuickFacts.currentFocus,
  },
] as const;

export const educationTimeline = education.map((item) => ({
  degree: item.degree,
  institution: item.institution,
  location: item.location,
  status: item.status,
  dateRange: `${new Date(
    Number(item.start_date.split("-")[0]),
    Number(item.start_date.split("-")[1]) - 1,
  ).toLocaleString("en-US", { month: "short", year: "numeric" })} to ${new Date(
    Number(item.end_date.split("-")[0]),
    Number(item.end_date.split("-")[1]) - 1,
  ).toLocaleString("en-US", { month: "short", year: "numeric" })}`,
}));

const { languages, frontend, backend, ai_ml, data, devops_cloud, messaging, auth, async_pipelines, blockchain } =
  portfolio.skills;

export const skillCategories = [
  {
    id: "ai-ml",
    title: "AI & LLM systems",
    tags: [...ai_ml.core, ...ai_ml.models_tools, ...ai_ml.practices],
  },
  {
    id: "languages",
    title: "Languages",
    tags: [...languages.primary, ...languages.secondary, ...languages.other],
  },
  {
    id: "frontend",
    title: "Frontend",
    tags: frontend,
  },
  {
    id: "backend",
    title: "Backend & APIs",
    tags: [...backend, ...(messaging ?? [])],
  },
  {
    id: "async",
    title: "Async & Automation",
    tags: [...(async_pipelines ?? []), ...(blockchain ?? [])],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    tags: [
      ...devops_cloud.cloud,
      ...devops_cloud.containers,
      ...devops_cloud.iac,
      ...devops_cloud.deployment,
      ...devops_cloud.practices,
    ],
  },
  {
    id: "data",
    title: "Databases & Data",
    tags: [...data.databases, ...data.concepts],
  },
  {
    id: "auth",
    title: "Auth & Security",
    tags: auth,
  },
] as const;

// Projects

export type ProjectFilter = "all" | "ai-ml" | "full-stack" | "devops";

export const projectFilters = [
  { id: "all" as const, label: "All" },
  { id: "ai-ml" as const, label: "AI-ML" },
  { id: "full-stack" as const, label: "Full-Stack" },
  { id: "devops" as const, label: "DevOps" },
];

type JsonProject = (typeof portfolio.projects.items)[number];

type JsonLinks = {
  github?: string | null;
  live_demo?: string | null;
};

export type PortfolioProject = {
  id: string;
  name: string;
  tagline: string;
  categories: string[];
  summary: string;
  problem: string | null;
  solution: string | null;
  highlights: string[];
  architecture: {
    description: string;
    components: string[];
    dataFlow: string | null;
  } | null;
  status: string | null;
  dateRange: string | null;
  isFinalYearProject: boolean;
  techTags: string[];
  techStackGrouped: Record<string, string[]>;
  primaryTechTag: string | null;
  links: { github: string | null; live_demo: string | null };
  matchesFilter: (filter: ProjectFilter) => boolean;
};

function formatDateRange(dateRange: { start: string; end: string } | undefined): string | null {
  if (!dateRange) return null;

  const format = (value: string) => {
    const [year, month] = value.split("-").map(Number);
    return new Date(year, month - 1).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return `${format(dateRange.start)} to ${format(dateRange.end)}`;
}

function projectArchitecture(project: JsonProject) {
  if (!("architecture" in project) || !project.architecture) return null;

  return {
    description: project.architecture.description,
    components: project.architecture.components ?? [],
    dataFlow: "data_flow" in project.architecture ? (project.architecture.data_flow ?? null) : null,
  };
}

function flattenTechStack(techStack: JsonProject["tech_stack"]): string[] {
  if (!techStack) return [];
  return Object.values(techStack).flatMap((value) => value ?? []);
}

function groupTechStack(techStack: JsonProject["tech_stack"]): Record<string, string[]> {
  if (!techStack) return {};

  return Object.fromEntries(
    Object.entries(techStack).filter(
      (entry): entry is [string, string[]] => Array.isArray(entry[1]) && entry[1].length > 0,
    ),
  );
}

const techCategoryLabels: Record<string, string> = {
  languages: "Languages",
  backend: "Backend",
  frontend: "Frontend",
  ml: "ML & AI",
  database: "Database",
  devops: "DevOps",
  infrastructure: "Infrastructure",
  training: "Training",
  other: "Other",
};

export function formatTechCategory(key: string): string {
  return techCategoryLabels[key] ?? key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function projectSummary(project: JsonProject): string {
  const problem = "problem" in project ? project.problem : undefined;
  const solution = "solution" in project ? project.solution : undefined;
  if (problem && solution) return `${problem} ${solution}`;
  return project.tagline;
}

function normalizeLinks(links: JsonLinks | undefined) {
  return {
    github: links?.github ?? null,
    live_demo: links?.live_demo ?? null,
  };
}

function matchesCategoryFilter(categories: string[], filter: ProjectFilter): boolean {
  if (filter === "all") return true;

  const normalized = categories.map((c) => c.toLowerCase());

  if (filter === "ai-ml") {
    return normalized.some(
      (c) =>
        c.includes("ai/ml") ||
        c.includes("computer vision") ||
        c.includes("nlp") ||
        c.includes("rag") ||
        c.includes("llm agents") ||
        c.includes("reinforcement"),
    );
  }

  if (filter === "full-stack") {
    return normalized.some((c) => c.includes("full-stack") || c.includes("mern") || c.includes("backend"));
  }

  if (filter === "devops") {
    return normalized.some((c) => c.includes("devops") || c.includes("cloud") || c.includes("microservices"));
  }

  return true;
}

function applyProjectCopy(project: PortfolioProject): PortfolioProject {
  const copy = siteCopy.projects.items[project.id as keyof typeof siteCopy.projects.items];
  if (!copy) return project;

  const problem = ("problem" in copy ? copy.problem : undefined) ?? project.problem;
  const solution = ("solution" in copy ? copy.solution : undefined) ?? project.solution;
  const tagline = copy.tagline ?? project.tagline;
  const summary = problem && solution ? `${problem} ${solution}` : tagline;

  return {
    ...project,
    tagline,
    problem: problem ?? project.problem,
    solution: solution ?? project.solution,
    summary,
    highlights: [...(("highlights" in copy ? copy.highlights : undefined) ?? project.highlights)],
    architecture: project.architecture
      ? {
          ...project.architecture,
          description:
            ("architectureDescription" in copy ? copy.architectureDescription : undefined) ??
            project.architecture.description,
        }
      : null,
  };
}

function toPortfolioProject(project: JsonProject): PortfolioProject {
  const categories = "category" in project ? project.category : [];
  const techTags = flattenTechStack(project.tech_stack);
  const links = normalizeLinks("links" in project ? project.links : undefined);

  return applyProjectCopy({
    id: project.id,
    name: project.name,
    tagline: project.tagline,
    categories,
    summary: projectSummary(project),
    problem: "problem" in project ? (project.problem ?? null) : null,
    solution: "solution" in project ? (project.solution ?? null) : null,
    highlights: "highlights" in project ? (project.highlights ?? []) : [],
    architecture: projectArchitecture(project),
    status: "status" in project ? (project.status ?? null) : null,
    dateRange: formatDateRange("date_range" in project ? project.date_range : undefined),
    isFinalYearProject: "is_final_year_project" in project ? Boolean(project.is_final_year_project) : false,
    techTags,
    techStackGrouped: groupTechStack(project.tech_stack),
    primaryTechTag: techTags[0] ?? categories[0] ?? null,
    links,
    matchesFilter: (filter) => matchesCategoryFilter(categories, filter),
  });
}

function getProjectById(id: string): JsonProject | null {
  return portfolio.projects.items.find((item) => item.id === id) ?? null;
}

function mapOrderedProjects(order: readonly string[] | undefined): PortfolioProject[] {
  return (order ?? [])
    .map((id) => {
      const project = getProjectById(id);
      if (!project) {
        console.warn(`[portfolio] Skipping missing project id: ${id}`);
        return null;
      }
      return toPortfolioProject(project);
    })
    .filter((project): project is PortfolioProject => project !== null);
}

export const featuredProjects = mapOrderedProjects(portfolio.projects.featured_order);

export const secondaryProjects = mapOrderedProjects(portfolio.projects.secondary_order);

export const allProjects = portfolio.projects.items.map((project) => toPortfolioProject(project));

export function projectSlug(id: string): string {
  return id.replace(/^proj_/, "");
}

export function getPortfolioProjectBySlug(slug: string): PortfolioProject | null {
  const project = portfolio.projects.items.find((item) => projectSlug(item.id) === slug);
  return project ? toPortfolioProject(project) : null;
}

const projectNavOrder = [...(portfolio.projects.featured_order ?? []), ...(portfolio.projects.secondary_order ?? [])];

export function getAdjacentProjects(slug: string): {
  prev: PortfolioProject | null;
  next: PortfolioProject | null;
} {
  const currentId = portfolio.projects.items.find((item) => projectSlug(item.id) === slug)?.id;

  if (!currentId) return { prev: null, next: null };

  const index = projectNavOrder.indexOf(currentId);
  if (index === -1) return { prev: null, next: null };

  const prevId = index > 0 ? projectNavOrder[index - 1] : null;
  const nextId = index < projectNavOrder.length - 1 ? projectNavOrder[index + 1] : null;

  return {
    prev: prevId ? getPortfolioProjectBySlug(projectSlug(prevId)) : null,
    next: nextId ? getPortfolioProjectBySlug(projectSlug(nextId)) : null,
  };
}

// Experience / Contact

// First entry (Komatsu) uses the hand-written site copy; the rest use JSON text.
export const experiences = portfolio.experience.map((item, i) => ({
  ...item,
  summaryText: i === 0 ? siteCopy.experience.summary : item.summary,
  bullets: i === 0 ? [...siteCopy.experience.bullets] : item.responsibilities,
}));

export const contactRows = [
  { id: "email", label: "Email", value: personal.contact.email, href: `mailto:${personal.contact.email}` },
  {
    id: "phone",
    label: "Phone",
    value: personal.contact.phone,
    href: `tel:${personal.contact.phone.replace(/\s+/g, "")}`,
  },
  { id: "github", label: "GitHub", value: personal.contact.github, href: personal.contact.github },
  { id: "linkedin", label: "LinkedIn", value: personal.contact.linkedin, href: personal.contact.linkedin },
  { id: "leetcode", label: "LeetCode", value: personal.contact.leetcode, href: personal.contact.leetcode },
] as const;
