export const siteCopy = {
  ctaLine:
    "Honestly I'm open to full time roles. Remote works for me. And Islamabad works too if that's where the team sits.",

  oneLiner:
    "I'm a CS grad who builds full stack and AI systems. Computer vision, RAG pipelines, LLM agents, Dockerized microservices. That's the work I keep coming back to.",

  longBioParagraphs: [
    "Here's the thing. I'm a software engineer with a bias toward backend systems and applied AI, and most of my recent work lives where FastAPI, Celery, React, and LLM backed retrieval meet. I take messy documents or live video feeds and try to turn them into products that won't embarrass me in a demo.",
    "ForeSyte changed how I think about shipping ML.",
    "My Final Year Project pushed me into real time computer vision. I trained YOLOv8 on a custom cheating detection dataset with PyTorch and CUDA, wired MediaPipe for invigilator tracking, and shipped FastAPI inference with a React dashboard. Side projects like Startup and Law RAG, FastCite, and Resumind taught me how to design async pipelines and LLM agents that don't fold when someone uploads a bad file or the queue gets heavy.",
    "Can I do frontend? Sure. But am I happiest owning the data flow from ingest to serve to monitor? Yeah, that's where I live.",
    "Wait, that's not quite right. I'm not allergic to UI work. I just get obsessive about the pipeline behind the button click.",
    "I use Cursor every day. It's like having a fast junior dev who never asks for a coffee break.",
    "I containerize with Docker, work in Agile teams, and document what I ship because nobody should reverse engineer my repos at 11 p.m. So if you're wondering what kind of engineer I am, I'm the one who cares whether the thing still works on Tuesday.",
  ],

  aboutQuickFacts: {
    locationSuffix: ", and I'm open to remote",
    currentFocus:
      "I'm focused on AI automation and agentic systems, backend and data pipelines, and applied ML across computer vision and NLP",
  },

  aboutSubtitle:
    "Look, this is the short version of who I am, what I've been building, and where I'm headed next.",

  stats: [
    { label: "LeetCode problems I've solved" },
    { label: "Months in an AI internship" },
    { label: "RAG and LLM agent systems I've built" },
  ],

  hero: {
    greeting: "Hey, I'm",
    viewWork: "See What I've Built",
    getInTouch: "Let's Talk",
  },

  educationSubtitle:
    "School first, then the projects that actually changed how I build.",

  skillsSubtitle:
    "So what do I actually reach for when I'm trying to ship something real? Not tutorial stack. These tools.",

  projects: {
    subtitle:
      "Here's the thing about my projects. I don't collect repos for a portfolio count. I build systems I'd defend in a technical interview. And you'll see the same pattern over and over. Python and FastAPI in the back, React or Next.js up front, AI pipelines and Docker when the problem needs them. Want proof? Scroll.",
    emptyCategory:
      "I don't have featured work in this filter yet. But try another tab and you'll find something.",
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
      proj_foresyte: {
        tagline:
          "Real time exam monitoring with computer vision. Because manual proctoring doesn't scale.",
        problem:
          "Manual proctoring is slow, inconsistent, and brutal to scale. Can one person watch fifty screens at once? I don't think so. Exams need automated detection of suspicious behavior in real time, and I wanted to build that instead of just complaining about it.",
        solution:
          "I built a real time cheating detection system using YOLOv8 object detection, FastAPI inference APIs, and a React monitoring interface. It flags events and sends alerts without waiting for a human to rewind footage.",
        architectureDescription:
          "Three layers. Model inference in the back, API backend in the middle, React UI up front with event based alerts tying it together.",
        highlights: [
          "This was my Final Year Project and it's still my lead showcase piece.",
          "I trained YOLOv8 on a custom cheating detection dataset using CUDA on Kaggle.",
          "I wired MediaPipe invigilator tracking into the object detection pipeline.",
          "Real time monitoring with model triggered workflows and automated event detection.",
        ],
      },
      proj_resumind: {
        tagline:
          "An AI resume agent with profile builder, job post chat, gap analysis, and ATS scoring.",
        problem:
          "Job seekers rewrite resumes per role, miss skill gaps, and have no clean way to check ATS or recruiter fit before applying. I've watched friends do this at 2 a.m. Does that sound sustainable? It doesn't to me.",
        solution:
          "I built an AI resume platform where users create structured profiles and submit job posts via chat. A LangChain and Groq agent generates tailored resumes, flags skill gaps, suggests interview questions, and scores ATS fit, recruiter fit, and interview likelihood.",
        architectureDescription:
          "Next.js frontend, FastAPI API, Celery workers, and a LangChain and Groq agent with PostgreSQL persistence. Profile plus job post gets enqueued, the agent generates resume, gap analysis, and scores, then everything persists and returns.",
        highlights: [
          "I built a structured profile flow for skills, education, certifications, experience, and projects.",
          "Job post chat drives tailored resume generation and gap analysis.",
          "Automated scoring for ATS fit, recruiter fit, and interview likelihood.",
          "Async Celery backed agent workflows with PostgreSQL storage.",
        ],
      },
      proj_virtualxi: {
        tagline:
          "Track FIFA career mode stats in a deployed MERN app. Because spreadsheets get old fast.",
        problem:
          "If you play FIFA career mode, you know the pain. Stats scatter across seasons and comparing players turns into guesswork. I wanted one place that actually remembers, so I stopped wishing for it and built it.",
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
          "Entrepreneurs waste hours digging through scattered legal and compliance docs when they're starting a business. And generic LLM answers for legal questions? I wouldn't trust those either. So I needed retrieval, not guessing.",
        solution:
          "I built a RAG app that retrieves from ingested legal documents and generates grounded answers about business formation, compliance, and law related questions.",
        architectureDescription:
          "Four piece async stack. FastAPI API up front, Celery workers behind it, retrieval engine in the middle, React frontend on top. Upload or query, enqueue, ingest, chunk, embed, retrieve, generate.",
        highlights: [
          "I covered 2 legal domains, business formation and compliance.",
          "The whole pipeline is async. No blocking requests on heavy PDF work.",
          "I rebuilt V1 after synchronous FastAPI requests kept timing out on large files.",
        ],
      },
      proj_fastcite: {
        tagline:
          "A RAG powered study assistant. Semantic search and citations without the manual grind.",
        problem:
          "Students burn time manually searching documents and formatting citations. I've done it. It's miserable. Why should finding a quote feel like archaeology?",
        solution:
          "I built a RAG based study app with semantic document search and automated citation generation so the retrieval does the heavy lifting first.",
        architectureDescription:
          "Same stack pattern I used on Startup and Law RAG. FastAPI, Celery, retrieval engine, React frontend.",
        highlights: [
          "Two workflows, semantic search and citation generation.",
          "Retrieval first design means less manual referencing.",
          "I Dockerized FastAPI and Celery services for reproducible deployment.",
          "I built the MVP in about 2 months as a focused side project.",
        ],
      },
      proj_attendance_app: {
        tagline:
          "A cloud native attendance platform on AWS. Infrastructure you can reproduce, not pray over.",
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
        tagline:
          "Football stats with SOAP ingestion and web scraping. Ugly APIs, usable UI.",
        problem:
          "Football statistics from external providers need reliable ingestion and a web interface people will actually open. Because raw SOAP responses don't help anyone on their own.",
        solution:
          "I built a Next.js frontend with a Node.js backend consuming SOAP APIs and web scraped data sources.",
        highlights: [
          "I handled SOAP API consumption and web scraping for football statistics ingestion.",
          "I wired a Next.js frontend to Node.js backend services.",
        ],
      },
      proj_eventsync: {
        tagline:
          "A MERN event management system with containerized microservices. Auth done properly this time.",
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
        tagline:
          "Automated demo trading via TradingView webhooks and Binance Spot Testnet.",
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
        highlights: [
          "I shipped a real GUI desktop app using SDA design patterns, not just UML on a slide.",
        ],
      },
      proj_gym_management: {
        tagline:
          "Desktop gym management with SQL Server. Members, billing, attendance in one place.",
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
        tagline:
          "A TORCS racing bot trained with neural networks. Lap by lap tuning.",
        problem:
          "I wanted to see if a simple neural network could learn lap navigation without hand tuning every turn. TORCS gave me a sandbox to find out.",
        solution:
          "I trained an artificial neural network agent in the TORCS racing simulator and iterated on hyperparameters until lap times stopped embarrassing me.",
        highlights: [
          "Iterative model tuning for lap navigation in the TORCS racing simulator.",
        ],
      },
      proj_ipfs: {
        tagline:
          "An IPFS inspired file system simulation. B trees and hashmaps, not buzzwords.",
        problem:
          "I learn data structures better when I bolt them onto something concrete. A mini file system felt more honest than another isolated homework problem.",
        solution:
          "I implemented B trees, hashmaps, and linked lists in C++ to simulate file system behavior.",
        highlights: [
          "I implemented B trees, hashmaps, and linked lists for a file system simulation.",
        ],
      },
      proj_hospital_network: {
        tagline:
          "Hospital network infrastructure simulation in Packet Tracer.",
        problem:
          "I needed to show I understood VLANs, routing, and basic network security in a hospital style layout, not just read about them.",
        solution:
          "I designed and simulated a hospital network in Cisco Packet Tracer with segmented VLANs and routing between departments.",
      },
      proj_other_games: {
        tagline:
          "Tetris, SpaceShooter, PACMAN, OS concepts, assembly. Early systems work.",
        problem:
          "Before I was wiring Celery workers I was learning how computers actually work under the hood. These projects are where that started.",
        solution:
          "I built small games and systems projects in C++, assembly, and SFML, plus OS concepts like forking and semaphores.",
      },
    },
  },

  experience: {
    subtitle:
      "Five months in industry taught me more than any lecture hall could. Honestly.",
    summary:
      "Look, I spent five months as an AI intern at Komatsu Pakistan Soft. I worked in an Agile, Git based team across prototype and integration phases, and I got hands on with AI driven software in a production minded environment. Did I know everything on day one? No. But I learned fast because real staging bugs don't care about your syllabus.",
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
    tagline: "Built by me. Shipped with care. Want to collaborate? You know where to find me.",
  },
} as const;

export type ProjectCopyId = keyof typeof siteCopy.projects.items;
