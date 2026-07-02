import Reveal from "./Reveal";
import { site } from "../../data/siteConfig";
import {
  MailIcon,
  PhoneIcon,
  LinkedinIcon,
  GithubIcon,
  CodeIcon,
  DownloadIcon,
} from "../icons/Icons";

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal>
          <h2>{site.contact_heading}</h2>
          <p className="contact-sub">{site.contact_sub}</p>
          <div className="contact-row">
            {site.email ? (
              <a href={`mailto:${site.email}`}>
                <MailIcon size={16} /> {site.email}
              </a>
            ) : null}
            {site.phone_tel && site.phone_display ? (
              <a href={`tel:${site.phone_tel}`}>
                <PhoneIcon size={16} /> {site.phone_display}
              </a>
            ) : null}
            {site.linkedin_url ? (
              <a href={site.linkedin_url} target="_blank" rel="noreferrer">
                <LinkedinIcon size={16} /> LinkedIn
              </a>
            ) : null}
            {site.github_url ? (
              <a href={site.github_url} target="_blank" rel="noreferrer">
                <GithubIcon size={16} /> GitHub
              </a>
            ) : null}
            {site.leetcode_url ? (
              <a href={site.leetcode_url} target="_blank" rel="noreferrer">
                <CodeIcon size={16} /> LeetCode
              </a>
            ) : null}
            {site.resume_url ? (
              <a href={site.resume_url} download>
                <DownloadIcon size={16} /> CV
              </a>
            ) : null}
          </div>
          <a href={`mailto:${site.email}`} className="btn btn-primary">
            <MailIcon size={16} /> Send email
          </a>
        </Reveal>
      </div>
    </section>
  );
}
