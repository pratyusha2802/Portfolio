import { useEffect, useState } from "react";
import { profile } from "../data/portfolio";

function Nav() {
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [firstName, ...rest] = profile.name.split(" ");

  return (
    <header className={`nav${isStuck ? " is-stuck" : ""}`} id="nav">
      <div className="wrap nav__inner">
        <a href="/" className="mark">
          {firstName}
          <br />
          {rest.join(" ")}
        </a>
        <nav className="nav__links">
          <a className="nav__link" href="/#work">
            Case Studies
          </a>
          <a className="nav__link" href="/#about">
            About
          </a>
          <a className="nav__link" href="/#experience">
            Experience
          </a>
          <a className="pill" href={`mailto:${profile.email}`}>
            Say hello
            <span className="wave" aria-hidden="true">
              👋
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
