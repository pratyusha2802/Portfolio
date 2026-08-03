import { profile } from "../data/portfolio";
import { riseDelay } from "../lib/rise";
import { usePointerTilt } from "../lib/usePointerTilt";

function Hero() {
  const portraitRef = usePointerTilt<HTMLImageElement>();

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
    </section>
  );
}

export default Hero;
