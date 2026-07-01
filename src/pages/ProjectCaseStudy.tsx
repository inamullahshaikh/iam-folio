import { useParams } from "react-router-dom";
import { CaseStudyShell, H2, P, Diagram, TechLine } from "../components/CaseStudy";
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
      {study.blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <H2 key={i}>{block.content as string}</H2>;
          case "p":
            return <P key={i}>{block.content as string}</P>;
          case "diagram":
            return <Diagram key={i}>{block.content as string}</Diagram>;
          case "tech":
            return (
              <TechLine key={i} label="Stack" value={block.content as string} />
            );
          case "ul":
            return (
              <ul key={i} className="mb-4 list-disc space-y-2 pl-5 text-ink-soft">
                {(block.content as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
      {project.links.github && (
        <p className="mt-8">
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="link-rust text-sm"
          >
            View on GitHub
          </a>
        </p>
      )}
      {project.links.live_demo && (
        <p className="mt-2">
          <a
            href={project.links.live_demo}
            target="_blank"
            rel="noreferrer noopener"
            className="link-rust text-sm"
          >
            Live demo
          </a>
        </p>
      )}
    </CaseStudyShell>
  );
}
