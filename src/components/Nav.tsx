import { NavLink } from "react-router-dom";
import CvDownloadLink from "./CvDownloadLink";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="border-b border-line">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1100px] flex-col gap-3 px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
      >
        <NavLink
          to="/"
          className="text-sm tracking-tight text-ink hover:text-rust"
        >
          inamullah shaikh
        </NavLink>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive
                    ? "text-rust"
                    : "text-ink-faint transition-colors hover:text-ink"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <CvDownloadLink className="text-ink-faint transition-colors hover:text-rust">
              CV
            </CvDownloadLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
