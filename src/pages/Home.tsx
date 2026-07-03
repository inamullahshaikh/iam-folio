import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsStrip from "../components/StatsStrip";
import About from "../components/About";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CursorBackground from "../components/CursorBackground";
import { scrollToSection } from "../lib/scrollToSection";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.replace(/^#/, "");
    const scroll = () => scrollToSection(sectionId);

    requestAnimationFrame(() => requestAnimationFrame(scroll));
  }, [location.hash]);

  return (
    <div className="relative isolate">
      <CursorBackground />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <StatsStrip />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
