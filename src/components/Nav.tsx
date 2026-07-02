import { NavLink } from "react-router-dom";
import CvDownloadLink from "./CvDownloadLink";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="page-shell flex items-center justify-between gap-4 py-3 sm:py-4"
      >
        <NavLink
          to="/"
          className="shrink-0 text-sm font-medium tracking-tight text-ink"
        >
          Inam
        </NavLink>
        <ul className="nav-scroll flex max-w-[70vw] gap-4 overflow-x-auto text-sm sm:max-w-none sm:gap-5">
          {links.map((link) => (
            <li key={link.to} className="shrink-0">
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-rust"
                    : "text-ink-faint whitespace-nowrap"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="shrink-0">
            <CvDownloadLink className="whitespace-nowrap text-ink-faint">CV</CvDownloadLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
