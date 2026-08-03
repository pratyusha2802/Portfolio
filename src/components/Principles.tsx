import { principles } from "../data/portfolio";

function Principles() {
  return (
    <section className="section wrap" id="how-i-work">
      <div className="section__head">
        <h2 className="section__title rise">How I work</h2>
      </div>
      <div className="about__grid">
        {principles.map((claim) => (
          <div className="card rise" key={claim}>
            <p className="card__k">{claim}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Principles;
