import { projects } from "./portfolio";

export interface CaseStudy {
  projectId: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  highlights: string[];
  stack: string;
  diagram?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    projectId: "proj_foresyte",
    eyebrow: "FYP · 2025–2026 · Computer Vision",
    title: "ForeSyte",
    metaTitle: "ForeSyte | Inamullah Shaikh",
    metaDescription: "Real-time exam monitoring with YOLOv8, FastAPI, and React.",
    summary:
      "Automated proctoring with live object detection, API-driven alerts, and a React dashboard.",
    highlights: [
      "YOLOv8 inference behind FastAPI, separate from the UI",
      "Event-based alerts instead of streaming every frame",
      "Final Year Project, built end to end",
    ],
    stack: "Python · FastAPI · React · YOLOv8",
    diagram: "Camera → YOLOv8 → FastAPI → React alerts",
  },
  {
    projectId: "proj_startup_law_rag",
    eyebrow: "2025–2026 · RAG · Full-Stack",
    title: "Startup & Law RAG",
    metaTitle: "Startup & Law RAG | Inamullah Shaikh",
    metaDescription: "Legal Q&A app with async ingestion and semantic retrieval.",
    summary:
      "RAG app for founders. Grounded answers on business formation and compliance from ingested documents.",
    highlights: [
      "FastAPI + Celery async pipeline",
      "Early file validation and idempotent chunking",
      "React frontend for upload and query",
    ],
    stack: "Python · FastAPI · Celery · React · RAG",
    diagram: "Upload → Celery → Embed → Retrieve → Answer",
  },
  {
    projectId: "proj_fastcite",
    eyebrow: "2025 · RAG · Study tools",
    title: "FastCite",
    metaTitle: "FastCite | Inamullah Shaikh",
    metaDescription: "Document search and citation generation for students.",
    summary: "Semantic search and auto-citations across uploaded research PDFs.",
    highlights: [
      "Search and cite workflows in one app",
      "Same async stack as my other RAG projects",
      "Two-month MVP scope",
    ],
    stack: "Python · FastAPI · Celery · React · RAG",
  },
  {
    projectId: "proj_attendance_app",
    eyebrow: "2025 · Cloud · Microservices",
    title: "Attendance App",
    metaTitle: "Attendance App | Inamullah Shaikh",
    metaDescription: "AWS microservices with Terraform, Ansible, and Kubernetes.",
    summary:
      "Attendance platform on AWS with IaC-managed provision, configure, and deploy stages.",
    highlights: [
      "Terraform + Ansible + Kubernetes lifecycle",
      "Microservices instead of a monolith",
      "CI/CD for repeatable deploys",
    ],
    stack: "Python · AWS · K8s · Terraform · Ansible · Docker",
    diagram: "Terraform → Ansible → K8s → CI/CD",
  },
  {
    projectId: "proj_eventsync",
    eyebrow: "2024 · MERN",
    title: "EventSync",
    metaTitle: "EventSync | Inamullah Shaikh",
    metaDescription: "MERN stack event management web app.",
    summary: "Web app to create and manage events with MongoDB and REST APIs.",
    highlights: [
      "Full MERN stack",
      "CRUD for events and listings",
      "REST API between React and MongoDB",
    ],
    stack: "React · Node.js · Express · MongoDB",
  },
  {
    projectId: "proj_gym_management",
    eyebrow: "2024 · Desktop · SQL",
    title: "GYM Management System",
    metaTitle: "GYM Management | Inamullah Shaikh",
    metaDescription: "C# desktop app with SQL Server backend.",
    summary: "Desktop app for members, billing, and attendance with a relational backend.",
    highlights: [
      "Normalized schema for members and payments",
      "C# UI connected to SQL Server",
      "Reports from relational queries",
    ],
    stack: "C# · SQL Server",
  },
  {
    projectId: "proj_torcs_bot",
    eyebrow: "2024 · ML",
    title: "TORCS Game Bot",
    metaTitle: "TORCS Bot | Inamullah Shaikh",
    metaDescription: "Neural network racing agent for the TORCS simulator.",
    summary: "Self-driving bot for TORCS trained with ANNs in Python.",
    highlights: [
      "Sensor input → steering/throttle output",
      "Iterative tuning on lap time",
      "No hand-coded track rules",
    ],
    stack: "Python · ANN",
  },
  {
    projectId: "proj_eventax",
    eyebrow: "2024 · JavaFX",
    title: "EventaX",
    metaTitle: "EventaX | Inamullah Shaikh",
    metaDescription: "JavaFX desktop event manager with design patterns.",
    summary: "Desktop event app using Singleton and Factory patterns in JavaFX.",
    highlights: [
      "JavaFX GUI for event CRUD",
      "Singleton for shared app state",
      "Factory for event types",
    ],
    stack: "Java · JavaFX",
  },
  {
    projectId: "proj_ipfs",
    eyebrow: "Systems · C++",
    title: "IPFS-Inspired File System",
    metaTitle: "IPFS File System | Inamullah Shaikh",
    metaDescription: "File system simulation with B-trees and hashmaps.",
    summary: "C++ file system sim using B-trees, hashmaps, and linked lists.",
    highlights: [
      "B-tree for ordered block access",
      "Hashmap for fast lookup",
      "Coursework focus on data structures",
    ],
    stack: "C++ · B-trees · Hashmaps",
  },
  {
    projectId: "proj_hospital_network",
    eyebrow: "Networking",
    title: "Hospital Network",
    metaTitle: "Hospital Network | Inamullah Shaikh",
    metaDescription: "Hospital VLAN and routing simulation in Packet Tracer.",
    summary: "Segmented hospital network with VLANs, routing, and security rules.",
    highlights: [
      "VLANs per department",
      "Routing between subnets",
      "Simulated in Cisco Packet Tracer",
    ],
    stack: "Packet Tracer · VLANs · Routing",
  },
  {
    projectId: "proj_other_games",
    eyebrow: "Games · Systems",
    title: "Games & Systems",
    metaTitle: "Games & Systems | Inamullah Shaikh",
    metaDescription: "C++ games, OS concepts, and assembly coursework.",
    summary: "Tetris, shooters, OS semaphores, and assembly exercises.",
    highlights: [
      "SFML game loops in C++",
      "Fork/semaphore OS labs",
      "MASM assembly work",
    ],
    stack: "C++ · SFML · Assembly",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return undefined;
  return caseStudies.find((cs) => cs.projectId === project.id);
}
