import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { profile, typeLabels, work } from "../data/portfolio";
import { getCaseContent } from "../lib/markdown";
import { pageUrl } from "../lib/url";

function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = work.find((w) => w.slug === slug);
  const content = slug ? getCaseContent(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (item) document.title = `${item.title} — ${profile.name}`;
    return () => {
      document.title = `${profile.name} — ${profile.role}`;
    };
  }, [item]);

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
          {item.tools.map((tool) => (
            <span className="tool-chip" key={tool}>
              {tool}
            </span>
          ))}
        </div>
        {item.href && (
          <a className="pill" href={item.href} target="_blank" rel="noreferrer">
            View live
          </a>
        )}
      </header>

      {/*
        Case content is authored markdown bundled at build time from
        src/content/work/ — never user-supplied — so rendering it directly
        is safe without a sanitizer.
      */}
      <div className="case__body" dangerouslySetInnerHTML={{ __html: content.html }} />
    </article>
  );
}

export default WorkDetail;
