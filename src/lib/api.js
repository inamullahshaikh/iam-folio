// API helper — all backend calls go through here.
// FastAPI base URL. Override with VITE_API_URL if needed.
export const API =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) ||
  "https://portfolio-backend-tw0g.onrender.com";

const TOKEN_KEY = "admin_jwt";
export const getToken = () =>
  typeof localStorage !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function request(path, opts = {}) {
  const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
  if (opts.auth) {
    const t = getToken();
    if (t) headers["Authorization"] = `Bearer ${t}`;
  }
  const res = await fetch(`${API}${path}`, { ...opts, headers });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      msg = j.detail || j.message || msg;
    } catch {}
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ===== SEED DATA (fallback while backend offline) =====
export const SEED_PROJECTS = [
  {
    id: "1",
    slug: "startup-law-rag",
    name: "Startup & Law RAG",
    category: "AI & RAG SYSTEMS",
    short_description:
      "RAG pipeline answering Pakistani startup-law questions over 200+ legal docs.",
    long_description:
      "An end-to-end retrieval-augmented generation system that ingests Pakistani corporate and startup law documents, embeds them into a vector store, and serves grounded answers with citations through a FastAPI backend.",
    what_it_does:
      "- Ingests PDFs and HTML legal documents\n- Chunks and embeds with OpenAI embeddings\n- Stores vectors in a Chroma DB\n- Retrieves top-k chunks per query and re-ranks\n- Generates cited answers via GPT-4",
    tech_breakdown: {
      Backend: "FastAPI + LangChain",
      "Vector DB": "ChromaDB",
      LLM: "GPT-4o",
      Embeddings: "text-embedding-3-large",
      Frontend: "React",
    },
    challenges:
      "Hallucination on edge clauses was solved by enforcing retrieval thresholds and a structured citation schema. Long docs needed semantic chunking with overlap tuning.",
    stack_tags: ["Python", "FastAPI", "LangChain", "ChromaDB", "OpenAI"],
    github_url: "https://github.com/inamshz/startup-law-rag",
    live_url: "",
    start_date: "2025-02",
    end_date: "2025-05",
    screenshots: [],
    featured: true,
    published: true,
  },
  {
    id: "2",
    slug: "fastcite",
    name: "FastCite",
    category: "AI & RAG SYSTEMS",
    short_description: "Citation extraction service for academic PDFs using LLM + regex pipeline.",
    long_description:
      "FastCite extracts structured citations from research PDFs and normalizes them into BibTeX/CSL JSON.",
    what_it_does:
      "- Parses PDFs with PyMuPDF\n- Detects reference section\n- Uses LLM to structure raw strings into authors/title/venue/year",
    tech_breakdown: { Parser: "PyMuPDF", LLM: "GPT-4o-mini", API: "FastAPI" },
    challenges:
      "Reference formats vary wildly across journals; few-shot prompting with format hints solved 90% of edge cases.",
    stack_tags: ["Python", "FastAPI", "OpenAI", "PyMuPDF"],
    github_url: "https://github.com/inamshz/fastcite",
    live_url: "",
    start_date: "2024-11",
    end_date: "2025-01",
    screenshots: [],
    featured: true,
    published: true,
  },
  {
    id: "3",
    slug: "foresyte",
    name: "ForeSyte",
    category: "COMPUTER VISION & ML",
    short_description: "Real-time YOLOv8 vision API for industrial defect detection.",
    long_description:
      "Production CV API serving YOLOv8 inference over WebSocket for live camera streams from a manufacturing line.",
    what_it_does:
      "- Streams frames over WebSocket\n- Runs YOLOv8 on GPU with batch inference\n- Returns bounding boxes + class scores at 30 FPS",
    tech_breakdown: {
      Model: "YOLOv8m fine-tuned",
      Serving: "FastAPI + WebSocket",
      GPU: "CUDA 12 / TensorRT",
      Deploy: "Docker + K8s",
    },
    challenges:
      "Latency under 33ms per frame required TensorRT export and pinned-memory CUDA streams.",
    stack_tags: ["Python", "YOLOv8", "FastAPI", "Docker", "Kubernetes"],
    github_url: "https://github.com/inamshz/foresyte",
    live_url: "",
    start_date: "2025-06",
    end_date: "2025-09",
    screenshots: [],
    featured: true,
    published: true,
  },
  {
    id: "4",
    slug: "torcs-bot",
    name: "TORCS Bot",
    category: "COMPUTER VISION & ML",
    short_description: "ANN-based driving agent for the TORCS racing simulator.",
    long_description:
      "Trained a feed-forward neural net on telemetry from human races to drive autonomously in TORCS.",
    what_it_does:
      "- Records human laps as (sensors → controls) pairs\n- Trains a 3-layer MLP\n- Drives via the SCRC client interface",
    tech_breakdown: {
      Framework: "PyTorch",
      Sim: "TORCS / SCRC",
      Inputs: "19 track sensors + speed",
    },
    challenges: "Cold-start oscillation was fixed by adding speed-aware input normalization.",
    stack_tags: ["Python", "PyTorch", "ANN"],
    github_url: "https://github.com/inamshz/torcs-bot",
    live_url: "",
    start_date: "2024-10",
    end_date: "2024-12",
    screenshots: [],
    featured: false,
    published: true,
  },
  {
    id: "5",
    slug: "attendance-app",
    name: "Attendance App",
    category: "WEB & SOFTWARE",
    short_description: "Face-recognition attendance system with React frontend.",
    long_description: "Web app that marks attendance via webcam face recognition.",
    what_it_does:
      "- Captures face encodings on enrollment\n- Matches live webcam frames\n- Logs attendance to MongoDB",
    tech_breakdown: {
      Recognition: "face_recognition (dlib)",
      Backend: "FastAPI",
      Frontend: "React",
      DB: "MongoDB",
    },
    challenges: "Lighting variance was handled with histogram equalization preprocessing.",
    stack_tags: ["Python", "FastAPI", "React", "MongoDB"],
    github_url: "https://github.com/inamshz/attendance-app",
    live_url: "",
    start_date: "2024-08",
    end_date: "2024-10",
    screenshots: [],
    featured: false,
    published: true,
  },
  {
    id: "6",
    slug: "eventsync",
    name: "EventSync",
    category: "WEB & SOFTWARE",
    short_description: "Distributed event scheduling platform with real-time sync.",
    long_description:
      "Multi-tenant event manager with WebSocket-based live updates across clients.",
    what_it_does:
      "- Real-time event CRUD\n- Conflict detection across calendars\n- Role-based sharing",
    tech_breakdown: { Backend: "FastAPI + Redis", Realtime: "WebSocket", Frontend: "React" },
    challenges: "Conflict resolution under concurrent edits required a CRDT-lite merge strategy.",
    stack_tags: ["Python", "FastAPI", "Redis", "React"],
    github_url: "https://github.com/inamshz/eventsync",
    live_url: "",
    start_date: "2024-05",
    end_date: "2024-07",
    screenshots: [],
    featured: false,
    published: true,
  },
  {
    id: "7",
    slug: "ipfs-filesystem",
    name: "IPFS Filesystem",
    category: "DEVOPS & INFRA",
    short_description: "FUSE-mounted filesystem backed by IPFS storage.",
    long_description: "Mounts an IPFS namespace as a local POSIX filesystem.",
    what_it_does: "- FUSE driver in Python\n- Maps file ops to IPFS DAG calls\n- Local pin cache",
    tech_breakdown: { Driver: "fusepy", Storage: "IPFS / Kubo", Cache: "LMDB" },
    challenges: "Random-access reads were slow; added a 64KB block cache on top of IPFS chunks.",
    stack_tags: ["Python", "IPFS", "FUSE"],
    github_url: "https://github.com/inamshz/ipfs-fs",
    live_url: "",
    start_date: "2024-03",
    end_date: "2024-05",
    screenshots: [],
    featured: false,
    published: true,
  },
  {
    id: "8",
    slug: "gym-management",
    name: "GYM Management",
    category: "WEB & SOFTWARE",
    short_description: "Full-stack gym membership and class scheduling system.",
    long_description: "Members, trainers, classes, and billing in one app.",
    what_it_does:
      "- Member CRUD + membership tiers\n- Class booking with capacity limits\n- Stripe billing",
    tech_breakdown: { Backend: "FastAPI", DB: "PostgreSQL", Frontend: "React", Payments: "Stripe" },
    challenges: "Booking races under load were prevented with row-level locks.",
    stack_tags: ["Python", "FastAPI", "PostgreSQL", "React"],
    github_url: "https://github.com/inamshz/gym",
    live_url: "",
    start_date: "2024-01",
    end_date: "2024-03",
    screenshots: [],
    featured: false,
    published: true,
  },
  {
    id: "9",
    slug: "eventax",
    name: "EventaX",
    category: "WEB & SOFTWARE",
    short_description: "University event discovery platform.",
    long_description: "Centralized event hub for FAST-NUCES societies.",
    what_it_does: "- Event listing + RSVP\n- Society profiles\n- Email reminders",
    tech_breakdown: { Stack: "MERN", Email: "SendGrid" },
    challenges: "Email deliverability tuned via SPF/DKIM and per-domain throttling.",
    stack_tags: ["MongoDB", "Express", "React", "Node"],
    github_url: "https://github.com/inamshz/eventax",
    live_url: "",
    start_date: "2023-10",
    end_date: "2023-12",
    screenshots: [],
    featured: false,
    published: true,
  },
  {
    id: "10",
    slug: "hospital-network",
    name: "Hospital Network",
    category: "ACADEMIC",
    short_description: "Simulated hospital LAN/WAN with VLANs and routing protocols.",
    long_description:
      "Cisco Packet Tracer simulation of a hospital with departmental VLANs, OSPF routing, and ACLs.",
    what_it_does:
      "- 5 VLANs across 3 buildings\n- OSPF inter-area routing\n- ACL-based segmentation",
    tech_breakdown: {
      Tool: "Cisco Packet Tracer",
      Protocols: "OSPF, VTP, STP",
      Security: "ACLs, port security",
    },
    challenges: "OSPF area design required careful summarization to keep LSDBs small.",
    stack_tags: ["Cisco", "OSPF", "VLAN", "ACL"],
    github_url: "https://github.com/inamshz/hospital-net",
    live_url: "",
    start_date: "2023-09",
    end_date: "2023-11",
    screenshots: [],
    featured: false,
    published: true,
  },
  {
    id: "11",
    slug: "os-games-lab",
    name: "OS & Games Lab",
    category: "ACADEMIC",
    short_description: "Collection of OS course projects: schedulers, shells, and a MASM game.",
    long_description:
      "Coursework projects covering process scheduling, a Unix-like shell, and an x86 MASM arcade game.",
    what_it_does:
      "- Round-robin & MLFQ schedulers in C\n- Custom shell with piping\n- 16-bit MASM space shooter",
    tech_breakdown: { Languages: "C, MASM", Topics: "Scheduling, IPC, Real-mode graphics" },
    challenges:
      "MASM real-mode VGA mode 13h required manual double-buffering for flicker-free rendering.",
    stack_tags: ["C", "MASM", "Linux"],
    github_url: "https://github.com/inamshz/os-lab",
    live_url: "",
    start_date: "2023-02",
    end_date: "2023-06",
    screenshots: [],
    featured: false,
    published: true,
  },
];

