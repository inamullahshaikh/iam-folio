import { personal, oneLiner, heroCopy, stats } from "../data/portfolio";
import SocialIcons from "./SocialIcons";
import Magnetic from "./Magnetic";
import Chevron from "./Chevron";
import StatNumber from "./StatNumber";

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden px-4 pt-[calc(7rem+env(safe-area-inset-top))] pb-20 sm:px-6 md:pt-36">
      <div className="hero-aurora" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[980px] text-center">

        <h1 className="enter [--d:1] mt-4 text-5xl font-semibold leading-[1.05] tracking-[-0.015em] text-text text-balance sm:text-7xl md:text-[5rem]">
          {personal.full_name}
        </h1>
        <p className="enter [--d:2] mt-3 text-2xl font-semibold tracking-[-0.01em] text-text-muted md:text-[1.75rem]">
          {personal.primary_title_recommendation}
        </p>

        <p className="enter [--d:3] mx-auto mt-6 max-w-[40ch] text-lg leading-snug text-text-muted text-pretty md:text-xl">
          {oneLiner}
        </p>

        <div className="enter [--d:4] mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Magnetic>
            <a
              href="#projects"
              className="press inline-flex min-h-11 items-center rounded-full bg-button px-6 text-[17px] text-white hover:bg-button-hover"
            >
              {heroCopy.viewWork}
            </a>
          </Magnetic>
          <a href="#contact" className="group inline-flex items-center gap-1 text-[17px] text-accent hover:underline">
            {heroCopy.getInTouch}
            <Chevron />
          </a>
        </div>
      </div>

      <figure className="enter [--d:5] relative z-10 mx-auto mt-16 grid max-w-[1200px] gap-3 md:grid-cols-[1.4fr_1fr]">
        <div className="tile overflow-hidden">
          <img
            src="/inam-ullah-shaikh.jpeg"
            alt={`Portrait of ${personal.full_name}`}
            width={560}
            height={700}
            className="enter-clip aspect-[4/5] h-full w-full object-cover object-[center_18%] md:aspect-auto md:max-h-[560px]"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <dl className="grid gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="tile flex flex-col justify-end p-7 md:p-8">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-5xl font-semibold tracking-[-0.015em] tabular-nums text-text md:text-6xl">
                <StatNumber value={stat.value} suffix={stat.suffix} />
              </dd>
              <dd className="mt-2 text-base font-medium text-text-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </figure>

      <div className="relative z-10 mt-10 flex justify-center">
        <SocialIcons />
      </div>
    </section>
  );
}
