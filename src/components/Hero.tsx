import { personal, oneLiner, ctaLine, heroCopy } from "../data/portfolio";
import { useReveal, revealSectionClass } from "../hooks/useReveal";
import TypewriterRole from "./TypewriterRole";
import SocialIcons from "./SocialIcons";
import ScrollIndicator from "./ScrollIndicator";
import SilkBackground from "./Silk/SilkBackground";

export default function Hero() {
  const ref = useReveal();

  return (
    <section
      id="home"
      ref={ref}
      className={`${revealSectionClass} scene-3d relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 pt-[calc(4.5rem+env(safe-area-inset-top))] pb-28 sm:px-6 sm:pb-24`}
    >
      <SilkBackground />
      <div className="cursor-depth-grid" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 glow-spot opacity-80 sm:opacity-40 surface-3d-float"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl surface-3d-float sm:h-64 sm:w-64"
        aria-hidden
      />
      <div className="reveal-content relative z-10 mx-auto w-full max-w-3xl scene-3d text-center">
        <div className="split-panel split-shell surface-3d surface-3d-medium surface-3d-card rounded-[2rem] border border-white/8 bg-white/[0.03] px-5 py-8 backdrop-blur-sm sm:px-8 sm:py-10">
          <span className="split-layer-down surface-3d-inner inline-block max-w-full rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium leading-snug tracking-wide text-text-muted sm:px-4 sm:text-xs">
          {ctaLine}
          </span>

          <p className="mt-6 text-sm text-text-muted sm:mt-8 sm:text-lg">{heroCopy.greeting}</p>
          <h1 className="split-heading mt-2 text-balance text-[clamp(1.75rem,7vw,3.75rem)] font-bold leading-tight tracking-tight text-text">
            <span className="split-heading-ghost" aria-hidden>
              {personal.full_name}
            </span>
            <span className="split-copy split-layer-up">{personal.full_name}</span>
          </h1>

          <TypewriterRole />

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-text-muted sm:mt-6 sm:text-lg">
            {oneLiner}
          </p>

          <div className="surface-3d-inner split-layer-up mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#projects"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] transition-all duration-200 hover:bg-accent-hover sm:w-auto"
            >
              {heroCopy.viewWork}
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-text transition-all duration-200 hover:border-accent/50 sm:w-auto"
            >
              {heroCopy.getInTouch}
            </a>
          </div>

          <div className="surface-3d-inner split-layer-down mt-10">
            <SocialIcons />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
