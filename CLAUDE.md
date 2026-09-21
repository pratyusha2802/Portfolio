# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Read `docs/RELEASING.md` before running any `git push`.** It has one hard
rule: never push to `origin` (either branch) without an explicit, same-turn
confirmation — earlier approval doesn't carry forward. This exists because
that rule got broken, more than once, and it briefly took the live site back
to an old template with a third party's personal data in it. `docs/RELEASING.md`
also covers the version/changelog step required before every deploy. All spec
docs (`RELEASING.md`, `CHANGELOG.md`, `_authoring.md`) live under `docs/`;
this file stays at the repo root because Claude Code only auto-loads
`CLAUDE.md` from there.

## Commands

There is no test suite in this project.

**Prettier scope:** `.prettierignore` excludes `about.html`/`work.html` (legacy pre-React
template remnants, not part of this app) and all `*.md` files (hand-formatted prose —
Prettier's markdown rewrap fights deliberate line breaks in `CLAUDE.md` and the case-study
content). It formats the actual app source: `src/**`, `index.html`, config files. oxlint and
Prettier don't fight each other here — oxlint's default config (see below) doesn't enable
stylistic/formatting rules, only correctness ones, so there's no overlap to reconcile.

**Node version:** Vite 8 requires Node ^20.19 or >=22.12. The default system Node here is v20.17.0, which prints a version warning but still works. Node v23.11.0 is available via `nvm` (`nvm use 23.11.0`) if the warning needs to go away.

