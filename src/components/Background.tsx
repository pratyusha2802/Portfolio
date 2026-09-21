import { community, education, recognition, schooling } from "../data/portfolio";
import { splitLetters } from "../lib/splitLetters";

function Background() {
  return (
    <section className="section wrap" id="background">
      <div className="section__head">
        <h2 className="section__title rise">{splitLetters("Background", "bg-title")}</h2>
      </div>

      <ul className="background-list rise">
        <li className="background-education">
          <img
            className="background-education__photo"
            src={`${import.meta.env.BASE_URL}${education.photo}`}
            alt="Pratyusha at her MANIT convocation, holding her degree"
          />
          <div className="background-education__text">
            <strong className="background-education__degree">{education.degree}</strong>
            <span className="background-education__institution">{education.institution}</span>
            <span className="background-education__meta">
              {education.years}
              {education.note ? ` · ${education.note}` : ""}
            </span>
            {education.coursework.length > 0 && (
              <div className="work-card__tools background-education__coursework">
                {education.coursework.map((course) => (
                  <span className="tool-chip" key={course}>
                    {course}
                  </span>
                ))}
              </div>
            )}
            {recognition.length > 0 && (
              <ul className="background-education__recognition">
                {recognition.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
        {schooling.map((entry) => (
          <li className="background-education background-education--compact" key={entry.level}>
            <div className="background-education__text">
              <strong className="background-education__degree">{entry.level}</strong>
              <span className="background-education__institution">{entry.institution}</span>
              <span className="background-education__meta">
                {entry.years} · {entry.note}
              </span>
            </div>
          </li>
        ))}
        {community.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default Background;
