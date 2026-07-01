import { personal } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center gap-x-5 gap-y-2 px-6 py-8 text-sm text-ink-faint">
        <span>© 2026 Inamullah Shaikh</span>
        <a
          className="transition-colors hover:text-rust"
          href={personal.contact.github}
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub
        </a>
        <a
          className="transition-colors hover:text-rust"
          href={personal.contact.linkedin}
          target="_blank"
          rel="noreferrer noopener"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
