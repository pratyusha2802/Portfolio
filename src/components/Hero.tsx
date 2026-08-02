import { currently, profile, skills } from "../data/portfolio";
import { arrowLength, riseDelay } from "../lib/rise";
import { usePointerTilt } from "../lib/usePointerTilt";

function Hero() {
  const portraitRef = usePointerTilt<HTMLImageElement>();

  return (
    <section className="hero wrap" id="top">
      <div className="hero__top">
        <div>
          <h1 className="hero__title rise" style={riseDelay(1)}>
            <span className="hero__greeting">
              Hi <span className="wave" aria-hidden="true">👋</span>, I'm
            </span>
            {profile.name}
          </h1>
          <p className="eyebrow rise" style={riseDelay(0)}>
            {profile.location}
          </p>
        </div>
        <div>
          <p className="hero__lede rise" style={riseDelay(2)}>
            <strong>{profile.role}.</strong> {profile.tagline}
          </p>
          <a className="link-arrow rise" style={riseDelay(3)} href="/#work">
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

      <div className="stage">
        <img className="portrait" src="/photo.jpg" alt={profile.name} ref={portraitRef} />
        <div className="annotation annotation--left rise" style={riseDelay(4)}>
          <svg className="arrow" viewBox="0 0 50 40" fill="none" aria-hidden="true">
            <path style={arrowLength(90)} d="M4 6C18 4 34 16 46 34" />
          </svg>
          <p className="annotation__text">
            <span className="annotation__k">Building</span>
            <span className="annotation__v">{currently.building}</span>
          </p>
        </div>

        <div className="annotation annotation--right rise" style={riseDelay(5)}>
          <svg className="arrow" viewBox="0 0 50 40" fill="none" aria-hidden="true">
            <path style={arrowLength(90)} d="M46 6C32 4 16 16 4 34" />
          </svg>
          <p className="annotation__text">
            <span className="annotation__k">Elsewhere</span>
            <span className="annotation__v">{currently.elsewhere}</span>
          </p>
        </div>
      </div>

      <div className="expertise">
        <p className="expertise__label rise">Core stack</p>
        <div className="expertise__row rise">
          {skills.engineering.core.map((tool) => (
            <span className="tool" key={tool}>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
