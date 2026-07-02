import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  CodeIcon,
  DownloadIcon,
  ArrowRightIcon,
} from "../icons/Icons";
import { site } from "../../data/siteConfig";

export default function Hero() {
  const stack = site.hero_stack_tags;
  const resume = site.resume_url?.trim();

  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden />
      <div className="container">
        <h1>{site.hero_title}</h1>
        <h2>{site.hero_subtitle}</h2>
        <div className="mono-row">
          {stack.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
        <div className="cta-row">
          <a href="#projects" className="btn btn-primary">
            View Projects <ArrowRightIcon size={16} />
          </a>
          {resume ? (
            <a
              href={resume}
              className="btn btn-outline"
              target="_blank"
              rel="noreferrer"
              download={site.resume_url.includes(".pdf") ? "CV.pdf" : undefined}
            >
              <DownloadIcon size={16} /> Download CV
            </a>
          ) : null}
        </div>
        <div className="icon-row">
          {site.github_url ? (
            <a href={site.github_url} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon />
            </a>
          ) : null}
          {site.linkedin_url ? (
            <a href={site.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
          ) : null}
          {site.leetcode_url ? (
            <a href={site.leetcode_url} target="_blank" rel="noreferrer" aria-label="LeetCode">
              <CodeIcon />
            </a>
          ) : null}
          {site.email ? (
            <a href={`mailto:${site.email}`} aria-label="Email">
              <MailIcon />
            </a>
          ) : null}
          {site.phone_tel ? (
            <a href={`tel:${site.phone_tel}`} aria-label="Phone">
              <PhoneIcon />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
