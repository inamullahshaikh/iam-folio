import { createFileRoute } from "@tanstack/react-router";
import Nav from "../components/portfolio/Nav";
import Hero from "../components/portfolio/Hero";
import About from "../components/portfolio/About";
import Skills from "../components/portfolio/Skills";
import Experience from "../components/portfolio/Experience";
import Education from "../components/portfolio/Education";
import Certifications from "../components/portfolio/Certifications";
import Projects from "../components/portfolio/Projects";
import Contact from "../components/portfolio/Contact";
import Footer from "../components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
