import { personal, identity, skills, experience, education, projects } from "./portfolio";
import { caseStudies } from "./caseStudies";

export const site = {
  hero_title: "Software Engineer.",
  hero_subtitle: identity.oneLiner,
  hero_stack_tags: [
    "Python",
    "React",
    "FastAPI",
    "Node.js",
    "AWS",
    "Docker",
    "TypeScript",
    "RAG",
  ],
  resume_url: personal.cv.href,
  github_url: personal.contact.github,
  linkedin_url: personal.contact.linkedin,
  leetcode_url: personal.contact.leetcode,
  email: personal.contact.email,
  phone_tel: personal.contact.phone.replace(/\s+/g, ""),
  phone_display: personal.contact.phone,
  contact_heading: "Let's build something.",
  contact_sub: identity.nowLine,
  footer_text: `${personal.fullName} · ${new Date().getFullYear()}`,
  about_bio: identity.aboutParagraph,
  about_facts: [
    { k: "University", v: "FAST-NUCES" },
    { k: "Location", v: "Islamabad, PK" },
    { k: "Role", v: experience.role },
    { k: "Open to", v: "Full-stack roles" },
  ],
};

const categoryMap: Record<string, string> = {
  "AI/ML": "AI & ML",
  "Full-Stack": "WEB & SOFTWARE",
  DevOps: "DEVOPS & INFRA",
  Other: "OTHER",
};

function mapCategory(categories: string[]): string {
  for (const c of categories) {
    if (categoryMap[c]) return categoryMap[c];
  }
  return "OTHER";
}

export const portfolioProjects = projects.map((p) => {
  const study = caseStudies.find((c) => c.projectId === p.id);
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: mapCategory(p.categories),
    short_description: p.tagline,
    long_description: study?.summary ?? p.tagline,
    what_it_does: study?.highlights.map((h) => `- ${h}`).join("\n") ?? "",
    tech_breakdown: study?.stack
      ? { Stack: study.stack, ...(study.diagram ? { Flow: study.diagram } : {}) }
      : { Stack: p.techLine },
    stack_tags: p.techLine.split(" · ").map((t) => t.trim()),
    github_url: p.links.github || "",
    live_url: p.links.live_demo || "",
    start_date: p.dateRange?.split(" to ")[0] ?? "",
    end_date: p.dateRange?.split(" to ")[1] ?? p.dateRange ?? "",
    screenshots: [],
    videos: p.media?.videos ?? [],
    docs: p.media?.docs ?? [],
    featured: p.featured,
    published: true,
    is_fyp: p.isFyp,
  };
});

export const portfolioSkills = [
  {
    id: "s1",
    category: "Languages",
    tags: [...skills.languages.primary, ...skills.languages.secondary],
  },
  {
    id: "s2",
    category: "Frontend",
    tags: skills.frontend,
  },
  {
    id: "s3",
    category: "Backend",
    tags: skills.backend,
  },
  {
    id: "s4",
    category: "Cloud & DevOps",
    tags: skills.devopsCloud,
  },
  {
    id: "s5",
    category: "AI / ML",
    tags: skills.aiMl.slice(0, 8),
  },
  {
    id: "s6",
    category: "Tools",
    tags: skills.tools,
  },
];

export const portfolioExperience = [
  {
    id: "exp1",
    company: experience.company,
    role: experience.role,
    location: experience.location,
    start_date: "Aug 2025",
    end_date: "Dec 2025",
    bullets: experience.responsibilities,
  },
];

export const portfolioEducation = education.map((e, i) => ({
  id: `edu${i}`,
  company: e.institution,
  role: e.degree,
  location: e.location,
  start_date: e.start,
  end_date: e.end,
  bullets: [] as string[],
}));

export const PROJECT_CATEGORIES = [
  "AI & ML",
  "DEVOPS & INFRA",
  "WEB & SOFTWARE",
  "OTHER",
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((p) => p.slug === slug);
}
