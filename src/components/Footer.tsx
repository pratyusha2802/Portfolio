import { links, profile } from "../data/portfolio";

function Footer() {
  return (
    <>
      <section className="contact">
        <div className="wrap">
          <h2 className="contact__title rise">
            Let's build
            <br />
            something useful.
          </h2>
          <p className="contact__note rise">
            Open to conversations about product roles, discovery work, or
            anything at the intersection of engineering and product.
          </p>
          <a className="pill pill--lg rise" href={`mailto:${profile.email}`}>
            Say hello
            <span className="wave" aria-hidden="true">
              👋
            </span>
          </a>
        </div>
      </section>

      <div className="wrap">
        <div className="foot">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>
            {links.map((link, i) => (
              <span key={link.label}>
                {i > 0 && " · "}
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  >
                    {link.label}
                  </a>
                ) : (
                  <span className="foot__pending">{link.label}</span>
                )}
              </span>
            ))}
          </span>
        </div>
      </div>
    </>
  );
}

export default Footer;
