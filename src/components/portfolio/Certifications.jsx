import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { getCertifications } from "../../lib/api";
import { ArrowUpRightIcon } from "../icons/Icons";
export default function Certifications() {
  const [items, setItems] = useState(null);
  useEffect(() => { getCertifications().then(setItems); }, []);
  return (
    <section className="section" id="certifications">
      <div className="container">
        <Reveal>
          <div className="section-label">Certifications</div>
          {items === null ? <div className="sk" style={{ height: 200 }} /> : (
            <div className="cert-list">
              {items.map(c => (
                <div className="cert-row" key={c.id}>
                  <div className="cert-name">{c.name}{c.in_progress && <span style={{ color: "var(--muted)", fontSize: 12, marginLeft: 8 }}>(in progress)</span>}</div>
                  <div className="cert-issuer">{c.issuer}</div>
                  <div className="cert-year">{c.year}</div>
                  {c.url ? <a href={c.url} target="_blank" rel="noreferrer" className="cert-link" aria-label="Link"><ArrowUpRightIcon size={16} /></a> : <span />}
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
