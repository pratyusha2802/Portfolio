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
  date: string;              // YYYY-MM
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
}

export interface Role {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string | "Present";
  summary: string;
  highlights: string[];
  stack: string[];
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

  /** What she does, not what she's becoming. */
  role: "Software engineer, JP Morgan Chase",

  tagline:
    "I build software, and I'm increasingly interested in the decisions that come before the building.",

  about: [
    "I'm a software engineer at JP Morgan Chase. Right now I'm building a desktop employee assistant from scratch — conversational AI for internal users. Before that I worked on the core UI of a Digital Assistant inside a productivity tool used across the firm.",
    "I'm drawn to the parts of a product that don't announce themselves: the error state, the second-year maintenance cost, the flow nobody diagrammed. Two years of shipping AI features taught me the hardest problems sit upstream of the code — which problem is worth solving, what a good answer looks like when the model is non-deterministic, and how you evaluate something nobody has evaluated before.",
    "So I've started working on that side deliberately, and publishing what comes out of it. The work below is the evidence.",
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
  /* Product track — rename slug and title to the real subject as each is built */
  {
    slug: "",
    title: "",
    track: "product",
    type: "prd",
    status: "planned",
    date: "",
    context: "AI product management programme",
    hook: "",
    users: "",
    decisions: [],
    measure: "",
    stages: [],
    tools: [],
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
    context: "Code for Good 2022",
    hook: "Surplus food and the people who need it exist in the same city and rarely find each other in time.",
    decisions: [
      "Led the frontend under a 24-hour constraint — scoped to one flow done properly rather than four half-built.",
      "Built for volunteers on low-end phones, which ruled out most of what we'd have reached for by default.",
    ],
    tools: ["React", "Node.js", "Express"],
    reflection:
      "The hackathon is also how I ended up at JP Morgan, which I did not plan.",
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
    company: "JP Morgan Chase & Co.",
    title: "Software Engineer",
    location: "Bengaluru",
    start: "Jul 2024",
    end: "Present",
    summary:
      "Internal productivity and conversational-AI tooling for a firmwide employee base.",
    highlights: [
      "Building a greenfield desktop employee assistant — conversational AI for employee support alongside broader productivity features.",
      "Previously on the core UI team for a Digital Assistant inside a firmwide productivity tool used by 300,000+ employees across meetings, calls, and intranet search.",
      "Led work with product and design on an accessible, reusable component set adopted across that surface.",
    ],
    stack: ["React", "TypeScript", "Electron", "Node.js", "Jest"],
  },
  {
    company: "JP Morgan Chase & Co.",
    title: "Software Engineering Intern",
    location: "Bengaluru",
    start: "May 2023",
    end: "Jun 2024",
    summary:
      "Summer internship followed by an extended term; converted to a full-time offer.",
    highlights: ["Entered through Code for Good 2022, JPMC's social-impact hackathon."],
    stack: ["React", "JavaScript", "Node.js"],
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
  building: "A desktop employee assistant at JP Morgan Chase.",
  learning:
    "AI product management — discovery, evals, and what makes an AI feature trustworthy — through a nine-week programme at Rethink Systems.",
  elsewhere: "Illustration, badminton, and a Robin Hood Army chapter in Bengaluru.",
} as const;

/* ------------------------------------------------------------------ */
/* Background                                                          */
/* ------------------------------------------------------------------ */

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  institution: "Maulana Azad National Institute of Technology, Bhopal",
  years: "2020 – 2024",
  note: "CGPA 8.19",
} as const;

export const recognition: string[] = [
  "Finalist, Flipkart GRID",
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
