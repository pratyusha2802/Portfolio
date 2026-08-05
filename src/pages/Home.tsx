import { useEffect } from "react";
import About from "../components/About";
import Background from "../components/Background";
import CaseStudies from "../components/CaseStudies";
import Currently from "../components/Currently";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { profile } from "../data/portfolio";
import { useRiseAnimation } from "../lib/useRiseAnimation";

function Home() {
  useRiseAnimation();

  useEffect(() => {
    document.title = `${profile.name} — ${profile.role}`;
  }, []);

  return (
    <>
      <Hero />
      <Currently />
      <CaseStudies />
      <About />
      <Experience />
      <Background />
      <Footer />
    </>
  );
}

export default Home;
