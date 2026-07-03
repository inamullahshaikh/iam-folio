import { footerCopy, personal } from "../data/portfolio";
import { useReveal, revealSectionClass } from "../hooks/useReveal";

const footerLinks = [
  { label: "GitHub", href: personal.contact.github },
  { label: "LinkedIn", href: personal.contact.linkedin },
] as const;

export default function Footer() {
  const ref = useReveal<HTMLElement>(0.2);

  return (
    <footer
      ref={ref}
      className={`${revealSectionClass} safe-bottom border-t border-white/5 px-4 py-6 sm:px-6`}
    >
      <div className="reveal-content mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-text-muted sm:flex-row">
        <div className="text-center sm:text-left">
          <p>{`© 2026 ${personal.full_name}`}</p>
          <p className="mt-1 text-xs text-text-muted/80">{footerCopy.tagline}</p>
        </div>
        <div className="flex items-center gap-4">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
