/**
 * portfolio.ts — single source of truth for all site content.
 * Components read from here. No copy lives inside JSX.
 *
 * Location: src/data/portfolio.ts
 *
 * This site is about a person and how she works. The work is evidence for that,
 * not the subject of it. No course, employer, or programme is the organising
 * principle — she is.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Track = "product" | "engineering";

export type WorkType =
  | "teardown"
  | "prd"
  | "prototype"
  | "case-study"
  | "metrics"
  | "roadmap"
  | "technical-note"
  | "build";

export type WorkStatus = "published" | "in-progress" | "planned";

/**
 * Lifecycle stages a piece of work actually covers. Rendered as chips.
 * Only list a stage there's a real section behind — padding this is the
 * fastest way to lose a reader who opens the piece.
 */
export type Stage =
  "problem" | "discovery" | "solution" | "scope" | "ux" | "metrics" | "build" | "evals";

export interface WorkItem {
  slug: string; // matches src/content/work/{slug}.md
  title: string;
  track: Track;
  type: WorkType;
  status: WorkStatus;
  date: string; // YYYY-MM, or just YYYY when that's all that's known
  /** Where it came from — "Code for Good 2022", "Final-year project". Quiet metadata. */
  context?: string;
  /** One sentence. The problem, not the deliverable. */
  hook: string;
  /** Who has this problem. Specific beats broad. */
  users?: string;
  /** 2–4 bullets. Decisions and tradeoffs, not activities. */
  decisions: string[];
  /** How success is measured. Say "hypothetical" if it is. */
  measure?: string;
  stages?: Stage[];
  tools: string[];
  /** Domain/PM keyword chips (e.g. "Elder care", "0→1", "Marketplace") — rendered
   * like a tool-chip but semantically distinct from tools: this is the niche or
   * skill the work demonstrates, not literal software used. Don't conflate the two. */
  topics?: string[];
  href?: string; // live link — empty until real
  /** Overrides the default "View live" label — use for a prototype/concept link that isn't an actual shipped, running product. */
  hrefLabel?: string;
  /** Additional pills shown alongside href, e.g. a second prototype/deck link. */
  links?: { href: string; label: string }[];
  repo?: string;
  reflection?: string;
  /** Exact card sub-heading line, e.g. "Self-directed discovery project · 2025". Overrides the default type/context/tools line when present. */
  meta?: string;
  /** Card CTA text. "Coming soon" (exact string) makes the card non-clickable instead of linking to /work/:slug. */
  cta?: string;
}

export interface SubProject {
  name: string;
  start: string;
  end: string | "Present";
  note?: string;
}

export interface Position {
  title: string;
  start: string;
  end: string | "Present";
  /** Single-paragraph positions (e.g. internships) use this. */
  description?: string;
  /** Positions spanning more than one project use this instead of `description`. */
  projects?: SubProject[];
}

/**
 * One company, one or more positions held there — same employer shown once,
 * not repeated per position. `positions` is ordered most-recent-first; the
 * date range shown next to the company name is derived from it, not stored.
 * `stack` is the union across all positions, shown once — a stack chip
 * repeated on every position it applied to just restated the same handful
 * of tools three times over.
 */
export interface CompanyExperience {
  company: string;
  location: string;
  stack: string[];
  positions: Position[];
  /** Optional — same light-touch treatment as education.photo: a small
   * thumbnail next to the entry, not a promotion to its own card. */
  photo?: string;
}

export interface Link {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/* Who                                                                 */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Pratyusha Patidar",
  location: "Bengaluru, India",
  email: "pratyusha.2802@gmail.com",

  /** Used for <title> only — the hero states the direction plainly now. */
  role: "Software Engineer, JPMorgan Chase, transitioning into Product",

  tagline:
    "Software engineer at JPMorgan Chase, where I've spent the past two years building internal products used by 300,000+ employees. Building at enterprise scale taught me that the hardest product decisions happen long before the first line of code: understanding users, defining the right problem, and deciding what deserves to be built.",

