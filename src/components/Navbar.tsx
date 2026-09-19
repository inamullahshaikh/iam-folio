import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { personal } from "../data/portfolio";
import { scrollToSection } from "../lib/scrollToSection";

const navLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Toolbox" },
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
      className={`safe-top fixed inset-x-0 top-0 z-50 transition-[background-color] duration-300 ease-[ease] ${
        scrolled || menuOpen ? "material" : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-11 max-w-[1024px] items-center justify-between px-4 sm:px-6"
        aria-label="Main navigation"
      >
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            if (location.pathname !== "/") navigate("/");
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-sm font-semibold text-text"
        >
          {personal.full_name}
        </button>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleSectionNav(link.id)}
                className="text-xs text-text/80 transition-colors hover:text-text"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-text md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="relative block h-3 w-[18px]" aria-hidden>
            <span className={`hamburger-line top-0 ${menuOpen ? "translate-y-[5.5px] rotate-45" : ""}`} />
            <span className={`hamburger-line bottom-0 ${menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className="safe-bottom h-[calc(100dvh-2.75rem)] px-8 pt-6 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <ul>
              {navLinks.map((link, i) => (
                <li key={link.id} className="menu-item" style={{ "--d": i } as React.CSSProperties}>
                  <button
                    type="button"
                    onClick={() => handleSectionNav(link.id)}
                    className="flex w-full items-baseline gap-4 py-2 text-left text-[28px] font-semibold tracking-tight text-text"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
