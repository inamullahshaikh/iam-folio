import { useParams } from "react-router-dom";
import { CaseStudyShell, ProjectLinks } from "../components/CaseStudy";
import ProjectMedia from "../components/ProjectMedia";
import { getCaseStudyBySlug } from "../data/caseStudies";
import { projects } from "../data/portfolio";
import { usePageMeta } from "../lib/usePageMeta";
import NotFound from "./NotFound";

export default function ProjectCaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;
  const project = study
    ? projects.find((p) => p.id === study.projectId)
    : undefined;

  usePageMeta({
    title: study?.metaTitle ?? "Project | Inamullah Shaikh",
    description: study?.metaDescription,
  });

  if (!study || !project) {
    return <NotFound />;
  }

  return (
    <CaseStudyShell eyebrow={study.eyebrow} title={study.title}>
      <p className="text-[15px] leading-relaxed text-ink-soft sm:text-base">
        {study.summary}
      </p>

      <ul className="mt-5 list-disc space-y-1.5 pl-4 text-sm text-ink-soft sm:text-[15px]">
        {study.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {study.diagram && (
        <p className="mt-5 rounded-lg border border-line bg-ink/[0.03] px-3 py-2 font-mono text-xs text-ink-faint sm:text-sm">
          {study.diagram}
        </p>
      )}

      <p className="mt-5 font-mono text-xs text-ink-faint sm:text-sm">
        {study.stack}
      </p>

      <ProjectLinks
        github={project.links.github}
        liveDemo={project.links.live_demo}
      />

      <ProjectMedia
        docs={project.media?.docs}
        videos={project.media?.videos}
      />
    </CaseStudyShell>
  );
}
