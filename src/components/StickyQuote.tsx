interface StickyQuoteProps {
  children: string;
  source?: string;
}

/** A pull-quote styled like a taped-up sticky note — always quotes copy that
 * already exists elsewhere on the site, never new claims written just for
 * this spot. */
function StickyQuote({ children, source }: StickyQuoteProps) {
  return (
    <div className="sticky-quote wrap">
      <p className="sticky-quote__text">"{children}"</p>
      {source && <p className="sticky-quote__source">— {source}</p>}
    </div>
  );
}

export default StickyQuote;
