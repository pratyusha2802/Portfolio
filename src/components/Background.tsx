import { community, education, recognition } from "../data/portfolio";

function Background() {
  return (
    <section className="section wrap" id="background">
      <div className="section__head">
        <h2 className="section__title rise">Background</h2>
      </div>

      <ul className="background-list rise">
        <li>
          {education.degree} — {education.institution} ({education.years})
        </li>
        {recognition.map((item) => (
          <li key={item}>{item}</li>
        ))}
        {community.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default Background;
