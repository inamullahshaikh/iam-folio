import { socialLinks } from "../data/portfolio";
import BrandIcon from "./BrandIcon";

export default function SocialIcons() {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {socialLinks.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target={link.id === "email" ? undefined : "_blank"}
            rel={link.id === "email" ? undefined : "noopener noreferrer"}
            aria-label={link.label}
            title={link.label}
            className="press inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-text-muted transition-colors hover:text-accent"
          >
            <BrandIcon id={link.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}
