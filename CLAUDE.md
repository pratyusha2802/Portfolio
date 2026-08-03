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
- **`src/components/`** — `Hero`, `Currently` (the "building/learning/elsewhere" strip, `id="currently"`, right after the hero), `CaseStudies` (curated 3-item section, `id="work"`), `About` (bio only now, `id="about"`), `Experience` (`id="experience"`), `Background` (`id="background"`), `Footer`, `Nav`. Each presentation-only, reading from `portfolio.ts`.
- **`src/index.css`** is the only stylesheet — global, BEM-ish class names, CSS custom properties in `:root` for the forest/paper theme. No CSS modules or scoping.
- **`public/`** — `photo.jpg` (hero headshot, referenced directly as `/photo.jpg`, not part of `portfolio.ts`) and `resume.pdf`.

**Orphaned files — not deleted, not wired up.** `Principles.tsx` and `SelectedWork.tsx` are still on disk but nothing imports them. They compile fine in isolation (that's why `tsc`/`oxlint` stay clean with them present) but are dead code. Left in place rather than deleted since this repo has no git history to fall back on if that turns out to be wrong — delete them once that's confirmed, don't silently resurrect them. (`Currently.tsx` and `Background.tsx` *were* in this list too, in the previous IA — both are back in active use now, un-orphaned rather than rebuilt from scratch. `Experience.tsx` was fully deleted at one point — see next paragraph — then recreated as a new file once it became its own section again.)

**`Role` shape changed.** Real experience copy required a role to contain more than one project with its own date range (e.g. the current FTE role: desktop-assistant project since Nov 2025, Core UI project before that). `Role` dropped `summary`/`highlights` in favor of optional `description` (single-paragraph roles, e.g. internships) or `projects: SubProject[]` (multi-project roles) — see the type definitions above `profile`. The old `Experience.tsx` referenced the removed fields directly and stopped compiling, so it was deleted; the current `Experience.tsx` is a fresh file built against the new shape, now rendering as its own top-level section rather than a block inside `About`.

**Known gaps, not yet built:**
- **`links` array is still all-empty hrefs** except `mailto:`. GitHub, LinkedIn, Résumé have no real URL. The brief this site is being built against explicitly requires these live — this is the single biggest concrete blocker on that front, and it's a "give me the URL" problem, not a code problem.
- **No real no-JS fallback.** This is a client-rendered React SPA — if JS fails to execute at all (not just `IntersectionObserver` support, which `useRiseAnimation` already handles), nothing renders, not even degraded static content. That's a direct tension with "content must still render if scroll-reveal JS fails" as a stated craft goal; fixing it for real means prerendering/SSR, which wasn't in scope for the React-SPA-stays decision. Flagged, not fixed.
- **Sub-3s-on-4G and Lighthouse have not been measured** against this build — no browser tooling was available when it was assembled. Don't report either as passing without actually running them.
- **Per-page OG image/meta tags** aren't implemented — same root cause as the no-JS gap (client-only SPA, no prerendering), so crawlers that don't execute JS only ever see `index.html`'s static tags.
- **Live Medium feed** isn't implemented. `writing.feedUrl` is empty; nothing currently renders `writing` at all (it was dropped from `Background` when that section got rewritten to a flat list — revisit if that was wrong).
- **`network-intrusion-detection` and `pen-in-the-air`** still have real published case pages and are reachable at their `/work/:slug` URLs, but are no longer featured anywhere in the main flow — `CaseStudies` renders exactly 3 curated slugs, not the full `work` array. Archived, not deleted.
- **`gig-economy-worker-passport` is intentionally locked** — `cta: "Coming soon"` makes its card non-clickable (see `CaseStudies.tsx`: the literal string `"Coming soon"` is the sentinel that decides this, not `status`). Its `.md` file is still all-TODO past the problem framing.
- **`emergency-medical-response-india` is set up to be clickable (`cta: "Read the case study"`) even though its `.md` file is still all-TODO** past the problem framing, same as Worker Passport. This was an explicit instruction, not an oversight, but it means anyone who actually clicks through right now sees scaffold placeholders, not a finished case study. Flag this again if she asks you to change anything else on that card — don't just quietly fix the mismatch by re-locking it.

## Content notes

- The resume/profile content was originally distilled from a much larger raw export (full academic transcripts, every hackathon, every certification). The site deliberately shows only the highlights — don't re-expand sections back to the full raw dump without being asked.
- **`profile.about` describes the JPMC Core UI role as "extensible" — teams building add-ons that plug in and ship on independent release cycles, Core UI owning the shared layer they depend on.** This was flagged once as reading like the kind of architecture/release-process detail the NDA rules ban, and she included it again anyway in her own words (and again, unprompted, in `experience`'s project note). Treat that as a confirmed, deliberate call about where her own NDA line actually sits — don't re-flag it, and don't use it as precedent to add *more* architecture detail elsewhere without the same explicit confirmation.
- **Two unresolved `[SEE NOTE]` placeholders from her copy, currently just dropped rather than guessed:** her draft had "`[SEE NOTE 2]` a new internal desktop assistant" in `currently.building`, and "`[SEE NOTE 1]` Flipkart GRID" prefixing the recognition line. Neither note's actual content was ever supplied. Both are marked with `TODO` comments at their spot in `portfolio.ts` — ask her what they say rather than inventing a plausible-sounding qualifier.
- **`education.note` ("CGPA 8.19") is no longer rendered.** Her latest Background copy didn't include it when she rewrote that section as a flat list; the field is kept in `portfolio.ts` rather than deleted in case the omission was incidental, not a decision.
- **Nav order doesn't match her literal text.** She wrote "Case studies · Experience · About · Say hello" but the page order is Case Studies → About → Experience. Nav here follows page order (Case Studies, About, Experience) on the assumption that was a small dictation slip, not a deliberate "nav order independent of scroll order" choice — flag/fix if that assumption is wrong.
- **The hero's "Hi 👋, I'm" wave emoji was removed.** Her literal hero spec just said "Hi, I'm" with no emoji mentioned, after it had been added a few rounds earlier at her request for more whimsy. Read as an intentional simplification given the rest of this pass tightened the tone considerably — but it was inferred from an omission, not stated directly, so it's worth confirming rather than assuming.

## What this site is

Pratyusha's portfolio. It's about **who she is and how she works** — the work is
evidence for that, not the subject of it.

She's a software engineer at JPMorgan Chase moving toward product, and some of
the work here comes out of an AI product management programme she's doing. That
programme is **context on a card, never a section**. No syllabus, no week
numbers, no progress timeline, no course branding. A reader should finish this
site knowing how she thinks — not which cohort she enrolled in.

Same rule for her employer: JPMC is where she works, not what the site is about.

**Two audiences, at once:** external PM recruiters/hiring managers, and internal
JPMC stakeholders who could sponsor a move into a product role. The hero has to
answer "who is this, what do they do now, where are they going" in under seven
seconds; the whole page should triage in about a minute for someone skimming.

**Information hierarchy — do not reorder without asking:**

1. Hero — name, location, one flowing line stating engineering credibility
   (what she builds, at what real scale) and the product direction plainly —
   see the softened rule below on "transitioning into product"
2. Currently — building / learning / elsewhere, a compact strip right under
   the hero, not folded into About anymore
3. Case studies — exactly three, curated, each with its own `/work/:slug`
   page. Not a filterable grid of everything she's built.
4. About — bio only, nothing else folded in
5. Experience — its own section now, not condensed into About
6. Background — education, recognition, community, as a flat list. No
   separate card grid, no "Writing" card currently
7. Contact — the footer's CTA

This has changed shape twice already: it started as 6 sections (Hero/How I
work/Selected work/Experience/Currently/Background), got compressed to 4
(Hero/Case Studies/About/Contact) to fit a tight recruiter-scan brief, and is
now 7 — About, Experience, Currently, and Background separated back out once
real Experience/Background copy arrived that didn't fit a condensed block.
Don't assume either the 4-section or 6-section version is current.

The three case studies are, in this order: **Emergency Medical Response**
(self-directed discovery, framed around an ownership gap in the
pre-ambulance window, not a transport-speed problem) → **Worker Passport**
(gig-economy/quick-commerce, India — locked, "Coming soon") → **Bangalore
Food Bank** (proven, published, closes on established engineering
credibility). Product-direction work leads now; the engineering-credibility
piece closes — this flipped from an earlier ordering that led with
engineering credibility first, which the current copy explicitly overrode.
The JPMC work does **not** become a case study — see the hard rule below —
so the engineering case study is an existing personal/hackathon project
reframed with full case-study rigor instead.

## Content model

**All copy lives in `src/data/portfolio.ts`.** Components import from it; no
strings are hardcoded in JSX.

| Export | Renders as |
|---|---|
| `profile.name`/`location`/`tagline` | Hero |
| `profile.role` | `<title>` only — not shown on the page anymore |
| `profile.about` | About (bio only) |
| `currently` | Its own strip section, right after the hero |
| `work` + `typeLabels` | Case studies — curated 3 only, see `CaseStudies.tsx`'s `featuredSlugs`. `WorkItem.meta`/`.cta` override the default type/context/tools line and CTA per card when present |
| `stageLabels` / `stageOrder` | Belong to the older spine+blocks authoring system (`_authoring.md`), not the featured-3 anatomy — still used by `WorkItem.stages` typing, not rendered by `CaseStudies` |
| `experience` | Its own `Experience` section |
| `education`, `recognition`, `community` | `Background`, as a flat list |
| `skills.engineering.core` | **Not currently rendered anywhere** — it was Hero's toolkit strip, removed when it started duplicating `experience`'s stack tags. `skills.product`/`skills.tools` were never rendered. |
| `links` | Footer |
| `principles`, `writing` | Not currently rendered — orphaned along with `Principles.tsx` (see "Orphaned files" above) |

Long-form case content lives in `src/content/work/{slug}.md`, slug matching the
`work` entry. Route: `/work/{slug}`.

### `principles` — not currently on the site

The drafted principles are **inferred, not dictated** and were always meant to
be rewritten in her own words before publishing — that part hasn't changed.
What has changed: the IA restructure dropped the "How I work" section
entirely, so `principles` isn't rendered anywhere right now. That was a scope
call made under time pressure, not a considered decision to cut it forever —
if "How I work" comes back, this data is still here and still needs her voice
before it goes live.

## Writing a case page

**Two anatomies coexist here — know which one applies.**

**The 3 featured case studies** (`bangalore-food-bank`,
`emergency-medical-response-india`, `gig-economy-worker-passport`) use a fixed,
recruiter-oriented anatomy, in this order, every time:

TL;DR (problem → approach → outcome, 3 lines max) → Context → The problem (who
has it, why it matters) → Constraints → Research and discovery → Options
considered (a real table: option / why tempting / why not) → Decision and the
tradeoff it cost → What shipped (or what the concept is, labeled as such if
it's a concept, not a product) → How I'd measure success → What I'd do
differently.

Options-considered and what-I'd-do-differently are the highest-signal
sections and the ones most likely to get cut for length. Don't cut them.

**Any other case page** (the two archived engineering projects, anything added
outside the featured 3) uses the older, looser system in
`src/content/work/_authoring.md`: a fixed spine (summary → problem → … → what
I'd do differently) with optional blocks (`discovery`, `solution`, `scope`,
`ux`, `metrics`, `build`, `evals`) composed in based on how far the work went.
`stages`/`stageLabels`/`stageOrder` belong to *that* system, not the featured
anatomy above — `CaseStudies.tsx` doesn't currently render stage chips at all.

Engineering work usually needs no stages under the older system — leave the
field off rather than retrofitting product vocabulary onto a hackathon build.

### Adding new work

1. Add a `work` entry — slug named for the **subject**, never its origin
   ("meal-planning-prd", not "week-3-prd")
2. Create `src/content/work/{slug}.md` — the featured anatomy if it's going
   into `CaseStudies.tsx`'s curated 3, the older spine+blocks system otherwise
3. `status: "in-progress"` while drafting; `"published"` when every included
   section has real content, not a TODO placeholder

**Do not draft the body of a case unless explicitly asked.** A PRD she didn't
reason through is one she can't defend when someone pushes on the tradeoff.
Scaffolding, structuring, and challenging a draft is welcome. Ghostwriting isn't.

**Exactly three case studies are featured; everything else is archived, not
deleted.** `network-intrusion-detection` and `pen-in-the-air` still have real
published pages at their own URLs — they're just not in `CaseStudies.tsx`'s
`featuredSlugs` list, and not linked from anywhere in the main page flow.
Volume signals a course completed; depth signals judgement — that's still why
three, in full, beats five, thin.

## Content rules — hard constraints

- **Never invent facts.** No metric, user quote, research finding, interview
  count, outcome, or URL not already in the data or content files. Empty fields
  are intentional — leave them empty rather than filling them plausibly.
- **Never use JPMC work as case-study material.** The `experience` descriptions
  sit at a deliberately public level. Internal products, roadmaps, metrics, and
  architecture don't become case studies on a personal site. Flag it if a request
  drifts that way. *Tested once already: a brief asked for a JPMorgan project as
  case study #1 — the rule held, and `bangalore-food-bank` (existing, personal,
  hackathon work) got the full case-study treatment instead.*
- **No apologetic framing.** "Although I don't have direct PM experience..." or
  any variant. State what she's done; don't hedge around what she hasn't.
- **No framework name-dropping without the judgment call attached.** Naming
  RICE, JTBD, North Star, etc. is fine only when the actual tradeoff/decision
  that came out of using it is right there with it — never as a credential on
  its own.
- **"I", not "we", where the contribution was hers.** Be specific about her
  role on a team, don't launder it into a collective "we shipped."
- **Never turn the programme into a feature of the site.** No cohort branding,
  week numbering, curriculum listing, or completion framing. If work came out of
  it, `context` says so in six words.
- **Don't draft "aspiring", "transitioning into product", or "passionate
  about" on her behalf.** This rule constrains *my* drafting instincts, not her
  own words — she's since written "moving toward product management" herself,
  plainly, backed immediately by evidence, and that's fine. The failure mode
  this guards against is me generating hedgy, apologetic, career-pivot filler
  that reads as unearned or generated. Confident and specific beats apologetic;
  it doesn't have to avoid the subject entirely.
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
- Filter chips are real buttons with `aria-pressed`, not styled divs — dormant
  right now (`CaseStudies` has no filter UI, curated 3 don't need one), but
  the rule stands if filtering comes back
- Stage chips are non-interactive: mark up as a list, never convey coverage by
  colour alone — also dormant, same reason
- Locked case-study cards ("Coming soon") must not be reachable by keyboard —
  they're a plain `<div>`, not a disabled-looking link. Don't make a locked
  card focusable just to show a tooltip; there's nothing to focus toward.
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
