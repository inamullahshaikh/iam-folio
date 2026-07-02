import { Link } from "react-router-dom";
import type { Project } from "../data/portfolio";

export default function ProjectRow({ project }: { project: Project }) {
  const hasMedia =
    (project.media?.docs?.length ?? 0) > 0 ||
    (project.media?.videos?.length ?? 0) > 0;

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="block py-4 active:bg-rust/5 sm:py-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-ink">{project.name}</h3>
            {project.isFyp && (
              <span className="font-mono text-[10px] text-rust sm:text-xs">FYP</span>
            )}
            {hasMedia && (
              <span className="font-mono text-[10px] text-ink-faint sm:text-xs">
                docs · video
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-ink-soft">{project.tagline}</p>
          <p className="mt-2 font-mono text-[11px] text-ink-faint sm:text-xs">
            {project.techLine}
          </p>
        </div>
        <span className="shrink-0 text-xs text-rust">→</span>
      </div>
    </Link>
  );
}
