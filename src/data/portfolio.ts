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
  | "problem"
  | "discovery"
  | "solution"
  | "scope"
  | "ux"
  | "metrics"
  | "build"
  | "evals";

export interface WorkItem {
  slug: string;              // matches src/content/work/{slug}.md
  title: string;
  track: Track;
  type: WorkType;
  status: WorkStatus;
  date: string;              // YYYY-MM, or just YYYY when that's all that's known
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
  href?: string;             // live link — empty until real
  repo?: string;
  reflection?: string;
  /** Exact card sub-heading line, e.g. "Self-directed discovery project · 2025". Overrides the default type/context/tools line when present. */
  meta?: string;
  /** Card CTA text. "Coming soon" (exact string) makes the card non-clickable instead of linking to /work/:slug. */
  cta?: string;
}

/** A role with more than one project inside it, each on its own timeline. */
export interface SubProject {
  name: string;
  start: string;
  end: string | "Present";
  note?: string;
}

export interface Role {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string | "Present";
  stack: string[];
  /** Single-paragraph roles (e.g. internships) use this. */
  description?: string;
  /** Roles spanning more than one project use this instead of `description`. */
  projects?: SubProject[];
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
  role: "Software Engineer, JPMorgan Chase",

  tagline:
    "Software engineer at JPMorgan Chase, moving into product management. I've spent two years building interfaces used by 300,000+ employees. Now I spend as much time on what's worth building as on how to build it.",

