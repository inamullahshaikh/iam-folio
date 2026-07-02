import { identity, education, personal } from "../data/portfolio";
import { usePageMeta } from "../lib/usePageMeta";
import CvDownloadLink from "../components/CvDownloadLink";
import PageShell from "../components/PageShell";

export default function About() {
  usePageMeta({
    title: "About | Inamullah Shaikh",
    description: identity.oneLiner,
  });

  return (
    <PageShell narrow>
      <h1 className="text-2xl font-semibold text-ink">About</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
        {identity.aboutParagraph}
      </p>

      <section className="section-gap border-t border-line pt-8">
        <h2 className="text-xs font-medium uppercase tracking-widest text-ink-faint">
          Education
        </h2>
        <ul className="mt-4 space-y-4">
          {education.map((e) => (
            <li key={e.degree}>
              <p className="font-medium text-ink">{e.degree}</p>
              <p className="text-sm text-ink-soft">
                {e.institution} · {e.start}–{e.end}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-gap border-t border-line pt-8">
        <div className="flex flex-wrap gap-4 text-sm">
          <CvDownloadLink>CV</CvDownloadLink>
          <a className="link-rust" href={personal.contact.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a className="link-rust" href={personal.contact.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a className="link-rust" href={personal.contact.leetcode} target="_blank" rel="noreferrer noopener">
            LeetCode
          </a>
        </div>
      </section>
    </PageShell>
  );
}
