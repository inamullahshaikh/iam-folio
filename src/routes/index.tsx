import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import { getSite, SEED_SITE } from "../lib/api";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [site, setSite] = useState(SEED_SITE);
  useEffect(() => {
    getSite().then(setSite);
  }, []);
  return (
    <>
      <Nav />
      <main>
        <Hero site={site} />
        <About site={site} />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <Contact site={site} />
      </main>
      <Footer site={site} />
    </>
  );
}
