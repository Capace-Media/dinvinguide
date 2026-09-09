# Set up CI: lint, unit tests, and smoke tests as merge gates

## Context

Vercel already covers more than it looks like, so this was smaller than a full CI build-out.

**What Vercel does for us** (no work needed):

- Type checks — `next build` runs `tsc`, and `next.config.js` does not set `typescript.ignoreBuildErrors`
- Catches syntax errors, broken imports, and server/client boundary mistakes
- Builds a preview deployment per PR and posts a status check

**The gaps this issue closes:** ESLint never ran automatically, nothing blocked a merge, and nothing tested the app.

Workflow is: commit to `dev` → PR `dev` → `main` → verify → merge. Branch protection targets `main` only; `dev` stays unprotected as the working branch.

## Done

### Fix `bun run lint` (was completely broken)

`eslint.config.mjs` imported `@eslint/compat` and `eslint-plugin-import`, neither of which was installed — and once that was resolved, ESLint 10 turned out to be incompatible with `eslint-config-next@16.3.4` (which depends on `typescript-eslint@^8`, giving `scopeManager.addGlobals is not a function`).

- [x] Dropped the `import` plugin from `eslint.config.mjs` — it was registered but no `import/*` rules used it, which removed the `@eslint/compat` dependency entirely
- [x] Downgraded `eslint` 10 → 9.39.5, the version `eslint-config-next` actually supports
- [x] `bun run lint` exits 0

### Workflows

- [x] `.github/workflows/ci.yml` — lint + unit tests on push to `dev` and on PRs to `dev`/`main`
- [x] `.github/workflows/smoke.yml` — smoke tests on `deployment_status`, against the real Vercel preview
- [x] Bun version pinned to `1.4.0` rather than `latest`
- [x] `actions/checkout@v5` and `actions/cache@v5` (v4 targets the deprecated Node 20)
- [x] Bun install cache keyed on `bun.lock`
- [x] Lint and unit tests share one job — billing rounds each job up to a whole minute
- [x] Vercel Protection Bypass secret wired up (`VERCEL_AUTOMATION_BYPASS_SECRET`), since preview URLs sit behind SSO and answer 200 with a login page

### Branch protection

- [x] Rule on `main`, require a pull request before merging
- [x] `Vercel` required
- [x] Lock branch left off (it would block merges, not just pushes)

## Remaining

### 1. Require the other two checks — the important one

Currently only `Vercel` is required, so **a red Lint or Smoke check does not block a merge**. Both have now reported at least once, so they are selectable.

- [ ] Settings → Branches → `main` → Require status checks → add **`Lint & unit tests`**
      (note the name — the job was renamed when unit tests were added; a rule
      referencing plain `Lint` will wait forever on a check that never reports)
- [ ] Add **`Smoke tests`**
- [ ] Untick **Require branches to be up to date** (`strict: true` today) — with a
      single `dev` branch it just forces a sync from `main` after every merge

### 2. Housekeeping

- [ ] `git rm .eslintrc.json` — dead since ESLint 9 flat config; having both is confusing
- [ ] Add `"typecheck": "tsc --noEmit"` to scripts — handy locally even though Vercel covers it
- [ ] Consider `engines` in `package.json` to document the expected runtime

### 3. Fix the three `set-state-in-effect` warnings

`eslint-plugin-react-hooks` v7 flags `setState` called synchronously inside an effect. The rule is downgraded to `warn` in `eslint.config.mjs:15` so CI can enforce the rest of the ruleset. Probably deserves its own issue.

- [ ] `src/hooks/useRouteStyle.ts:31` — `setDL()` in an effect; likely derivable from `usePathname()` with no state at all
- [ ] `src/app/skribenter/components/AuthorHero/index.tsx:20` — `setData(promise)` in an effect keyed on `promise`
- [ ] `src/components/Templates/PlaylistTemplate/Player.tsx:33` — `playAd()` in an effect on episode change
- [ ] `src/app/skribenter/components/Search/index.tsx:27` — missing `router`/`uri` deps (`exhaustive-deps`)
- [ ] Restore `"react-hooks/set-state-in-effect": "error"` once fixed

## Out of scope

- **Running `tsc` in Actions** — Vercel's build already does it
- **Running `next build` in Actions** — would need CMS credentials as secrets, and duplicates Vercel

## Notes

- `bun.lock` is the tracked lockfile — no `package-lock.json`, so workflows use Bun, not npm
- Pushing to `dev` while a PR is open lints the same commit twice. Harmless and cheap; drop the `push` trigger if it bothers you
- `main` is only written by merging a PR, so there is no `push: main` trigger
- The smoke suite found a real bug on its first useful run: `/importorer` rendered 0 ads in production because `SuppliersList` calls `useSearchParams()` without a Suspense boundary, which bailed the whole route out of static prerendering. Invisible in `bun run dev` — only a production build shows it.
