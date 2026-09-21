---
name: add-case-study
description: How to add or structure a new case study on Pratyusha's portfolio site — which of the two in-repo page anatomies applies (the fixed recruiter-oriented anatomy vs. the older spine+blocks system), and the step-by-step process for adding a work entry, its content file, and its position in the case-studies grid. Use when creating a new case study, deciding which anatomy a case should use, or reordering `orderedSlugs`.
---

## Writing a case page

**Two anatomies coexist here — know which one applies. This split predates,
and is independent of, the 2026-09-10 change to show every case study
instead of a curated top 3 — don't conflate "uses the fuller anatomy" with
"is featured"; nothing is curated out anymore, but not every case gets the
same depth of write-up.**

**The richer case studies** (`scopesync`, `convenience-economy-india`,
`elder-care-india`, `harvest-ledger-trust` — check `CaseStudies.tsx`'s
`orderedSlugs` for the current full set, this list has gone stale before)
use a fixed, recruiter-oriented anatomy, in this order, every time:

TL;DR (problem → approach → outcome, 3 lines max) → Context → The problem (who
has it, why it matters) → Constraints → Research and discovery → Options
considered (a real table: option / why tempting / why not) → Decision and the
tradeoff it cost → What shipped (or what the concept is, labeled as such if
it's a concept, not a product) → How I'd measure success → What I'd do
differently.

Options-considered and what-I'd-do-differently are the highest-signal
sections and the ones most likely to get cut for length. Don't cut them.

**Any other case page** (currently `pen-in-the-air`) uses the older, looser
system in `docs/_authoring.md`: a
fixed spine (summary → problem → … → what I'd do differently) with optional
blocks (`discovery`, `solution`, `scope`, `ux`, `metrics`, `build`, `evals`)
composed in based on how far the work went. `stages`/`stageLabels`/`stageOrder`
belong to *that* system, not the fuller anatomy above — `CaseStudies.tsx`
doesn't currently render stage chips at all.

Engineering work usually needs no stages under the older system — leave the
field off rather than retrofitting product vocabulary onto a hackathon build.

### Adding new work

1. Add a `work` entry — slug named for the **subject**, never its origin
   ("meal-planning-prd", not "week-3-prd")
2. Create `src/content/work/{slug}.md` — the fuller anatomy for a piece with
   real decisions and rigor behind it, the older spine+blocks system for a
   smaller/simpler build (see "Writing a case page" above for which is which)
3. `status: "in-progress"` while drafting; `"published"` when every included
   section has real content, not a TODO placeholder
4. Add the slug to `CaseStudies.tsx`'s `orderedSlugs`, positioned by depth
   of real evidence against what's already there — not appended at the end
   by default, and not placed by track or by date

Remember: **do not draft the body of a case unless explicitly asked** (see
root `CLAUDE.md`) — this skill covers structure and process, not ghostwriting
the content itself.

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
