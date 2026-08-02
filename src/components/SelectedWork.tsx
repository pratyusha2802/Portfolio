import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  work,
  trackLabels,
  typeLabels,
  stageLabels,
  stageOrder,
  type Track,
} from "../data/portfolio";

const trackFilters: Array<Track | "all"> = ["all", "product", "engineering"];

function filterLabel(filter: Track | "all"): string {
  return filter === "all" ? "All" : trackLabels[filter];
}

function SelectedWork() {
  const [filter, setFilter] = useState<Track | "all">("all");

  // Always render the same set of DOM nodes and hide non-matching ones with
  // the `hidden` attribute, rather than removing them from the array. The
  // scroll-reveal system (useRiseAnimation) observes each .rise element only
  // once, on mount — if filtering unmounted cards, switching the filter back
  // would remount fresh nodes that never got their one-time reveal and would
  // stay invisible forever.
  const items = useMemo(() => work.filter((item) => item.slug && item.title), []);

  return (
    <section className="section wrap" id="work">
      <div className="section__head">
        <h2 className="section__title rise">Selected work</h2>
        <p className="section__note rise">
          Product and engineering, together — filter by track.
        </p>
      </div>

      <fieldset className="filters rise">
        <legend className="visually-hidden">Filter work by track</legend>
        {trackFilters.map((option) => (
          <button
            key={option}
            type="button"
            className="filter-chip"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
          >
            {filterLabel(option)}
          </button>
        ))}
      </fieldset>

      <div className="work-grid">
        {items.map((item) => {
          const isLive = item.status === "published";
          const matchesFilter = filter === "all" || item.track === filter;
          const stages = stageOrder.filter((stage) => item.stages?.includes(stage));

          const body = (
            <>
              <div className="work-card__top">
                <span className="work-card__type">{typeLabels[item.type]}</span>
                {!isLive && <span className="work-card__status">{item.status.replace("-", " ")}</span>}
              </div>
              <h3 className="work-card__title">{item.title}</h3>
              <p className="work-card__hook">{item.hook}</p>
              {item.context && <p className="work-card__context">{item.context}</p>}

              {stages.length > 0 && (
                <ul className="stage-list" aria-label="Stages this piece covers">
                  {stages.map((stage) => (
                    <li key={stage} className="stage-chip">
                      {stageLabels[stage]}
                    </li>
                  ))}
                </ul>
              )}

              <div className="work-card__tools">
                {item.tools.map((tool) => (
                  <span className="tool-chip" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </>
          );

          return isLive ? (
            <Link
              className="work-card rise"
              to={`/work/${item.slug}`}
              key={item.slug}
              hidden={!matchesFilter}
            >
              {body}
            </Link>
          ) : (
            <div
              className="work-card work-card--static rise"
              key={item.slug}
              hidden={!matchesFilter}
            >
              {body}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SelectedWork;
