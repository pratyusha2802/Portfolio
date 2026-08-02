import { principles } from "../data/portfolio";

function Principles() {
  return (
    <section className="section wrap" id="how-i-work">
      <div className="section__head">
        <h2 className="section__title rise">How I work</h2>
        <p className="section__note rise">
          Fewer rules than habits — the ones that show up across most of what's below.
        </p>
      </div>
      <div className="about__grid">
        {principles.map((item) => (
          <div className="card rise" key={item.claim}>
            <p className="card__k">{item.claim}</p>
            <p className="card__v">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Principles;
