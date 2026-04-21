import Reveal from "./Reveal";
export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal>
          <div className="section-label">About</div>
          <div className="about-grid">
            <p className="about-bio">
              Final-year CS student at FAST-NUCES, Islamabad. I've built RAG systems, real-time CV APIs,
              and cloud microservices end-to-end. Currently AI Intern at Komatsu Pakistan Soft. I care
              about systems that work in production, not just notebooks.
            </p>
            <div className="about-facts">
              <div className="fact-row"><span className="k">University</span><span className="v">FAST-NUCES</span></div>
              <div className="fact-row"><span className="k">Location</span><span className="v">Islamabad, PK</span></div>
              <div className="fact-row"><span className="k">Current role</span><span className="v">AI Intern @ Komatsu</span></div>
              <div className="fact-row"><span className="k">Open to</span><span className="v">AI / ML roles</span></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