export const SEED_EXPERIENCE = [
  {
    id: "e1",
    company: "Komatsu Pakistan Soft",
    role: "AI Intern",
    location: "Islamabad, PK",
    start_date: "Aug 2025",
    end_date: "Present",
    bullets: [
      "Building production RAG pipelines for internal knowledge retrieval across engineering documentation.",
      "Deploying YOLOv8-based inspection models to a Kubernetes-backed inference cluster.",
      "Owning end-to-end MLOps: data → training → evaluation → containerized deploy.",
    ],
  },
];

export const SEED_CERTS = [
  {
    id: "c1",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    url: "https://aws.amazon.com/certification/",
    in_progress: false,
  },
  {
    id: "c2",
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    year: "2024",
    url: "https://www.coursera.org/specializations/deep-learning",
    in_progress: false,
  },
  {
    id: "c3",
    name: "Kubernetes for Developers (CKAD)",
    issuer: "CNCF / Linux Foundation",
    year: "2025",
    url: "https://www.cncf.io/certification/ckad/",
    in_progress: true,
  },
];

export const SEED_SITE = {
  hero_title: "AI Engineer.",
  hero_subtitle: "RAG pipelines, computer vision APIs, and the cloud infra that makes them real.",
  hero_stack_tags: ["Python", "FastAPI", "RAG", "YOLOv8", "AWS", "Kubernetes", "React"],
  resume_url: "",
  github_url: "https://github.com/inamshz",
  linkedin_url: "https://linkedin.com/in/inamshz",
  leetcode_url: "https://leetcode.com/inamshz",
  email: "inam@example.com",
  phone_tel: "+923000000000",
  phone_display: "+92 300 0000000",
  contact_heading: "Let's build something.",
  contact_sub: "Open to AI engineering roles, internships, and interesting problems.",
  footer_text: "Inam Ullah Shaikh · 2025",
  about_bio:
    "Final-year CS student at FAST-NUCES, Islamabad. I've built RAG systems, real-time CV APIs, and cloud microservices end-to-end. Currently AI Intern at Komatsu Pakistan Soft. I care about systems that work in production, not just notebooks.",
  about_facts: [
    { k: "University", v: "FAST-NUCES" },
    { k: "Location", v: "Islamabad, PK" },
    { k: "Current role", v: "AI Intern @ Komatsu" },
    { k: "Open to", v: "AI / ML roles" },
  ],
};

