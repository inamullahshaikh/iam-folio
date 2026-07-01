import { Link } from "react-router-dom";
import type { Project } from "../data/portfolio";

export default function ProjectRow({ project }: { project: Project }) {
  const to = `/projects/${project.slug}`;

  return (
    <Link
      to={to}
      className="group block border-b border-line transition-colors hover:bg-[color-mix(in_srgb,var(--color-rust)_5%,transparent)]"
    >
      <div className="grid gap-2 py-7 sm:grid-cols-[1fr_auto] sm:items-baseline">
        <div className="max-w-[640px]">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h3 className="text-xl font-semibold text-ink">{project.name}</h3>
            {project.isFyp && (
              <span className="font-mono text-xs text-rust">Final Year Project</span>
            )}
          </div>
          <p className="mt-1 text-ink-soft">{project.tagline}</p>
          <p className="mt-2 font-mono text-[13px] text-ink-faint">
            {project.techLine}
          </p>
        </div>
        <div className="text-sm text-rust sm:text-right">Read case study →</div>
      </div>
    </Link>
  );
}
