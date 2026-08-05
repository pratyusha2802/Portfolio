# Releasing / Deployment Spec

This file exists because of a real incident: changes got pushed to the live
site (`master`) without explicit, per-instance confirmation, more than once,
and once during that process the wrong branch got merged into the other and
briefly took the live site back to an old pre-React template with a third
party's personal data in it. The rules below exist to make that structurally
harder to repeat, not just to promise it won't happen.

## Hard rule — read this before touching git

**Never run `git push` to `origin` — either branch — without an explicit,
same-turn "push it" from her.** Approval from earlier in the conversation, or
from a previous session, does not carry forward. It does not matter how
obviously-correct the change seems.

What this means in practice:

- Making changes to files, running `tsc`/`oxlint`/`prettier`/`npm run build`,
  and committing **locally** is always fine without asking first.
- `git push` (to `dev` or `master`) requires stopping and asking, every time,
  even mid-task, even if she asked for "the fix" in the same message.
- If a task naturally ends with "and now it's live" as the implied goal,
  that implication is not the same as being told to push. Ask.

## Branch model

- **`dev`** — where all work happens. Nothing about `dev` is public-facing;
  it's safe to iterate on freely (locally).
- **`master`** — what's actually live at
  `https://pratyusha2802.github.io/Portfolio/`, deployed automatically via
  GitHub Actions (`.github/workflows/deploy.yml`) on every push to `master`.
  Anything pushed here is public within minutes.
- Keep `dev` and `master` content-identical after every promotion — promote
  via `git cherry-pick`, never a divergent merge in either direction. See the
  root `../CLAUDE.md`'s git-incident notes for exactly what went wrong the one
  time this wasn't followed (a `master`-into-`dev` merge reintroduced the old
  template and a third party's images).

## Before every deploy (i.e. before that confirmed push to `master`)

1. **Run `npm run verify`** (typecheck, lint, format check, build — all must
   pass). This also runs automatically: the pre-push hook blocks a push that
   fails it, and CI (`.github/workflows/ci.yml`) re-runs it on every push and
   PR to `dev` and `master` as a backstop.
2. **Bump the version** in `package.json` (see Versioning below).
3. **Add a `CHANGELOG.md` entry** describing what's shipping, under the new
   version heading.
4. Commit the version bump + changelog entry (can be the same commit as the
   content change, or a small commit right after it).
5. **State plainly what's about to go live** — the version number and a
   one-line summary — and wait for an explicit "yes, push" before running
   anything that touches `origin`.
6. Push `dev`, cherry-pick the same commit(s) to `master`, push `master`.
7. Confirm the GitHub Actions run succeeded
   (`gh run list` / the Actions tab / the API) and spot-check the live URL
   before calling the task done.

## Versioning

`package.json`'s `version` field, informally semver:

- **PATCH** (`0.1.x`) — copy tweaks, small CSS/layout fixes, bug fixes.
- **MINOR** (`0.x.0`) — new sections, a case study going live, structural
  changes to the page.
- **MAJOR** (`x.0.0`) — reserved for an actual relaunch/redesign, not used
  casually.

The version number is the thing both of us can point at unambiguously when
asking "what's live right now" — check `CHANGELOG.md` for what a given
version actually contains.
