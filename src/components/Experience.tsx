import { experience } from "../data/portfolio";

function Experience() {
  return (
    <section className="section wrap" id="experience">
      <div className="section__head">
        <h2 className="section__title rise">Experience</h2>
      </div>

      <ul className="experience-list">
        {experience.map((role) => (
          <li className="experience-item rise" key={`${role.company}-${role.title}-${role.start}`}>
            <div className="experience-item__head">
              <h3 className="experience-item__title">{role.title}</h3>
              <span className="experience-item__meta">
                {role.company} · {role.start} – {role.end} · {role.location}
              </span>
            </div>

            {role.description && <p className="experience-item__desc">{role.description}</p>}

            {role.projects && (
              <ul className="experience-item__projects">
                {role.projects.map((project) => (
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

            <div className="work-card__tools experience-item__stack">
              {role.stack.map((tool) => (
                <span className="tool-chip" key={tool}>
                  {tool}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Experience;
