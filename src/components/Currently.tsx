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
          <dd>{currently.learning}
          <br />
            <a
              className="currently__link"
              href={currently.learningLink.href}
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <rect
                  x="2.5"
                  y="2.5"
                  width="19"
                  height="19"
                  rx="5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
              </svg>
              {currently.learningLink.label}
            </a></dd>
        </div>
        <div className="currently__row rise">
          <dt>Elsewhere</dt>
          <dd>
            {currently.elsewhere}
            <br />
            <a
              className="currently__link"
              href={currently.elsewhereLink.href}
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <rect
                  x="2.5"
                  y="2.5"
                  width="19"
                  height="19"
                  rx="5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
              </svg>
              {currently.elsewhereLink.label}
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}

export default Currently;
