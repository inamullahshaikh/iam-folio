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
    <div className="mx-auto max-w-[720px] px-6 pt-14 pb-4">
      <Link
        to="/projects"
        className="text-sm text-ink-faint transition-colors hover:text-rust"
      >
        ← Projects
      </Link>
      <p className="mt-8 font-mono text-sm text-ink-faint">{eyebrow}</p>
      <h1 className="mt-3 text-[2rem] font-semibold leading-tight text-ink sm:text-[2.3rem]">
        {title}
      </h1>
      <div className="fade-section mt-10">{children}</div>
      <div className="mt-16 border-t border-line pt-6">
        <Link
          to="/projects"
          className="text-sm text-rust hover:underline hover:underline-offset-4"
        >
          ← Back to all projects
        </Link>
      </div>
    </div>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 mb-3 text-xl font-semibold text-ink">{children}</h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-[17px] leading-[1.7] text-ink-soft">{children}</p>;
}

export function Diagram({ children }: { children: string }) {
  return (
    <pre className="my-6 overflow-x-auto rounded border border-line bg-[color-mix(in_srgb,var(--color-ink)_3%,transparent)] p-5 font-mono text-[12.5px] leading-[1.55] text-ink">
      {children}
    </pre>
  );
}

export function TechLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="my-4 font-mono text-[13.5px] text-ink-faint">
      <span className="text-ink-soft">{label}: </span>
      {value}
    </p>
  );
}
