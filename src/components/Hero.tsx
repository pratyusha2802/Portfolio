import { profile, skills } from "../data/portfolio";
import { riseDelay } from "../lib/rise";
import { usePointerTilt } from "../lib/usePointerTilt";

function Hero() {
  const portraitRef = usePointerTilt<HTMLImageElement>();

  return (
    <section className="hero wrap" id="top">
      <div className="hero__top">
        <div>
          <p className="eyebrow rise" style={riseDelay(0)}>
            {profile.location}
          </p>
          <h1 className="hero__title rise" style={riseDelay(1)}>
            {profile.name}
          </h1>
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
