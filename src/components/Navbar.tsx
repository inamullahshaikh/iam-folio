import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ctaLine } from "../data/portfolio";
import { scrollToSection } from "../lib/scrollToSection";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSectionNav = (sectionId: string) => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: sectionId });
      return;
    }

    scrollToSection(sectionId);

    if (location.hash !== `#${sectionId}`) {
      navigate({ pathname: "/", hash: sectionId }, { replace: true });
    }
  };

  return (
    <header
      className={`safe-top fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-bg/95 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="relative mx-auto flex h-14 max-w-6xl items-center justify-center px-4 sm:h-16 sm:px-6"
        aria-label="Main navigation"
      >
        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleSectionNav(link.id)}
                className="rounded-lg px-2.5 py-2 text-sm text-text-muted transition-colors hover:bg-white/5 hover:text-text xl:px-3"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="absolute right-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-text sm:right-6 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="safe-bottom border-t border-white/5 bg-bg/98 px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => handleSectionNav(link.id)}
                  className="flex min-h-11 w-full items-center justify-center rounded-lg px-3 text-sm text-text-muted hover:bg-white/5 hover:text-text"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-2xl border border-accent/25 bg-accent/10 px-3 py-2.5 text-center text-xs leading-relaxed text-accent-cyan">
            {ctaLine}
          </p>
        </div>
      )}
    </header>
  );
}
