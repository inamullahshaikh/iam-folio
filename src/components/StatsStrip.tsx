import { stats } from "../data/portfolio";
import { useReveal } from "../hooks/useReveal";

export default function StatsStrip() {
  const ref = useReveal<HTMLElement>(0.2);

  return (
    <section
      id="stats"
      ref={ref}
      className="reveal-section border-y border-white/5 bg-bg-elevated/50 px-4 py-12 sm:px-6 sm:py-14"
      aria-label="Key stats"
    >
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-4xl font-bold tracking-tight text-gradient-violet sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
