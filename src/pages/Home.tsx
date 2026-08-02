import { useEffect } from "react";
import Background from "../components/Background";
import Currently from "../components/Currently";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Principles from "../components/Principles";
import SelectedWork from "../components/SelectedWork";
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
      <Principles />
      <SelectedWork />
      <Experience />
      <Currently />
      <Background />
      <Footer />
    </>
  );
}

export default Home;
