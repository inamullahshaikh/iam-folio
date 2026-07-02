import Reveal from "./Reveal";
import Timeline from "./Timeline";
import { portfolioExperience } from "../../data/siteConfig";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal>
          <div className="section-label">Experience</div>
          <Timeline items={portfolioExperience} />
        </Reveal>
      </div>
    </section>
  );
}
