import Reveal from "./Reveal";

export default function About({ site }) {
  const facts = site?.about_facts?.length ? site.about_facts : [];
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal>
          <div className="section-label">About</div>
          <div className="about-grid">
            <p className="about-bio">{site?.about_bio || ""}</p>
            <div className="about-facts">
              {facts.map((row, i) => (
                <div className="fact-row" key={`${row.k}-${i}`}>
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
