---
slug: "scopesync"
title: "ScopeSync: Make the Internet Learnable"
type: "case-study"
status: "published"
date: "2026-08"
context: "AI product management programme, 2026"
hook: "Professionals are now expected to work with AI and technical tools they were never taught. Watching a video about it rarely leaves anyone able to actually use it."
tools: ["Next.js", "TypeScript", "Supabase", "Gemini", "Groq", "Tailwind CSS", "Zustand"]
---

## TL;DR

**Problem:** non-technical professionals (PMs, marketers, HR, founders, finance,
ops) are expected to build real fluency with AI and technical tools fast, but
existing options (YouTube tutorials, generic bootcamps, ad-hoc ChatGPT use)
optimize for content consumed, not capability built. **Approach:** built
ScopeSync over about a week, then put it in front of real strangers for a
single-day live launch test, not a demo walkthrough: paste a resource, get a
sequenced path, and don't count a lesson as done until you've demonstrated
understanding through it. **Outcome:** 19 real signups, a real (partial)
funnel, and the sharpest lesson of the day had nothing to do with the
curriculum: a database migration silently disabled the entire gamification
layer mid-launch, found by using my own product, not by looking at data.

## Context

Built as the final deliverable of an AI product management case-study
challenge: design a learning product that moves non-technical professionals
from "I don't understand technology" to "I can confidently use and build with
it," with Duolingo's habit-forming loop as the reference point. No predefined
user, problem, or curriculum, that part was mine to decide. The product was
built over roughly a week; the challenge's own test was a single-day live
launch in front of real, unscreened users.

## The problem

AI and technical fluency have moved from an engineering-only skill to an
everyday expectation across PM, marketing, HR, ops, and finance roles, faster
than most professionals' formal training prepared them for. The content to
close that gap already exists in abundance. What's missing is what happens
after opening it: no sequencing, no forced engagement, no application, and no
reason to come back tomorrow. The size of the content pile is itself a
deterrent. Consumption keeps getting mistaken for capability.

## Constraints

- A single-day real-user launch window: no gating, no waitlist, no do-over if
  something broke, which something did.
- No budget for paid acquisition or research incentives. Reach limited to my
  own network, one LinkedIn post, and whatever an in-product referral link
  could generate on its own.
- Free-tier AI providers (Gemini, Groq) with real rate limits. I hit them in
  production during the launch.
- Solo across product, research, design, and engineering: no team to divide
  the work across.

## Research and discovery

No pre-build interviews. Given a single-day real-user test as the actual
deliverable, I chose to learn from real behavior fast rather than front-load
discovery before anything existed to react to: 48 hours of instrumentation
(roughly 30 event types, a custom Supabase event log mirrored to Mixpanel)
across the launch window. What that produced: onboarding wasn't where people
left (17 of 19 signups completed a four-question flow), referral quietly
outperformed a cold LinkedIn post (35% of signups vs. 30% from LinkedIn), and
the real gap sat between starting and finishing (15 paths created, 0 fully
completed), a number I can't fully trust on its own, because of what happened
next.

## Options considered

| Option | Why it's tempting | Why not |
| --- | --- | --- |
| Interview a recruited panel before building anything | Lower risk, cleaner data, no live production surface to break | The case's own test was real usage, not opinions about a concept. A panel's stated preferences don't reveal what a live migration failure looks like |
| Screen participants for a clean, representative sample | Would make every stat above defensible as a rate, not just a count | Trades away reach and speed at a scale (19 users) where screening would have meant almost no users at all |
| **Chosen: ship a real, live product and observe unscreened real usage** | The only way to find an operational failure that only appears when a stranger actually touches the product | Directly cost the launch its cleanest read on completion: I can't separate genuine mid-path drop-off from a motivation loop that wasn't running for part of the window |

## Decision and the tradeoff it cost

The real decision was upstream of any single feature: test with a live
product and real strangers on launch day, instead of a safer walkthrough or
a research-first approach. That decision is exactly what surfaced the
launch's most important finding, and what makes one of its three
headline numbers unusable on its own.

Partway through the launch window, a missing database migration silently
disabled XP, streaks, and badges, the entire motivation loop the product's
core hypothesis rests on. I found it by using my own product, not by
noticing it in a dashboard. That's the gap shipping actually teaches: the
distance between "the feature is built" and "the feature is running for a
real user" is invisible until someone checks. The fix shipped and deployed
the same day. It does not repair the launch-day dataset: the 15
paths-created-to-0-completed figure is now confounded between real
drop-off and a broken reward loop, and I'm carrying that honestly rather
than picking whichever explanation flatters the number. A smaller, quieter
launch (a walkthrough, a handful of friendly testers) would never have
found this bug, and also would never have told me anything real.

## Goals and requirements

