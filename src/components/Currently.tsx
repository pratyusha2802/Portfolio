import { currently } from "../data/portfolio";

function Currently() {
  return (
    <section className="section section--tight wrap" id="currently">
      <div className="section__head">
        <h2 className="section__title rise">Currently</h2>
      </div>
      <dl className="currently">
        <div className="currently__row rise">
          <dt>Building</dt>
          <dd>{currently.building}</dd>
        </div>
        <div className="currently__row rise">
          <dt>Learning</dt>
          <dd>{currently.learning}</dd>
        </div>
        <div className="currently__row rise">
          <dt>Elsewhere</dt>
          <dd>{currently.elsewhere}</dd>
        </div>
      </dl>
    </section>
  );
}

export default Currently;
