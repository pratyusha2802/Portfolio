import { Link } from "react-router-dom";
import { work, typeLabels } from "../data/portfolio";

/**
 * Exactly three, curated, in this order: self-directed product work leads,
 * proven engineering work closes. Not the full `work` list, and not
 * filterable — see CLAUDE.md.
 */
const featuredSlugs = [
  "emergency-medical-response-india",
  "elder-care-india",
  "harvest-ledger-trust",
] as const;

function CaseStudies() {
  const items = featuredSlugs
    .map((slug) => work.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section className="section wrap" id="work">
      <div className="section__head">
        <h2 className="section__title rise">Case studies</h2>
        <p className="section__note rise">
          Product work, self-directed and team-based. The problems are real; the analysis is mine.
        </p>
      </div>

      <div className="work-grid">
        {items.map((item) => {
          // "Coming soon" is a sentinel: it locks the card instead of linking it.
          const isLocked = item.cta === "Coming soon";
          // Tools (what was used) and topics (the niche/PM keywords the work
          // demonstrates) render as the same chip, kept as separate fields.
          const chips = [...item.tools, ...(item.topics ?? [])];

          const body = (
            <>
              <div className="work-card__top">
                <span className="work-card__type">{item.meta ?? typeLabels[item.type]}</span>
              </div>
              <h3 className="work-card__title">{item.title}</h3>
              <p className="work-card__hook">{item.hook}</p>
              {!item.meta && item.context && <p className="work-card__context">{item.context}</p>}
              {!item.meta && chips.length > 0 && (
                <div className="work-card__tools">
                  {chips.map((chip) => (
                    <span className="tool-chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              )}
              {item.cta && (
                <span className={`work-card__cta${isLocked ? " work-card__cta--locked" : ""}`}>
                  {item.cta}
                </span>
              )}
            </>
          );

          return isLocked ? (
            <div className="work-card work-card--static rise" key={item.slug}>
              {body}
            </div>
          ) : (
            <Link className="work-card rise" to={`/work/${item.slug}`} key={item.slug}>
              {body}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default CaseStudies;
