// Typed portfolio data from docs/portfolio_context.json (source of truth).
// Only facts present in the JSON are represented here. No invented tools or metrics.

export type Category = "AI/ML" | "Full-Stack" | "DevOps" | "Other";

export interface Contact {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  leetcode: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  status: string;
}

export interface ProjectLinks {
  github?: string | null;
  live_demo?: string | null;
  video_demo?: string | null;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  categories: Category[];
  categoryLabels?: string[];
  dateRange?: string;
  status?: string;
  techLine: string;
  featured: boolean;
  isFyp?: boolean;
  links: ProjectLinks;
  hasCaseStudy: boolean;
}

export const personal = {
  fullName: "Inamullah Shaikh",
  preferredName: "Inam",
  title: "Software Engineer · Full-Stack",
  location: {
    city: "Islamabad",
    country: "Pakistan",
    timezone: "PKT (UTC+5)",
    openToRemote: true,
  },
  contact: {
    email: "inamullahshaikh01@gmail.com",
    phone: "+92 336 9994718",
    github: "https://github.com/inamullahshaikh",
    linkedin: "https://www.linkedin.com/in/inam-ullah-shaikh",
    leetcode: "https://leetcode.com/u/inam_290/",
  } as Contact,
};

export const identity = {
  oneLiner:
    "CS graduate and full-stack developer: web apps, cloud deployments, desktop software, databases, and applied AI.",
  shortBioFirstPerson:
    "I'm a Computer Science graduate from FAST-NUCES based in Islamabad. I work across the stack: React and MERN web apps, Python and Node APIs, AWS and Kubernetes deployments, C# and Java desktop apps, SQL databases, and AI projects when the problem needs them.",
  longBio: [
    "I build software end to end. On the web I've shipped React frontends, MERN stacks, and REST APIs. On the infrastructure side I've provisioned AWS with Terraform, configured hosts with Ansible, and deployed microservices on Kubernetes. I've also built desktop apps in C# and JavaFX with SQL Server backends.",
    "Applied AI is part of the mix, not the whole story. ForeSyte (my Final Year Project) pairs computer vision with a FastAPI backend and React UI. Startup & Law RAG and FastCite are retrieval apps with async pipelines. Alongside that I've done MERN event management, gym billing systems, game bots, networking labs, and C++ systems coursework.",
    "I go where the project needs me: UI, API, data model, deploy scripts, or model integration. I work in Agile teams, keep documentation honest, and use modern tooling to move faster without cutting corners on reliability.",
  ],
  nowLine:
    "CS grad, open to full-stack and software engineering roles. Based in Islamabad, remote OK.",
};

export const workAreas =
  "Web · APIs · Cloud & DevOps · Desktop · Databases · AI/ML · Systems";

export const education: EducationItem[] = [
  {
    degree: "BS Computer Science",
    institution: "FAST-NUCES",
    location: "Islamabad, Pakistan",
    start: "2022",
    end: "2026",
    status: "Graduated",
  },
  {
    degree: "A-Levels",
    institution: "BMI-A",
    location: "Islamabad, Pakistan",
    start: "2020",
    end: "2022",
    status: "Completed",
  },
  {
    degree: "O-Levels",
    institution: "BMI-B",
    location: "Islamabad, Pakistan",
    start: "2018",
    end: "2020",
    status: "Completed",
  },
];

export const experience = {
  role: "AI Intern",
  company: "Komatsu Pakistan Soft",
  location: "Islamabad, Pakistan",
  dateRange: "Aug 2025 to Dec 2025",
  summary:
    "Contributed to AI-driven software development in an Agile, Git-based team across prototype and integration phases.",
  responsibilities: [
    "Collaborated with the development team using Git version control and Agile methodologies.",
    "Worked with AI-driven systems in a production-oriented engineering environment.",
    "Supported integration and debugging of intelligent software components.",
    "Contributed to technical documentation and cross-functional handoffs.",
  ],
  achievements: [
    "Contributed across two delivery phases (prototype and integration).",
    "Improved release readiness before broader internal rollout.",
  ],
  technologies: ["Python", "Git", "GitHub", "Agile", "Scrum"],
};

export const stackStrip =
  "Python · JavaScript · TypeScript · React · Node.js · FastAPI · C# · Java · AWS · Docker · SQL";

export const skills = {
  languages: {
    primary: ["Python", "JavaScript", "TypeScript"],
    secondary: ["C++", "Java", "C#", "SQL"],
    other: ["Assembly (MASM)"],
  },
  frontend: ["React", "HTML", "CSS", "JavaFX"],
  backend: ["FastAPI", "Flask", "Express.js", "RESTful APIs", "Microservices"],
  aiMl: [
    "RAG (Retrieval-Augmented Generation)",
    "LLMs",
    "Generative AI",
    "NLP",
    "Computer Vision",
    "YOLOv8",
    "Artificial Neural Networks (ANN)",
    "Prompt engineering",
    "Semantic search",
  ],
  data: ["SQL Server", "Data modeling", "Relational databases", "REST API design"],
  devopsCloud: [
    "AWS EC2",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Ansible",
    "CI/CD",
    "Infrastructure as Code",
  ],
  asyncPipelines: ["Celery", "Task queues", "ETL-style workflows"],
  tools: ["Git", "GitHub", "Agile", "Scrum", "Cursor"],
  leetcode: "100+ problems solved",
};

