import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import Reveal from "./Reveal";
import { getProjects } from "../../lib/api";
import { GithubIcon } from "../icons/Icons";

const ORDER = ["AI & RAG SYSTEMS","COMPUTER VISION & ML","DEVOPS & INFRA","WEB & SOFTWARE","ACADEMIC"];

export default function Projects() {
  const [items, setItems] = useState(null);
  useEffect(() => { getProjects().then(setItems); }, []);
  const grouped = useMemo(() => {
    if (!items) return null;
    const g = {};
    for (const p of items) {
      if (p.published === false) continue;
      const c = p.category || "OTHER";
      (g[c] = g[c] || []).push(p);
    }
    return g;
  }, [items]);

  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal>
          <div className="section-label">Projects</div>
          {!grouped ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[1,2,3,4].map(i => <div key={i} className="sk" style={{ height: 56 }} />)}
            </div>
          ) : (
            <>
              {ORDER.filter(c => grouped[c]).concat(Object.keys(grouped).filter(c => !ORDER.includes(c))).map(cat => (
                <div key={cat}>
                  <div className="proj-cat-header"><h3>{cat}</h3><hr /></div>
                  <div className="proj-list">
                    {grouped[cat].map(p => (
                      <Link key={p.id} to="/projects/$slug" params={{ slug: p.slug }} className="proj-row">
                        <div className="proj-name-col">
                          <div className="proj-name">{p.name}</div>
                          <div className="proj-desc">{p.short_description}</div>
                        </div>
                        <div className="proj-meta">
                          <div className="proj-tags">{(p.stack_tags || []).slice(0, 5).map(t => <span key={t} className="tag">{t}</span>)}</div>
                          <div className="proj-date">{p.start_date} — {p.end_date}</div>
                        </div>
                        <div className="proj-actions">
                          {p.github_url && (
                            <a href={p.github_url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} aria-label="GitHub"><GithubIcon size={18} /></a>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
