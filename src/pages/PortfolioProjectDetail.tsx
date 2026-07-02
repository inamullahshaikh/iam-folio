import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import Nav from "../components/portfolio/Nav";
import Footer from "../components/portfolio/Footer";
import { getProjectBySlug, portfolioProjects } from "../data/siteConfig";
import { usePageMeta } from "../lib/usePageMeta";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  GithubIcon,
} from "../components/icons/Icons";

function youtubeEmbed(url: string) {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function isVideoFile(url: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

function renderBullets(text: string) {
  const lines = (text || "").split("\n");
  const bullets: string[] = [];
  const paras: string[] = [];
  for (const ln of lines) {
    if (/^\s*[-*]\s+/.test(ln)) bullets.push(ln.replace(/^\s*[-*]\s+/, ""));
    else if (ln.trim()) paras.push(ln);
  }
  return (
    <>
      {paras.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {bullets.length > 0 && (
        <ul>
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function PortfolioProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  const others = useMemo(
    () => portfolioProjects.filter((p) => p.slug !== slug).slice(0, 3),
    [slug]
  );

  usePageMeta({
    title: project ? `${project.name} | Inamullah Shaikh` : "Project",
    description: project?.short_description,
  });

  if (!project) {
    return (
      <>
        <Nav />
        <div className="container-narrow" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <Link to="/" className="detail-back">
            <ArrowLeftIcon size={16} /> All Projects
          </Link>
          <h1>Project not found</h1>
        </div>
        <Footer />
      </>
    );
  }

  const tb = project.tech_breakdown || {};
  const videos = project.videos || [];
  const docs = project.docs || [];

  return (
    <>
      <Nav />
      <main
        className="container-narrow detail"
        style={{ paddingTop: 48, paddingBottom: 64 }}
      >
        <Link to="/#projects" className="detail-back">
          <ArrowLeftIcon size={16} /> All Projects
        </Link>
        <h1>{project.name}</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "16px 0" }}>
          {(project.stack_tags || []).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className="detail-meta">
          {project.start_date && (
            <span>
              {project.start_date}
              {project.end_date ? ` — ${project.end_date}` : ""}
            </span>
          )}
          <span>·</span>
          <span>{project.category}</span>
        </div>

        {project.long_description && (
          <p style={{ marginTop: 20, color: "#d4d4d4", fontSize: 16, lineHeight: 1.65 }}>
            {project.long_description}
          </p>
        )}

        {project.what_it_does && (
          <div className="detail-section">
            <h2>Highlights</h2>
            {renderBullets(project.what_it_does)}
          </div>
        )}

        {Object.keys(tb).length > 0 && (
          <div className="detail-section">
            <h2>Tech</h2>
            {Object.entries(tb).map(([k, v]) => (
              <p key={k} style={{ marginBottom: 8 }}>
                <span style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
                  {k}:{" "}
                </span>
                {v as string}
              </p>
            ))}
          </div>
        )}

        {videos.length > 0 && (
          <div className="detail-section">
            <h2>Videos</h2>
            <div className="media-grid">
              {videos.map((video) => {
                const embed = youtubeEmbed(video.url);
                return (
                  <div key={video.url}>
                    <p style={{ marginBottom: 8, fontSize: 14, color: "var(--muted)" }}>
                      {video.label}
                    </p>
                    {embed ? (
                      <div className="video-wrap">
                        <iframe src={embed} title={video.label} allowFullScreen />
                      </div>
                    ) : isVideoFile(video.url) ? (
                      <div className="video-wrap">
                        <video controls playsInline preload="metadata" src={video.url} />
                      </div>
                    ) : (
                      <a href={video.url} target="_blank" rel="noreferrer" className="detail-back">
                        {video.label} <ArrowUpRightIcon size={14} />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {docs.length > 0 && (
          <div className="detail-section">
            <h2>Documentation</h2>
            <div className="doc-list">
              {docs.map((doc) => (
                <a key={doc.url} href={doc.url} target="_blank" rel="noreferrer">
                  {doc.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {(project.github_url || project.live_url) && (
          <div className="detail-section">
            <h2>Links</h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  <GithubIcon size={16} /> GitHub <ArrowUpRightIcon size={14} />
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  Live Demo <ArrowUpRightIcon size={14} />
                </a>
              )}
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div className="detail-section">
            <h2>Other projects</h2>
            <div className="other-projects">
              {others.map((o) => (
                <Link key={o.id} to={`/projects/${o.slug}`}>
                  <span>{o.name}</span>
                  <ArrowUpRightIcon size={14} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