**In scope for v0.1:** turn any single source (video, article, PDF, or bare
topic) into a structured, scoped learning path; verify understanding through
active demonstration, not passive completion; personalize register and depth
to the learner's self-reported technical comfort; make progress and mastery
visible and motivating; measure activation, retention, and content quality
from day one.

**Explicitly out of scope for v0.1:** synthesizing multiple sources into one
path, team or organization accounts, authoring tools for someone else to
build a path for a learner, native mobile apps.

| Area | Requirement | Status |
| --- | --- | --- |
| Ingestion | Accept a YouTube link, article URL, PDF upload, or bare topic string | Shipped |
| Ingestion | Score each resource for quality, difficulty, and relevance before use | Shipped |
| Ingestion | Synthesize a path from more than one source at a time | Known gap |
| Lessons | Generate a structured path scoped to the source content | Shipped |
| Lessons | Adjust explanation register to the learner's stated comfort level | Shipped (fixed post-launch) |
| Lessons | In-lesson AI Q&A ("Ask Compass") for anything unclear mid-lesson | Shipped |
| Verification | AI-evaluated build challenge in a visual, node-based playground | Shipped |
| Verification | Interview-practice mode, scored on correctness and clarity | Shipped |
| Motivation | XP, streaks, and badges tied to real learning actions, not logins | Shipped (broke mid-launch, see above) |
| Measurement | Event instrumentation and an internal funnel/retention/growth dashboard | Shipped |

**Roadmap, in order:** re-measure completion depth on the now-fixed build;
pull the AI-pipeline failure rate against free-tier rate limits; multi-source
learning paths, the most-requested gap; long-video content quality, capped
transcript length degrades a 6-hour video into a shallow summary; a more
granular, directly navigable learning map.

## What shipped

A live, working product tested end to end by strangers, not a prototype:

- Resource intake from a pasted URL or an uploaded PDF, AI-ranked and scoped
  into a sequenced learning path.
- A four-step lesson loop, Understand, Check, Apply, Explain, so a lesson
  only counts as done once it's been demonstrated, not just viewed.
- Three challenge types (build, interview-style, and a visual playground) to
  apply a concept, not just recall it.
- A full gamification layer: XP, day streaks, badges, and a Learning Map
  visualizing accumulated progress.
- An in-product referral link with attribution tracking, which ended up
  outperforming a cold LinkedIn post.
- A multi-provider AI fallback chain (Gemini, then Groq, then a
  deterministic mock) so a rate-limited provider degrades the experience
  instead of breaking it, a real production condition on launch day.
- A full analytics and admin layer (funnel, retention, growth) instrumented
  from day one, not bolted on after.

From the live product:

![Sequenced learning path roadmap: a skill-tree style map of lesson nodes for "How to Become an AI Product Manager in 2026," generated from a pasted resource.](/scopesync-lesson-roadmap.jpg)

![The "Understand" step of the four-step lesson loop, explaining a concept with a plain-language analogy before the learner is checked on it.](/scopesync-lesson-understand.jpg)

![The "Check" step: a multiple-choice question gating progress, so a lesson only counts as done once understanding is demonstrated.](/scopesync-lesson-check.jpg)

![The Learning Map: a node graph visualizing every concept learned so far and how they connect, the gamification layer's progress view.](/scopesync-learning-map.jpg)

![The Paths view: every learning path started, grouped as courses with per-path lesson-completion progress bars.](/scopesync-paths.jpg)

## How I'd measure success

North-star metric: Weekly Active Learners, unique users completing at least
one lesson in a trailing seven days, defined and instrumented but with no
real reading yet, the launch and this writeup happened the same day, so a
seven-day metric has zero observations so far. What launch day did produce,
read as directional, not representative, from 19 self-selected signups on a
single day: 89% onboarding completion (17 of 19), the cleanest result of the
launch; 35% of signups from in-product referral, ahead of a cold LinkedIn
post; and 0 of 15 created paths fully completed, a number I can't yet
attribute to genuine drop-off versus the motivation-loop bug above.

## What I'd do differently

In order, because the order matters more than speed to the next number:

- **Move database migrations into the deploy pipeline.** The specific bug
  is fixed; the manual process that let it ship silently isn't, and that's
  the actual fix, not the patch.
- **Re-measure completion depth on the now-fixed build**, before changing
  anything else about the lesson flow. Until I know whether the gap is
  behavioral or operational, any product fix to it is a guess.
- **Pull the AI-pipeline failure rate.** I know I hit free-tier rate limits
  in production; I don't yet know what share of the 15 unfinished paths
  that actually explains. It's a query I haven't run yet, not a number I
  don't have access to.
- **Push toward the real target (40-50 users) through the referral and
  LinkedIn mix that already worked**, and report the invite denominator
  this time, so "referral works" becomes a measured claim instead of a
  promising ratio from 19 people.
