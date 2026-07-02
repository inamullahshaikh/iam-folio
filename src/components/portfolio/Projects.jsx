import { useMemo } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { portfolioProjects, PROJECT_CATEGORIES } from "../../data/siteConfig";
import { GithubIcon } from "../icons/Icons";

export default function Projects() {
  const grouped = useMemo(() => {
    const g = {};
    for (const p of portfolioProjects) {
      const c = p.category || "OTHER";
      (g[c] = g[c] || []).push(p);
    }
    return g;
  }, []);

  const order = PROJECT_CATEGORIES.filter((c) => grouped[c]).concat(
    Object.keys(grouped).filter((c) => !PROJECT_CATEGORIES.includes(c))
  );

  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal>
          <div className="section-label">Projects</div>
          {order.map((cat) => (
            <div key={cat}>
              <div className="proj-cat-header">
                <h3>{cat}</h3>
                <hr />
              </div>
              <div className="proj-list">
                {grouped[cat].map((p) => (
                  <Link key={p.id} to={`/projects/${p.slug}`} className="proj-row">
                    <div>
                      <div className="proj-name">
                        {p.name}
                        {p.is_fyp ? (
                          <span style={{ color: "var(--accent)", fontSize: 11, marginLeft: 8 }}>
                            FYP
                          </span>
                        ) : null}
                      </div>
                      <div className="proj-desc">{p.short_description}</div>
                    </div>
                    <div>
                      <div className="proj-tags">
                        {(p.stack_tags || []).slice(0, 5).map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="proj-date">
                        {p.start_date}
                        {p.end_date ? ` — ${p.end_date}` : ""}
                      </div>
                    </div>
                    <div className="proj-actions">
                      {p.github_url ? (
                        <span
                          role="link"
                          tabIndex={0}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(p.github_url, "_blank");
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(p.github_url, "_blank");
                            }
                          }}
                          aria-label="GitHub"
                        >
                          <GithubIcon size={18} />
                        </span>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