export const SEED_SKILLS = [
  {
    id: "seed-1",
    category: "AI/ML",
    tags: ["LLMs", "RAG", "YOLOv8", "ANNs", "NLP", "Prompt Engineering"],
    sort_order: 0,
  },
  {
    id: "seed-2",
    category: "GenAI",
    tags: ["OpenAI API", "LangChain", "Vector Search", "Document Ingestion"],
    sort_order: 1,
  },
  {
    id: "seed-3",
    category: "Backend",
    tags: ["FastAPI", "Python", "Celery", "REST APIs", "Async", "Microservices"],
    sort_order: 2,
  },
  {
    id: "seed-4",
    category: "DevOps",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform", "Ansible", "CI/CD"],
    sort_order: 3,
  },
  {
    id: "seed-5",
    category: "Frontend",
    tags: ["React", "HTML", "CSS", "JavaScript"],
    sort_order: 4,
  },
  {
    id: "seed-6",
    category: "Languages",
    tags: ["Python", "C++", "Java", "C#", "MASM"],
    sort_order: 5,
  },
];

// ===== PUBLIC =====
export const getProjects = () => request("/api/projects").catch(() => SEED_PROJECTS);
export const getProject = (slug) =>
  request(`/api/projects/${slug}`).catch(() => SEED_PROJECTS.find((p) => p.slug === slug) || null);
