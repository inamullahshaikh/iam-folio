import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { getSkills } from "../../lib/api";

export default function Skills() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getSkills().then(setRows);
  }, []);
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <div className="section-label">Skills</div>
          <div className="skills-list">
            {rows.map((row) => (
              <div className="skill-row" key={row.id}>
                <div className="skill-cat">{row.category}</div>
                <div className="skill-tags">{(row.tags || []).map((t, i) => <span key={`${row.id}-${i}-${t}`} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
