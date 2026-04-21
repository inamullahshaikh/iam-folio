import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Nav from "../components/portfolio/Nav";
import Footer from "../components/portfolio/Footer";
import { getProject, getProjects } from "../lib/api";
import { ArrowLeftIcon, ArrowUpRightIcon, GithubIcon } from "../components/icons/Icons";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetail,
});

function renderMarkdownLite(text: string) {
  // Minimal markdown: bullets and paragraphs.
  const lines = (text || "").split("\n");
  const out: any[] = [];
  let buffer: string[] = [];
  const flush = () => { if (buffer.length) { out.push(<ul key={out.length}>{buffer.map((b,i)=><li key={i}>{b}</li>)}</ul>); buffer = []; } };
  for (const ln of lines) {
    if (/^\s*[-*]\s+/.test(ln)) buffer.push(ln.replace(/^\s*[-*]\s+/, ""));
    else { flush(); if (ln.trim()) out.push(<p key={out.length}>{ln}</p>); }
  }
  flush();
  return out;
}

function ProjectDetail() {
  const { slug } = useParams({ from: "/projects/$slug" });
  const [project, setProject] = useState<any>(undefined);
  const [others, setOthers] = useState<any[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    getProject(slug).then(setProject);
    getProjects().then(list => {
      const pool = list.filter((p: any) => p.slug !== slug);
      setOthers([...pool].sort(() => Math.random() - 0.5).slice(0, 3));
    });
  }, [slug]);

  if (project === undefined) {
    return (
      <>
        <Nav />
        <div className="container-narrow" style={{ paddingTop: 64 }}>
          <div className="sk" style={{ height: 40, marginBottom: 24 }} />
          <div className="sk" style={{ height: 200 }} />
        </div>
      </>
    );
  }
  if (!project) {
    return (
      <>
        <Nav />
        <div className="container-narrow" style={{ paddingTop: 96 }}>
          <Link to="/" className="detail-back"><ArrowLeftIcon size={16}/> All Projects</Link>
          <h1>Project not found</h1>
        </div>
      </>
    );
  }

  const tb = project.tech_breakdown || {};
  const shots = project.screenshots || [];

  return (
    <>
      <Nav />
      <main className="container-narrow detail" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <Link to="/" className="detail-back"><ArrowLeftIcon size={16}/> All Projects</Link>
        <h1>{project.name}</h1>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, margin:"16px 0" }}>
          {(project.stack_tags || []).map((t: string) => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="detail-meta">
          <span>{project.start_date} — {project.end_date}</span>
          <span>·</span>
          <span>{project.category}</span>
        </div>
        {project.long_description && <p style={{ marginTop: 24, color: "#d4d4d4", fontSize: 17, lineHeight: 1.7 }}>{project.long_description}</p>}

        {project.what_it_does && (
          <div className="detail-section">
            <h2>What it does</h2>
            {renderMarkdownLite(project.what_it_does)}
          </div>
        )}

        {Object.keys(tb).length > 0 && (
          <div className="detail-section">
            <h2>Tech breakdown</h2>
            <div className="tech-breakdown">
              {Object.entries(tb).map(([k, v]) => (
                <div className="tech-row" key={k}><span className="k">{k}</span><span>{v as string}</span></div>
              ))}
            </div>
          </div>
        )}

        {project.challenges && (
          <div className="detail-section">
            <h2>Challenges &amp; Solutions</h2>
            {renderMarkdownLite(project.challenges)}
          </div>
        )}

        {(project.github_url || project.live_url) && (
          <div className="detail-section">
            <h2>Links</h2>
            <div style={{ display:"flex", gap: 12, flexWrap:"wrap" }}>
              {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-outline"><GithubIcon size={16}/> GitHub <ArrowUpRightIcon size={14}/></a>}
              {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-outline">Live Demo <ArrowUpRightIcon size={14}/></a>}
            </div>
          </div>
        )}

        {shots.length > 0 && (
          <div className="detail-section">
            <h2>Screenshots</h2>
            <div className="screenshots">
              {shots.map((src: string, i: number) => (
                <img key={i} src={src} alt={`Screenshot ${i+1}`} onClick={() => setLightbox(src)} />
              ))}
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div className="detail-section">
            <h2>Other projects</h2>
            <div className="other-projects">
              {others.map(o => (
                <Link key={o.id} to="/projects/$slug" params={{ slug: o.slug }}>
                  <span>{o.name}</span>
                  <ArrowUpRightIcon size={14} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="preview" />
        </div>
      )}
    </>
  );
}
