import { contactCopy, contactRows, personal } from "../data/portfolio";
import Magnetic from "./Magnetic";
import BrandIcon from "./BrandIcon";
import { useReveal, revealSectionClass } from "../hooks/useReveal";

export default function Contact() {
  const ref = useReveal<HTMLElement>();
  const links = contactRows.filter((row) => row.id !== "email");

  return (
    <section id="contact" ref={ref} className={`${revealSectionClass} section-pad`} aria-labelledby="contact-heading">
      <div className="reveal-content tile mx-auto max-w-[1200px] px-7 py-20 text-center md:py-28">
        <h2
          id="contact-heading"
          className="text-5xl font-semibold leading-[1.05] tracking-[-0.015em] text-text text-balance md:text-7xl"
        >
          Building something?
          <br />
          Let's talk.
        </h2>
        <p className="mx-auto mt-5 max-w-[44ch] text-lg leading-snug text-text-muted md:text-xl">
          {contactCopy.closingQuestion}
        </p>

        <div className="mt-8 flex justify-center">
          <Magnetic strength={0.15}>
            <a
              href={`mailto:${personal.contact.email}`}
              className="press inline-flex min-h-11 items-center rounded-full bg-button px-6 text-[17px] text-white hover:bg-button-hover"
            >
              Email me
            </a>
          </Magnetic>
        </div>
        <p className="mt-4 break-all text-sm text-text-muted">{personal.contact.email}</p>

        <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[17px]">
          {links.map((row) => (
            <li key={row.id}>
              <a
                href={row.href}
                target={row.id === "phone" ? undefined : "_blank"}
                rel={row.id === "phone" ? undefined : "noopener noreferrer"}
                aria-label={row.label}
                title={row.label}
                className="press group inline-flex min-h-11 items-center gap-1 text-accent hover:underline"
              >
                <BrandIcon id={row.id} className="h-6 w-6" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
