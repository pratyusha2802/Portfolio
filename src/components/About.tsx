import { profile } from "../data/portfolio";

function About() {
  return (
    <section className="section wrap" id="about">
      <div className="section__head">
        <h2 className="section__title rise">About</h2>
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
