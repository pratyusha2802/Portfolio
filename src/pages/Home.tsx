import { useEffect } from "react";
import About from "../components/About";
import Background from "../components/Background";
import CaseStudies from "../components/CaseStudies";
import Currently from "../components/Currently";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import StickyQuote from "../components/StickyQuote";
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
      <StickyQuote source="Bangalore Food Bank case study">
        This hackathon is also how I ended up at JPMorgan Chase, which I didn't plan going in.
      </StickyQuote>
      <About />
      <Experience />
      <Background />
      <Footer />
    </>
  );
}

export default Home;
