import { experience } from "../data/portfolio";

function Experience() {
  return (
    <section className="section wrap" id="experience">
      <div className="section__head">
        <h2 className="section__title rise">Experience</h2>
      </div>
      <div className="timeline">
        {experience.map((role) => (
          <div className="timeline-item rise" key={`${role.company}-${role.title}-${role.start}`}>
            <div className="timeline-item__meta">
              <span className="timeline-item__range">
                {role.start} – {role.end}
              </span>
              <span className="timeline-item__location">{role.location}</span>
            </div>
            <div className="timeline-item__body">
              <h3 className="timeline-item__title">{role.title}</h3>
              <p className="timeline-item__company">{role.company}</p>
              <p className="timeline-item__summary">{role.summary}</p>
              <ul className="timeline-item__highlights">
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="work-card__tools">
                {role.stack.map((tool) => (
                  <span className="tool-chip" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
