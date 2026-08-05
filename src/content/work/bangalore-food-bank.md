---
slug: "bangalore-food-bank"
title: "Bangalore Food Bank"
type: "build"
status: "published"
date: "2022-08"
context: "Code for Good 2022"
hook: "Surplus food and the people who need it exist in the same city and rarely find each other in time."
tools: ["React", "Node.js", "Express"]
href: ""
---

## TL;DR

**Problem:** surplus food and the people who need it exist in the same city, but
rarely find each other before the food's no good. **Approach:** led the
frontend under a 24-hour hackathon constraint, scoped to one working flow
instead of four shallow ones, built for low-end Android phones. **Outcome:** a
working demo prototype, judged at Code for Good 2022 — not a shipped or
running service.

## Context

Code for Good 2022, JPMorgan Chase's social-impact hackathon. Team build, one
24-hour window. I led the frontend.

## The problem

Two sides of the same gap: people and organizations with surplus food nearing
spoilage, and volunteers who could redistribute it, with no shared real-time
way to coordinate before the window to act closes.

## Constraints

- A hard 24-hour build window — no extensions, no second pass.
- A team setting: I owned the frontend, not the whole build.
- Target users on low-end Android phones, which is a real performance ceiling,
  not a nice-to-have.

## Research and discovery

None, formally — a 24-hour hackathon doesn't leave room for it. The problem
was given or selected at the event itself, not something I sourced through
interviews or field research.

*TODO — I don't have a confirmed answer for whether this specific problem came
from a Code for Good NGO partner brief (the event's usual format) or was
chosen by the team from a shortlist. Flagging rather than asserting either way;
happy to correct this once confirmed.*

## Options considered

| Option | Why it's tempting | Why not |
| --- | --- | --- |
| Build all 4 planned flows, shallowly | Demo shows the full breadth of the concept | Nothing would work end-to-end in 24 hours |
| Rich, animated frontend | A more polished-looking demo | Target users are on low-end phones — exactly where that cost lands hardest |
| **Chosen: one flow (surplus → volunteer matching), lean frontend** | Something real works, on real target hardware | Everything else planned (history, alerts) stayed unbuilt |

## Decision and the tradeoff it cost

Chose depth over breadth: one working flow instead of four partial ones. The
cost was real — no notification or persistence layer, so a volunteer had to
actively check the app for new surplus rather than being alerted to it.

## What shipped

A demo prototype, judged at the hackathon. **This was not a shipped or running
service** — it didn't go further than the event.

<ol class="flow-diagram">
  <li>
    <span class="flow-diagram__label">Surplus posted</span>
    <span class="flow-diagram__detail">Person or org lists food nearing spoilage</span>
  </li>
  <li>
    <span class="flow-diagram__label">Volunteer checks the app</span>
    <span class="flow-diagram__detail">Browsed nearby surplus — no alert, had to look</span>
  </li>
  <li>
    <span class="flow-diagram__label">Pickup</span>
    <span class="flow-diagram__detail">Volunteer collects and redistributes</span>
  </li>
</ol>

The gap between steps 1 and 2 is exactly the "what I'd do differently" below —
a volunteer had to think to check, rather than being told.

## How I'd measure success

There wasn't a metric tracked. This was judged by hackathon evaluators against
other demos, not measured against usage data — there was no usage to measure.

## What I'd do differently

The call to scope down to one flow was right for a 24-hour deadline, but a
matching flow with no notification layer doesn't survive past the demo. Given
a second day, I'd add the piece that makes it a running service rather than a
hackathon prototype — some way for a volunteer to be notified when new surplus
appears nearby, instead of only being able to browse it.

This hackathon is also how I ended up at JPMorgan Chase, which I didn't plan
going in.
