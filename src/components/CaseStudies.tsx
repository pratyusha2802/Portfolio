import { Link } from "react-router-dom";
import { work, typeLabels } from "../data/portfolio";

/**
 * Every published (or locked-in-progress) piece of work, hand-ordered by
 * depth of real evidence, not by track or by date. Real and shipped leads;
 * desk-research-only concepts and the locked scaffold trail behind proven
 * builds. Changed 2026-09-10 from a curated top-3 to "show everything,
 * ranked" — see CLAUDE.md for why. Not filterable.
 */
const orderedSlugs = [
  "scopesync",
  "elder-care-india",
  "harvest-ledger-trust",
  "convenience-economy-india",
  "pen-in-the-air",
] as const;

function CaseStudies() {
  const items = orderedSlugs
    .map((slug) => work.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section className="section wrap" id="work">
      <div className="section__head">
        <h2 className="section__title rise fill-text">Case studies</h2>
        <p className="section__note rise">
          Real problems. Thoughtful decisions. Product work driven by curiosity, structured
          thinking, and user needs.
        </p>
      </div>

      <div className="work-grid">
        {items.map((item) => {
          // "Coming soon" is a sentinel: it locks the card instead of linking it.
          const isLocked = item.cta === "Coming soon";
          // Topics (the PM/product-thinking signal: 0→1, AI product, discovery
          // work) lead and get the amber topic-chip treatment; tools (what was
          // built with) follow in the neutral tool-chip style — kept visually
          // distinct so a card doesn't read as just a tech-stack list.
          const topics = item.topics ?? [];

          const body = (
            <>
              <div className="work-card__top">
                <span className="work-card__type">{item.meta ?? typeLabels[item.type]}</span>
              </div>
              <h3 className="work-card__title">{item.title}</h3>
              <p className="work-card__hook">{item.hook}</p>
              {!item.meta && item.context && <p className="work-card__context">{item.context}</p>}
              {!item.meta && (topics.length > 0 || item.tools.length > 0) && (
                <div className="work-card__tools">
                  {topics.map((topic) => (
                    <span className="topic-chip" key={topic}>
                      {topic}
                    </span>
                  ))}
                  {item.tools.map((tool) => (
                    <span className="tool-chip" key={tool}>
                      {tool}
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
