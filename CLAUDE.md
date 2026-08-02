# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server (http://localhost:5173)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run oxlint (config in `.oxlintrc.json`)

There is no test suite in this project.

**Node version:** Vite 8 requires Node ^20.19 or >=22.12. The default system Node here is v20.17.0, which prints a version warning but still works. Node v23.11.0 is available via `nvm` (`nvm use 23.11.0`) if the warning needs to go away.

**Native binding gotcha:** Vite 8 uses the rolldown bundler, and oxlint ships the same way — both distribute their actual binary as a platform-specific optional dependency (`@rolldown/binding-darwin-arm64`, `@oxlint/binding-darwin-arm64` here) that a fresh `npm install` can silently fail to pull in (an [npm optional-deps bug](https://github.com/npm/cli/issues/4828)), causing `Cannot find module './rolldown-binding.darwin-universal.node'` or oxlint's equivalent `Cannot find native binding`. Fix by installing the matching-version binding explicitly. Both are now pinned directly in `package.json` to avoid this recurring.

## Architecture

React SPA on Vite, TypeScript strict, `react-router-dom` for client-side routing. No CMS, no server — everything ships as static files.

- **`src/data/portfolio.ts`** is the single source of truth for all copy — see "Content model" below for what each export renders as. **To change what the site says, edit this file, not a component.**
- **`src/content/work/{slug}.md`** — long-form case content for entries in `work`, one markdown file per slug, loaded at build time via `import.meta.glob` and parsed by `src/lib/markdown.ts` (a small hand-rolled frontmatter parser + `marked` for the body — deliberately not `gray-matter`, which assumes a Node `Buffer` global the browser doesn't have). `_authoring.md` in that folder is the authoring guide, not a case page — the loader skips any file starting with `_`.
- **`src/pages/`** — route-level components: `Home.tsx` (the whole single-page scroll), `WorkDetail.tsx` (`/work/:slug`), `NotFound.tsx` (catch-all `*`). Routing lives in `App.tsx`; `main.tsx` mounts `BrowserRouter`.
- **`src/components/`** — one component per section (`Hero`, `Principles`, `SelectedWork`, `Experience`, `Currently`, `Background`, `Footer`, plus `Nav`), each presentation-only, reading from `portfolio.ts`.
- **`src/index.css`** is the only stylesheet — global, BEM-ish class names, CSS custom properties in `:root` for the forest/paper theme. No CSS modules or scoping.
- **`public/`** — `photo.jpg` (hero headshot, referenced directly as `/photo.jpg`, not part of `portfolio.ts`) and `resume.pdf`.

**Known gaps, not yet built:**
- **Per-page OG image/meta tags** aren't implemented. `WorkDetail` updates `document.title` at runtime, but this is a client-only SPA with no prerendering/SSR, so link-preview crawlers that don't execute JS will only ever see the root `index.html`'s static tags. Real per-case social previews need prerendering or a meta-tag service — flag this if it matters before sharing a case link.
- **Live Medium feed** isn't implemented. `writing.feedUrl` is empty and `Background` just lists `writing.topics` as static tags. Fetching Medium's RSS from the browser hits CORS, so this needs either a feed URL plus a proxy/serverless function, or an RSS-to-JSON service — a real infra decision, not made here.
- The placeholder `work` entry (empty `slug`/`title`, `track: "product"`) is filtered out of rendering by `SelectedWork` until it's given a real subject.

## Content notes

- The resume/profile content was originally distilled from a much larger raw export (full academic transcripts, every hackathon, every certification). The site deliberately shows only the highlights — don't re-expand sections back to the full raw dump without being asked.

## What this site is

Pratyusha's portfolio. It's about **who she is and how she works** — the work is
evidence for that, not the subject of it.

She's a software engineer at JP Morgan Chase moving toward product, and some of
the work here comes out of an AI product management programme she's doing. That
programme is **context on a card, never a section**. No syllabus, no week
numbers, no progress timeline, no course branding. A reader should finish this
site knowing how she thinks — not which cohort she enrolled in.

Same rule for her employer: JPMC is where she works, not what the site is about.

The audience is someone deciding whether to talk to her, with four minutes.

**Information hierarchy — do not reorder without asking:**

1. Hero — name, what she does, one honest line
2. How I work — the principles, with concrete detail under each
3. Selected work — product and engineering together, filterable
4. Experience
5. Currently — building / learning / elsewhere, three lines
6. Background — education, recognition, community, writing

## Content model

**All copy lives in `src/data/portfolio.ts`.** Components import from it; no
strings are hardcoded in JSX.

| Export | Renders as |
|---|---|
| `profile` | Hero + About |
| `principles` | "How I work" |
| `work` + `trackLabels` / `typeLabels` | Selected work, filter chips, cards |
| `stageLabels` / `stageOrder` | Coverage chips on product work |
| `experience` | Experience timeline |
| `skills` | Engineering, plus product once published work demonstrates it |
| `currently` | Three-line current-state block |
| `education`, `recognition`, `community`, `writing`, `links` | Background + footer |

Long-form case content lives in `src/content/work/{slug}.md`, slug matching the
`work` entry. Route: `/work/{slug}`.

### `principles` is hers to write

The drafted principles are **inferred, not dictated**. They're the copy a reader
remembers, and generated-sounding values are worse than none. Flag them for her
to rewrite; don't polish them into corporate voice.

## Writing a case page

**No fixed template — see `src/content/work/_authoring.md`.** Depth varies: some work stops at
problem framing, some runs through to shipped and evaluated. A single template
would make short pieces look empty and cap long ones.

Fixed **spine**: summary card → the problem → … → what I'd do differently.
Body **composed from blocks** as the work's scope demands. `_authoring.md` holds
the block library, what each must answer, and how each fails.

The `stages` array declares which blocks a piece contains; chips render from
`stageLabels` in `stageOrder`. **Never add a stage without a real section behind
it.** Absent blocks read as scope; hollow ones read as padding.

Engineering work usually needs no stages — leave the field off rather than
retrofitting product vocabulary onto a hackathon build.

### Adding new work

1. Add a `work` entry — slug named for the **subject**, never its origin
   ("meal-planning-prd", not "week-3-prd")
2. Create `src/content/work/{slug}.md` with the spine plus the blocks that apply
3. `status: "in-progress"` while drafting; `"published"` when every included
   block has real content

**Do not draft the body of a case unless explicitly asked.** A PRD she didn't
reason through is one she can't defend when someone pushes on the tradeoff.
Scaffolding, structuring, and challenging a draft is welcome. Ghostwriting isn't.

Feature the strongest four pieces; archive the rest. Volume signals a course
completed; depth signals judgement.

## Content rules — hard constraints

- **Never invent facts.** No metric, user quote, research finding, interview
  count, outcome, or URL not already in the data or content files. Empty fields
  are intentional — leave them empty rather than filling them plausibly.
- **Never use JPMC work as case-study material.** The `experience` descriptions
  sit at a deliberately public level. Internal products, roadmaps, metrics, and
  architecture don't become case studies on a personal site. Flag it if a request
  drifts that way.
- **Never turn the programme into a feature of the site.** No cohort branding,
  week numbering, curriculum listing, or completion framing. If work came out of
  it, `context` says so in six words.
- **Never write "aspiring", "transitioning into product", or "passionate about".**
  The work makes the claim.
- **Label hypothetical numbers hypothetical.** Every time.
- `skills.product.demonstrated` may only list a skill a *published* piece
  demonstrates.
- The data file is a curated subset of a longer history. Anything absent was cut
  on purpose — don't reconstruct it.

## Voice

First person. Plain and specific. Name the problem, the tradeoff, the outcome.

Banned: "passionate", "aspiring", "results-driven", "leveraging", "synergy",
"revolutionise", exclamation marks in body copy. Short sentences are fine. Dry
beats enthusiastic. Specificity earns trust; adjectives spend it.

## Non-negotiables in the build

Accessibility is the point of the site, not a line on it — she led accessible
component work professionally, and a portfolio that fails an audit contradicts
its own claims:

- Semantic HTML; one `h1` per page; landmarks over `div` soup
- Visible focus states — never `outline: none` without a replacement
- Keyboard reachable everywhere, logical tab order, no traps
- Contrast >= 4.5:1 body text, 3:1 large text and UI borders
- `prefers-reduced-motion` respected on every animation
- Meaningful `alt` text; decorative images `alt=""`
- Filter chips are real buttons with `aria-pressed`, not styled divs
- Stage chips are non-interactive: mark up as a list, never convey coverage by
  colour alone
- Test keyboard-only before calling anything done

## Conventions

- TypeScript strict. No `any` — enforced by `typescript/no-explicit-any` in `.oxlintrc.json`, on top of `tsconfig.json`'s `strict`.
- Functional components, named exports, colocated styles.
- Mobile-first — verify at 360px before desktop. These links get opened on phones.
- Every case page needs its own `<title>` and OG image; they get shared. `<title>` is done (see `WorkDetail.tsx`); OG image is not — see "Known gaps" above.
- Lighthouse: accessibility 100, performance >= 95, before merge. Not yet run against this build — no browser tooling was available when it was assembled; treat this as unverified until someone actually runs it.

## Internal note — not for the site

Her programme runs to early September 2026 and produces roughly eight documents
and four prototypes. Useful for pacing when she asks what to work on next.
It does not appear anywhere in the UI.
