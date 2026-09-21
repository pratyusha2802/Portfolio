---
slug: "fastlane"
title: "FastLane: Vendor Onboarding Orchestration Platform"
type: "case-study"
status: "published"
date: "2026"
context: "AI product management programme, 2026"
hook: "Vendor onboarding at mid-market Indian companies takes 15–30 days not because approvals are hard, but because the request lives outside any shared system, scattered across email, WhatsApp, spreadsheets and ERP screens with no single record of status, owner or blocker."
tools: ["React", "TypeScript", "Vite", "Tailwind CSS"]
href: "https://fastlane-xi.vercel.app/fastlane"
---

## TL;DR

**Problem:** vendor onboarding at mid-market Indian companies takes 15–30
days, mostly waiting, chasing and redoing, because the request lives outside
any shared system: informal channels in, disconnected systems through the
middle, no single record of status, owner or blocker anywhere along the way.
**Approach:** structured interviews with Procurement and Finance
stakeholders mapped the current process stage by stage, tested four
hypotheses against that evidence, and narrowed scope from "vendor
management" broadly down to one buildable wedge. **Outcome:** FastLane, a
PRD plus a working prototype for a vendor-onboarding orchestration platform
that sits alongside a company's existing ERP rather than replacing it: a
real prototype, not a product with paying customers. The economic case and
the vendor-side research are both explicitly still open.

## Context

A 12-person team deliverable from the same AI product management programme
as my other product work, submitted 2026.

My work, across every stage of this one:

- Primary research (structured interviews with Procurement and Finance
  stakeholders)
- Problem framing, hypothesis testing, and opportunity sizing (TAM/SAM/SOM)
- Product strategy and positioning
- Solution and workflow design
- The metrics framework
- Writing the team's PRD

## The problem

The brief handed the team a market, not a problem: a fast-growing
procurement and vendor-management-software market, an enterprise tool stack
that already covers procurement, ERP, contracts, finance, documents and
compliance, and one observation cutting across all of it, onboarding a new
vendor stays slow and fragmented even after all that tooling is in place.

Interviews mapped what actually happens today, stage by stage, instead of
asking anyone to describe "the problem" in the abstract:

| Stage | What happens | Where it breaks |
| --- | --- | --- |
| Need identified | A product need is raised informally, by email or chat | No shared intake point, so context is lost before procurement even sees it |
| Vendor contacted | Coordinator collects PAN, GST and documents over WhatsApp or email | No standard checklist; submissions arrive incomplete, chased manually |
| Data entered into systems | Staff retype vendor details from scanned documents | Manual retyping causes errors, duplicate records, a growing backlog |
| Approvals routed | Finance, Legal and Business review one at a time, in sequence | Any one unavailable approver stalls the whole case, invisibly to everyone else |
| Vendor activated in ERP | A vendor code is created ad hoc, sometimes after the first invoice | Setup lags real need, causing invoice mismatches and last-minute scrambles |
| Ongoing status chasing | Everyone pings everyone for updates | No shared source of truth, so every update is a fresh, undocumented conversation |

The pattern held across every stakeholder group interviewed: not five
separate departmental problems, but one shared root cause. **A vendor
request is raised outside any operating system, moves through separate
stakeholders and channels, and becomes a formal supplier record only after
manual collection, review and entry.** Until a shared onboarding case
exists, nobody, not the requester, not procurement, not the vendor, not
Finance, can reliably answer where a case stands, who owns the next action,
what's blocking it, or whether the supplier is actually ready to transact.

## Constraints

- Scope held to India, and to domestic goods and operating suppliers only —
  not global vendors, not software/SaaS vendors. A separate template for
  other vendor categories was explicitly deferred, not folded in.
- The product had to sit alongside a company's existing ERP and procurement
  systems, not replace them: those stay the system of record for vendor
  master data, accounting, purchase orders, invoices, payments and
  contracts.
- No Aadhaar in verification, even though the team's own current manual
  process uses it.
