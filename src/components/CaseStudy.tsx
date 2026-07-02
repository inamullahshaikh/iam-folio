import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function CaseStudyShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="prose-shell pb-8 pt-8 sm:pt-12">
      <Link
        to="/projects"
        className="text-sm text-ink-faint transition-colors hover:text-rust"
      >
        ← Projects
      </Link>
      <p className="mt-6 font-mono text-xs text-ink-faint sm:text-sm">{eyebrow}</p>
      <h1 className="mt-2 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
        {title}
      </h1>
      <div className="mt-6 sm:mt-8">{children}</div>
    </div>
  );
}

export function ProjectLinks({
  github,
  liveDemo,
}: {
  github?: string | null;
  liveDemo?: string | null;
}) {
  if (!github && !liveDemo) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noreferrer noopener"
          className="link-rust"
        >
          GitHub
        </a>
      )}
      {liveDemo && (
        <a
          href={liveDemo}
          target="_blank"
          rel="noreferrer noopener"
          className="link-rust"
        >
          Live demo
        </a>
      )}
    </div>
  );
}
