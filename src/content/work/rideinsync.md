---
slug: "rideinsync"
title: "RideInSync: Group Ride Coordination for Motorcyclists"
type: "case-study"
status: "published"
date: "2026-09"
context: "Rethink Systems buildathon, 2026"
hook: "A group of ten motorcycles leaves together, and every navigation app in every rider's pocket answers where do I go while none of them answer whether the group is still whole once someone drops back or the pack splits at a junction."
tools: ["React", "TypeScript", "Supabase", "Google Maps", "Web Speech API", "Web Push"]
href: "https://www.rideinsync.in/"
---

## TL;DR

**Problem:** group motorcycle rides fall apart quietly. The lead can't see who
dropped back, the sweep can't tell a fuel stop from a breakdown, and a split
at a junction goes unnoticed for kilometres, because every tool riders carry
today, navigation apps, WhatsApp, is built for one rider, not a pack.
**Approach:** a five-person team scoped the MVP around the one question none
of those tools answer (is the group still whole), shipped it as a
zero-install PWA so a whole pack can join a ride in seconds, and took the
core hypothesis to product managers for early reaction. **Outcome:**
RideInSync, a live, voice-first group-coordination app at rideinsync.in.
Real and shipped, not a concept: the gap is that it's been validated with
product managers, not yet with the riders it's built for.

## Context

A five-person team build for the Rethink Systems buildathon, 2026.

My work, end to end:

- Problem framing and the four-role user model (captain, lead, sweep,
  regular rider)
- Product scoping: what shipped in the MVP versus what got deferred
- The PWA-over-native and freemium decisions
- Contributing to the build (React/TypeScript PWA, Supabase realtime, Google
  Maps, Web Speech)
- Writing the pitch deck and product brief

## The problem

Put five to ten motorcycles on a highway together and something breaks
quietly. Four roles sit on the same ride, each blind in a different way:

- **The ride captain** (organizer) builds the trip in a chat thread, chasing
  headcounts and routes, with no single workspace and slow onboarding for
  new riders.
- **The lead/navigator**, setting the pace, can't see who's falling behind.
  No consolidated view of the group; a hazard gets a hand signal, if anyone's
  looking.
- **The sweep**, riding last to catch stragglers, can't tell a fuel stop from
  a breakdown from two kilometres back, and after a junction split can't tell
  who's missing or where they were last seen.
- **The regular rider**, just trying to keep up, drops back, and has no
  one-action way to signal or call for help, since touching a phone at
  riding speed isn't safe.

The tools riders already carry don't close this gap. Navigation apps are
individual-first: they route one rider to one pin. WhatsApp requires
pulling over to type and hoping someone reads it at speed. The
community-and-discovery apps riders already use in India, Astride, the BOBMC
riders app, the Royal Enfield app, Ridingverse, have ride logs, trip
discovery and club community covered. None of them instrument the group
while it's actually moving. That's the specific, unserved gap: not "another
riding app," but operational awareness for a pack in motion.

## Constraints

- A buildathon timeline: 4 days end to end, problem framing to deploy, a
  five-person team, one deliverable, no room for a slow build.
- The core value proposition only exists once the whole pack has the app:
  a coordination tool that half the group isn't using doesn't coordinate
  anything.
- Riding conditions rule out most conventional interaction patterns: gloves,
  vibration, both hands already committed to the bars, and a touchscreen is
  a genuinely dangerous interface at speed.
- Payments were explicitly ruled out of v1 scope from the start, to keep the
  team focused on the coordination problem instead of a billing system
  nobody had validated demand for yet.

## Research and discovery

Validation here was informal and PM-facing, not a structured study with
actual group riders: the team took the core hypothesis, that road-trip and
group riders need to know their group is whole, to working product managers
and walked them through it, and got real, if informal, reactions to the
problem framing and the shape of the solution.

That's a real limit worth naming plainly: the people who confirmed this
problem matters were product managers evaluating a pitch, not the ride
captains, leads, sweeps and regular riders the four-role model above is
actually built around. The signal was consistent and encouraging enough to
keep building, but it isn't the same evidence as watching an actual pack use
the app on an actual ride.

## Options considered

| Option | Why it's tempting | Why not |
| --- | --- | --- |
| Compete with existing Indian riding apps (Astride, BOBMC, Royal Enfield app, Ridingverse) on community, discovery and ride logs | Established, familiar ground riders already look for in an app | Those apps already own that ground; none of them instrument the group while it's actually moving, so competing there sidesteps the real gap instead of closing it |
| Native iOS/Android app first | Deeper device access: more reliable background location, native voice APIs | A coordination tool only has value once the whole pack has it; an app-store install adds friction at exactly the moment, mid-ride, at a fuel stop, that a new rider needs to join in seconds |
| **Chosen: voice-first coordination layer, shipped as a PWA** | Zero-install joining by link, code or QR gets a whole pack onboarded in seconds; addresses the "is the group still whole" gap directly | Trades some native-app reliability, background GPS consistency, on-device voice recognition, for install-free reach; an Android wrapper is offered as a partial answer, not a full one |

