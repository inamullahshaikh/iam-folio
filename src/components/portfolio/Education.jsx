import Reveal from "./Reveal";
import Timeline from "./Timeline";
import { useEffect, useState } from "react";
import { getEducation, SEED_EDUCATION } from "../../lib/api";

export default function Education() {
  const [items, setItems] = useState(SEED_EDUCATION);
  useEffect(() => {
    getEducation().then((rows) => setItems(Array.isArray(rows) && rows.length ? rows : SEED_EDUCATION));
  }, []);

  return (
    <section className="section" id="education">
      <div className="container">
        <Reveal>
          <div className="section-label">Education</div>
          <Timeline items={items} />
        </Reveal>
      </div>
    </section>
  );
}
