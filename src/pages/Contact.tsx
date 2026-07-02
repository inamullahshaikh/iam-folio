import { personal, identity } from "../data/portfolio";
import { usePageMeta } from "../lib/usePageMeta";
import CvDownloadLink from "../components/CvDownloadLink";
import PageShell from "../components/PageShell";

const links = [
  { label: "Email", value: personal.contact.email, href: `mailto:${personal.contact.email}` },
  { label: "Phone", value: personal.contact.phone, href: `tel:${personal.contact.phone.replace(/\s+/g, "")}` },
  { label: "GitHub", value: "GitHub", href: personal.contact.github, external: true },
  { label: "LinkedIn", value: "LinkedIn", href: personal.contact.linkedin, external: true },
];

export default function Contact() {
  usePageMeta({
    title: "Contact | Inamullah Shaikh",
    description: "Email, GitHub, LinkedIn, and CV.",
  });

  return (
    <PageShell narrow>
      <h1 className="text-2xl font-semibold text-ink">Contact</h1>
      <p className="mt-3 text-sm text-ink-soft">{identity.nowLine}</p>

      <CvDownloadLink className="mt-5 inline-block text-sm font-medium">
        Download CV
      </CvDownloadLink>

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {links.map((l) => (
          <li key={l.label} className="flex items-center justify-between gap-4 py-3 text-sm">
            <span className="text-ink-faint">{l.label}</span>
            <a
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer noopener" : undefined}
              className="link-rust truncate font-mono text-xs sm:text-sm"
            >
              {l.value}
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