- Legal and IT/Security primary research doesn't exist yet. What the PRD
  says about those two teams comes from market-level framing, not direct
  interviews.
- Vendor-side research doesn't exist yet either. The case for a supplier
  portal rests on one internal operator's request for one, not on
  interviews with actual suppliers.
- One deliverable, a 12-person team, a programme deadline: scope had to be
  prioritized, not exhaustive.

## Research and discovery

Primary research was structured interviews with Procurement/coordination and
Finance stakeholders, observing what actually happens in the current
workflow rather than asking people to describe it in the abstract.
Business-requester behaviour is represented through the same interviews,
since coordinators described requester interactions first-hand. Secondary
research covered market sizing and analogous system patterns: multi-stage
vendor lifecycles, RACI-style ownership models, and automated-verification
precedents, used to sanity-check what the interviews surfaced.

Four hypotheses were tested against that evidence, each landing at a
different verdict:

- **Adopted (core):** onboarding falls apart because nobody can see where a
  request is. Confirmed directly, one interview described the process as
  "fragmented and heavily reliant on manual intervention," with no vendor
  portal or real verification, and another had zero visibility into
  procurement status. The caveat that keeps this honest: two interviews
  showed technical integrations can run longer than any approval step, so
  sequencing is a major cause of the 15–30 day cycle, not the only one.
- **Deferred:** reviewers' capacity should be predictable so teams can
  forecast onboarding duration. No interview raised this for or against, and
  visibility has to exist before prediction is worth building on top of it.
- **Descoped:** automated tax/compliance checks, vendor sourcing, in-house
  payments, fraud prevention. Zero mentions across interviews for
  compliance, payments and fraud. Sourcing was the exception, real pain
  surfaced twice, so leaving it out was a choice against real evidence, not
  an absence of it.
- **Insufficient data:** vendors likely need different checklists by risk
  level. Plausible, different vendor types clearly take different amounts of
  time, but that's not proof a formal risk-based checklist is needed. It
  stayed out rather than getting built on a hunch.

## Options considered

| Option | Why it's tempting | Why not |
| --- | --- | --- |
| Full source-to-pay / ERP replacement | One system could absorb the entire fragmented stack | Existing ERPs already own vendor master data, POs, invoices and payments; competing there risks becoming what the team's own risk log calls "a broad P2P clone" |
| Target large enterprises on SAP S/4HANA or Oracle Fusion | Bigger companies, bigger contracts | Ariba, Coupa and Oracle Procurement Cloud already cover this ground; SAP/Oracle adoption was treated as near-universal above roughly $104.8M revenue, so those companies were excluded from the addressable market entirely |
| **Chosen: coordination and evidence layer for mid-market India** | Matches where the fragmentation was actually observed, without competing against tools these companies don't have | Caps the near-term addressable market at roughly 6,677 companies instead of chasing every company with a vendor to onboard |

## Decision and the tradeoff it cost

The team scoped the addressable market down to mid-market Indian companies
on lightweight ERPs (Tally, Zoho, ERPNext), roughly 6,677 companies by TAM,
rather than pursue a "universal vendor-lifecycle" claim or compete for large
enterprises already served by SAP- or Oracle-native procurement suites.

The real cost: a deliberately conservative Year-2 SOM, about 15 paying
customers and $195K–$480K ARR, built on one design-partner pilot converting
first, not a land grab. What that buys instead is a wedge that doesn't fight
an entrenched category leader head-on. Zip, for comparison, was named a 2026
Gartner Visionary in this exact orchestration category and reports more than
7 million suppliers; FastLane's bet is depth in India-specific onboarding
requirements (GST, PAN, Udyam, Section 43B(h)) for a segment Zip-style
general intake tools aren't built around, not breadth against it.

I worked on the opportunity sizing and the positioning call that followed
from it, alongside the workflow and metrics design covered below.

## What shipped / what the concept is