## Decision and the tradeoff it cost

The team kept the entire coordination loop, live map, group status, voice
signals, one-tap SOS, free, and pushed all payments to future scope rather
than v1. The reasoning: the product's value is binary. It doesn't work at
all until the whole pack is using it, so a paywall anywhere inside that
loop wouldn't generate revenue, it would kill the network effect the
product depends on before it forms.

The real cost is zero direct monetization on the features that make the app
worth building, in the version that's actually shipped. Revenue is scoped
instead to paid tiers that sit outside the free core (offline maps, longer
ride history, premium safety features, club/organiser plans) and to
partners, fuel and lubricant brands, event organisers, gear manufacturers,
paying for access to a verified riding audience. None of that is signed;
the deck is explicit that partner names are targets, not deals.

## What shipped

RideInSync is live at rideinsync.in, not a concept or a locked demo. What
ships today:

- A live ops map resolving raw GPS into four plain group-status states
  (intact, rider behind, rider stopped, location stale), with a
  last-known-location marker and timestamp for anyone who drops off, instead
  of dots a rider has to decode at speed.
- A shared, road-following route generated once and given to the whole
  group, plus a rendezvous route that guides a scattered rider back to the
  lead and clears itself once they regroup.
- Speed-adaptive, heading-up navigation: zoomed in for city turns, pulled
  back for the highway.
- One-tap SOS, by tap or voice, alerting the whole ride group and an
  emergency contact with location attached.
- Voice-first signaling: "sync" plus hazard, regroup or pit stop, with a
  collated signal log so a missed alert is still readable afterward.
- Fast, lead-approved joining by code or QR, and structured ride creation
  with shared stops synced live to every rider's phone.
- A discovery feed and group directory, and a guided demo mode (a
  one-tap simulated pack) built specifically so the app could be judged
  without needing ten actual phones on ten actual bikes.

From the RideInSync landing page, the same claims made concrete:

![RideInSync landing page hero: "Ride as a group, not a scatter. Everyone tracked, every route shared, and help one tap away."](/rideinsync-hero.png)

![Feature card: "Ride together, stay together — see every rider's live position and status on one map, so you adjust your pace without panicking or calling anyone."](/rideinsync-feature-group-status.png)

![Feature card: "One shared route — route, stops, and points of interest synced to every rider's phone, and updated live when the leader changes the plan."](/rideinsync-feature-route.png)

![Feature card: "Eyes on the road — voice-first signals for stops, hazards, and route changes. Minimal touch, minimal distraction while you ride."](/rideinsync-feature-voice.png)

![Feature card: "One tap for help — SOS alerts your group, your leader, and your emergency contact at once, with your location and medical info."](/rideinsync-feature-sos.png)

![Feature card: "No one left behind — last-known location and a sweep view catch anyone who falls behind or splits off at a junction."](/rideinsync-feature-sweep.png)

Built on React and TypeScript as a PWA, with Supabase for Postgres and
realtime sync, Google Maps for routing, and the Web Speech and Web Push
APIs for voice signals and alerts. Design is dark-first with a single lime
accent used sparingly, chosen deliberately to stay legible and low-distraction
at a glance while riding.

## How I'd measure success

No formal success metric was defined for this MVP, and I'm not going to
invent one after the fact. The only validation signal that exists is
qualitative: product managers reacted well to the problem framing and the
demo. That's directional, not a number, and it isn't usage data.

If I were setting metrics now, I'd propose tracking the thing the product
actually claims to fix, not vanity installs: the share of ride packs where
every rider stays resolved as "intact" for the length of the ride, how long
it takes the lead to notice a real split versus how long the old
zero-visibility baseline took, and the share of new riders who complete a
join (link, code or QR to live-on-the-map) in under some fixed number of
seconds, since that's the exact friction the PWA decision was supposed to
remove. All three are proposals, not commitments the team has made.

## What I'd do differently

The sharpest gap is the one named above: validation stopped at product
managers. The four roles this product is built around, ride captain, lead,
sweep, regular rider, haven't been interviewed or watched using it on a real
ride. If I were pushing this further, I'd want field time with an actual
riding group before trusting any more of the roadmap to intuition, the same
way the other product work in this portfolio treats evidence as the thing
that earns the next decision, not a box to check after it's made.

Second, I'd want to pressure-test the PWA-over-native tradeoff directly
rather than accept it as settled: background location accuracy over a
multi-hour highway stretch, voice-recognition accuracy at riding speed with
wind and engine noise, and push-notification delivery consistency on iOS
Safari specifically. The install-friction argument for a PWA is strong. It's
only the right call long-term if the reliability it trades away doesn't
undercut the safety features, SOS above all, that are the point of the app.

Third, the monetization model is honestly still a hypothesis stacked on a
hypothesis: it assumes riders will pay for tiers once the free core has
adoption, and that partners will pay for access to that audience once it
exists. Both are reasonable bets. Neither has been tested with a real rider
or a real partner conversation yet.
