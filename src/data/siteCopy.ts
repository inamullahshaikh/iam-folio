export const siteCopy = {
  ctaLine: "I'm looking for full time AI engineering roles. Remote, or on site in Islamabad.",

  oneLiner:
    "I'm an AI engineer. I build LLM agents, RAG pipelines, and computer vision systems, and I care most about the part that makes them trustworthy in production: evaluation, grounding, and guardrails.",

  longBioParagraphs: [
    "I'm an AI engineer. I build systems where a model has to do real work: agents that plan and run multi-step tasks, retrieval pipelines that answer from real documents, and vision models that watch a live feed. Getting a demo to work is the easy part. I focus on making it hold up in production.",
    "Relay is where that comes together. It's a multi-tenant agent platform on LangGraph where companies connect their own tools and the agent plans, runs, and validates business tasks. Every answer gets a groundedness check before it reaches the user, and every action that changes state waits for a human to approve it. An eval harness blocks CI when quality regresses.",
    "Before that, my Final Year Project, ForeSyte, taught me the model side. I collected and labeled 3,100 images, trained YOLOv8 with PyTorch and CUDA to 91% precision and 96% recall, and served it through FastAPI to a live dashboard.",
    "My RAG work runs the same way. On FastCite I got answer accuracy up to 98% and cut hallucination by about 91%. On Startup and Law RAG I hit 96% accuracy on legal questions. The lesson I keep relearning is that retrieval quality, not the model, decides most of the outcome.",
    "I write the backend myself too: FastAPI, Celery, Postgres with pgvector, Docker. An AI feature is only as good as the pipeline it runs on, so I own the whole path from ingest to answer.",
  ],

  aboutQuickFacts: {
    locationSuffix: ", open to remote",
    currentFocus: "LLM agents, RAG and retrieval quality, LLM evaluation, and applied computer vision",
  },

  aboutSubtitle: "What I build, how I think about it, and why it holds up in production.",

  stats: [
    { label: "Recall on my YOLOv8 detection model" },
    { label: "Months as an AI intern at Komatsu" },
    { label: "LLM agent and RAG systems shipped" },
  ],

  hero: {
    greeting: "Hey, I'm",
    viewWork: "See my AI work",
    getInTouch: "Get in touch",
  },

  educationSubtitle: "Where I learned the fundamentals behind the models.",

  skillsSubtitle: "The models, frameworks, and infrastructure I use to take AI systems from notebook to production.",

  projects: {
    subtitle: "Agents, retrieval, and computer vision, each measured, grounded, and built to run in production.",
    emptyCategory: "I don't have featured work in this filter yet. But try another tab and you'll find something.",
    moreTitle: "Other Things I've Built",
    screenshotLabel: (name: string) => `Screenshot placeholder for ${name}`,
    finalYearBadge: "My FYP",
    liveDemo: "Live Demo",
    github: "GitHub",
    details: "Deep dive",
    view: "Deep dive",
    backToProjects: "Back to all projects",
    pageEyebrow: "Case study",
    prevProject: "Previous",
    nextProject: "Next",
    closeLabel: "Close project details",
    sections: {
      problem: "What Was Broken",
      solution: "What I Built",
      architecture: "How It Fits Together",
      highlights: "What I'm Proud Of",
      techStack: "Tech Stack",
    },
    items: {
      proj_relay: {
        tagline:
          "An enterprise AI operations agent. It plans, runs, and checks multi-step work across your tools, and asks before it touches anything.",
        problem:
          "Companies want an agent that does real work across their own tools. Databases, documents, Gmail, Calendar, internal APIs. But would you let an LLM send emails or write to production without asking? I wouldn't. So the hard part isn't the agent. It's the guardrails.",
        solution:
          "I built a multi-tenant platform where companies plug in their own tools and a plan-and-execute LangGraph agent completes multi-step tasks. Every action that changes state waits for a human to approve it.",
        architectureDescription:
          "Next.js up front, FastAPI in the middle, Celery and Redis workers running the LangGraph agent, PostgreSQL with pgvector underneath. Plan, check capabilities, run a step, validate it, replan if needed, then check the final answer against what the steps actually returned before the user sees it.",
        highlights: [
          "I built a plan-and-execute LangGraph agent with capped replanning that keeps completed steps, plus a groundedness check on every answer.",
          "Connectors plug in through a registry with per-installation circuit breakers, so a failing tool fails over to the next one.",
          "Any MCP server or OpenAPI 3 operation becomes an agent tool with zero code changes. Embedding-based tool search caps the agent at 20 tools per call.",
          "Approval pauses survive restarts and resume on any worker. Idempotency keys stop a crash from re-sending the same email.",
          "Hybrid RAG over PDF, DOCX and Markdown, with Gemini OCR for scans and pgvector plus full-text search fused via RRF.",
          "Security I actually thought about: encrypted credentials, an SSRF guard, a read-only SQL guard on sqlglot, prompt-injection defenses, per-run budgets.",
          "An eval harness blocks CI when routing, text-to-SQL, RAG, planning, or approval compliance regress.",
          "I wrote down the design decisions in 15 ADRs.",
        ],
      },
      proj_foresyte: {
        tagline: "Real time exam monitoring with computer vision. Because manual proctoring doesn't scale.",
        problem:
          "Manual proctoring is slow, inconsistent, and brutal to scale. Can one person watch fifty screens at once? I don't think so. Exams need automated detection of suspicious behavior in real time, and I wanted to build that instead of just complaining about it.",
        solution:
          "I built a real time cheating detection system using YOLOv8 object detection, FastAPI inference APIs, and a React monitoring interface. It flags events and sends alerts without waiting for a human to rewind footage.",
        architectureDescription:
          "Three layers. Model inference in the back, API backend in the middle, React UI up front with event based alerts tying it together.",
        highlights: [
          "This was my Final Year Project and it's still my lead showcase piece.",
          "I collected and annotated a custom dataset of 3,100 images across 7 cheating related labels.",
          "I trained YOLOv8 with CUDA on Kaggle and hit 91% precision and 96% recall.",
          "I wired MediaPipe invigilator tracking into the object detection pipeline.",
          "FastAPI inference APIs feed a React monitoring dashboard in real time.",
        ],
      },
      proj_resumind: {
        tagline: "An AI resume platform. Tailored resumes, skill gap analysis, and ATS scoring from one profile.",
        problem:
          "Job seekers rewrite resumes per role, miss skill gaps, and have no clean way to check ATS or recruiter fit before applying. I've watched friends do this at 2 a.m. Does that sound sustainable? It doesn't to me.",
        solution:
          "I built an AI resume platform where users create structured profiles and submit job descriptions. A Groq powered pipeline generates tailored resumes, flags skill gaps, suggests interview questions, and scores ATS fit, recruiter fit, and interview likelihood.",
        architectureDescription:
          "Next.js frontend, FastAPI API, and a Groq powered generation pipeline, with MongoDB for data, Cloudflare R2 for files, and JWT auth. Profile plus job description goes in, resume, gap analysis, and scores come out.",
        highlights: [
          "It raised average ATS scores of resumes by about 42%.",
          "I built a structured profile flow for skills, education, certifications, experience, and projects.",
          "A job description drives tailored resume generation and gap analysis.",
          "Automated scoring for ATS fit, recruiter fit, and interview likelihood.",
        ],
      },
      proj_virtualxi: {
        tagline: "Track FIFA career mode stats in a deployed MERN app. Because spreadsheets get old fast.",
        problem:
          "If you play FIFA career mode, you know the pain. Stats scatter across seasons and comparing players turns into guesswork. I wanted one place that actually remembers, so I stopped wishing for it and built it.",
        solution:
          "I built a full stack MERN app that tracks goals, appearances, assists, average rating, trophies, and accolades across the top 5 leagues over 15+ simulated seasons, with JWT auth, Cloudflare R2 for blob assets, and production deployment on Vercel for the frontend and Render for the backend.",
        highlights: [
          "I shipped this in 2 months between Jan and Mar 2026.",
          "It covers the top 5 leagues across 15+ simulated seasons.",
          "It's live at https://virtualxi.vercel.app/",
          "JWT authentication and role based access are in place.",
          "Cloudflare R2 handles blob storage.",
          "Frontend on Vercel, backend on Render. Split deploy on purpose.",
        ],
      },
      proj_startup_law_rag: {
        tagline: "An AI legal assistant for entrepreneurs. Grounded answers from real documents, not vibes.",
        problem:
          "Entrepreneurs waste hours digging through scattered legal and compliance docs when they're starting a business. And generic LLM answers for legal questions? I wouldn't trust those either. So I needed retrieval, not guessing.",
        solution:
          "I built a RAG app that retrieves from ingested legal documents and generates grounded answers about business formation, compliance, and law related questions.",
        architectureDescription:
          "Four piece async stack. FastAPI API up front, Celery workers behind it, retrieval engine in the middle, React frontend on top. Upload or query, enqueue, ingest, chunk, embed, retrieve, generate.",
        highlights: [
          "It cut average legal search time by about 30 minutes per query session.",
          "Up to 96% answer accuracy.",
          "I covered 2 legal domains, business formation and compliance.",
          "The whole pipeline is async. No blocking requests on heavy PDF work.",
          "I rebuilt V1 after synchronous FastAPI requests kept timing out on large files.",
        ],
      },
      proj_fastcite: {
        tagline: "A RAG powered study assistant. Semantic search and citations without the manual grind.",
        problem:
          "Students burn time manually searching documents and formatting citations. I've done it. It's miserable. Why should finding a quote feel like archaeology?",
        solution:
          "I built a RAG based study app with semantic document search and automated citation generation so the retrieval does the heavy lifting first.",
        architectureDescription:
          "Same stack pattern I used on Startup and Law RAG. FastAPI, Celery, retrieval engine, React frontend.",
        highlights: [
          "Up to 98% answer accuracy.",
          "It reduced model hallucination by about 91%.",
          "Two workflows, semantic search and citation generation.",
          "I Dockerized FastAPI and Celery services for reproducible deployment.",
          "I built the MVP in about 2 months as a focused side project.",
        ],
      },
      proj_attendance_app: {
        tagline: "A cloud native attendance platform on AWS. Infrastructure you can reproduce, not pray over.",
        problem:
          "Manual attendance infrastructure setup is error prone and a nightmare to reproduce across environments. One wrong config and you're debugging for a week. I've been that person. Never again if I can help it.",
        solution:
          "I built a microservices based attendance system with full infrastructure as code, CI/CD, and AWS deployment so environments spin up the same way every time.",
        architectureDescription:
          "Microservices on AWS with IaC managed lifecycle. Provision, configure, deploy. RabbitMQ between services, Kubernetes and Terraform in the mix.",
        highlights: [
          "RabbitMQ message brokering between microservices.",
          "Three lifecycle stages automated, provision, configure, deploy.",
          "Infrastructure as code for reproducible environments.",
          "This one forced me to think about ops, not just app code.",
        ],
      },
      proj_football_stats: {
        tagline: "Football stats with SOAP ingestion and web scraping. Ugly APIs, usable UI.",
        problem:
          "Football statistics from external providers need reliable ingestion and a web interface people will actually open. Because raw SOAP responses don't help anyone on their own.",
        solution: "I built a Next.js frontend with a Node.js backend consuming SOAP APIs and web scraped data sources.",
        highlights: [
          "I handled SOAP API consumption and web scraping for football statistics ingestion.",
          "I wired a Next.js frontend to Node.js backend services.",
        ],
      },
      proj_eventsync: {
        tagline: "A MERN event management system with containerized microservices. Auth done properly this time.",
        problem:
          "Event management features need to scale independently. Monolithic deployment makes updates and environment parity harder than it should be. So I split things up.",
        solution:
          "I built full stack event management on MERN with JWT auth, packaging each microservice in its own Docker container.",
        highlights: [
          "Full stack event management on MongoDB, Express.js, React.js, and Node.js with JWT authentication.",
          "Docker containers for each microservice, isolated and reproducible deployment.",
        ],
      },
      proj_crypto_bot: {
        tagline: "Automated demo trading via TradingView webhooks and Binance Spot Testnet.",
        problem:
          "Manual crypto demo trading lacks automation and structured logging for strategy validation. You can't improve what you don't measure. And I was tired of guessing whether a signal actually fired.",
        solution:
          "I built Flask REST endpoints that receive TradingView webhooks and execute trades on Binance Spot Testnet with Pine Script signals and structured trade logging.",
        highlights: [
          "Webhook driven automation from TradingView to my Flask backend.",
          "Binance Spot Testnet integration for safe demo trading.",
          "Structured trade logging so I could actually review strategies.",
        ],
      },
      proj_eventax: {
        tagline: "A desktop event app in JavaFX. Design patterns in a real GUI.",
        problem:
          "I wanted to practice OOP design patterns somewhere messier than a homework PDF. A desktop GUI felt like the right test.",
        solution:
          "I built a rich JavaFX desktop app for event management using singleton and factory patterns from my SDA coursework.",
        highlights: ["I shipped a real GUI desktop app using SDA design patterns, not just UML on a slide."],
      },
      proj_gym_management: {
        tagline: "Desktop gym management with SQL Server. Members, billing, attendance in one place.",
        problem:
          "Gym admin work scatters across spreadsheets and sticky notes if you don't model it properly. I needed one system that held members, billing, and attendance together.",
        solution:
          "I built a C# desktop frontend on top of SQL Server with relational modeling for the core gym workflows.",
        highlights: [
          "I modeled members, billing, and attendance in a relational schema that actually made sense.",
          "Secure database backend with a C# frontend people could click through.",
        ],
      },
      proj_torcs_bot: {
        tagline: "A TORCS racing bot trained with neural networks. Lap by lap tuning.",
        problem:
          "I wanted to see if a simple neural network could learn lap navigation without hand tuning every turn. TORCS gave me a sandbox to find out.",
        solution:
          "I trained an artificial neural network agent in the TORCS racing simulator and iterated on hyperparameters until lap times stopped embarrassing me.",
        highlights: ["Iterative model tuning for lap navigation in the TORCS racing simulator."],
      },
      proj_ipfs: {
        tagline: "An IPFS inspired file system simulation. B trees and hashmaps, not buzzwords.",
        problem:
          "I learn data structures better when I bolt them onto something concrete. A mini file system felt more honest than another isolated homework problem.",
        solution: "I implemented B trees, hashmaps, and linked lists in C++ to simulate file system behavior.",
        highlights: ["I implemented B trees, hashmaps, and linked lists for a file system simulation."],
      },
      proj_hospital_network: {
        tagline: "Hospital network infrastructure simulation in Packet Tracer.",
        problem:
          "I needed to show I understood VLANs, routing, and basic network security in a hospital style layout, not just read about them.",
        solution:
          "I designed and simulated a hospital network in Cisco Packet Tracer with segmented VLANs and routing between departments.",
      },
      proj_other_games: {
        tagline: "Tetris, SpaceShooter, PACMAN, OS concepts, assembly. Early systems work.",
        problem:
          "Before I was wiring Celery workers I was learning how computers actually work under the hood. These projects are where that started.",
        solution:
          "I built small games and systems projects in C++, assembly, and SFML, plus OS concepts like forking and semaphores.",
      },
    },
  },

  experience: {
    subtitle: "An AI internship, and a cybersecurity one. The second is why my agents ask before they act.",
    summary:
      "Five months building AI driven software at Komatsu Pakistan Soft, across prototype and integration phases, in an Agile, Git based team. It's where I learned that the hard part of AI is integration: getting a model to behave inside a real system, under real staging conditions.",
    bullets: [
      "I collaborated with the development team using Git and Agile workflows every day.",
      "I worked with AI driven systems in a production oriented engineering setup, not a toy sandbox.",
      "I supported integration and debugging of intelligent software components when things broke in staging.",
      "Because releases only work if someone documents them, I contributed to technical docs and cross functional handoffs.",
    ],
  },

  contact: {
    closingQuestion:
      "Got a role, a project, or just want to talk shop? Pick a link below and reach out. I'd love to hear what you're building.",
  },

  footer: {
    tagline: "AI engineer. Built by me, shipped with care.",
  },
} as const;

export type ProjectCopyId = keyof typeof siteCopy.projects.items;
