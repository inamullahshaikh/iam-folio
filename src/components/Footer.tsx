import { personal } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="page-shell flex flex-wrap items-center gap-x-4 gap-y-1 py-6 text-xs text-ink-faint sm:text-sm">
        <span>© 2026 {personal.fullName}</span>
        <a className="hover:text-rust" href={personal.contact.github} target="_blank" rel="noreferrer noopener">
          GitHub
        </a>
        <a className="hover:text-rust" href={personal.contact.linkedin} target="_blank" rel="noreferrer noopener">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
