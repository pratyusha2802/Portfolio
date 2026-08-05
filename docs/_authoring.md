# Authoring an artifact

There is no single template — scope compounds week over week. What stays constant
is the **spine**. What grows is the **body**.

A reader should be able to open any artifact on this site and find the same three
things in the same places. Everything between those is composed from the block
library below, based on how far down the lifecycle this particular piece went.

---

## The spine — always, in this order

### 1. The summary card (top of every artifact)

Frontmatter renders this. It must survive being read alone:

```yaml
---
slug: ""
title: ""
type: ""            # teardown | prd | prototype | case-study | metrics | roadmap | technical-note
status: "in-progress"
week: 0
date: ""            # YYYY-MM
stages: []          # problem, discovery, solution, scope, ux, metrics, build, evals
hook: ""            # ONE sentence. The problem, not the deliverable.
users: ""           # Who has it. Specific.
tools: []
href: ""            # Live link. Empty until real.
---
```

The `hook` is the highest-leverage sentence on the site. "A PRD for a habit
tracker" tells a reader nothing. "Most habit apps punish a missed day, so users
delete them in week three" makes them keep reading.

### 2. The problem

Two paragraphs, maximum. What's broken, for whom, how you know it's real. If the
product is hypothetical, say so in the first line — a stated exercise reads as
honest, a disguised one reads as inflated.

### 3. What I'd do differently *(last section, always)*

Short. Specific. Something you'd actually change. This section is remembered out
of proportion to its length because self-evaluation is most of the job, and
almost nobody includes it.

---

## The body — compose from these

Add a block when the week's work reached that stage. **Never include a block you
can only fill with generalities.** An absent section reads as scope; a hollow one
reads as padding, and a reader who hits one starts skimming.

Add the matching value to `stages` in `portfolio.ts` whenever you add a block.

---

### `discovery` — What I found

*From week 3 onward, wherever real research happened.*

Interviews, review mining, support tickets, competitor teardowns, secondary data.

- Say **how many** people you spoke to. Three is fine. Zero is fine if you say
  zero and state what you'd have asked.
- Separate what users **said** from what you **concluded**. Two headings if needed.
- Note the assumption you went in with that turned out wrong. There's always one,
  and naming it is the strongest paragraph in most discovery memos.

**Fails when:** insight is stated with more confidence than the evidence supports.
Sized markets with fake precision, quotes that sound synthesised, "users want" with
no user behind it.

---

### `solution` — What I considered

*From week 3 onward. The block that most separates PM writing from feature writing.*

Not what you built — **what you chose over what else**.

| Option | Why it's tempting | Why I didn't |
| --- | --- | --- |
|  |  |  |

Three options is the right number. One means you didn't explore; six means you
didn't decide.

**Fails when:** the alternatives are strawmen. If every rejected option is
obviously bad, the table proves nothing.

---

### `scope` — What's in, what's out

*From week 4 onward, once there's something to build.*

- The MVP cut, and the sentence justifying where you drew the line
- **Non-goals** — explicit. This is where PM discipline is visible.
- Acceptance criteria for the core flow
- What you'd add in v2 and why it isn't v1

**Fails when:** everything is in scope. A cut nobody would argue with isn't a cut.

---

### `ux` — The experience

*From week 4 onward.*

- The user flow, screen by screen — a diagram beats three paragraphs
- Empty states, error states, the unhappy path
- For AI surfaces: how the user corrects the system, and what control they retain
- Embed the prototype if it's live. A working link outperforms any screenshot.

**Fails when:** only the happy path is shown. Every experienced reader looks for
the error state first.

---

### `metrics` — How I'd know it worked

*From week 5 onward.*

- North Star, two or three inputs, one guardrail
- The hypothesis, the experiment that tests it, the result that would kill it
- Event taxonomy if you defined one

Label hypothetical numbers **hypothetical**, every time. Invented traction is the
fastest way to lose a reader who has seen a thousand of these.

**Fails when:** the metrics are unfalsifiable. If no plausible number would change
the decision, they're decoration.

---

### `build` — What I actually shipped

*From week 6 onward.*

- Live URL, first and prominent
- Architecture in three sentences: frontend, backend, data, model calls
- What broke, and what you changed because of it
- Cost and latency, if you measured them

A deployed link is worth more than the document describing it. Lead with it.

**Fails when:** it's a stack list. The stack isn't interesting; the tradeoff you
made under a constraint is.

---

### `evals` — Model behaviour and trust

*From week 7 onward. Any artifact with an LLM in it needs this block.*

This is where your engineering background pays and most portfolio PRDs go quiet:

- What does a **good** output look like, concretely? Show one.
- The eval set — how many cases, what they test, how you scored them
- Failure modes: hallucination, latency, refusal, prompt injection
- What happens when the model is wrong — fallback, escalation, human review
- What you'd **not** use AI for here, and why

**Fails when:** "we'll monitor quality." That sentence tells a reader you haven't
thought about it.

---

## Composition, by how far the work went

| The work… | Spine | + blocks |
|---|---|---|
| Analysed an existing product | ✓ | solution |
| Framed a problem and scoped a fix | ✓ | solution, scope |
| Started from research | ✓ | discovery, solution, scope |
| Reached a designed flow | ✓ | discovery, solution, scope, ux |
| Defined how it'd be measured | ✓ | + metrics |
| Got built and deployed | ✓ | + build |
| Involved a model in the loop | ✓ | + evals |

Engineering builds usually need only the spine plus `build`. Don't retrofit
product vocabulary onto work that didn't have it.

---

## Length

Roughly 800–1,500 words on the page, whatever the week. Later artifacts cover more
ground in similar space by cutting throat-clearing, not by getting longer. Link out
to the full PRD or Figma rather than pasting twelve pages inline.

If a section can't be written without filler, delete it and remove the stage.
