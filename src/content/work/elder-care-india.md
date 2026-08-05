---
slug: "elder-care-india"
title: "Paarth — Elder Care Discovery in India"
type: "case-study"
status: "published"
date: "2026-08"
context: "AI product management programme, 2026"
hook: "Adult children arranging elder care for ageing parents in India aren't short on providers — home nursing, caregivers, assisted living all exist. What's missing is a single trusted place to find, compare, and verify them. Paarth is a concept for that discovery layer."
tools: []
href: "https://claude.ai/code/artifact/155cdbed-1dff-47b8-9c25-eceb00f78503"
---

## TL;DR

**Problem:** adult children arranging elder care for ageing parents in India
aren't blocked by a lack of services — they're blocked by having no single
trusted place to discover, compare, and verify them. **Approach:** research
across 48 survey responses and interviews spanning seven stakeholder groups,
testing two hypotheses that both failed or held only thinly, before the data
converged on discovery and coordination as the real gap. **Outcome:** a PRD
recommending Paarth, a two-sided discovery platform — a concept, not a
shipped product.

## Context

A 12-person team deliverable (Team Token Tikkas) from an AI product
management programme, submitted August 2026. My work spanned primary and
secondary research, the hypothesis testing that drove the pivot to the final
problem statement, solution design and MVP scoping, and writing the team's
PRD.

## The problem

Research into India's elder care ecosystem surfaced a paradox: the market
isn't short on services. Home healthcare, home nursing, teleconsultation,
medication management, emergency response, assisted living, and caregiver
agencies all already exist — India's home healthcare market alone was valued
near USD 6.2 billion. What was missing, consistently, was a single trusted
place for families to find, compare, and verify them.

Two hypotheses were tested against primary research (48 survey responses
across adult children, elderly respondents, caregivers, NGO workers, and
healthcare professionals, plus a 61-question interview series across seven
stakeholder groups) before landing here. The first — that childless or
family-less elders face the sharpest unmet need — failed against the data:
none of the surveyed elderly respondents were without family support, even
the one living alone. The second — that caregiver trust and sourcing is
adult children's top named pain point — held only partially: just 2 of 32
adult-child respondents named it unprompted, ranking behind distance from
parents, local service quality, and parental resistance to care, and even a
verified caregiver hire failed in one interview (slept on duty, missed
medicines, theft).

What the data converged on instead: half of surveyed adult children (16 of
32) were unaware professional elder care services existed at all; more than
half (17 of 32) live apart from their parent; involvement in arranging care
splits unpredictably across siblings, the parent, other relatives, and
doctors rather than following one channel; families plan reactively,
typically only after a health crisis; and trust in a caregiver required both
background verification and a personal recommendation together — either
alone left the large majority of respondents unconvinced. The common thread
across all four findings was discovery and coordination, not care
availability itself.

## Constraints

- India has limited long-term care insurance — health insurance covers
  hospitalization, not ongoing home-based care — so families carry nearly all
  of the cost themselves.
- No universally accepted caregiver registry or certification exists;
  verification is informal, word-of-mouth work.
- The market is fragmented across caregivers, hospitals, pharmacies,
  diagnostics, and equipment suppliers, with no single entity coordinating a
  family's path through it.
- A 12-person team, one deliverable, on a programme deadline — scope had to
  be prioritized, not exhaustive.

## Research and discovery

Research combined 48 survey responses (32 adult children, 8 elderly
respondents, 4 caregivers, 2 NGO workers, 2 healthcare professionals) with a
61-question semi-structured interview series across seven stakeholder groups,
plus three additional contributions from an old-age-home operator, a
caregiver-platform founder, and independent workforce research.

Driving the pivot away from both starting hypotheses and toward the pattern
the data actually showed — that families weren't blocked by a shortage of
trustworthy care, but by not knowing where to look for it — was my work
directly.

## Options considered

| Option | Why it's tempting | Why not |
| --- | --- | --- |
| Direct care provider | Full control over hiring, training, and quality | Owns liability and scheduling costs that scale with volume, not below it — and competes with the supply-side partners the platform needs |
| Reviews-only platform | Low build cost, easy to launch | Never touches the booking moment or its data — no leads or reduced admin work for providers, so no reason to stay engaged |
| **Chosen: two-sided aggregator with handoff** | Software-light — providers deliver care, not the platform — while still capturing the booking moment | Less control over quality and the transaction itself once a user is handed off; accepted for speed and capital efficiency, revisitable later |

## Decision and the tradeoff it cost

The team chose a two-sided aggregator that hands users off to a provider's
own site to complete booking, rather than owning bookings and payments
directly. That kept the platform software-light and avoided taking on
hiring, training, and liability costs that would scale with volume. The real
cost: no visibility into what happens after handoff — a slow or broken
provider website, or a provider who simply doesn't convert a lead, becomes a
failure the platform can neither see nor fix.

I worked on this comparison and the MVP scope that followed from it —
location/care-type search, filters, a service detail and reviews view, and
mobile-number capture before redirect — deliberately leaving booking,
payments, and a provider dashboard for a later phase.

## What shipped / what the concept is

Paarth is a **concept** — a PRD, not a shipped product. It proposes a
two-sided elder-care discovery platform: adult children search by location
and care type, filter and compare providers, and get redirected to the
provider's own site to complete booking; providers get visibility and
qualified demand without paying for it upfront. Scoped to 5 Indian cities for
initial launch. A [working prototype of the concept exists as a Claude
artifact](https://claude.ai/code/artifact/155cdbed-1dff-47b8-9c25-eceb00f78503) —
it's cohort work, so it also names the teammates and mentors on the project
alongside my own contribution.

## How I'd measure success

The PRD defines two targets for the concept, both hypothetical — nothing has
shipped or been measured: a 15–20% search-to-booking conversion rate within 3
months of launch, and an 80%+ redirect-completion rate (users who enter a
phone number and actually reach the provider's site). Neither is a result;
both are what the team judged "working" would look like.

## What I'd do differently

The handoff model's biggest open risk is one the PRD names but doesn't
resolve: provider participation. A discovery platform is only as useful as
the supply behind it, and there's no confirmed answer for how agencies get
persuaded to onboard before there's a user base to justify it — the classic
two-sided cold-start problem. If I were taking this further, I'd want that
answered with real provider conversations before writing another line of the
MVP spec, not after.

What stuck with me from this project wasn't the platform concept — it was
how wrong the starting hypotheses were. Family-less elders, the more dramatic
framing, wasn't a real segment in the data at all. Caregiver trust, the
obvious pain point, was only a minor one. The actual problem only became
visible by looking at what four unrelated findings had in common, not by
chasing the hypothesis that sounded most compelling going in. Evidence over
intuition is easy to say and easy to skip once there's a deadline attached.
