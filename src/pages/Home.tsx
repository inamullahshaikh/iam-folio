import { Link } from "react-router-dom";
import { personal, identity, stackStrip, heroProjects } from "../data/portfolio";
import { usePageMeta } from "../lib/usePageMeta";
import CvDownloadLink from "../components/CvDownloadLink";
import PageShell from "../components/PageShell";

const heroLinks = [
  { label: "GitHub", href: personal.contact.github },
  { label: "LinkedIn", href: personal.contact.linkedin },
  { label: "Email", href: `mailto:${personal.contact.email}` },
  { label: "CV", href: personal.cv.href, download: personal.cv.downloadName },
];

export default function Home() {
  usePageMeta({
    title: `Inamullah Shaikh | ${personal.title}`,
    description: identity.oneLiner,
  });

  return (
    <PageShell>
      <p className="font-mono text-xs text-ink-faint sm:text-sm">
        Inamullah Shaikh · Islamabad
      </p>
      <h1 className="mt-3 text-[1.65rem] font-semibold leading-snug text-ink sm:mt-4 sm:text-[2.25rem]">
        Full-stack developer. Web, cloud, desktop, and AI.
      </h1>
      <p className="mt-4 max-w-xl text-[15px] text-ink-soft sm:text-base">
        {identity.shortBioFirstPerson}
      </p>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {heroLinks.map((l) =>
          l.download ? (
            <CvDownloadLink key={l.label}>{l.label}</CvDownloadLink>
          ) : (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer noopener"
              className="link-rust"
            >
              {l.label}
            </a>
          )
        )}
      </div>

      <section className="section-gap border-t border-line pt-8">
        <h2 className="text-xs font-medium uppercase tracking-widest text-ink-faint">
          Selected work
        </h2>
        <ul className="mt-5 divide-y divide-line">
          {heroProjects.map((project) => (
            <li key={project.id}>
              <Link
                to={`/projects/${project.slug}`}
                className="block py-4 transition-colors active:bg-rust/5 sm:py-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{project.name}</p>
                    <p className="mt-1 text-sm text-ink-soft">{project.tagline}</p>
                    <p className="mt-2 font-mono text-[11px] text-ink-faint sm:text-xs">
                      {project.techLine}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-rust sm:text-sm">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/projects" className="mt-4 inline-block text-sm text-rust">
          All projects →
        </Link>
      </section>

      <section className="section-gap border-t border-line pt-8">
        <p className="font-mono text-xs text-ink-faint sm:text-sm">{stackStrip}</p>
        <p className="mt-4 text-sm text-ink-soft">
          <span className="font-medium text-rust">Now: </span>
          {identity.nowLine}
        </p>
      </section>
    </PageShell>
  );
}
