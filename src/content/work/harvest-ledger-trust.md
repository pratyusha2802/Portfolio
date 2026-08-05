---
slug: "harvest-ledger-trust"
title: "Harvest Ledger Trust"
type: "build"
status: "published"
date: "2022-08"
context: "Code for Good 2022"
hook: "Harvest Ledger Trust could only ask donors for an undirected sum and hope it stretched far enough — no way to give toward a specific item."
tools: ["JavaScript", "Node.js", "Express"]
---

## TL;DR

**Problem:** Harvest Ledger Trust could only ask for an undirected donation
and hope it stretched far enough — no way for a donor to give toward a
specific item the NGO actually needed. **Approach:** led the frontend on a
donation portal for donors and admins under a 24-hour hackathon constraint —
item-level giving, a cart and checkout, and an admin dashboard for inventory
and pricing. **Outcome:** a working demo prototype, judged at Code for Good
2022 — not a shipped or running service.

## Context

Code for Good 2022, JPMorgan Chase's social-impact hackathon. Team build, one
24-hour window. I led the frontend. The partner NGO's real name isn't shared
here — I'm using **Harvest Ledger Trust** as a stand-in throughout.

## The problem

Harvest Ledger Trust's donors could only give an undirected sum and trust it
would be used well — no way to see what the NGO actually needed and give
toward that specific item. The NGO had the mirror problem: no way to set
prices, run campaigns, or track inventory against what had actually come in.

## Constraints

- A hard 24-hour build window — no extensions, no second pass.
- A team setting: I owned the frontend, not the whole build.
- Target users on low-end Android phones, which is a real performance ceiling,
  not a nice-to-have.

## Research and discovery

None, formally — a 24-hour hackathon doesn't leave room for it. The problem
came from a Code for Good NGO partner brief, the event's usual format, not
something I sourced through interviews or field research.

## Options considered

| Option | Why it's tempting | Why not |
| --- | --- | --- |
| Keep donations as an undirected lump sum | Simplest possible form — one amount, one submit | The NGO can't steer what comes in, and a donor can't see their money land on anything specific |
| **Chosen: item-level giving** — a catalogue of priced items, a cart, checkout | Donor gives toward something concrete; NGO controls what's listed and at what price | More surface to build in 24 hours: a catalogue, a cart, a checkout, and an admin side to manage all of it |
| Rich, animated frontend | A more polished-looking demo | Target users are on low-end phones — exactly where that cost lands hardest |

## Decision and the tradeoff it cost

Chose item-level giving over a simpler undirected-sum form, which meant
building two connected surfaces instead of one in the same 24 hours: a
donor-facing catalogue, cart, and checkout, and a separate admin dashboard to
manage what's in that catalogue. The cost was real — less time for polish on
either side, on hardware (low-end Android) that punishes an unpolished
frontend the most.

## What shipped

On the donor side: a catalogue of items (staples like wheat, rice, toor dal,
and cooking oil, priced individually), a cart with an auto-calculated total,
and checkout. On the admin side: a JWT-authenticated dashboard to add, edit,
retire, and reprice items, and run campaign banners. A demo prototype, judged
at the hackathon. **This was not a shipped or running service** — it didn't
go further than the event. A
[deck](/Portfolio/food-donation-portal.html) walks through the concept and
the approach — it's team work, so it also names the rest of
the team and both mentors alongside my own contribution. A [rebuilt
interactive
prototype](https://claude.ai/code/artifact/e498540c-0e4e-4120-b039-990643e84004)
is linked above too — it demonstrates the donor and admin flows in the
browser. Both are recreations, built later for this portfolio, not the
original hackathon files.

## How I'd measure success

There wasn't a metric tracked. This was judged by hackathon evaluators against
other demos, not measured against usage data — there was no usage to measure.

## What I'd do differently

The team scoped the rest deliberately, as future work rather than something
missed: volunteer accounts, live market pricing pulled from an external API
instead of prices the admin sets by hand, and inventory visualized as charts
and dashboards rather than a plain list. Given a second day, live pricing is
where I'd start — it's the piece that keeps the catalogue honest without an
admin manually checking prices against the market.

This hackathon is also how I ended up at JPMorgan Chase.
