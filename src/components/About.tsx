import { profile } from "../data/portfolio";
import { splitLetters } from "../lib/splitLetters";

function About() {
  return (
    <section className="section wrap" id="about">
      <div className="section__head">
        <h2 className="section__title rise">{splitLetters("About", "about-title")}</h2>
      </div>

      <div className="about__bio rise">
        {profile.about.map((paragraph, index) => (
          // static, never-reordered content — index as key is fine here
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export default About;