  about: [
    "I'm a software engineer at JPMorgan Chase, moving toward product management.",
    "Right now I'm a frontend developer on a new internal desktop assistant. Before that I spent a year and a half on the Core UI team behind an employee productivity application used by 300,000+ people across the firm — the team that owns the shared component layer both the core product and every team-built add-on depends on. Other teams across the bank build features that plug into that platform and ship on their own release cycle, which meant our users were internal developers as much as employees.",
    "I'm drawn to the parts of a product that don't announce themselves: the error state, the second-year maintenance cost, the flow nobody diagrammed. Building for teams I didn't control taught me the hardest problems sit upstream of the code — which problem is worth solving, whose constraint actually binds, and what \"good\" means before anyone has agreed how to measure it.",
    "So I've started doing product work deliberately, outside my job, and publishing what comes out of it.",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* How she operates — the most personal copy on the site               */
/* ------------------------------------------------------------------ */

/**
 * DRAFT. These are inferred, not dictated — rewrite them in your own words
 * before publishing. This is the section a reader remembers, and it can't
 * sound like it was generated.
 *
 * Each principle: a claim, then a concrete way it shows up in the work.
 * A principle nobody would disagree with isn't a principle.
 */
export const principles = [
  {
    claim: "I start with the structure.",
    detail:
      "Before writing a component or a document, I want to know what it's made of and what it'll be asked to do later. Planning isn't overhead; it's the cheapest hour in the project.",
  },
  {
    claim: "I build for the second year.",
    detail:
      "Anyone can ship a demo. I care whether the thing is still readable when someone else inherits it — which is why I keep ending up on reusable components and design systems.",
  },
  {
    claim: "Accessibility is a default, not a phase.",
    detail:
      "I led accessible component work because retrofitting it costs more and works worse. It's the same argument as testing: cheap early, expensive late.",
  },
  {
    claim: "I want to know how it fails.",
    detail:
      "The happy path is the least interesting part of any spec. I look for the empty state, the timeout, the wrong answer confidently delivered — especially with AI features, where confident wrongness is the default failure mode.",
  },
  {
    claim: "I'd rather be corrected early than right late.",
    detail:
      "I publish work before it's finished, including the parts I got wrong. It's slower to look polished and faster to actually improve.",
  },
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
  /* Product track — scaffolded case studies. Every substantive claim beyond
   * the problem framing below is a placeholder until real research/decision
   * material is supplied — see the TODOs in the matching .md files. */
  {
    slug: "emergency-medical-response-india",
    title: "Emergency Medical Response — The Pre-Ambulance Gap",
    track: "product",
    type: "case-study",
    status: "in-progress",
    date: "2025",
    context: "",
    hook: "In India's emergency medical response, the failure isn't ambulance speed — it's that nobody owns the window before the ambulance arrives.",
    users: "",
    decisions: [],
    measure: "",
    tools: [],
    meta: "Self-directed discovery project · 2025",
    cta: "Read the case study",
  },
  {
    slug: "gig-economy-worker-passport",
    title: "Worker Passport",
    track: "product",
    type: "case-study",
    status: "planned",
    date: "2025",
    context: "",
    hook: "Gig and quick-commerce workers rebuild their standing from zero every time they switch platforms. Worker Passport is a concept for portable, verified work history.",
    users: "",
    decisions: [],
    measure: "",
    tools: [],
    meta: "Self-directed concept work · 2025 · In progress",
    cta: "Coming soon",
  },

  /* Engineering track */
  {
    slug: "network-intrusion-detection",
    title: "Network Intrusion Detection",
    track: "engineering",
    type: "build",
    status: "published",
    date: "2024-04",
    context: "Final-year project, MANIT Bhopal",
    hook: "Intrusion detection models drown in correlated features and overfit to the benchmark rather than the attack.",
    decisions: [
      "Used correlation-based feature selection to cut redundant signals before modelling rather than after.",
      "Chose a stacked ensemble over a single classifier to trade a little interpretability for stability across attack classes.",
      "Evaluated on both KDD Cup 99 and NSL-KDD, because results on the former alone are known to flatter.",
    ],
    tools: ["Python", "scikit-learn"],
  },
  {
    slug: "bangalore-food-bank",
    title: "Bangalore Food Bank",
    track: "engineering",
    type: "build",
    status: "published",
    date: "2022-08",
    context: "Code for Good hackathon, 2022",
    hook: "Surplus food and the people who need it exist in the same city and rarely find each other in time. Built the frontend in 24 hours with an assigned team.",
    users: "Volunteers coordinating surplus-food pickup, and people/orgs with food nearing spoilage.",
    decisions: [
      "Led the frontend under a 24-hour constraint — scoped to one flow done properly rather than four half-built.",
      "Built for volunteers on low-end phones, which ruled out most of what we'd have reached for by default.",
    ],
    measure:
      "None tracked — judged by hackathon evaluators, not usage data. There was no usage to measure.",
    tools: ["React", "Node.js", "Express"],
    reflection:
      "The hackathon is also how I ended up at JPMorgan Chase, which I did not plan.",
    meta: "Build · Code for Good hackathon, 2022 · React, Node.js, Express",
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
      "Traded tracking accuracy for latency — a laggy pen is unusable in a way a slightly imprecise one isn't.",
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

export const experience: Role[] = [
  {
    company: "JPMorgan Chase & Co.",
    title: "Software Engineer",
    location: "Bengaluru",
    start: "Jul 2024",
    end: "Present",
    stack: ["React", "TypeScript", "Node.js", "Electron", "SCSS", "micro-frontend architecture"],
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
        note: "accessible, reusable UI components adopted across a platform serving 300,000+ employees",
      },
    ],
  },
  {
    company: "JPMorgan Chase & Co.",
    title: "Software Engineering Intern",
    location: "Bengaluru",
    start: "Jan 2024",
    end: "Jun 2024",
    stack: ["React", "TypeScript", "Electron", "HTML/CSS"],
    description:
      "Built two proof-of-concepts for the experimental phase of the productivity platform using micro-frontend architecture. Converted to a full-time offer.",
  },
  {
    company: "JPMorgan Chase & Co.",
    title: "Software Engineering Intern",
    location: "Bengaluru",
    start: "May 2023",
    end: "Jul 2023",
    stack: ["JavaScript", "TypeScript", "HTML/CSS"],
    description:
      "Developed a feature for the productivity platform. Entered through the firm's Code for Good hackathon.",
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
  building: "Working as a software developer in the employee-facing internal productivity tool at JPMorgan Chase",
  learning:
    "AI product management: discovery, evals, and what makes an AI feature trustworthy. Nine-week programme at",
  learningLink: {
    label: "Rethink Systems",
    href: "https://rethinksystems.in"
  },
  elsewhere: "Observing life a little more closely and documenting it at",
  elsewhereLink: {
    label: "@dawndailydiary",
    href: "https://www.instagram.com/dawndailydiary/",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Background                                                          */
/* ------------------------------------------------------------------ */

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  institution: "Maulana Azad National Institute of Technology, Bhopal",
  years: "2020 – 2024",
  /** Not currently rendered — her latest Background copy omits it. Kept here, not deleted, in case that was an oversight rather than a choice. */
  note: "CGPA 8.19",
} as const;

export const recognition: string[] = [
  // TODO — her draft prefixed this line with "[SEE NOTE 1]", unresolved.
  // Corrected from the old "Finalist, Flipkart GRID" claim — don't revert.
  "Flipkart GRID — qualified for Level 1, top 1,335 teams nationally",
  "Contributor, GirlScript Summer of Code 2023",
  "MMVY merit scholarship, all four years",
];

export const community: string[] = [
  "Chapter Representative, Robin Hood Army — Marathahalli–Bellandur (2025 – present)",
  "Developer, Force For Good — JPMC's technology-for-nonprofits programme",
];

export const writing = {
  platform: "Medium",
  topics: ["Asynchronous JavaScript", "JavaScript APIs", "Web development", "Machine learning"],
  feedUrl: "",
} as const;

export const links: Link[] = [
  { label: "GitHub", href: "" },
  { label: "LinkedIn", href: "" },
  { label: "Medium", href: "" },
  { label: "Résumé", href: "" },
  { label: "Email", href: `mailto:${profile.email}` },
];