FastLane is a prototype and a PRD, not a company with paying customers. The
PRD's feature set splits into an always-on layer, visibility and escalation,
live on every case regardless of stage, and stage-specific layers tied to
each point in the onboarding lifecycle, with banking-detail verification
pulled out as its own layer since it's a fraud surface, not just another
onboarding step. What it models:

- An explicit MVP lifecycle: Requested → Vendor Invited → Vendor In Progress
  → Submitted → Verification → Internal Review → Approved/Rejected → ERP
  Activation Pending → Transaction Ready, with a return loop from
  Verification, Internal Review or ERP Activation Pending that always names
  what failed, who must act, and what correction is being asked for.
- A secure, expiring-link vendor workspace for document submission (PAN,
  GST, MSME proof, contact/address, never Aadhaar) in place of WhatsApp and
  email collection, with save/resume and a mandatory reason code on every
  return.
- Baseline GSTIN/PAN verification through a provider or manual document
  check, feeding a human review rather than auto-approving, with an
  authorized-only override path that requires a reason, a note and
  supporting evidence.
- ERP activation modeled as a recorded manual attestation (vendor ID,
  attestor, timestamp, evidence) instead of a live write-back — establishing
  reconciled truth across existing systems before attempting to replace any
  part of them.
- A working prototype (React, TypeScript, Vite, Tailwind CSS), live at the
  link above, alongside the full PRD. Both the prototype and the PRD are
  cohort work, so they also name the teammates and mentors on the project
  alongside my own contribution.

From the FastLane landing page (internal review and vendor-portal screens sit
behind sign-in, so these are the public-facing claims, not the authenticated
workflow):

![FastLane landing page hero: "Vendor onboarding, verified at the speed of trust. From invite to a ready-to-transact supplier, fast onboarding with full visibility at every step."](/fastlane-hero.png)

![Feature grid: GSTIN-verified identity, bank confirmed at source, documents in one flow, and visible end to end.](/fastlane-feature-grid.png)

![The Northwind Traders portal card: staff and suppliers sign in through one entry point, routed to the right environment with one-time-code verification, no shared passwords.](/fastlane-portal-card.png)

![Trust badges: GSTIN identity read from the GST Network, bank details confirmed at source, real-time visibility on every application, and an audit-ready immutable trail.](/fastlane-trust-badges.png)

## How I'd measure success

The PRD's north-star metric is a "low-chase completion rate with maximum
visibility": cases reaching transaction-ready with zero or one logged status
chase, divided by all cases created. The stated baseline is "near 0%,
chasing is the default behaviour" — there's no low-chase cohort yet to
measure against.

Supporting product-metric targets, all hypothetical: request-origin
adoption at or above 80% by end of pilot, 100% owner coverage on every open
case, vendor start-to-complete rate at or above 65%, vendor
return-completion at or above 75%, internal minimal-chase completion at or
above 70% (up from an unmeasured near-0% baseline), median time-to-ready
under 10 days and p90 under 18 days against a 15–30 day baseline, and
reviewer SLA-breach rate under 10%.

The business-metrics section goes further, translating those targets into an
illustrative figure of roughly $46,700 a year in savings per customer at 250
vendors onboarded a year. The PRD itself is explicit that every input
feeding that number is "an assumption pending real pilot data... not a
measured result," worth repeating here, because nothing has piloted yet.

## What I'd do differently

The PRD's own "known gaps before build" section names the sharpest one:
vendor-side research doesn't exist yet. Every decision about the supplier
portal and submission UX currently rests on one internal operator's request
for a portal, not on interviews with actual suppliers across different
digital maturity, language preference or category, and that's exactly the
population the low-chase metric depends on adopting the thing. If I were
taking this further, I'd want at least five supplier interviews before
finalizing that UX, not after.

The second gap sits close behind: the economic case is unclosed. Annual
onboarding volume, actual cost of delay, and real willingness to pay were
never captured; the ACV and SOM in this document are sizing-model outputs,
not numbers any customer has confirmed. Real pilot data on both would move
the pricing conversation more than any additional feature would.
