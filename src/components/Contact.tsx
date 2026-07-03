import { ctaLine, contactCopy, contactRows } from "../data/portfolio";
import { useReveal, revealSectionClass } from "../hooks/useReveal";
import SectionHeading from "./SectionHeading";

function ContactIcon({ id }: { id: (typeof contactRows)[number]["id"] }) {
  const className = "h-5 w-5";

  switch (id) {
    case "email":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 4h16v16H4z" />
          <path d="M4 8l8 5 8-5" />
        </svg>
      );
    case "phone":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.08 4.18 2 2 0 014.06 2h3a2 2 0 012 1.72c.12.9.33 1.79.63 2.65a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.43-1.18a2 2 0 012.11-.45c.86.3 1.75.51 2.65.63A2 2 0 0122 16.92z" />
        </svg>
      );
    case "github":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.061 2.061 0 01-2.063 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "leetcode":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 000 7.202 5.266 5.266 0 007.202 0l5.733-5.733a5.266 5.266 0 000-7.202 5.266 5.266 0 00-7.202 0l-1.03 1.03 3.854 3.854 4.126-4.126A6.484 6.484 0 0016.5 3c1.74 0 3.332.612 4.577 1.633L13.483 0z" />
        </svg>
      );
  }
}

export default function Contact() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className={`${revealSectionClass} section-pad relative border-t border-white/5`}
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 glow-spot opacity-45" aria-hidden />

      <div className="reveal-content relative mx-auto max-w-6xl">
        <SectionHeading
          title="Get In"
          highlight="Touch"
          subtitle={ctaLine}
          headingId="contact-heading"
        />

        <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-text-muted sm:text-base">
          {contactCopy.closingQuestion}
        </p>

        <div className="mx-auto max-w-3xl">
          <div className="card-surface p-4 sm:p-6">
            <div className="grid gap-3">
              {contactRows.map((row) => (
                <a
                  key={row.id}
                  href={row.href}
                  target={row.id === "email" || row.id === "phone" ? undefined : "_blank"}
                  rel={row.id === "email" || row.id === "phone" ? undefined : "noopener noreferrer"}
                  className="card-surface flex min-h-[3.25rem] items-center gap-3 bg-white/[0.02] px-3 py-3 transition-colors duration-200 hover:border-accent/35 sm:gap-4 sm:px-4 sm:py-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent">
                    <ContactIcon id={row.id} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-text">{row.label}</span>
                    <span className="block break-all text-sm text-text-muted">{row.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
