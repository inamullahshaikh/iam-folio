import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon, CodeIcon, DownloadIcon, ArrowRightIcon } from "../icons/Icons";
const STACK = ["Python","FastAPI","RAG","YOLOv8","AWS","Kubernetes","React"];
export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1>AI Engineer.</h1>
        <h2>RAG pipelines, computer vision APIs, and the cloud infra that makes them real.</h2>
        <div className="mono-row">{STACK.map(s => <span key={s} className="tag">{s}</span>)}</div>
        <div className="cta-row">
          <a href="#projects" className="btn btn-primary">View Projects <ArrowRightIcon size={16} /></a>
          <a href="/resume.pdf" className="btn btn-outline" download><DownloadIcon size={16} /> Download Resume</a>
        </div>
        <div className="icon-row">
          <a href="https://github.com/inamshz" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
          <a href="https://linkedin.com/in/inamshz" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
          <a href="https://leetcode.com/inamshz" target="_blank" rel="noreferrer" aria-label="LeetCode"><CodeIcon /></a>
          <a href="mailto:inam@example.com" aria-label="Email"><MailIcon /></a>
          <a href="tel:+923000000000" aria-label="Phone"><PhoneIcon /></a>
        </div>
      </div>
    </section>
  );
}
