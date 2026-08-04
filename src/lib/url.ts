/**
 * Root-relative hrefs (href="/", href="/#work") break once the site is
 * deployed under a subpath (e.g. GitHub Pages' /Portfolio/) — Vite only
 * rewrites asset/URL references it can see at build time (index.html,
 * imported assets), not plain strings inside components. Anything written
 * as a literal "/..." path needs BASE_URL prefixed by hand instead.
 */
export function pageUrl(hash?: string): string {
  return hash ? `${import.meta.env.BASE_URL}#${hash}` : import.meta.env.BASE_URL;
}
