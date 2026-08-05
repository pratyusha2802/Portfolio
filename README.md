# Portfolio

Source for [pratyusha2802.github.io/Portfolio](https://pratyusha2802.github.io/Portfolio/) —
a React + TypeScript single-page site, statically built and deployed via
GitHub Pages.

## Stack

- React 19 + TypeScript (strict) + Vite, `react-router-dom` for client-side routing
- Case-study content authored as markdown under `src/content/work/`
- No CMS, no server — everything ships as static files

## Getting started

```bash
nvm use          # Node version pinned in .nvmrc
npm install
npm run dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run test` | Run the test suite (Vitest) |
| `npm run lint` | oxlint |
| `npm run format` / `format:check` | Prettier, write or check |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run verify` | typecheck + lint + format check + test + build — the full gate, also run by the pre-push hook and CI |

## Contributing / process docs

- [`CLAUDE.md`](./CLAUDE.md) — architecture, content rules, and known gotchas
- [`docs/RELEASING.md`](./docs/RELEASING.md) — branch model, versioning, and the deploy checklist
- [`docs/CHANGELOG.md`](./docs/CHANGELOG.md) — what's live at each version
- [`docs/_authoring.md`](./docs/_authoring.md) — spec for writing a new case study
