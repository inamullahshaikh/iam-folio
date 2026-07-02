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

export interface ProjectMediaItem {
  label: string;
  url: string;
}

export interface ProjectLinks {
  github?: string | null;
  live_demo?: string | null;
}

export interface ProjectMedia {
  docs?: ProjectMediaItem[];
  videos?: ProjectMediaItem[];
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
  media?: ProjectMedia;
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
  cv: {
    href: "/Inam-Ullah-Shaikh.pdf",
    downloadName: "Inam-Ullah-Shaikh-CV.pdf",
    label: "Download CV",
  },
};

export const identity = {
  oneLiner:
    "Full-stack developer: web, cloud, desktop, databases, and applied AI.",
  shortBioFirstPerson:
    "CS grad from FAST-NUCES, Islamabad. I build across the stack: React and MERN apps, Python/Node APIs, AWS deployments, desktop tools in C# and Java, and AI when the problem needs it.",
  aboutParagraph:
    "I work end to end on web frontends, backends, cloud infra, desktop apps, and applied AI. ForeSyte was my FYP. I pick up whatever the project needs and ship with clear docs.",
  nowLine: "Open to full-stack roles. Islamabad, remote OK.",
};

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
    "AI intern on an Agile team. Git-based workflow across prototype and integration phases.",
  responsibilities: [
    "Built and debugged AI-driven features in a production-style codebase",
    "Worked in Agile sprints with Git and cross-functional handoffs",
    "Wrote technical documentation for integration work",
  ],
  achievements: [
    "Shipped work across prototype and integration phases",
    "Helped improve release readiness before rollout",
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
    links: { github: null, live_demo: null },
    // Add media when ready, e.g.:
    // media: {
    //   videos: [{ label: "Demo", url: "/projects/foresyte/demo.mp4" }],
    //   docs: [{ label: "Report", url: "/projects/foresyte/report.pdf" }],
    // },
    hasCaseStudy: true,
  },
  {
    id: "proj_startup_law_rag",
    slug: "startup-law-rag",
    name: "Startup & Law RAG",
    tagline: "Legal Q&A grounded in real documents.",
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
  "proj_startup_law_rag",
];

export const heroProjects = heroProjectIds
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is Project => p !== undefined);
