import Reveal from "./Reveal";
import Timeline from "./Timeline";
import { portfolioEducation } from "../../data/siteConfig";

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <Reveal>
          <div className="section-label">Education</div>
          <Timeline items={portfolioEducation} />
        </Reveal>
      </div>
    </section>
  );
}