**Native binding gotcha:** Vite 8 uses the rolldown bundler, and oxlint ships the same way — both distribute their actual binary as a platform-specific optional dependency (`@rolldown/binding-darwin-arm64`, `@oxlint/binding-darwin-arm64` here) that a fresh install can silently fail to pull in on this machine (an [npm optional-deps bug](https://github.com/npm/cli/issues/4828)), causing `Cannot find module './rolldown-binding.darwin-universal.node'` or oxlint's equivalent `Cannot find native binding`.

Two things fixed this properly, after an earlier attempt (hard-pinning these as regular `dependencies`) turned out to actively break the GitHub Actions deploy — a `darwin-arm64`-only package as a *required* dependency makes `npm ci` hard-fail on Linux runners, since a platform mismatch on a required dep is an error, not a skip.

1. **They're `optionalDependencies` now, not regular ones.** This is what lets Linux CI skip them gracefully (correct — Linux needs the Linux binaries, which vite/oxlint resolve themselves) while still installing on a matching platform.
2. **The bug itself is npm-version-specific, not project-specific.** It reproduces reliably with npm 10.8.2 (bundled with the default system Node 20.17.0 here) but not with npm 11.2.0 (bundled with Node 23.11.0, available via `nvm use 23.11.0`). If a fresh install is missing a binding, switching Node versions first (`nvm use 23.11.0`) is the real fix — the old manual `npm install @scope/pkg@version` workaround still works too if switching Node isn't convenient, but don't reach for hard-pinning these as required dependencies again; that's what broke deployment.

## Architecture

React SPA on Vite, TypeScript strict, `react-router-dom` for client-side routing. No CMS, no server — everything ships as static files.

- **`src/data/portfolio.ts`** is the single source of truth for all copy — see "Content model" below for what each export renders as. **To change what the site says, edit this file, not a component.**
- **`src/content/work/{slug}.md`** — long-form case content for entries in `work`, one markdown file per slug, loaded at build time via `import.meta.glob` and parsed by `src/lib/markdown.ts` (a small hand-rolled frontmatter parser + `marked` for the body — deliberately not `gray-matter`, which assumes a Node `Buffer` global the browser doesn't have). The authoring guide lives at `docs/_authoring.md`, outside this folder so the loader never has to special-case it.
- **`src/components/`** — `Hero`, `Currently` (the "building/learning/elsewhere" strip, `id="currently"`, right after the hero), `CaseStudies` (shows every published work item, ordered by depth, `id="work"`), `About` (bio only now, `id="about"`), `Experience` (`id="experience"`), `Background` (`id="background"`), `Footer`, `Nav`. Each presentation-only, reading from `portfolio.ts`.
- **`src/index.css`** is the only stylesheet — global, BEM-ish class names, CSS custom properties in `:root` for the forest/paper theme. No CSS modules or scoping.
- **`public/`** — `photo.jpg` (hero headshot, referenced directly as `/photo.jpg`, not part of `portfolio.ts`). There's no local résumé file — `links`' Résumé entry points to an external Google Drive URL instead (see "Known gaps" — that file's sharing permission still needs to be set to "Anyone with the link" for it to actually work for visitors).

**Orphaned files — not deleted, not wired up.** `Principles.tsx` and `SelectedWork.tsx` are still on disk but nothing imports them. They compile fine in isolation (that's why `tsc`/`oxlint` stay clean with them present) but are dead code. Left in place rather than deleted since this repo has no git history to fall back on if that turns out to be wrong — delete them once that's confirmed, don't silently resurrect them. (`Currently.tsx` and `Background.tsx` *were* in this list too, in the previous IA — both are back in active use now, un-orphaned rather than rebuilt from scratch. `Experience.tsx` was fully deleted at one point — see next paragraph — then recreated as a new file once it became its own section again.)

See `src/data/CLAUDE.md` for why the Experience data model (`Position`/`CompanyExperience`) is shaped the way it is — it changed twice, and that history explains why not to "simplify" it back.

**Known gaps, not yet built:**
- **`links` are all filled in now** (GitHub, LinkedIn, Medium, Résumé, Email) — this was the single biggest concrete blocker and it's closed. One catch: the Résumé link is a Google Drive share URL, and as of when it was added, fetching it returned a sign-in/permission-required page, not the file — the Drive sharing setting needs to be "Anyone with the link" or visitors hit a wall. Verify this before treating the résumé link as actually working.
- **No real no-JS fallback.** This is a client-rendered React SPA — if JS fails to execute at all (not just `IntersectionObserver` support, which `useRiseAnimation` already handles), nothing renders, not even degraded static content. That's a direct tension with "content must still render if scroll-reveal JS fails" as a stated craft goal; fixing it for real means prerendering/SSR, which wasn't in scope for the React-SPA-stays decision. Flagged, not fixed.
- **Sub-3s-on-4G and Lighthouse have not been measured** against this build — no browser tooling was available when it was assembled. Don't report either as passing without actually running them.
- **Per-page OG image/meta tags** aren't implemented — same root cause as the no-JS gap (client-only SPA, no prerendering), so crawlers that don't execute JS only ever see `index.html`'s static tags.
- **Live Medium feed** isn't implemented. `writing.feedUrl` is empty; nothing currently renders `writing` at all (it was dropped from `Background` when that section got rewritten to a flat list — revisit if that was wrong).

## Content notes

- The resume/profile content was originally distilled from a much larger raw export (full academic transcripts, every hackathon, every certification). The site deliberately shows only the highlights — don't re-expand sections back to the full raw dump without being asked.
- **`profile.about` describes the JPMC Core UI role as "extensible" — teams building add-ons that plug in and ship on independent release cycles, Core UI owning the shared layer they depend on.** This was flagged once as reading like the kind of architecture/release-process detail the NDA rules ban, and she included it again anyway in her own words (and again, unprompted, in `experience`'s project note). Treat that as a confirmed, deliberate call about where her own NDA line actually sits — don't re-flag it, and don't use it as precedent to add *more* architecture detail elsewhere without the same explicit confirmation.
- **The `[SEE NOTE 2]` placeholder in `currently.building` is still unresolved** — her original draft had "`[SEE NOTE 2]` a new internal desktop assistant" and the note's actual content was never supplied. Still marked with a `TODO` comment in `portfolio.ts` — ask her rather than guessing. (The matching `[SEE NOTE 1]` on the Flipkart GRID line is moot now — see below, that whole line is gone from Background.)
- **Background is college-only now, by explicit instruction.** `recognition` dropped Flipkart GRID and GirlScript Summer of Code (neither is a college credential); `community` (Robin Hood Army, Force For Good) was emptied entirely — both are post-graduation. `recognition` kept the MMVY merit scholarship since it's tied to the degree itself. `education.note` ("CGPA 8.19") is back in the rendered output — it had briefly been dropped, then explicitly asked for back as "other relevant info" once Background narrowed to college-only. Don't re-add Flipkart/GirlScript/community entries without being asked; don't re-drop CGPA either.
- **`currently.learning`/`currently.elsewhere` now end mid-sentence ("...programme at", "...documenting it at") by design** — the link (`learningLink`/`elsewhereLink`) completes the sentence inline rather than sitting on its own line as a separate badge. `Currently.tsx` renders these as a plain underlined inline link (`.currently__inline-link`), not the pill/icon treatment used earlier — that pill design is gone, don't bring it back for this section without a reason. `building` has no link and gets a plain trailing period instead.
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
3. Case studies — every published (and locked-in-progress) piece of work,
   each with its own `/work/:slug` page, hand-ordered by depth of real
   evidence rather than curated down to a top 3. Changed 2026-09-10 (see
   below). Not filterable.
4. About — bio only, nothing else folded in
5. Experience — its own section now, not condensed into About
6. Background — education, recognition, community, as a flat list. No
   separate card grid, no "Writing" card currently
7. Contact — the footer's CTA

This has changed shape three times now: it started as 6 sections (Hero/How I
work/Selected work/Experience/Currently/Background), got compressed to 4
(Hero/Case Studies/About/Contact) to fit a tight recruiter-scan brief, went
to 7 once About, Experience, Currently, and Background were separated back
out for real copy that didn't fit a condensed block, and the Case Studies
section itself changed shape again on 2026-09-10 (see below). Don't assume
the 4-section or 6-section version, or a curated-top-3 Case Studies section,
is current.

**Case studies stopped being curated down to a top 3 on 2026-09-10.**
Every published piece of work (plus the one locked-in-progress scaffold)
now shows, hand-ordered by depth of real evidence — real, shipped work
with the strongest proof leads; desk-research-only concepts and the locked
scaffold trail behind proven builds. The order lives in `CaseStudies.tsx`'s
`orderedSlugs` array; don't assume any specific ordering stated in prose
here stays accurate without checking that array directly, the same caution
that applied to the old `featuredSlugs` list. This reversed the site's
earlier explicit "volume signals a course completed, depth signals
judgement, that's why three" stance (see "Adding new work" below) — the new
call is that depth can still be the ordering principle without also being a
cutoff; showing more work isn't the same failure mode as showing
undifferentiated work, as long as the strongest evidence still leads.
The JPMC work does **not** become a case study — see the hard rule below —
so the engineering case studies are existing personal/hackathon/academic
projects reframed with full case-study rigor instead.

## Content model

**All copy lives in `src/data/portfolio.ts`.** Components import from it; no
strings are hardcoded in JSX.

| Export | Renders as |
|---|---|
| `profile.name`/`location`/`tagline` | Hero |
| `profile.role` | `<title>` only — not shown on the page anymore |
| `profile.about` | About (bio only) |
| `currently` | Its own strip section, right after the hero |
| `work` + `typeLabels` | Case studies — every published item, ordered by depth, see `CaseStudies.tsx`'s `orderedSlugs`. `WorkItem.meta`/`.cta` override the default type/context/tools line and CTA per card when present |
| `stageLabels` / `stageOrder` | Belong to the older spine+blocks authoring system (`docs/_authoring.md`), not the featured-3 anatomy — still used by `WorkItem.stages` typing, not rendered by `CaseStudies` |
| `experience` | Its own `Experience` section |
| `education`, `recognition`, `community` | `Background`, as a flat list |
| `skills.engineering.core` | **Not currently rendered anywhere** — it was Hero's toolkit strip, removed when it started duplicating `experience`'s stack tags. `skills.product`/`skills.tools` were never rendered. |
| `links` | Footer |
| `principles`, `writing` | Not currently rendered — orphaned along with `Principles.tsx` (see "Orphaned files" above) |

Long-form case content lives in `src/content/work/{slug}.md`, slug matching the
`work` entry. Route: `/work/{slug}`.

### `principles` — her final words now, partially surfaced

`principles` is `string[]` — four short standalone lines, her own final
wording (not the earlier inferred claim/detail drafts, which are gone). No
elaboration exists underneath them and none should be invented. Two of the
four ("Debugs products, not just code", "Part systems thinker, part
storyteller") are used as the hero's arrow-annotation captions. "Engineer
turned PM" is deliberately *not* used there — the hero tagline already states
the same thing in prose, right next to where an arrow would point. "Ships
with intent" isn't used anywhere yet.

A full "How I work" section (`Principles.tsx`) still exists on disk, updated
to render these as plain lines instead of the old claim/detail cards, but
it's not wired into `Home.tsx` — same orphaned status as before, just no
longer broken by the shape change.

## Adding new work

See the `add-case-study` skill for the case-page anatomy (which of the two
in-repo formats applies) and the step-by-step process for adding a work
entry.

**Do not draft the body of a case unless explicitly asked.** A PRD she didn't
reason through is one she can't defend when someone pushes on the tradeoff.
Scaffolding, structuring, and challenging a draft is welcome. Ghostwriting isn't.

**Every published case study shows now; nothing is curated out.** This
reversed the site's earlier "volume signals a course completed, depth
signals judgement, that's why three" stance — as of 2026-09-10, depth is
the ordering principle, not a cutoff. `pen-in-the-air` is real, published,
and visible in the main grid like everything else, just ordered behind the
case studies with deeper evidence behind them — "show everything" doesn't
mean "show unfinished work as if it were real," it means nothing finished
gets hidden. `network-intrusion-detection` and the locked
`gig-economy-worker-passport` scaffold were removed entirely on 2026-09-10
at her request — deleted from `work` and `orderedSlugs`, and their `.md`
files removed, not archived.

## Content rules — hard constraints

- **Never invent facts.** No metric, user quote, research finding, interview
  count, outcome, or URL not already in the data or content files. Empty fields
  are intentional — leave them empty rather than filling them plausibly.
- **Never use JPMC work as case-study material.** The `experience` descriptions
  sit at a deliberately public level. Internal products, roadmaps, metrics, and
  architecture don't become case studies on a personal site. Flag it if a request
  drifts that way. *Tested once already: a brief asked for a JPMorgan project as
  case study #1 — the rule held, and `harvest-ledger-trust` (existing,
  personal, hackathon work) got the full case-study treatment instead.*
- **The `harvest-ledger-trust` case study uses a mock NGO name.** The real
  partner NGO's name is under an NDA-style confidentiality constraint and
  must not appear anywhere on the site — not in copy, not in a linked file,
  not in the URL slug. "Harvest Ledger Trust" is a stand-in, stated as such
  in the case study's Context section. A first attempt at a mock name,
  "Anna Setu," turned out to itself be a real NGO's name and was replaced —
  don't reuse "Anna Setu" either. Before picking any future replacement name,
  verify it isn't a real org (web search) rather than assuming an invented-
  sounding name is safe. The real event deck
  (`public/bangalore-food-bank-deck.html`, filename kept as-is since renaming
  it wouldn't scrub the real name from git history anyway) names the real NGO
  throughout its own content and is intentionally **not linked** from the
  site for this reason — don't re-link it. `public/food-donation-portal.html`
  is a *different* file: a from-scratch recreation of the deck, anonymized
  to "Harvest Ledger Trust" throughout, and it *is* linked from the case
  study ("View deck"). If asked to add detail to this case study, only use
  what's already in the anonymized `.md`/`portfolio.ts`/`food-donation-portal.html`
  content; don't pull from the original, real-named deck.
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
  right now (`CaseStudies` has no filter UI even after showing every case
  study), but the rule stands if filtering comes back
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
