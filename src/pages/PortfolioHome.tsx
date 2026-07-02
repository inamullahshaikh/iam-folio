import Nav from "../components/portfolio/Nav";
import Hero from "../components/portfolio/Hero";
import About from "../components/portfolio/About";
import Skills from "../components/portfolio/Skills";
import Experience from "../components/portfolio/Experience";
import Education from "../components/portfolio/Education";
import Projects from "../components/portfolio/Projects";
import Contact from "../components/portfolio/Contact";
import Footer from "../components/portfolio/Footer";
import { usePageMeta } from "../lib/usePageMeta";
import { site } from "../data/siteConfig";
import { personal } from "../data/portfolio";

export default function PortfolioHome() {
  usePageMeta({
    title: `${personal.fullName} | ${personal.title}`,
    description: site.hero_subtitle,
  });

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
