# Changelog

Every entry here corresponds to a `package.json` version and a deploy to
`master`. See `RELEASING.md` for the process this file is part of.

## [Unreleased]

Nothing staged yet.

## [0.3.0] — 2026-09-05

- **Hero portrait:** the source photo's top margin is real room background,
  not a studio backdrop, so a mask-image fade now blends that margin into
  the page instead of cropping into the furniture behind it, with a touch
  more saturation/contrast so the portrait doesn't read flat. The arrow
  annotations' text gets the same paper-colored halo the arrows already use,
  so it stays legible against dark hair at narrow widths.
- **Case studies:** each `##` section now renders as its own card that
  unfolds into view (a clip-path reveal, not just a fade) as the reader
  scrolls to it, instead of one long unbroken block of prose — addresses
  the case studies reading as too text-heavy. Fixed two bugs surfaced while
  building this: the scroll-reveal threshold that suits short elements left
  tall cards sitting in blank space until scrolled deep past them, and the
  markdown-rendering change needed to split sections had silently dropped
  table support (options-considered tables were rendering as raw pipe
  text).
- **Content:** removed every em dash from visitor-facing copy across the
  whole site (profile/work data, all six case-study write-ups, the three
  linked prototype decks) in favor of whatever reads most naturally in
  context — no facts changed.
- **Typography:** replaced the overused Plus Jakarta Sans display face with
  Bricolage Grotesque.
- **Positioning:** the JPMorgan Core UI experience note now cites real
  platform-scale numbers (251k monthly active users, 11.5M+ monthly
  actions, ~47,500+ hours saved a month) instead of the vaguer "300,000+
  employees"; the browser tab title and meta description now state the
  move into product management explicitly.
- **Currently:** added `@dawnworkdiary` alongside `@dawndailydiary` in the
  "Elsewhere" line.
- **Consistency:** the hero's LinkedIn button now matches the "See the
  work" button's size (they'd drifted to different padding/font-size/
  radius and sat at different heights); replaced three overshoot/spring
  easing curves (nav underline, Experience timeline dot, filter chip) with
  a consistent exponential ease-out, and renamed the back-to-top button's
  `float-bounce` keyframe to `float-idle` — it was always a smooth
  ease-in-out float, the name was the only thing reading as a bounce.

## [0.2.0] — 2026-08-06

First real promotion since the 0.1.0 baseline — `dev` had accumulated 50
commits of work with nothing yet pushed to `master`. Promoted via sequential
`git cherry-pick` (never a merge, per the incident this file's process
exists to prevent), verified content-identical to `dev` before pushing.

- **Case studies, all three featured slots touched:**
  - Added Paarth — Elder Care Discovery in India, replacing the locked
    Worker Passport card. Links a custom-built market/discovery deck plus a
    prototype.
  - Added Golden Hour Bridge — Convenience Economy Discovery in India,
    replacing the never-populated Emergency Medical Response scaffold.
    Ships with a from-scratch HTML slide deck (density maps, an isometric
    cost cube, classical-column and concentric-circle charts) rebuilt from
    a supplied PDF rather than linking the PDF directly.
  - Corrected the Bangalore Food Bank case study to match the real
    donation-portal project (it had drifted to describe a different
    surplus-food concept), then anonymized it to "Harvest Ledger Trust" —
    the real NGO partner's name is under an NDA-style constraint and no
    longer appears anywhere on the site, including the deck and the URL
    slug.
- **Experience:** consolidated three separate JPMorgan Chase entries into
  one company block with a scroll-triggered position timeline (a connecting
  line and per-position dots that animate in as they enter view); deduped
  the stack chips, which had been repeating the same tools on every
  position, to one row per company.
- **Hero:** rewrote the tagline and the "Engineer → PM" lead-in; added
  hand-drawn annotation arrows around the portrait (responsive, hidden
  below 720px where the portrait leaves no room for them without
  overlapping it); added casual copy/drag/save deterrents to the portrait
  image.
- **About:** rewritten, and body text is now justified with hyphenation,
  matching the existing case-study body treatment.
- **Case-study cards:** fixed clickable cards being visually
  indistinguishable from purely informational boxes elsewhere on the page
  (e.g. the Currently section) — real links now get a resting
  border/shadow and a solid button-style CTA instead of plain text.
- Added topic/niche keyword chips to case-study cards, alongside the
  existing tool chips.

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
  see `../CLAUDE.md` for the full incident notes.
