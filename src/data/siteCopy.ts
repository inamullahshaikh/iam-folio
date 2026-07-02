export const siteCopy = {
  ctaLine:
    "Honestly I'm open to full time roles. Remote works for me. So does Islamabad.",

  oneLiner:
    "I'm a CS grad who builds full stack and AI systems. RAG pipelines, real time CV apps, and cloud backed microservices. That's the work I keep coming back to.",

  longBioParagraphs: [
    "Here's the thing. I'm a software engineer with a bias toward backend systems and applied AI, and most of my recent work lives where FastAPI, Celery, React, and LLM backed retrieval meet.",
    "I take messy documents or live inputs and try to turn them into products that don't embarrass me in a demo.",
    "ForeSyte, my Final Year Project, pushed me into real time computer vision and inference APIs. And side projects like Startup and Law RAG and FastCite taught me how to design async pipelines that don't fall over when someone uploads a bad file or the queue gets heavy.",
    "Can I do frontend? Sure. But am I happiest owning the data flow from ingest to process to serve to monitor? Absolutely.",
    "Wait, that's not quite right. I'm not allergic to UI work. I just get obsessive about the pipeline behind it.",
    "I work in Agile teams, I document what I build, and I use Cursor daily because it's like having a fast junior dev who never needs coffee.",
  ],

  aboutQuickFacts: {
    locationSuffix: ", and I'm open to remote",
    currentFocus:
      "AI automation and agentic systems, backend and data pipelines, and full stack product engineering",
  },

  aboutSubtitle:
    "A quick snapshot of who I am, what I've been building, and where I'm headed next.",

  stats: [
    { label: "LeetCode problems I've solved" },
    { label: "Months in an AI internship" },
    { label: "RAG systems I've built" },
  ],

  hero: {
    greeting: "Hey, I'm",
    viewWork: "See What I've Built",
    getInTouch: "Let's Talk",
  },

  skillsSubtitle:
    "These are the tools I reach for when I'm trying to ship something real, not just pass a tutorial.",

  projects: {
    subtitle:
      "So what do I actually build? I ship production style systems across Python and FastAPI backends, React frontends, and AI pipelines. Retrieval augmented generation, async workers, deployable microservices. You'll see that pattern all over this page.",
    emptyCategory:
      "I don't have featured projects in this category yet. Try another filter and see what shows up.",
    moreTitle: "Other Things I've Built",
    screenshotLabel: (name: string) => `Screenshot placeholder for ${name}`,
    finalYearBadge: "My FYP",
    liveDemo: "Live Demo",
    github: "GitHub",
    details: "Details",
    view: "View",
    closeLabel: "Close project details",
    sections: {
      problem: "The Problem",
      solution: "What I Built",
      architecture: "How It Fits Together",
      highlights: "What I'm Proud Of",
      techStack: "Tech Stack",
    },
    items: {
      proj_foresyte: {
        tagline:
          "Real time exam monitoring with computer vision. Because manual proctoring doesn't scale.",
        problem:
          "Manual proctoring is slow, inconsistent, and brutal to scale. Can one person watch fifty screens at once? I don't think so. Exams need automated detection of suspicious behavior in real time.",
        solution:
          "I built a real time cheating detection system using YOLOv8 object detection, FastAPI inference APIs, and a React monitoring interface. It flags events and sends alerts without waiting for a human to rewind footage.",
        architectureDescription:
          "Three layers. Model inference in the back, API backend in the middle, React UI up front with event based alerts tying it together.",
        highlights: [
          "This was my Final Year Project and it's still my lead showcase piece.",
          "I wired a real time monitoring pipeline with model triggered workflows.",
          "Automated event detection cut down the manual review work proctors were drowning in.",
        ],
      },
      proj_virtualxi: {
        tagline:
          "Track FIFA career mode stats in a deployed MERN app. Because spreadsheets get old fast.",
        problem:
          "If you play FIFA career mode, you know the pain. Stats scatter across seasons and comparing players turns into guesswork. I wanted one place that actually remembers.",
        solution:
          "I built a full stack MERN app that stores player career stats with JWT auth, Cloudflare R2 for blob assets, and production deployment on Vercel for the frontend and Render for the backend.",
        highlights: [
          "I shipped this in 2 months between Jan and Mar 2026.",
          "It's live at https://virtualxi.vercel.app/",
          "JWT authentication and role based access are in place.",
          "Cloudflare R2 handles blob storage.",
          "Frontend on Vercel, backend on Render. Split deploy on purpose.",
        ],
      },
      proj_startup_law_rag: {
        tagline:
          "An AI legal assistant for entrepreneurs. Grounded answers from real documents, not vibes.",
        problem:
          "Entrepreneurs waste hours digging through scattered legal and compliance docs when they're starting a business. And generic LLM answers for legal questions? I wouldn't trust those either.",
        solution:
          "I built a RAG app that retrieves from ingested legal documents and generates grounded answers about business formation, compliance, and law related questions.",
        architectureDescription:
          "Four piece async stack. FastAPI API up front, Celery workers behind it, retrieval engine in the middle, React frontend on top. Upload or query, enqueue, ingest, chunk, embed, retrieve, generate.",
        highlights: [
          "I covered 2 legal domains: business formation and compliance.",
          "The whole pipeline is async. No blocking requests on heavy PDF work.",
          "I rebuilt V1 after synchronous FastAPI requests kept timing out on large files.",
        ],
      },
      proj_fastcite: {
        tagline:
          "A RAG powered study assistant. Semantic search and citations without the manual grind.",
        problem:
          "Students burn time manually searching documents and formatting citations. I've done it. It's miserable.",
        solution:
          "I built a RAG based study app with semantic document search and automated citation generation so the retrieval does the heavy lifting first.",
        architectureDescription:
          "Same stack pattern I used on Startup and Law RAG. FastAPI, Celery, retrieval engine, React frontend.",
        highlights: [
          "Two workflows: semantic search and citation generation.",
          "Retrieval first design means less manual referencing.",
          "I built the MVP in about 2 months as a focused side project.",
        ],
      },
      proj_attendance_app: {
        tagline:
          "A cloud native attendance platform on AWS. Infrastructure you can reproduce, not pray over.",
        problem:
          "Manual attendance infrastructure setup is error prone and a nightmare to reproduce across environments. One wrong config and you're debugging for a week.",
        solution:
          "I built a microservices based attendance system with full infrastructure as code, CI/CD, and AWS deployment so environments spin up the same way every time.",
        architectureDescription:
          "Microservices on AWS with IaC managed lifecycle. Provision, configure, deploy. RabbitMQ between services, Kubernetes and Terraform in the mix.",
        highlights: [
          "RabbitMQ message brokering between microservices.",
          "Three lifecycle stages automated: provision, configure, deploy.",
          "Infrastructure as code for reproducible environments.",
          "This one forced me to think about ops, not just app code.",
        ],
      },
      proj_football_stats: {
        tagline:
          "Football stats with SOAP ingestion and web scraping. Ugly APIs, usable UI.",
        problem:
          "Football statistics from external providers need reliable ingestion and a web interface people will actually open.",
        solution:
          "I built a Next.js frontend with a Node.js backend consuming SOAP APIs and web scraped data sources.",
        highlights: [
          "SOAP API consumption and web scraping for football statistics ingestion.",
          "Next.js frontend wired to Node.js backend services.",
        ],
      },
      proj_eventsync: {
        tagline: "A MERN event management system. CRUD, but I learned auth properly.",
        highlights: [
          "Full stack event management on MongoDB, Express.js, React.js, and Node.js with JWT authentication.",
        ],
      },
      proj_eventax: {
        tagline: "A desktop event app in JavaFX. Design patterns in a real GUI.",
        highlights: ["Rich GUI desktop app using SDA design patterns."],
      },
      proj_gym_management: {
        tagline: "Desktop gym management with SQL Server. Members, billing, attendance in one place.",
        highlights: [
          "Relational data modeling for members, billing, and attendance.",
          "Secure database backend with C# frontend.",
        ],
      },
      proj_torcs_bot: {
        tagline: "A TORCS racing bot trained with neural networks. Lap by lap tuning.",
        highlights: [
          "Iterative model tuning for lap navigation in the TORCS racing simulator.",
        ],
      },
      proj_ipfs: {
        tagline: "An IPFS inspired file system simulation. B-trees and hashmaps, not buzzwords.",
        highlights: [
          "I implemented B-trees, hashmaps, and linked lists for a file system simulation.",
        ],
      },
      proj_hospital_network: {
        tagline: "Hospital network infrastructure simulation in Packet Tracer.",
      },
      proj_other_games: {
        tagline: "Tetris, SpaceShooter, PACMAN, OS concepts, assembly. Early systems work.",
      },
    },
  },

  experience: {
    subtitle: "Five months in industry taught me more than any lecture hall could.",
    summary:
      "Look, I spent five months as an AI intern at Komatsu Pakistan Soft. I worked in an Agile, Git based team across prototype and integration phases, and I got hands on with AI driven software in a production minded environment.",
    bullets: [
      "I collaborated with the development team using Git and Agile workflows every day.",
      "I worked with AI driven systems in a production oriented engineering setup, not a toy sandbox.",
      "I supported integration and debugging of intelligent software components when things broke in staging.",
      "Because releases only work if someone documents them, I contributed to technical docs and cross functional handoffs.",
    ],
  },

  contact: {
    closingQuestion:
      "Want to talk about a role or a project? Pick a link below and reach out.",
  },

  footer: {
    tagline: "Built by me. Shipped with care.",
  },
} as const;

export type ProjectCopyId = keyof typeof siteCopy.projects.items;
