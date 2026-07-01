import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import Timeline from "./Timeline";
import { getExperience } from "../../lib/api";
export default function Experience() {
  const [items, setItems] = useState(null);
  useEffect(() => { getExperience().then(setItems); }, []);
  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal>
          <div className="section-label">Experience</div>
          {items === null ? (
            <div className="sk" style={{ height: 120 }} />
          ) : (
            <Timeline items={items} />
          )}
        </Reveal>
      </div>
    </section>
  );
}
