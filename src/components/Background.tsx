import { community, education, recognition, writing } from "../data/portfolio";

function Background() {
  return (
    <section className="section wrap" id="background">
      <div className="section__head">
        <h2 className="section__title rise">Background</h2>
      </div>

      <div className="background__grid">
        <div className="card rise">
          <p className="card__k">Education</p>
          <p className="card__v">
            {education.degree}
            <br />
            {education.institution}
            <br />
            {education.years}
            {education.note ? ` · ${education.note}` : ""}
          </p>
        </div>

        <div className="card rise">
          <p className="card__k">Recognition</p>
          <ul className="card__list">
            {recognition.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="card rise">
          <p className="card__k">Community</p>
          <ul className="card__list">
            {community.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="card rise">
          <p className="card__k">Writing</p>
          <p className="card__v">On {writing.platform}, mostly about:</p>
          <div className="work-card__tools">
            {writing.topics.map((topic) => (
              <span className="tool-chip" key={topic}>
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Background;
