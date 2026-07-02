import { site } from "../../data/siteConfig";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>{site.footer_text}</span>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
