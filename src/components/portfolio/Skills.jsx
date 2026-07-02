import Reveal from "./Reveal";
import { portfolioSkills } from "../../data/siteConfig";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <div className="section-label">Skills</div>
          <div className="skills-list">
            {portfolioSkills.map((row) => (
              <div className="skill-row" key={row.id}>
                <div className="skill-cat">{row.category}</div>
                <div className="skill-tags">
                  {row.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
