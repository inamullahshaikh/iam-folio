import Reveal from "./Reveal";
import { site } from "../../data/siteConfig";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal>
          <div className="section-label">About</div>
          <div className="about-grid">
            <p className="about-bio">{site.about_bio}</p>
            <div className="about-facts">
              {site.about_facts.map((row) => (
                <div className="fact-row" key={row.k}>
                  <span className="k">{row.k}</span>
                  <span className="v">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
