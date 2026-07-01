export interface CaseStudyBlock {
  type: "h2" | "p" | "diagram" | "tech" | "ul";
  content: string | string[];
}

export interface CaseStudy {
  projectId: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  blocks: CaseStudyBlock[];
}

export const caseStudies: CaseStudy[] = [
  {
    projectId: "proj_foresyte",
    eyebrow: "Final Year Project · Jan 2025 to Jun 2026 · Computer Vision",
    title: "ForeSyte",
    metaTitle: "ForeSyte | Inamullah Shaikh",
    metaDescription:
      "Final Year Project: real-time exam integrity monitoring with YOLOv8, FastAPI, and React.",
    blocks: [
      { type: "h2", content: "The problem" },
      {
        type: "p",
        content:
          "Manual proctoring is slow and inconsistent. One invigilator cannot watch every candidate closely, and two people rarely flag the same behaviour. For large halls or online exams you either hire more reviewers or accept that most sessions go unwatched. I wanted automated detection that runs during the exam, not after.",
      },
      { type: "h2", content: "My role" },
      {
        type: "p",
        content:
          "This was my Final Year Project. I built the detection model, the inference API, the React monitoring UI, and the alert flow between them.",
      },
      { type: "h2", content: "What I built" },
      {
        type: "p",
        content:
          "ForeSyte uses YOLOv8 for object detection, FastAPI for inference endpoints and rule-based events, and React for a live dashboard. When the model flags something, the backend turns it into an alert the invigilator can act on instead of watching raw video all day.",
      },
      { type: "h2", content: "Architecture" },
      {
        type: "p",
        content: "Three layers, one direction of data flow:",
      },
      {
        type: "diagram",
        content: `┌─────────────────────────────────────────────┐
│  Layer 1: Inference                           │
│  YOLOv8 object-detection model                │
│  frames in -> detections + confidence out     │
└───────────────────────┬─────────────────────┘
                        │
┌───────────────────────▼─────────────────────┐
│  Layer 2: API backend                       │
│  FastAPI inference endpoints                │
│  runs detection, applies rules, emits events  │
└───────────────────────┬─────────────────────┘
                        │  real-time alerts
┌───────────────────────▼─────────────────────┐
│  Layer 3: Monitoring UI                     │
│  React dashboard, event-based alerts        │
└─────────────────────────────────────────────┘`,
      },
      {
        type: "tech",
        content: "Python · FastAPI · React · YOLOv8 · Computer Vision · Object Detection",
      },
      { type: "h2", content: "Key decisions" },
      {
        type: "p",
        content:
          "I kept the model behind FastAPI instead of calling it from the frontend. That let me retrain, change thresholds, or swap classes without touching React. The API is where a raw detection becomes an event worth showing.",
      },
      {
        type: "p",
        content:
          "Alerts are event-based, not a continuous video stream to the reviewer. The backend applies rules and only surfaces what matters. The UI renders events, not every frame.",
      },
      { type: "h2", content: "What I'd change" },
      {
        type: "p",
        content:
          "I would add measurement earlier. I do not have solid numbers on latency, precision, or concurrent streams yet. Next time I would log those in the inference layer from week one and make the rule layer configurable per exam instead of hard-coded in the API.",
      },
    ],
  },
  {
    projectId: "proj_startup_law_rag",
    eyebrow: "Jan 2025 to Jun 2026 · RAG · NLP · Full-Stack",
    title: "Startup & Law RAG",
    metaTitle: "Startup & Law RAG | Inamullah Shaikh",
    metaDescription:
      "RAG app for entrepreneurs: async ingestion, semantic retrieval, grounded answers on business formation and compliance.",
    blocks: [
      { type: "h2", content: "The problem" },
      {
        type: "p",
        content:
          "Founders spend hours digging through legal and compliance documents. A generic LLM answer sounds confident but is unreliable for anything legal. The product needed answers tied to real source material.",
      },
      { type: "h2", content: "My role" },
      {
        type: "p",
        content:
          "Solo build: ingestion pipeline, retrieval, generation, and the React frontend. Most of the hard work was making the pipeline survive bad PDFs and large files.",
      },
      { type: "h2", content: "What I built" },
      {
        type: "p",
        content:
          "A RAG app that ingests legal documents, retrieves relevant passages, and generates grounded answers. It covers business formation and compliance. A founder can ask about registration steps or compliance requirements and get a response linked to what was actually ingested.",
      },
      { type: "h2", content: "Data flow" },
      {
        type: "diagram",
        content: `  upload / query
       │
       ▼
┌──────────────┐   enqueue    ┌──────────────┐
│  FastAPI     │ ───────────▶ │  Celery      │
│  API layer   │              │  workers     │
└──────────────┘              └──────┬───────┘
       ▲                             │ ingest, clean,
       │ grounded answer             │ chunk, embed
       │                             ▼
┌──────────────┐   retrieve   ┌──────────────┐
│  React UI    │ ◀─────────── │  Retrieval   │
│              │              │  engine      │
└──────────────┘              └──────────────┘`,
      },
      {
        type: "tech",
        content:
          "Python · JavaScript · FastAPI · Celery · React · RAG · Semantic Search · LLM",
      },
      { type: "h2", content: "Pipeline reliability" },
      {
        type: "p",
        content:
          "V1 processed documents inside the FastAPI request. Large PDFs timed out. Bad encodings crashed the handler. Failures halfway through returned a silent 500 with no useful state.",
      },
      {
        type: "p",
        content:
          "I moved ingestion to Celery. Files are validated before expensive work. Chunking is idempotent so retries are safe. Failures are logged as explicit states the user can see instead of disappearing.",
      },
      { type: "h2", content: "Key decisions" },
      {
        type: "p",
        content:
          "Async by default. Moving ingestion out of the request path made retries and progress tracking possible without blocking the API on a 40-page PDF.",
      },
      {
        type: "p",
        content:
          "Retrieval-first design. The model answers from retrieved chunks, not from memory of the training data.",
      },
      { type: "h2", content: "What I'd change" },
      {
        type: "p",
        content:
          "I would build a small eval set of questions with expected source passages and track retrieval quality as I change chunking. I would also show source excerpts in the UI so users can verify grounding themselves.",
      },
    ],
  },
  {
    projectId: "proj_fastcite",
    eyebrow: "Nov 2025 to Dec 2025 · RAG · Study tools",
    title: "FastCite",
    metaTitle: "FastCite | Inamullah Shaikh",
    metaDescription:
      "RAG study assistant for semantic document search and citation generation.",
    blocks: [
      { type: "h2", content: "The problem" },
      {
        type: "p",
        content:
          "Research work means a lot of time searching PDFs and fixing citation formatting. Students repeat the same manual steps for every paper.",
      },
      { type: "h2", content: "What I built" },
      {
        type: "p",
        content:
          "FastCite is a RAG study app with two workflows: semantic search across uploaded documents and automated citation generation. Same async stack pattern as my other RAG projects: FastAPI, Celery, retrieval engine, React frontend.",
      },
      { type: "h2", content: "Architecture" },
      {
        type: "diagram",
        content: `FastAPI API  ->  Celery workers  ->  RAG retrieval  ->  React UI
     │                    │                      │
  query/upload      ingest & embed          search / cite`,
      },
      {
        type: "tech",
        content: "Python · FastAPI · Celery · React · RAG · Semantic Search · NLP",
      },
      { type: "h2", content: "Key decisions" },
      {
        type: "p",
        content:
          "I reused the Celery-backed pipeline from Startup & Law RAG instead of building another synchronous upload path. That kept the MVP focused on the two user flows.",
      },
      {
        type: "p",
        content:
          "Retrieval-first for citations: find the passage first, then format the reference from structured metadata instead of asking the model to guess page numbers.",
      },
      { type: "h2", content: "What I'd change" },
      {
        type: "p",
        content:
          "Add support for more citation styles and export to BibTeX. The two-month scope meant I shipped search and one citation format only.",
      },
    ],
  },
  {
    projectId: "proj_attendance_app",
    eyebrow: "Jan 2025 to Apr 2025 · Cloud · Microservices",
    title: "Attendance App",
    metaTitle: "Attendance App | Inamullah Shaikh",
    metaDescription:
      "Cloud-native attendance platform on AWS with Terraform, Ansible, Kubernetes, and CI/CD.",
    blocks: [
      { type: "h2", content: "The problem" },
      {
        type: "p",
        content:
          "Standing up attendance infrastructure by hand is error-prone. Environments drift, deploy steps get skipped, and reproducing a working setup for another team is painful.",
      },
      { type: "h2", content: "What I built" },
      {
        type: "p",
        content:
          "A microservices attendance system with infrastructure-as-code and automated deploy. Provision on AWS, configure with Ansible, run services on Kubernetes behind Docker, with CI/CD tying the lifecycle together.",
      },
      { type: "h2", content: "Lifecycle" },
      {
        type: "diagram",
        content: `Terraform (provision EC2, base infra)
        │
        ▼
Ansible (configure hosts, dependencies)
        │
        ▼
Kubernetes + Docker (deploy microservices)
        │
        ▼
CI/CD (build, test, promote)`,
      },
      {
        type: "tech",
        content:
          "Python · AWS EC2 · Kubernetes · Docker · Terraform · Ansible · CI/CD · Microservices",
      },
      { type: "h2", content: "Key decisions" },
      {
        type: "p",
        content:
          "Split provision, configure, and deploy into separate stages. Each stage has its own tool and artifact, so you can re-run configure without reprovisioning.",
      },
      {
        type: "p",
        content:
          "Microservices over a monolith so attendance recording, reporting, and admin could scale and deploy independently even in a coursework scope.",
      },
      { type: "h2", content: "What I'd change" },
      {
        type: "p",
        content:
          "Add observability: structured logs and health checks per service from the start. I focused on getting deploy reproducible before measuring runtime behaviour.",
      },
    ],
  },
  {
    projectId: "proj_eventsync",
    eyebrow: "2024 · MERN · Full-Stack",
    title: "EventSync",
    metaTitle: "EventSync | Inamullah Shaikh",
    metaDescription: "MERN stack event management web application.",
    blocks: [
      { type: "h2", content: "The problem" },
      {
        type: "p",
        content:
          "Campus and small-team events need a single place to create listings, track details, and expose them over the web without a desktop-only tool.",
      },
      { type: "h2", content: "What I built" },
      {
        type: "p",
        content:
          "EventSync is a full-stack event management system on the MERN stack. MongoDB stores events and related data, Express.js exposes REST APIs, React handles the UI, and Node.js runs the server.",
      },
      {
        type: "tech",
        content: "React.js · Node.js · Express.js · MongoDB · RESTful APIs · HTML · CSS",
      },
      { type: "h2", content: "Key decisions" },
      {
        type: "p",
        content:
          "MongoDB for flexible event documents during early schema changes. REST endpoints kept the frontend simple while I learned the full request path.",
      },
      { type: "h2", content: "What I'd change" },
      {
        type: "p",
        content:
          "Add auth and role-based access before feature growth. The first version focused on CRUD and listing; permissions came later in my head but not in the shipped coursework build.",
      },
    ],
  },
  {
    projectId: "proj_gym_management",
    eyebrow: "2024 · Desktop · SQL Server",
    title: "GYM Management System",
    metaTitle: "GYM Management System | Inamullah Shaikh",
    metaDescription:
      "Desktop gym management application with C# frontend and SQL Server backend.",
    blocks: [
      { type: "h2", content: "The problem" },
      {
        type: "p",
        content:
          "A small gym needs member records, billing, and attendance in one system with a proper relational backend, not spreadsheets.",
      },
      { type: "h2", content: "What I built" },
      {
        type: "p",
        content:
          "A desktop gym management app in C# connected to SQL Server. Members, billing, and attendance share one schema with normalized tables and queries behind the UI.",
      },
      {
        type: "tech",
        content: "C# · SQL · SQL Server",
      },
      { type: "h2", content: "Key decisions" },
      {
        type: "p",
        content:
          "Relational modeling upfront: separate tables for members, plans, payments, and check-ins so reports stay consistent.",
      },
      {
        type: "p",
        content:
          "Desktop WinForms-style UI for staff who work at a front desk, not a mobile-first flow.",
      },
      { type: "h2", content: "What I'd change" },
      {
        type: "p",
        content:
          "Add migration scripts and seed data for demos. I hand-built the schema on my machine without a repeatable setup path.",
      },
    ],
  },
  {
    projectId: "proj_torcs_bot",
    eyebrow: "2024 · Reinforcement Learning",
    title: "TORCS Game Bot",
    metaTitle: "TORCS Game Bot | Inamullah Shaikh",
    metaDescription:
      "Autonomous racing agent for the TORCS simulator using artificial neural networks.",
    blocks: [
      { type: "h2", content: "The problem" },
      {
        type: "p",
        content:
          "TORCS is a racing simulator where you can plug in a bot. The goal was a car that completes laps without hand-coded steering rules for every track segment.",
      },
      { type: "h2", content: "What I built" },
      {
        type: "p",
        content:
          "An autonomous racing agent trained with artificial neural networks in Python. Sensor readings from the car feed the network; outputs control steering and throttle. I tuned architecture and training loops iteratively on lap time and crash rate.",
      },
      {
        type: "tech",
        content: "Python · Artificial Neural Networks (ANN)",
      },
      { type: "h2", content: "Key decisions" },
      {
        type: "p",
        content:
          "ANN over pure rule-based control so the same agent could generalize across track curves instead of encoding every turn.",
      },
      {
        type: "p",
        content:
          "Short feedback loops: train, run a lap, inspect where it left the road, adjust inputs or hidden layer size, repeat.",
      },
      { type: "h2", content: "What I'd change" },
      {
        type: "p",
        content:
          "Log training metrics to disk and compare runs. I relied on watching the simulator instead of plotted loss and lap-time curves.",
      },
    ],
  },
  {
    projectId: "proj_eventax",
    eyebrow: "2024 · Desktop · JavaFX",
    title: "EventaX",
    metaTitle: "EventaX | Inamullah Shaikh",
    metaDescription:
      "Desktop event management application with JavaFX and SDA design patterns.",
    blocks: [
      { type: "h2", content: "The problem" },
      {
        type: "p",
        content:
          "Coursework required a desktop GUI for event management with clean object-oriented structure, not a single giant class file.",
      },
      { type: "h2", content: "What I built" },
      {
        type: "p",
        content:
          "EventaX is a JavaFX desktop app for creating and managing events. I used Singleton and Factory patterns where they matched real constraints: one shared config entry point and factories for event types.",
      },
      {
        type: "tech",
        content: "Java · JavaFX · Singleton Pattern · Factory Pattern",
      },
      { type: "h2", content: "Key decisions" },
      {
        type: "p",
        content:
          "Patterns only where they reduced duplication. Singleton for shared app state, Factory for constructing event variants without switch statements all over the UI.",
      },
      { type: "h2", content: "What I'd change" },
      {
        type: "p",
        content:
          "Persist events to a file or database. The coursework build kept everything in memory for the demo session.",
      },
    ],
  },
  {
    projectId: "proj_ipfs",
    eyebrow: "Systems · Data Structures",
    title: "IPFS-Inspired File System",
    metaTitle: "IPFS-Inspired File System | Inamullah Shaikh",
    metaDescription:
      "Custom file system simulation using B-trees, hashmaps, and linked lists in C++.",
    blocks: [
      { type: "h2", content: "The problem" },
      {
        type: "p",
        content:
          "Understand how a content-addressed file system might lay out blocks, indexes, and lookups without building a full distributed network.",
      },
      { type: "h2", content: "What I built" },
      {
        type: "p",
        content:
          "A file system simulation in C++ inspired by IPFS ideas. B-trees index blocks, hashmaps speed lookups, linked lists chain related nodes. The focus was correct structure and operations, not production networking.",
      },
      {
        type: "tech",
        content: "C++ · B-trees · Hashmaps · Linked Lists",
      },
      { type: "h2", content: "Key decisions" },
      {
        type: "p",
        content:
          "Pick the right structure per operation: B-tree for ordered range access, hashmap for O(1) block lookup by id.",
      },
      { type: "h2", content: "What I'd change" },
      {
        type: "p",
        content:
          "Add unit tests for insert/delete on the B-tree. I validated mostly through manual runs and print debugging.",
      },
    ],
  },
  {
    projectId: "proj_hospital_network",
    eyebrow: "Networking · Simulation",
    title: "Hospital Management System (Network)",
    metaTitle: "Hospital Network Simulation | Inamullah Shaikh",
    metaDescription:
      "Hospital network infrastructure designed and simulated in Cisco Packet Tracer.",
    blocks: [
      { type: "h2", content: "The problem" },
      {
        type: "p",
        content:
          "A hospital needs segmented networks: clinical systems, admin, guest Wi-Fi, with routing and security between zones.",
      },
      { type: "h2", content: "What I built" },
      {
        type: "p",
        content:
          "A network infrastructure simulation in Cisco Packet Tracer. VLANs separate departments, routers connect subnets, and basic security rules limit cross-zone traffic.",
      },
      {
        type: "tech",
        content: "Cisco Packet Tracer · VLANs · Routing · Network Security",
      },
      { type: "h2", content: "Key decisions" },
      {
        type: "p",
        content:
          "VLANs per function so a broadcast storm or misconfigured device on guest Wi-Fi does not touch clinical equipment.",
      },
      { type: "h2", content: "What I'd change" },
      {
        type: "p",
        content:
          "Document IP plans and ACL tables in one README. The topology lived in Packet Tracer without a written runbook.",
      },
    ],
  },
  {
    projectId: "proj_other_games",
    eyebrow: "Games · Systems · Coursework",
    title: "Games & Systems Projects",
    metaTitle: "Games & Systems Projects | Inamullah Shaikh",
    metaDescription:
      "Collection of C++ games, OS concepts, and assembly coursework projects.",
    blocks: [
      { type: "h2", content: "Overview" },
      {
        type: "p",
        content:
          "A set of smaller coursework and practice projects: Tetris, SpaceShooter, and PACMAN in C++ with SFML; OS concepts like forking and semaphores; assembly work in MASM; and a grocery store frontend exercise.",
      },
      {
        type: "tech",
        content: "C++ · SFML · Assembly (MASM) · OS Concepts",
      },
      { type: "h2", content: "What I learned" },
      {
        type: "ul",
        content: [
          "Game loops, collision, and input handling in SFML.",
          "Process synchronization with semaphores and fork patterns.",
          "Low-level control flow in assembly alongside high-level C++.",
        ],
      },
      { type: "h2", content: "What I'd change" },
      {
        type: "p",
        content:
          "Keep one repo per game with a Makefile instead of scattering builds across folders. These were learning exercises, not shipped products.",
      },
    ],
  },
];

import { projects } from "./portfolio";

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return undefined;
  return caseStudies.find((cs) => cs.projectId === project.id);
}