export const projects: Project[] = [
  {
    id: "proj_foresyte",
    slug: "foresyte",
    name: "ForeSyte",
    tagline: "Real-time exam integrity monitoring with computer vision.",
    categories: ["AI/ML", "Full-Stack"],
    categoryLabels: ["AI/ML", "Computer Vision", "Full-Stack"],
    dateRange: "Jan 2025 to Jun 2026",
    status: "Completed · Final Year Project",
    techLine: "Python · FastAPI · React · YOLOv8 · Computer Vision",
    featured: true,
    isFyp: true,
    links: { github: null, live_demo: null, video_demo: null },
    hasCaseStudy: true,
  },
  {
    id: "proj_startup_law_rag",
    slug: "startup-law-rag",
    name: "Startup & Law RAG",
    tagline: "AI legal assistant for entrepreneurs, grounded in real documents.",
    categories: ["AI/ML", "Full-Stack"],
    categoryLabels: ["AI/ML", "NLP", "RAG", "Full-Stack"],
    dateRange: "Jan 2025 to Jun 2026",
    status: "Completed",
    techLine: "Python · FastAPI · Celery · React · RAG · Semantic Search",
    featured: true,
    links: { github: null, live_demo: null },
    hasCaseStudy: true,
  },
  {
    id: "proj_fastcite",
    slug: "fastcite",
    name: "FastCite",
    tagline: "RAG-powered study assistant for document search and citation generation.",
    categories: ["AI/ML", "Full-Stack"],
    categoryLabels: ["AI/ML", "NLP", "RAG", "Full-Stack"],
    dateRange: "Nov 2025 to Dec 2025",
    status: "Completed",
    techLine: "Python · FastAPI · Celery · React · RAG · NLP",
    featured: true,
    links: { github: null, live_demo: null },
    hasCaseStudy: true,
  },
  {
    id: "proj_attendance_app",
    slug: "attendance-app",
    name: "Attendance App",
    tagline: "Cloud-native microservices attendance platform on AWS.",
    categories: ["DevOps"],
    categoryLabels: ["DevOps", "Cloud", "Backend", "Microservices"],
    dateRange: "Jan 2025 to Apr 2025",
    status: "Completed",
    techLine: "Python · AWS EC2 · Kubernetes · Docker · Terraform · Ansible · CI/CD",
    featured: true,
    links: { github: null, live_demo: null },
    hasCaseStudy: true,
  },
  {
    id: "proj_eventsync",
    slug: "eventsync",
    name: "EventSync",
    tagline: "MERN stack web event management system.",
    categories: ["Full-Stack"],
    categoryLabels: ["Full-Stack", "MERN"],
    dateRange: "2024",
    techLine: "React.js · Node.js · Express.js · MongoDB · REST APIs",
    featured: false,
    links: {},
    hasCaseStudy: true,
  },
  {
    id: "proj_gym_management",
    slug: "gym-management",
    name: "GYM Management System",
    tagline: "Desktop gym management with a SQL Server backend.",
    categories: ["Full-Stack", "Other"],
    categoryLabels: ["Desktop", "Database"],
    dateRange: "2024",
    techLine: "C# · SQL · SQL Server",
    featured: false,
    links: {},
    hasCaseStudy: true,
  },
  {
    id: "proj_torcs_bot",
    slug: "torcs-bot",
    name: "TORCS Game Bot",
    tagline: "Autonomous racing agent trained with artificial neural networks.",
    categories: ["AI/ML"],
    categoryLabels: ["AI/ML", "Reinforcement Learning"],
    dateRange: "2024",
    techLine: "Python · Artificial Neural Networks (ANN)",
    featured: false,
    links: {},
    hasCaseStudy: true,
  },
  {
    id: "proj_eventax",
    slug: "eventax",
    name: "EventaX",
    tagline: "Desktop event management app with JavaFX.",
    categories: ["Other"],
    categoryLabels: ["Desktop", "OOP"],
    techLine: "Java · JavaFX · Singleton & Factory patterns",
    featured: false,
    links: {},
    hasCaseStudy: true,
  },
  {
    id: "proj_ipfs",
    slug: "ipfs-file-system",
    name: "IPFS-Inspired File System",
    tagline: "Custom file system simulation built on core data structures.",
    categories: ["Other"],
    categoryLabels: ["Systems", "Data Structures"],
    techLine: "C++ · B-trees · Hashmaps · Linked Lists",
    featured: false,
    links: {},
    hasCaseStudy: true,
  },
  {
    id: "proj_hospital_network",
    slug: "hospital-network",
    name: "Hospital Management System (Network)",
    tagline: "Hospital network infrastructure simulation.",
    categories: ["Other"],
    categoryLabels: ["Networking"],
    techLine: "Cisco Packet Tracer · VLANs · Routing · Network Security",
    featured: false,
    links: {},
    hasCaseStudy: true,
  },
  {
    id: "proj_other_games",
    slug: "games-and-systems",
    name: "Games & Systems Projects",
    tagline: "Tetris, SpaceShooter, PACMAN, OS concepts, and assembly work.",
    categories: ["Other"],
    categoryLabels: ["Games", "Systems"],
    techLine: "C++ · SFML · Assembly (MASM) · OS Concepts",
    featured: false,
    links: {},
    hasCaseStudy: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

const heroProjectIds = [
  "proj_foresyte",
  "proj_attendance_app",
  "proj_eventsync",
  "proj_startup_law_rag",
];

export const heroProjects = heroProjectIds
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is Project => p !== undefined);
