import { Link } from "react-router-dom";
import { work, typeLabels, type WorkItem } from "../data/portfolio";
import { splitLetters } from "../lib/splitLetters";
import { usePointerTilt } from "../lib/usePointerTilt";

/**
 * Every published (or locked-in-progress) piece of work, hand-ordered by
 * depth of real evidence, not by track or by date. Real and shipped leads;
 * desk-research-only concepts and the locked scaffold trail behind proven
 * builds. Changed 2026-09-10 from a curated top-3 to "show everything,
 * ranked" — see CLAUDE.md for why. Not filterable.
 */
const orderedSlugs = [
  "rideinsync",
  "scopesync",
  "elder-care-india",
  "fastlane",
  "convenience-economy-india",
  "harvest-ledger-trust",
  "pen-in-the-air",
] as const;

/**
 * Its own component (not inlined in the .map() below) so each card can call
 * usePointerTilt independently — a hook can't be called once per loop
 * iteration inside a single component.
 */
function WorkCard({ item }: { item: WorkItem }) {
  // A much smaller max angle than the hero portrait's: these cards carry
  // paragraphs of body text, and a strong 3D tilt would fight legibility
  // instead of just adding a bit of tactile depth on hover.
  const tiltRef = usePointerTilt<HTMLDivElement>(3);

  // "Coming soon" is a sentinel: it locks the card instead of linking it.
  const isLocked = item.cta === "Coming soon";
  // Topics (the PM/product-thinking signal: 0→1, AI product, discovery
  // work) lead as plain divider-separated labels — not a pill, so they
  // can't be mistaken for the dormant .filter-chip toggle UI — tools (what
  // was built with) follow in the tool-chip pill style. Chips render
  // regardless of `meta`: whether a card overrides the type/context line
  // is unrelated to whether it has real tools or topics to show, and
  // gating both on the same field previously hid Harvest Ledger Trust's
  // tools for no content reason.
  const topics = item.topics ?? [];
  // The live/deck/prototype links (real, external, another site) — shown
  // as their own quick-jump row on the card itself, alongside the read-more
  // Link to /work/:slug, instead of only surfacing on the detail page.
  const actions = [
    ...(item.href ? [{ href: item.href, label: item.hrefLabel ?? "View live" }] : []),
    ...(item.links ?? []),
  ];

  const details = (
    <>
      <div className="work-card__top">
        <span className="work-card__type">{item.meta ?? typeLabels[item.type]}</span>
      </div>
      <h3 className="work-card__title">{item.title}</h3>
      <p className="work-card__hook">{item.hook}</p>
      {!item.meta && item.context && <p className="work-card__context">{item.context}</p>}
      {(topics.length > 0 || item.tools.length > 0) && (
        <div className="work-card__tools">
          {topics.length > 0 && (
            <span className="topic-group">
              {topics.map((topic) => (
                <span className="topic-label" key={topic}>
                  {topic}
                </span>
              ))}
            </span>
          )}
          {item.tools.map((tool) => (
            <span className="tool-chip" key={tool}>
              {tool}
            </span>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div
      className={`work-card${isLocked ? " work-card--static" : " tilt"} rise`}
      ref={isLocked ? undefined : tiltRef}
    >
      {isLocked ? (
        <div className="work-card__body">{details}</div>
      ) : (
        <Link className="work-card__body" to={`/work/${item.slug}`}>
          {details}
        </Link>
      )}
      {(actions.length > 0 || item.cta) && (
        <div className="work-card__footer">
          {actions.length > 0 && (
            <div className="work-card__actions">
              {actions.map((action) => (
                <a
                  className="work-card__action"
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  key={action.href}
                >
                  {action.label}
                </a>
              ))}
            </div>
          )}
          {item.cta &&
            (isLocked ? (
              <span className="work-card__cta work-card__cta--locked">{item.cta}</span>
            ) : (
              <Link className="work-card__cta" to={`/work/${item.slug}`}>
                {item.cta}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

function CaseStudies() {
  const items = orderedSlugs
    .map((slug) => work.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section className="section wrap" id="work">
      <div className="section__head">
        <h2 className="section__title rise">{splitLetters("Case studies", "cs-title")}</h2>
        <p className="section__note rise">
          Real problems. Thoughtful decisions. Product work driven by curiosity, structured
          thinking, and user needs.
        </p>
      </div>

      <div className="work-grid">
        {items.map((item) => (
          <WorkCard item={item} key={item.slug} />
        ))}
      </div>
    </section>
  );
}

export default CaseStudies;
