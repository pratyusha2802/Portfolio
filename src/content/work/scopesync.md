---
slug: "scopesync"
title: "ScopeSync: Make the Internet Learnable"
type: "case-study"
status: "published"
date: "2026-08"
context: "Solo build, launched August 2026"
hook: "The internet has more technical content than anyone could get through, but watching a video or reading an article rarely leaves you able to actually use what's in it."
tools: ["Next.js", "TypeScript", "Supabase", "Gemini", "Groq", "Tailwind CSS", "Zustand"]
---

## TL;DR

**Problem:** product managers (and anyone technical-adjacent) are expected to
get fluent in unfamiliar technical topics fast, but the internet's default
formats, a 40-minute video, a long article, are built for consumption, not
for building real understanding. **Approach:** built and shipped ScopeSync
solo over about a week: paste a topic, video, or article; it extracts and
scores the content, turns it into a structured learning path, and then
refuses to call a lesson "done" until you've demonstrated understanding
through an AI-evaluated build challenge or interview-style question, not
just a completion checkbox. **Outcome:** a real, working product, live and
[launched on Product Hunt](https://scopesync-app.vercel.app), not a
concept. Real user feedback from launch day was triaged and shipped back
into the product within 24 hours.

## Context

A solo, self-directed build: idea to public launch in about a week (89
commits, August 19 to 26, 2026). One person, me, across product, design,
prompt engineering, and engineering, with no team to hand any of it off to.

## The problem

Technical fluency is something a lot of people need on a deadline: a PM
scoping a feature they don't fully understand the mechanics of, an engineer
picking up an unfamiliar system, anyone trying to keep up with how fast the
tooling underneath their job is changing. The content to learn from already
exists: YouTube, technical blogs, documentation, but consuming it and being
able to use it are two different things, and most tools optimize for the
first. Finishing a video is not the same as being able to explain the
concept in it, and it's definitely not the same as being able to build
something with it.

## Constraints

- Solo, compressed timeline: no team to divide product, design, prompt
  engineering, and engineering across.
- Free/metered third-party APIs with real limits. YouTube blocks
  unauthenticated transcript requests from cloud/datacenter IPs entirely,
  confirmed directly against this deployment, which returned "Sign in to
  confirm you're not a bot" regardless of whether the video actually had
  captions. Worked around it with a paid transcript API
  ([Supadata](https://supadata.ai)) rather than let the core input path
  silently fail in production.
- No dedicated AI provider budget to lean on a single model without a
  fallback plan if it rate-limited or went down mid-demo.

## Research and discovery

No formal user research phase. This was built on a need I had directly
(bridging technical understanding fast while moving from engineering toward
product) and validated by shipping to real users immediately rather than
by surveying hypothetical ones first. The real discovery mechanism was the
launch itself: a Product Hunt launch produced concrete, specific feedback
within hours, including a literal quote about a feature nobody was finding:
*"'ask compass' ka mujhe randomly pta chla"* (roughly: "I found out 'ask
compass' existed by accident"), which is a more honest signal about a
discoverability problem than any amount of pre-launch speculation would
have been.

## Options considered

| Option | Why it's tempting | Why not |
| --- | --- | --- |
| Track completion by "watched" / "read," like most content tools | Much simpler to build; ships faster | Doesn't measure the thing that actually matters: whether the person can now use what they learned, not just that they were exposed to it |
| **Chosen: gate progress behind an AI-evaluated build challenge or interview-style question** | Forces a real understanding signal, not a vanity metric; matches the actual goal ("become capable," not "consume more") | Much harder to get right: the AI evaluator has to be reliable, has to respect the constraints of what it's grading against, and becomes a new failure surface. A bug in the evaluator is now a bug in whether someone feels they understand something |
| One AI provider, simplest integration | Fastest to build | A single point of failure for the entire product: no fallback if the provider rate-limits or degrades |
| **Chosen: Gemini primary, Groq fallback, mock provider for local dev** | The product keeps working under provider failure instead of breaking entirely | More integration surface to maintain across three providers instead of one |

## Decision and the tradeoff it cost

The real decision that shaped everything else: refusing to let "finished a
lesson" mean anything less than "demonstrated understanding of it." That's
why every learning path ends in either a build challenge (evaluated by AI on
an understanding score) or an interview-practice round (scored on technical
correctness and clarity), not a passive checkbox.

The cost showed up immediately in production, not in theory. Two real bugs
from launch week were direct consequences of this choice being hard to get
right: the lesson content generator was hardcoded to explain everything "like
a curious 5-year-old" regardless of the technical comfort level a user
actually selected. The setting existed in the prompt as a fact, but nothing
told the model to change register because of it, so someone who deliberately
chose an advanced setting still got a toy-box analogy for an API. Separately,
the AI evaluator grading an "explain this to a sales leader in 30 seconds"
exercise was dinging users for not mentioning details (like rate limits)
that the prompt's own stated audience and time constraint had explicitly
made out of scope. A simpler "did you click through the video" tracker would
never have hit either failure mode, but it also would never have told
anyone whether they actually understood anything.

## What shipped

A live, working product, not a concept:

- Paste a topic, YouTube link, article, or PDF; the system extracts the
  content and scores each resource for quality, difficulty, and relevance
  to the learner's role before building a learning path from it.
- Structured lessons with an in-lesson AI Q&A ("Ask Compass") for anything
  unclear mid-lesson.
- Two ways to prove understanding: an AI-evaluated build challenge (a
  visual, node-based playground) or an interview-practice mode scored on
  technical correctness and clarity.
- Gamification (XP, streaks, achievements) and a dashboard tracking
  resources read, concepts mastered, learning paths, and builds completed.
- A full internal admin analytics suite: retention, activation funnel,
  growth, content quality, and raw event views, instrumented with Mixpanel
  from day one, not bolted on after launch.
- [Launched publicly on Product Hunt](https://scopesync-app.vercel.app),
  with real launch-day user feedback shipped back into the product within
  24 hours.

## How I'd measure success

Already instrumented, not hypothetical: a self-built admin dashboard
tracks retention, activation funnel, and content-quality metrics directly,
backed by Mixpanel events. It's early, days old at the time of writing, so
there isn't yet enough usage to call a real trend, and I'm not going to
dress up a few days of data as a result. What is real: specific, actionable
feedback arrived within hours of launch and was triaged and shipped the
same day, which is the metric I actually trust most at this stage over any
early usage number.

## What I'd do differently

Three gaps are already known, not newly discovered in hindsight. They came
directly out of launch-week feedback and were deliberately deferred rather
than rushed:

- **Multi-source learning paths.** Right now a path is built from one
  resource. Real topics usually need synthesizing more than one source, and
  users have already asked for it.
- **Long-video content quality.** A fixed character cap on transcript
  processing likely causes both the surface-level summaries and an
  irrelevant quiz question a user reported for a 6-hour video. The
  extraction pipeline needs to scale with source length, not truncate it.
- **A more granular, Obsidian-style learning map.** The current concept
  graph is a good first cut at showing how ideas connect, but users want to
  navigate and manipulate it more directly than the current view allows.

Given more time before launch, I'd have built the multi-source path first.
It's the constraint most likely to make someone bounce on their very first
real use, rather than one they run into later.
