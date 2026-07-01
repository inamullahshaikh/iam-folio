import { Link } from "react-router-dom";
import {
  personal,
  identity,
  workAreas,
  stackStrip,
  heroProjects,
} from "../data/portfolio";
import { usePageMeta } from "../lib/usePageMeta";

const heroSummary: Record<string, { problem: string; solution: string }> = {
  proj_foresyte: {
    problem:
      "Manual proctoring is slow, inconsistent, and hard to scale across exams.",
    solution:
      "Full-stack monitoring app: YOLOv8 detection, FastAPI APIs, and a React dashboard with live alerts.",
  },
  proj_attendance_app: {
    problem:
      "Attendance infrastructure is painful to reproduce across environments when everything is set up by hand.",
    solution:
      "Microservices on AWS with Terraform, Ansible, Kubernetes, and CI/CD for provision, configure, and deploy.",
  },
  proj_eventsync: {
    problem:
      "Small teams need a web app to create and manage events without juggling spreadsheets or desktop-only tools.",
    solution:
      "MERN event management: MongoDB, Express APIs, React UI, and Node.js on the server.",
  },
  proj_startup_law_rag: {
    problem:
      "Founders dig through scattered legal documents, and generic LLM answers are not reliable for legal guidance.",
    solution:
      "Full-stack RAG app with async ingestion, semantic retrieval, and a React frontend for grounded legal answers.",
  },
};

const heroLinks = [
  { label: "GitHub", href: personal.contact.github },
  { label: "LinkedIn", href: personal.contact.linkedin },
  { label: "Email", href: `mailto:${personal.contact.email}` },
  { label: "LeetCode", href: personal.contact.leetcode },
];

export default function Home() {
  usePageMeta({
    title: `Inamullah Shaikh | ${personal.title}`,
    description:
      "Full-stack software engineer: web, cloud, desktop, databases, and applied AI. CS graduate from FAST-NUCES, Islamabad.",
  });

  return (
    <div className="mx-auto max-w-[1100px] px-6">
      <section className="max-w-[760px] pt-16 pb-4 sm:pt-24">
        <p className="font-mono text-sm text-ink-faint">
          Inamullah Shaikh · Islamabad · CS grad
        </p>
        <h1 className="mt-5 text-[2rem] font-semibold leading-[1.2] text-ink sm:text-[2.4rem]">
          I build software end to end, from interfaces to infrastructure.
        </h1>
        <p className="mt-6 max-w-[620px] text-lg text-ink-soft">
          {identity.shortBioFirstPerson}
        </p>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {heroLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer noopener"
              className="link-rust"
            >
              {l.label}
            </a>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-line pt-10">
        <p className="text-sm font-medium text-ink-faint">What I work on</p>
        <p className="mt-3 text-[17px] text-ink-soft">{workAreas}</p>
      </section>

      <section className="mt-20 border-t border-line pt-12">
        <h2 className="text-sm font-medium uppercase tracking-widest text-ink-faint">
          Selected work
        </h2>
        <p className="mt-2 max-w-[620px] text-sm text-ink-faint">
          AI, cloud, web, and full-stack projects from coursework and independent
          builds.
        </p>
        <div className="mt-8 flex flex-col gap-12">
          {heroProjects.map((project) => {
            const s = heroSummary[project.id];
            return (
              <article key={project.id} className="max-w-[720px]">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-2xl font-semibold text-ink">
                    {project.name}
                  </h3>
                  {project.isFyp && (
                    <span className="font-mono text-xs text-rust">
                      Final Year Project
                    </span>
                  )}
                </div>
                {s && (
                  <div className="mt-3 space-y-2 text-ink-soft">
                    <p>{s.problem}</p>
                    <p>{s.solution}</p>
                  </div>
                )}
                <p className="mt-3 font-mono text-[13px] text-ink-faint">
                  {project.techLine}
                </p>
                <Link
                  to={`/projects/${project.slug}`}
                  className="mt-3 inline-block text-sm text-rust hover:underline hover:underline-offset-4"
                >
                  Read case study →
                </Link>
              </article>
            );
          })}
        </div>
        <Link
          to="/projects"
          className="mt-10 inline-block text-sm text-rust hover:underline hover:underline-offset-4"
        >
          View all projects →
        </Link>
      </section>

      <section className="mt-20 border-t border-line pt-10">
        <p className="text-sm font-medium text-ink-faint">Languages & tools</p>
        <p className="mt-3 font-mono text-[15px] text-ink-soft">{stackStrip}</p>
      </section>

      <section className="mt-16 border-t border-line pt-10">
        <p className="max-w-[620px] text-ink-soft">
          <span className="text-sm font-medium text-rust">Now: </span>
          {identity.nowLine}
        </p>
      </section>
    </div>
  );
}
