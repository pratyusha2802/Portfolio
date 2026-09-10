import { community, education, recognition } from "../data/portfolio";
import { splitLetters } from "../lib/splitLetters";

function Background() {
  return (
    <section className="section wrap" id="background">
      <div className="section__head">
        <h2 className="section__title rise">{splitLetters("Background", "bg-title")}</h2>
      </div>

      <ul className="background-list rise">
        <li>
          {education.degree} · {education.institution} ({education.years})
          {education.note ? ` · ${education.note}` : ""}
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
