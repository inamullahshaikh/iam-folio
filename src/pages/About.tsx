import { identity, education, skills, personal } from "../data/portfolio";
import { usePageMeta } from "../lib/usePageMeta";

export default function About() {
  usePageMeta({
    title: "About | Inamullah Shaikh",
    description:
      "Full-stack software engineer from FAST-NUCES: web, cloud, desktop, databases, and applied AI.",
  });

  return (
    <div className="mx-auto max-w-[720px] px-6 pt-16 pb-4">
      <h1 className="text-[2rem] font-semibold text-ink">About</h1>

      <div className="mt-8 space-y-5">
        {identity.longBio.map((para, i) => (
          <p key={i} className="text-[17px] leading-[1.7] text-ink-soft">
            {para}
          </p>
        ))}
      </div>

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="text-sm font-medium uppercase tracking-widest text-ink-faint">
          Education
        </h2>
        <ul className="mt-6 space-y-5">
          {education.map((e) => (
            <li
              key={e.degree}
              className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4"
            >
              <span className="font-mono text-sm text-ink-faint">
                {e.start}–{e.end}
              </span>
              <div>
                <p className="text-lg font-semibold text-ink">{e.degree}</p>
                <p className="text-ink-soft">
                  {e.institution} · {e.location}
                </p>
                <p className="font-mono text-[13px] text-ink-faint">{e.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="text-sm font-medium uppercase tracking-widest text-ink-faint">
          How I work / what I use
        </h2>
        <dl className="mt-6 space-y-4 text-[15px]">
          <SkillRow label="Languages" value={skills.languages.primary.concat(skills.languages.secondary).join(" · ")} />
          <SkillRow label="Frontend" value={skills.frontend.join(" · ")} />
          <SkillRow label="Backend" value={skills.backend.join(" · ")} />
          <SkillRow label="Data" value={skills.data.join(" · ")} />
          <SkillRow label="DevOps / cloud" value={skills.devopsCloud.join(" · ")} />
          <SkillRow label="AI / ML" value={skills.aiMl.join(" · ")} />
          <SkillRow label="Async / pipelines" value={skills.asyncPipelines.join(" · ")} />
          <SkillRow label="Tools" value={skills.tools.join(" · ")} />
          <SkillRow label="Competitive" value={`LeetCode, ${skills.leetcode}`} />
        </dl>
      </section>

      <section className="mt-16 border-t border-line pt-10">
        <p className="text-ink-soft">
          <span className="text-sm font-medium text-rust">Now: </span>
          {identity.nowLine}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a className="link-rust" href={personal.contact.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a className="link-rust" href={personal.contact.leetcode} target="_blank" rel="noreferrer noopener">
            LeetCode
          </a>
          <a className="link-rust" href={personal.contact.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}

function SkillRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <dt className="text-sm text-ink-faint">{label}</dt>
      <dd className="font-mono text-[13.5px] text-ink-soft">{value}</dd>
    </div>
  );
}
