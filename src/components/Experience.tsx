import { experience } from "../data/portfolio";
import { riseDelay } from "../lib/rise";

function Experience() {
  return (
    <section className="section wrap" id="experience">
      <div className="section__head">
        <h2 className="section__title rise">Experience</h2>
      </div>

      <ul className="company-list">
        {experience.map((company) => {
          const overallStart = company.positions[company.positions.length - 1].start;
          const overallEnd = company.positions[0].end;

          return (
            <li className="company-block rise" key={company.company}>
              <div className="company-block__head">
                <h3 className="company-block__name">{company.company}</h3>
                <span className="company-block__meta">
                  {overallStart} – {overallEnd} · {company.location}
                </span>
              </div>

              <div className="work-card__tools company-block__stack">
                {company.stack.map((tool) => (
                  <span className="tool-chip" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>

              <ul className="position-list">
                {company.positions.map((position, i) => (
                  <li
                    className="position-item"
                    key={`${position.title}-${position.start}`}
                    style={riseDelay(i)}
                  >
                    <div className="position-item__head">
                      <h4 className="position-item__title">{position.title}</h4>
                      <span className="position-item__meta">
                        {position.start} – {position.end}
                      </span>
                    </div>

                    {position.description && (
                      <p className="experience-item__desc">{position.description}</p>
                    )}

                    {position.projects && (
                      <ul className="experience-item__projects">
                        {position.projects.map((project) => (
                          <li key={project.name}>
                            <strong>{project.name}</strong>{" "}
                            <span className="about__range">
                              ({project.start} – {project.end})
                            </span>
                            {project.note && <> — {project.note}</>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Experience;
