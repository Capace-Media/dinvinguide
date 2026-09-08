# Set up CI: make lint runnable, then enforce checks on PRs

## Context

There is no CI and no branch protection. Vercel already covers more than it looks like, so this is smaller than a full CI build-out — but there are two real gaps, plus a broken script to fix first.

**What Vercel already does for us** (no work needed):

- Type checks — `next build` runs `tsc` and `next.config.js` does not set `typescript.ignoreBuildErrors`
- Catches syntax errors, broken imports, and server/client boundary mistakes
- Builds a preview deployment per PR and posts a status check

**What nothing currently does:**

- **ESLint never runs.** Next 16 removed `next lint`; `package.json` is migrated to standalone `eslint .`, so it only runs when someone types it by hand.
- **Nothing blocks a merge.** A red Vercel check is advisory — there's no branch protection rule.

Duplicating `tsc` in GitHub Actions would be wasted minutes. The work is lint + enforcement.

## Blocker: `bun run lint` is currently broken

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@eslint/compat'
imported from /eslint.config.mjs
```

`eslint.config.mjs` imports `@eslint/compat` and `eslint-plugin-import`, but neither is in `package.json`. Installed eslint packages are only `eslint`, `eslint-config-next`, `@typescript-eslint/eslint-plugin`.

**This must be fixed before wiring lint into CI**, or CI is red on day one and everyone learns to ignore it.

- [ ] Add the missing deps: `bun add -d @eslint/compat eslint-plugin-import`
- [ ] Or simplify `eslint.config.mjs` to drop the `import` plugin — it's declared but no `import/*` rules are actually configured, so `fixupPluginRules` + `@eslint/compat` may be removable entirely
- [ ] Delete `.eslintrc.json` — legacy config, dead since ESLint 10 only reads flat config. Having both is confusing.
- [ ] Confirm `bun run lint` exits 0, and fix or `eslint-disable` whatever it reports

## Tasks

### 1. Branch protection (highest value, ~5 minutes, no code)

Current workflow: work on `dev` → open a PR `dev` → `main` → check Vercel → merge.
That already has a review point; it just isn't enforced.

- [ ] Settings → Branches → add rule for **`main` only**
- [ ] Enable **Require status checks to pass before merging**
- [ ] Select the **Vercel** check
- [ ] Once the lint workflow exists (step 2), add its check here too

Leave `dev` unprotected — it's the working branch and is committed to
directly by design.

This turns the existing manual "if everything checks out with Vercel I
merge" step into something that can't be skipped by accident.

### 2. Lint workflow

- [ ] Add `.github/workflows/ci.yml`

**Note: this project uses Bun** (`bun.lock` is the tracked lockfile, no `package-lock.json`). The workflow must use Bun, not npm:

```yaml
name: CI
on:
  pull_request:
    branches: [main]   # the dev -> main PR: this is the merge gate
  push:
    branches: [dev]    # early feedback while working, before the PR exists

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - run: bun install --frozen-lockfile
      - run: bun run lint
```

- [ ] Confirm it goes green on a throwaway PR
- [ ] Add the `lint` check to the branch protection rule from step 1

### 3. Fix the three `set-state-in-effect` warnings

`eslint-plugin-react-hooks` v7 flags `setState` called synchronously inside an
effect. The rule is currently downgraded to `warn` in `eslint.config.mjs` so CI
can enforce everything else; these should be fixed and the rule restored to
`error`.

- [ ] `src/hooks/useRouteStyle.ts:31` — `setDL()` in an effect; likely derivable from `usePathname()` without state at all
- [ ] `src/app/skribenter/components/AuthorHero/index.tsx:20` — `setData(promise)` in an effect keyed on `promise`
- [ ] `src/components/Templates/PlaylistTemplate/Player.tsx:33` — `playAd()` in an effect on episode change
- [ ] `src/app/skribenter/components/Search/index.tsx:27` — missing `router`/`uri` deps (`exhaustive-deps`)
- [ ] Restore `"react-hooks/set-state-in-effect": "error"` once fixed

### 4. Optional follow-ups

- [ ] Add `"typecheck": "tsc --noEmit"` to scripts — useful locally even though Vercel covers it in CI
- [ ] Pin a Bun version in the workflow instead of `latest`, so CI doesn't drift
- [ ] Consider `engines` in `package.json` to document the expected runtime
- [ ] Consider pre-commit lint via husky + lint-staged — faster feedback than waiting on CI

## Explicitly out of scope

- **Running `tsc` in Actions** — Vercel's build already does this
- **Running `next build` in Actions** — needs `CMS_GRAPHQL_URI` and credentials as GitHub Secrets, and duplicates Vercel
- **A test suite** — no test framework is installed; worth discussing separately. Smoke tests (assert a route 200s and renders its ad slots) would fit this project better than unit tests, since most code is thin presentation over CMS data.

## Notes

- Local Node is v24; `package.json` has no `engines` or `packageManager` field.
- `bun.lock` is tracked and not gitignored, so `--frozen-lockfile` is safe.
- Workflow is: commit to `dev` → PR `dev` → `main` → verify Vercel → merge. Branch protection on `main` matches this exactly; `dev` stays unprotected.
- The two triggers overlap slightly: pushing to `dev` while a PR is open runs lint twice for the same commit. Harmless, and cheap for a lint-only job — drop the `push` trigger if the duplication is annoying.
- `main` is only ever written by merging the PR, so there's no `push: main` trigger — the PR check already covered that code.
