import { links, principles, profile } from "../data/portfolio";
import { arrowLength, riseDelay } from "../lib/rise";
import { pageUrl } from "../lib/url";
import { usePointerTilt } from "../lib/usePointerTilt";

/** Splits "Head, rest of the line" into a bold lead + lighter label below it. */
function splitPrinciple(text: string): [string, string] {
  const [head, ...rest] = text.split(", ");
  return [`${head},`, rest.join(", ")];
}

function Hero() {
  const portraitRef = usePointerTilt<HTMLImageElement>();
  const linkedin = links.find((link) => link.label === "LinkedIn" && link.href);
  const [leftHead, leftLabel] = splitPrinciple(principles[1]);
  const [rightHead, rightLabel] = splitPrinciple(principles[3]);

  return (
    <section className="hero wrap" id="top">
      <div className="hero__top">
        <div>
          <h1 className="hero__title rise" style={riseDelay(0)}>
            <span className="hero__greeting">Hi, I'm</span>
            {profile.name}
          </h1>
          <p className="eyebrow rise" style={riseDelay(1)}>
            {profile.location}
          </p>
        </div>
        <div>
          <p className="hero__lede rise" style={riseDelay(2)}>
            {profile.tagline}
          </p>
          <div className="hero__actions">
            {linkedin && (
              <a
                className="pill-outline rise"
                style={riseDelay(3)}
                href={linkedin.href}
                target="_blank"
                rel="noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S.02 4.88.02 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7 0h3.83v1.98h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V23h-4v-6.87c0-1.64-.03-3.75-2.29-3.75-2.29 0-2.64 1.79-2.64 3.63V23h-4V8.5z"
                  />
                </svg>
                LinkedIn
              </a>
            )}
            <a className="pill pill--lg hero__cta rise" style={riseDelay(4)} href={pageUrl("work")}>
              See the work
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
                <path
                  d="M0 6h20M15 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="stage">
        <img
          className="portrait"
          src={`${import.meta.env.BASE_URL}photo.jpg`}
          alt={profile.name}
          ref={portraitRef}
        />

        <div className="annotation annotation--mid-left rise" style={riseDelay(5)}>
          <div className="annotation__text">
            <span className="annotation__head">{leftHead}</span>
            <span className="annotation__label">{leftLabel}</span>
          </div>
          <svg className="arrow arrow--arc" viewBox="0 0 70 30" fill="none" aria-hidden="true">
            <path style={arrowLength(80)} d="M4 10C20 26 40 26 56 8" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="annotation annotation--mid-right rise" style={riseDelay(6)}>
          <div className="annotation__text">
            <span className="annotation__head">{rightHead}</span>
            <span className="annotation__label">{rightLabel}</span>
          </div>
          <svg className="arrow arrow--loop" viewBox="0 0 80 40" fill="none" aria-hidden="true">
            <path
              style={arrowLength(160)}
              d="M10 22C2 14 6 4 16 6C26 8 24 20 14 18C8 16 10 8 18 6C28 3 40 10 48 16C58 23 66 22 76 28"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;
