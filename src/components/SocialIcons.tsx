import { socialLinks } from "../data/portfolio";

export default function SocialIcons() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {socialLinks.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target={link.id === "email" ? undefined : "_blank"}
            rel={link.id === "email" ? undefined : "noopener noreferrer"}
            className="press inline-flex text-sm font-normal text-accent underline-offset-4 hover:underline"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
