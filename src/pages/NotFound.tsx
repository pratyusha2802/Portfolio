function NotFound() {
  return (
    <section className="wrap not-found">
      <p className="not-found__doodle" aria-hidden="true">
        ⌐◯⁠—⁠◯
      </p>
      <h1>This page wandered off.</h1>
      <p className="not-found__note">
        Whatever you were looking for isn't at this address. It might not exist at all.
      </p>
      <a className="pill" href="/">
        Back to the homepage
      </a>
    </section>
  );
}

export default NotFound;
