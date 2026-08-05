# Changelog

Every entry here corresponds to a `package.json` version and a deploy to
`master`. See `RELEASING.md` for the process this file is part of.

## [Unreleased]

Nothing staged yet.

## [0.1.0] — 2026-08-05

Baseline entry, established after resolving a git/deploy incident rather than
from a clean start — this is "what's actually live right now," not "what
shipped in one change":

- GitHub Pages deploy via GitHub Actions working correctly
  (`.github/workflows/deploy.yml`), building and publishing `dist/` on every
  push to `master`.
- Root-absolute paths (`/photo.jpg`, in-page nav anchors) fixed to work under
  the `/Portfolio/` subpath via `pageUrl()` / `import.meta.env.BASE_URL`.
- Native binding install issue (`@rolldown/binding-darwin-arm64`,
  `@oxlint/binding-darwin-arm64`) resolved as `optionalDependencies`, so it
  no longer breaks the Linux CI build.
- `dev` and `master` restored to identical content after an accidental
  `master`-into-`dev` merge briefly reverted the live site to the original
  pre-React template and reintroduced a third party's personal images —
  see `CLAUDE.md` for the full incident notes.
