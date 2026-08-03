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
          <dd>{currently.building}.</dd>
        </div>
        <div className="currently__row rise">
          <dt>Learning</dt>
          <dd>
            {currently.learning}{" "}
            <a
              className="currently__inline-link"
              href={currently.learningLink.href}
              target="_blank"
              rel="noreferrer"
            >
              {currently.learningLink.label}
            </a>
            .
          </dd>
        </div>
        <div className="currently__row rise">
          <dt>Elsewhere</dt>
          <dd>
            {currently.elsewhere}{" "}
            <a
              className="currently__inline-link"
              href={currently.elsewhereLink.href}
              target="_blank"
              rel="noreferrer"
            >
              {currently.elsewhereLink.label}
            </a>
            .
          </dd>
        </div>
      </dl>
    </section>
  );
}

export default Currently;
