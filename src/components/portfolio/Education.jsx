import Reveal from "./Reveal";
import Timeline from "./Timeline";
const EDU = [{ id:"edu1", company:"FAST-NUCES", role:"BS Computer Science", location:"Islamabad", start_date:"Aug 2022", end_date:"Jun 2026", bullets:[] }];
export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <Reveal>
          <div className="section-label">Education</div>
          <Timeline items={EDU} />
        </Reveal>
      </div>
    </section>
  );
}