  about: [
    "I'm a software engineer at JPMorgan Chase, transitioning into product management.",
    "Over the past two years, I've built internal products used by more than 300,000 employees across the firm.",
    "Right now, I'm a frontend developer building a new internal desktop assistant. Before that, I spent a year and a half on the Core UI team behind one of the firm's employee productivity platforms, the team responsible for the shared component layer that both the core product and every team-built extension depends on. That meant building for two kinds of users: employees using the application, and the internal development teams building on top of it.",
    "Working on a shared platform changed how I think about building software. Every component, API, and design decision had downstream consequences for teams I didn't directly work with. Success wasn't just about shipping features. It was about understanding different user needs, balancing trade-offs, and designing systems that could scale across products and teams.",
    "Over time, I found myself increasingly drawn to the questions that come before implementation: Which problem is actually worth solving? Who are we solving it for? What constraints matter most? And how do we know we've built the right thing?",
    "That curiosity is what pulled me toward product management.",
    "Outside work, I'm building those skills deliberately: conducting user research, solving product case studies, and sharing my thinking through writing. My goal is to combine an engineer's understanding of execution with a product manager's focus on solving meaningful problems.",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* How she operates — the most personal copy on the site               */
/* ------------------------------------------------------------------ */

/**
 * Her own words, final — not the earlier drafted claim/detail pairs. Short,
 * standalone lines; no elaboration to invent underneath them.
 */
export const principles: string[] = [
  "Engineer → PM",
  "Debugs products, not just code",
  "Ships with intent",
  "Part systems thinker, part storyteller",
];

/* ------------------------------------------------------------------ */
/* Work — one collection, two tracks                                   */
/* ------------------------------------------------------------------ */

/**
 * Everything she's built, product and engineering together, newest first.
 * Filterable by track and type. Each pairs with src/content/work/{slug}.md
 *
 * The product pieces below come out of an AI product management programme she's
 * doing. That's context on the card, not a section of the site. Slugs are
 * subject-based, never "week 3" — the reader doesn't care about the syllabus.
 *
 * Rules:
 *  - status flips to "published" only when the markdown has real content
 *  - never invent decisions, users, metrics, or reflections — leave empty
 *  - feature the strongest four; archive the rest. Volume signals a course
 *    completed, depth signals judgement.
 */
export const work: WorkItem[] = [
  {
    slug: "scopesync",
    title: "ScopeSync: Make the Internet Learnable",
    track: "product",
    type: "case-study",
    status: "published",
    date: "2026-08",
    context: "AI product management programme, 2026",
    hook: "Professionals are now expected to work with AI and technical tools they were never taught. Watching a video about it rarely leaves anyone able to actually use it.",
    users:
      "Non-technical professionals, PMs, marketers, HR, founders, finance, and ops people, who need real fluency with AI and technical tools fast, not just more content to skim.",
    decisions: [
      "Chose to test with a real, live product in front of unscreened strangers on a single launch day instead of a safer walkthrough or a research-first approach, the exact decision that surfaced a production bug no interview would have found.",
      'Refused to let a lesson count as "finished" without a demonstrated-understanding signal: every learning path ends in an AI-evaluated build challenge or interview-style question, not a passive completion checkbox.',
      "Built a Gemini-primary, Groq-fallback, mock-for-local-dev provider chain so the product degrades gracefully instead of breaking outright when one AI provider rate-limits or fails.",
    ],
    measure:
      "Launch-day numbers from 19 self-selected signups on ~30 instrumented event types, read as directional, not representative: 89% onboarding completion (17 of 19), 15 paths created against 0 fully completed, and 35% of signups arriving through in-product referral, ahead of a cold LinkedIn post. The sharpest finding wasn't a number: a database migration silently broke the entire gamification layer mid-launch, found by using the product myself, not by checking a dashboard.",
    tools: ["Next.js", "TypeScript", "Supabase", "Gemini", "Groq", "Tailwind CSS", "Zustand"],
    topics: ["0→1", "AI product", "Solo founder", "B2C", "EdTech"],
    href: "https://scopesync-app.vercel.app",
    links: [
      {
        href: "https://claude.ai/code/artifact/c5868026-bb65-4ed9-9035-88c70bef12c0",
        label: "View pitch deck",
      },
    ],
    cta: "Read the case study",
  },
  {
    slug: "convenience-economy-india",
    title: "Golden Hour Bridge: Convenience Economy Discovery in India",
    track: "product",
    type: "case-study",
    status: "published",
    date: "2026-07",
    context: "AI product management programme, 2026",
    hook: "The average Indian ambulance takes 25–40 minutes to arrive. The average food-delivery rider is three minutes away.",
    users:
      "People experiencing a medical emergency in India (especially road-accident and cardiac-arrest victims), and the hospitals, RWAs, and state EMS systems that would license the responder network.",
    decisions: [
      "Chose to activate the existing 10M+ gig-delivery workforce as a software-orchestrated 'bridge' (B2B SaaS/B2G Presence-as-a-Service) over competing as an ambulance fleet: zero asset intensity against competitors' fleet-ownership models.",
      "Bounded the gig worker's intervention strictly to presence, notification, and BLS-level stabilization. Explicitly ruled out patient transport and any clinical intervention beyond basic life support.",
      "Targeted the $3.8B→$39.7B India digital-health and corporate-wellness market instead of the $1.67B ambulance-transport market, which is capital-intensive and growing at a slow 4.75% CAGR by comparison.",
      "Sequenced the rollout to prove the arrival-time edge in hospital/RWA pilots before leaning on two government subsidy schemes (PM-RAHAT, Rah-Veer Reward) that were still new and unproven when this was written.",
    ],
    measure:
      "Two hypothetical targets defined for the concept: a sub-5-minute responder arrival edge against the ₹2,000 flat-fee ambulance benchmark, and a measurable reduction in claims severity insurers would recognize once government subsidy integration begins. Neither is a measured result. Nothing has piloted.",
    tools: [],
    topics: ["Emergency response", "Gig economy", "B2B SaaS", "0→1"],
    href: `${import.meta.env.BASE_URL}golden-hour-bridge-deck.html`,
    hrefLabel: "View deck",
    cta: "Read the case study",
  },
  {
    slug: "elder-care-india",
    title: "Paarth: Elder Care Discovery in India",
    track: "product",
    type: "case-study",
    status: "published",
    date: "2026-08",
    context: "AI product management programme, 2026",
    hook: "Adult children arranging elder care for ageing parents in India aren't short on providers: home nursing, caregivers, assisted living all exist. What's missing is a single trusted place to find, compare, and verify them. Paarth is a concept for that discovery layer.",
    users:
      "Adult children coordinating elder care for ageing parents in India, often from a different city.",
    decisions: [
      "Drove the pivot away from two failed hypotheses (family-less elders, caregiver trust as the top named pain point) toward the real pattern in the data: families were blocked by discovery and coordination, not by care availability.",
      "Chose a two-sided aggregator with a handoff to the provider's own site over building a direct-care provider or a reviews-only platform: kept the model software-light while still capturing the booking moment.",
      "Scoped the MVP to search, filters, and redirect only, across 5 cities, deferring booking, payments, and a provider dashboard to a later phase.",
    ],
    measure:
      "Two hypothetical targets defined for the concept: 15–20% search-to-booking conversion within 3 months, 80%+ redirect completion rate. Neither is a measured result. Nothing has shipped.",
    tools: [],
    topics: ["Elder care", "0→1", "User research", "Marketplace"],
    href: `${import.meta.env.BASE_URL}paarth-deck.html`,
    hrefLabel: "View deck",
    links: [
      {
        href: "https://claude.ai/code/artifact/155cdbed-1dff-47b8-9c25-eceb00f78503",
        label: "View prototype",
      },
    ],
    cta: "Read the case study",
  },
  {
    slug: "fastlane",
    title: "FastLane: Vendor Onboarding Orchestration Platform",
    track: "product",
    type: "case-study",
    status: "published",
    date: "2026",
    context: "AI product management programme, 2026",
    hook: "Vendor onboarding at mid-market Indian companies takes 15–30 days not because approvals are hard, but because the request lives outside any shared system, scattered across email, WhatsApp, spreadsheets and ERP screens with no single record of status, owner or blocker.",
    users:
      "Procurement coordinators managing multiple onboarding cases at once, and the business requesters, vendors, and Finance/Legal/IT reviewers who all wait on the same case without visibility into it, at mid-market Indian companies running a lightweight ERP (Tally, Zoho, ERPNext) with no built-in vendor-onboarding module.",
    decisions: [
      "Scoped the addressable market to roughly 6,677 mid-market Indian companies on lightweight ERPs, explicitly excluding large enterprises on SAP S/4HANA or Oracle Fusion where Ariba, Coupa and Oracle Procurement Cloud already cover this — a smaller TAM in exchange for a market the product can actually win instead of competing against entrenched procurement suites.",
      "Positioned the product as a coordination and evidence layer that sits alongside existing ERP and procurement systems rather than a new ERP, source-to-pay suite or payments platform, differentiating on India-specific onboarding depth (GST, PAN, Udyam, Section 43B(h)) against an already-established general orchestration category (Zip: Gartner 2026 Visionary, 7M+ suppliers).",
      "Excluded Aadhaar from verification even though the team's current manual process uses it, treating that as a practice to fix rather than a feature to carry forward, and scoped MVP verification to GSTIN/PAN with an authorized, evidence-backed override path instead.",
      "Kept ERP activation as a recorded manual attestation rather than a live write-back integration in MVP, on the reasoning that the platform has to establish reconciled truth across existing systems before it tries to replace any part of them.",
      "Split the feature set into an always-on layer (visibility and escalation, live on every case regardless of stage) and stage-specific layers tied to each point in the onboarding lifecycle, naming always-on visibility and escalation as the differentiator rather than any single stage feature — and pulled banking-detail verification out as its own layer, on the reasoning that it's a fraud surface, not just another onboarding step.",
    ],
    measure:
      "The PRD's north-star metric is a 'low-chase completion rate with maximum visibility': cases reaching transaction-ready with zero or one logged status chase, against a stated baseline of 'near 0%, chasing is the default behaviour.' Every supporting number, including the ~$46,700/year illustrative savings estimate, is explicitly labeled in the PRD as an assumption pending real pilot data, not a measured result — nothing has piloted yet.",
    tools: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    topics: ["B2B SaaS", "0→1", "Market sizing", "Enterprise workflow"],
    href: "https://fastlane-xi.vercel.app/fastlane",
    hrefLabel: "View prototype",
    cta: "Read the case study",
  },
  {
    slug: "rideinsync",
    title: "RideInSync: Group Ride Coordination for Motorcyclists",
    track: "product",
    type: "case-study",
    status: "published",
    date: "2026-09",
    context: "Rethink Systems buildathon, 2026",
    hook: "A group of ten motorcycles leaves together, and every navigation app in every rider's pocket answers where do I go while none of them answer whether the group is still whole once someone drops back or the pack splits at a junction.",
    users:
      "Ride captains organizing group rides, the lead/navigator setting pace, the sweep riding last to catch stragglers, and regular riders trying to keep up — four roles on the same ride, each currently blind to the group's actual state.",
    decisions: [
      "Shipped as a PWA with an optional Android wrapper instead of a native app first, trading some native-app reliability (background location, on-device voice recognition) for zero-install joining by link, code or QR — the product only has value once the whole pack is on it, so store friction at the moment a rider needs to join was the risk that mattered most.",
      "Kept the entire coordination layer, live map, group status, voice signals, one-tap SOS, free in v1 and deferred all payments to future scope, because a paywall anywhere in that loop would gate the product's core value instead of creating revenue from it; monetization moves to paid tiers outside the free core, and to partners paying for access to a verified riding audience.",
      "Resolved raw GPS into four plain group-status states (intact, rider behind, rider stopped, location stale) instead of showing dots on a map, so the lead and sweep read a status at a glance instead of decoding positions at riding speed.",
      "Scoped the MVP to the live-ride loop (map, SOS, voice signals, ride creation, join, discovery) and explicitly deferred pace warnings, proximity SOS to strangers, in-ride voice chat and offline mesh fallback to future scope.",
    ],
    measure:
      "No formal success metric was defined for the MVP. The only validation so far is qualitative: product managers reacted well to the problem framing and demo, which is directional, not usage data. Proposed metrics (share of rides staying 'intact,' time-to-notice-a-split, join completion time) are my own suggestions for what to track next, not numbers the team has committed to.",
    tools: ["React", "TypeScript", "Supabase", "Google Maps", "Web Speech API", "Web Push"],
    topics: ["0→1", "Voice UX", "Real-time", "Safety"],
    href: "https://www.rideinsync.in/",
    links: [{ href: `${import.meta.env.BASE_URL}rideinsync-deck.html`, label: "View deck" }],
    cta: "Read the case study",
  },
  /* Engineering track */
  {
    slug: "harvest-ledger-trust",
    title: "Harvest Ledger Trust",
    track: "engineering",
    type: "build",
    status: "published",
    date: "2022-08",
    context: "Code for Good hackathon, 2022",
    hook: "Harvest Ledger Trust could only ask donors for an undirected sum and hope it stretched far enough. Built the frontend in 24 hours with an assigned team.",
    users:
      "Donors giving toward specific items, and the NGO admin managing what's listed, priced, and in stock.",
    decisions: [
      "Led the frontend under a 24-hour constraint: chose item-level giving (catalogue, cart, checkout) over a simpler undirected-sum form.",
      "Item-level giving meant building a donor side and an admin side in the same window, on hardware (low-end Android) that punishes an unpolished frontend hardest.",
    ],
    measure:
      "None tracked: judged by hackathon evaluators, not usage data. There was no usage to measure.",
    tools: ["JavaScript", "Node.js", "Express"],
    reflection: "The hackathon is also how I ended up at JPMorgan Chase.",
    meta: "Build · Code for Good hackathon, 2022 · JavaScript, Node.js, Express",
    href: `${import.meta.env.BASE_URL}food-donation-portal.html`,
    hrefLabel: "View deck",
    links: [
      {
        href: "https://claude.ai/code/artifact/e498540c-0e4e-4120-b039-990643e84004",
        label: "View prototype",
      },
    ],
    cta: "Read the case study",
  },
  {
    slug: "pen-in-the-air",
    title: "Pen in the Air",
    track: "engineering",
    type: "build",
    status: "published",
    date: "2023-03",
    hook: "Drawing input assumes a surface. Not everyone has one, and not every context allows touching it.",
    decisions: [
      "Tracked fingertip position through a plain webcam rather than requiring depth hardware.",
      "Traded tracking accuracy for latency: a laggy pen is unusable in a way a slightly imprecise one isn't.",
    ],
    tools: ["Python", "OpenCV"],
  },
];

export const trackLabels: Record<Track, string> = {
  product: "Product",
  engineering: "Engineering",
};

export const typeLabels: Record<WorkType, string> = {
  teardown: "Teardown",
  prd: "PRD",
  prototype: "Prototype",
  "case-study": "Case Study",
  metrics: "Metrics",
  roadmap: "Roadmap",
  "technical-note": "Technical Note",
  build: "Build",
};

export const stageLabels: Record<Stage, string> = {
  problem: "Problem framing",
  discovery: "User research",
  solution: "Solution space",
  scope: "MVP scope",
  ux: "UX & flows",
  metrics: "Metrics",
  build: "Built & shipped",
  evals: "Evals & trust",
};

/** Canonical chip order. Never alphabetical, never reordered. */
export const stageOrder: Stage[] = [
  "problem",
  "discovery",
  "solution",
  "scope",
  "ux",
  "metrics",
  "build",
  "evals",
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const experience: CompanyExperience[] = [
  {
    company: "JPMorgan Chase & Co.",
    location: "Bengaluru",
    photo: "jpmc-office.jpg",
    // Union of every position's stack below, most-recent-role-first order.
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Electron",
      "SCSS",
      "micro-frontend architecture",
      "HTML/CSS",
      "JavaScript",
    ],
    positions: [
      {
        title: "Software Engineer",
        start: "Jul 2024",
        end: "Present",
        projects: [
          {
            name: "Internal desktop assistant",
            start: "Nov 2025",
            end: "Present",
          },
          {
            name: "Employee productivity platform, Core UI team",
            start: "Jul 2024",
            end: "Nov 2025",
            note: "built and owned the micro-frontend SDK behind accessible, reusable UI components adopted across a platform with 251k monthly active users, 11.5M+ monthly actions, and an estimated 47,500+ hours saved a month, including the two busiest surfaces, meeting join (3.96M actions/month) and employee search (2.15M). Ran spec-driven development for two service integrations, agreeing contracts with partner teams before build, and led the refactor of shared UI into reusable micro-frontends that cut duplicated component code across consuming apps",
          },
        ],
      },
      {
        title: "Software Engineering Intern",
        start: "Jan 2024",
        end: "Jun 2024",
        description:
          "Built two proof-of-concepts for the experimental phase of the productivity platform using micro-frontend architecture. Converted to a full-time offer.",
      },
      {
        title: "Software Engineering Intern",
        start: "May 2023",
        end: "Jul 2023",
        description:
          "Developed a feature for the productivity platform. Entered through the firm's Code for Good hackathon.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const skills = {
  engineering: {
    label: "Engineering",
    core: ["TypeScript", "JavaScript", "React", "Node.js", "Electron"],
    also: ["Python", "C++", "HTML", "CSS", "REST APIs", "SQL"],
    practice: ["Jest", "Git", "Agile", "Accessibility (WCAG)"],
  },
  product: {
    label: "Product",
    /** Only what a published piece of work demonstrates. Starts empty by design. */
    demonstrated: [] as string[],
  },
  tools: ["Claude Code", "Figma", "Mixpanel", "Vercel", "Notion", "Jira"],
} as const;

/* ------------------------------------------------------------------ */
/* Currently — one line, not a section                                 */
/* ------------------------------------------------------------------ */

export const currently = {
  // TODO — her draft had "[SEE NOTE 2] a new internal desktop assistant..."
  // with an unresolved bracketed note before "a new". Left out until she
  // supplies what that note actually says — don't guess at it.
  building:
    "Working as a software developer in the employee-facing internal productivity tool at JPMorgan Chase",
  learning:
    "AI product management: discovery, evals, and what makes an AI feature trustworthy. Nine-week programme at",
  learningLink: {
    label: "Rethink Systems",
    href: "https://rethinksystems.in",
  },
  elsewhere: "Observing life a little more closely and documenting it at",
  elsewhereLink: {
    label: "@dawndailydiary",
    href: "https://www.instagram.com/dawndailydiary/",
  },
  elsewhereJoiner: "and learning out loud at",
  elsewhereLink2: {
    label: "@dawnworkdiary",
    href: "https://www.instagram.com/dawnworkdiary/",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Background                                                          */
/* ------------------------------------------------------------------ */

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  institution: "Maulana Azad National Institute of Technology, Bhopal",
  years: "2020 – 2024",
  note: "CGPA 8.19",
  photo: "manit-graduation.jpg",
  /** Curated from her full coursework list — course codes and foundation
   * subjects (maths, physics, chemistry, humanities) dropped; this is the
   * subset that actually maps to what she builds now. */
  coursework: [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Software Engineering",
    "Computer Networks",
    "Artificial Intelligence",
    "Machine Learning",
  ],
} as const;

export interface SchoolEntry {
  level: string;
  institution: string;
  years: string;
  note: string;
}

/**
 * Curated the same way as the B.Tech entry above: one aggregate result per
 * level, not a subject-by-subject mark sheet. Two things from her original
 * raw export were left out on purpose, not by oversight — flag if either
 * should come back:
 * - IIT JEE coaching (Nucleus Education, Kota) — coaching attended for an
 *   exam, not an institution/credential, same reasoning that already cut
 *   Flipkart GRID and GirlScript Summer of Code from `recognition` below.
 * - The NTSE Stage 1 note under Class 10 — she didn't clear the cutoff
 *   (132 against 135), so it's an attempt, not a highlight.
 */
export const schooling: SchoolEntry[] = [
  {
    level: "Class 12, Physics, Chemistry, Mathematics",
    institution: "Imperial Academy Higher Secondary School, Burhanpur",
    years: "2018 – 2020",
    note: "90.60% · Madhya Pradesh Board of Secondary Education",
  },
  {
    level: "Class 10",
    institution: "Macro Vision Academy, Burhanpur",
    years: "2016 – 2018",
    note: "95.40% · CBSE, District Rank 2",
  },
];

/**
 * Education is no longer college-only (school added alongside it above),
 * but everything else in Background still is, per her instruction. Flipkart
 * GRID and GirlScript Summer of Code were cut (neither is a college
 * credential); MMVY stayed because it's a merit scholarship tied to her
 * four years of the degree itself.
 */
export const recognition: string[] = ["MMVY merit scholarship, all four years"];

/** Emptied deliberately — Robin Hood Army and Force For Good are both
 * post-graduation, not college details. Kept as a typed export (not deleted)
 * in case community involvement belongs elsewhere on the site later. */
export const community: string[] = [];

export const writing = {
  platform: "Medium",
  topics: ["Asynchronous JavaScript", "JavaScript APIs", "Web development", "Machine learning"],
  feedUrl: "",
} as const;

export const links: Link[] = [
  { label: "GitHub", href: "https://github.com/pratyusha2802" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pratyusha-patidar/" },
  { label: "Medium", href: "https://medium.com/@pratyushapatidar" },
  {
    label: "Résumé",
    href: "https://drive.google.com/file/d/1M7Q-QxARL85QBAW0G6kgHDfocyx7EkH2/view?usp=sharing",
  },
  { label: "Email", href: `mailto:${profile.email}` },
];
