import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { profile, typeLabels, work } from "../data/portfolio";
import { getCaseContent } from "../lib/markdown";
import { pageUrl } from "../lib/url";

function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const item = work.find((w) => w.slug === slug);
  const content = slug ? getCaseContent(slug) : undefined;
  const sections = content?.sections ?? [];
  const contentRef = useRef<HTMLDivElement>(null);

  // Lazily reads a section id straight off the id, so a direct/shared link
  // to one section (e.g. .../work/rideinsync#context) opens on that section
  // instead of flashing the first one before the effect below corrects it.
  const [activeId, setActiveId] = useState<string | undefined>(() => {
    const fromHash = sections.find((s) => s.id === location.hash.slice(1))?.id;
    return fromHash ?? sections[0]?.id;
  });

  // Falls back to the first section whenever activeId doesn't match one —
  // an invalid/stale hash, or the brief window before the mount effect
  // below corrects it — computed here (not after the early return) so the
  // reveal effect can target the section actually being rendered.
  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const activeSection = sections[activeIndex] ?? sections[0];
  const nextSection = activeIndex >= 0 ? sections[activeIndex + 1] : undefined;

  // The section card reuses the sitewide .rise/.in unfold transition, but
  // not its usual IntersectionObserver trigger (useRiseAnimation): that
  // hook reveals a card once scrolling brings it into view, which raced
  // against this component's own scrollIntoView (goToSection) and could
  // miss the "already in view" case entirely, leaving the card stuck at
  // opacity: 0. Visibility here is already fully known — a section is
  // showing because it's the selected one, so this just adds .in directly.
  // No requestAnimationFrame wrapper: a plain useEffect already runs after
  // the browser paints the card's initial (pre-.in) state, which is the
  // "before" frame the transition needs — wrapping in rAF on top of that
  // only adds a dependency on rAF actually firing promptly, which isn't
  // guaranteed for a backgrounded/unfocused tab.
  useEffect(() => {
    if (!activeSection) return;
    document.getElementById(activeSection.id)?.classList.add("in");
  }, [activeSection]);

  useEffect(() => {
    // Re-derives activeId here too (not just the lazy initializer above) —
    // this component instance is reused across case studies (same route,
    // different :slug), so a same-hash coincidence aside, switching cases
    // needs the section reset for the new one, not left on the old id.
    const fromHash = sections.find((s) => s.id === location.hash.slice(1))?.id;
    setActiveId(fromHash ?? sections[0]?.id);
    window.scrollTo(0, 0);

    if (item) document.title = `${item.title} · ${profile.name}`;
    return () => {
      document.title = `${profile.name} · ${profile.role}`;
    };
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  function goToSection(id: string) {
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
    contentRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }

  if (!item || !content) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <article className="case wrap">
      <a className="case__back" href={pageUrl("work")}>
        ← Back to selected work
      </a>

      <header className="case__head">
        <p className="case__type">{typeLabels[item.type]}</p>
        <h1 className="case__title">{item.title}</h1>
        <p className="case__hook">{item.hook}</p>
        <div className="case__meta">
          <span>{item.date}</span>
          {item.context && <span>{item.context}</span>}
        </div>
        <div className="work-card__tools">
          {item.topics && item.topics.length > 0 && (
            <span className="topic-group">
              {item.topics.map((topic) => (
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
        {(item.href || item.links) && (
          <div className="case__links">
            {item.href && (
              <a className="pill" href={item.href} target="_blank" rel="noreferrer">
                {item.hrefLabel ?? "View live"}
              </a>
            )}
            {item.links?.map((link) => (
              <a className="pill" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="case__body">
        {/*
          Case content is authored markdown bundled at build time from
          src/content/work/ — never user-supplied — so rendering it directly
          is safe without a sanitizer.
        */}
        {content.preambleHtml && <div dangerouslySetInnerHTML={{ __html: content.preambleHtml }} />}

        {activeSection && (
          <div className="case-layout" ref={contentRef}>
            <nav className="case-index" aria-label="Case sections">
              {sections.map((section) => (
                <a
                  className={`case-index__item${section.id === activeSection.id ? " is-active" : ""}`}
                  href={`#${section.id}`}
                  aria-current={section.id === activeSection.id ? "true" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    goToSection(section.id);
                  }}
                  key={section.id}
                >
                  {section.title}
                </a>
              ))}
            </nav>

            <section className="case-card rise" id={activeSection.id} key={activeSection.id}>
              <div dangerouslySetInnerHTML={{ __html: activeSection.html }} />
              {nextSection ? (
                <button
                  type="button"
                  className="case-next"
                  onClick={() => goToSection(nextSection.id)}
                >
                  Next: {nextSection.title} →
                </button>
              ) : (
                <a className="case-next" href={pageUrl("work")}>
                  ← Back to selected work
                </a>
              )}
            </section>
          </div>
        )}
      </div>
    </article>
  );
}

export default WorkDetail;
