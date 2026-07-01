import { personal, identity } from "../data/portfolio";
import { usePageMeta } from "../lib/usePageMeta";
import CvDownloadLink from "../components/CvDownloadLink";

const links = [
  { label: "Email", value: personal.contact.email, href: `mailto:${personal.contact.email}`, external: false },
  { label: "Phone", value: personal.contact.phone, href: `tel:${personal.contact.phone.replace(/\s+/g, "")}`, external: false },
  { label: "GitHub", value: "github.com/inamullahshaikh", href: personal.contact.github, external: true },
  { label: "LinkedIn", value: "in/inam-ullah-shaikh", href: personal.contact.linkedin, external: true },
  { label: "LeetCode", value: "leetcode.com/u/inam_290", href: personal.contact.leetcode, external: true },
];

export default function Contact() {
  usePageMeta({
    title: "Contact | Inamullah Shaikh",
    description:
      "Get in touch with Inamullah Shaikh. Email, GitHub, and LinkedIn. Open to full-time roles, remote or Islamabad.",
  });

  return (
    <div className="mx-auto max-w-[720px] px-6 pt-16 pb-4">
      <h1 className="text-[2rem] font-semibold text-ink">Contact</h1>
      <p className="mt-4 max-w-[560px] text-[17px] leading-[1.7] text-ink-soft">
        Open to full-time roles, remote or Islamabad. Email is fastest. GitHub,
        LinkedIn, and my CV are below.
      </p>

      <p className="mt-6">
        <CvDownloadLink className="link-rust text-sm font-medium" />
      </p>

      <dl className="mt-10 divide-y divide-line border-y border-line">
        {links.map((l) => (
          <div
            key={l.label}
            className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-4"
          >
            <dt className="text-sm text-ink-faint">{l.label}</dt>
            <dd>
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer noopener" : undefined}
                className="link-rust font-mono text-[15px]"
              >
                {l.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 text-sm text-ink-faint">{identity.nowLine}</p>
    </div>
  );
}