export const getExperience = () => request("/api/experience").catch(() => SEED_EXPERIENCE);
export const getCertifications = () => request("/api/certifications").catch(() => SEED_CERTS);
export const getSite = () => request("/api/site").catch(() => SEED_SITE);
export const getSkills = () =>
  request("/api/skills")
    .then((rows) => (Array.isArray(rows) && rows.length ? rows : SEED_SKILLS))
    .catch(() => SEED_SKILLS);

/** Admin list only — no seed fallback (empty DB shows empty). */
export const getProjectsForAdmin = () =>
  request("/api/admin/projects", { auth: true }).catch(() => []);
export const getCertificationsForAdmin = () =>
  request("/api/admin/certifications", { auth: true }).catch(() => []);
export const getExperienceForAdmin = () =>
  request("/api/admin/experience", { auth: true }).catch(() => []);
export const getSkillsForAdmin = () => request("/api/admin/skills", { auth: true }).catch(() => []);
export const sendContact = (data) =>
  request("/api/contact", { method: "POST", body: JSON.stringify(data) });

// ===== ADMIN =====
export const adminLogin = (email, password) =>
  request("/api/admin/login", { method: "POST", body: JSON.stringify({ email, password }) });
export const getMessages = () => request("/api/admin/messages", { auth: true }).catch(() => []);
export const createProject = (data) =>
  request("/api/admin/projects", { method: "POST", auth: true, body: JSON.stringify(data) });
export const updateProject = (id, data) =>
  request(`/api/admin/projects/${id}`, { method: "PUT", auth: true, body: JSON.stringify(data) });
export const deleteProject = (id) =>
  request(`/api/admin/projects/${id}`, { method: "DELETE", auth: true });
export const bulkUpsertProjects = (projects, clearExisting = false) =>
  request("/api/admin/projects/bulk-upsert", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ projects, clear_existing: clearExisting }),
  });
export const createCert = (data) =>
  request("/api/admin/certifications", { method: "POST", auth: true, body: JSON.stringify(data) });
export const updateCert = (id, data) =>
  request(`/api/admin/certifications/${id}`, {
    method: "PUT",
    auth: true,
    body: JSON.stringify(data),
  });
export const deleteCert = (id) =>
  request(`/api/admin/certifications/${id}`, { method: "DELETE", auth: true });
export const createExp = (data) =>
  request("/api/admin/experience", { method: "POST", auth: true, body: JSON.stringify(data) });
export const updateExp = (id, data) =>
  request(`/api/admin/experience/${id}`, { method: "PUT", auth: true, body: JSON.stringify(data) });
export const deleteExp = (id) =>
  request(`/api/admin/experience/${id}`, { method: "DELETE", auth: true });
export const createSkill = (data) =>
  request("/api/admin/skills", { method: "POST", auth: true, body: JSON.stringify(data) });
export const updateSkill = (id, data) =>
  request(`/api/admin/skills/${id}`, { method: "PUT", auth: true, body: JSON.stringify(data) });
export const deleteSkill = (id) =>
  request(`/api/admin/skills/${id}`, { method: "DELETE", auth: true });
export const updateSite = (data) =>
  request("/api/admin/site", { method: "PUT", auth: true, body: JSON.stringify(data) });
export const uploadResume = async (file) => {
  const fd = new FormData();
  fd.append("file", file);
  const headers = {};
  const t = getToken();
  if (t) headers["Authorization"] = `Bearer ${t}`;
  const res = await fetch(`${API}/api/admin/upload/resume`, { method: "POST", headers, body: fd });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      msg = j.detail || j.message || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
};
export const replyToMessage = (messageId, body, subject) =>
  request(`/api/admin/messages/${messageId}/reply`, {
    method: "POST",
    auth: true,
    body: JSON.stringify({ body, subject: subject || null }),
  });
