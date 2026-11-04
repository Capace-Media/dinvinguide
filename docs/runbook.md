# Runbook

Facts marked `TODO` are not known yet and must be filled in by the repository owner. Do not guess them.

## Overview

- Next.js app (App Router), Bun as package manager, hosted on Vercel.
- Content comes from WordPress through GraphQL. The site has no database of its own and no user accounts.
- Repository: `Capace-Media/dinvinguide`, default branch `main`.

## Deploy flow

1. Branch from the latest `main` (`feat/...`, `fix/...`, `chore/...`).
2. Run `bun run fmt`, `bun run lint`, `bun run typecheck` and `bun run test` locally.
3. Push and open a pull request. Vercel builds a preview; the `ci` check runs.
4. The `protect-main` ruleset requires: a pull request, 1 approval including a code owner, and the status checks `ci` and `Vercel`. Direct pushes, force pushes and deletion of `main` are rejected.
5. Merging to `main` deploys to production through the Vercel Git integration. After the deploy the `Smoke` workflow runs the smoke tests against the deployment.

The owner can bypass the ruleset for pull requests only. Use it in emergencies, with the checks green.

## Rollback

- Fast: in the Vercel dashboard, open the production project → Deployments → pick the last good deployment → **Instant Rollback**.
- Permanent: revert the bad pull request on GitHub and merge the revert through the normal flow.
- Known-good tags are created by the owner after a release is verified (`git tag -a vX.Y.Z -m "Known good"`). Latest known-good tag: `TODO`.

## Secrets and environment variables

Secrets live in Vercel (Production, Preview, Development) and in each developer's local `.env`. `.env` is gitignored and must never be committed. Only the names are listed here.

| Name                                     | Used by                        | Notes                                                                                            |
| ---------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------ |
| `CMS_GRAPHQL_URI`                        | WordPress GraphQL client       | Endpoint URL                                                                                     |
| `CMS_GRAPHQL_AUTH_USER`                  | WordPress GraphQL client       | Basic auth user                                                                                  |
| `APPLICATION_NEW_PASSWORD`               | WordPress GraphQL client       | WordPress application password                                                                   |
| `PREVIEW_TOKEN`                          | `/api/draft`                   | Preview links from WordPress                                                                     |
| `REVALIDATION_SECRET_TOKEN`              | `/api/revalidate`              | Sent by WordPress as header `x-revalidate-secret` (the `?secret=` parameter still works for now) |
| `CRON_SECRET`                            | `/api/search/refresh`          | Sent by Vercel Cron as a bearer token                                                            |
| `BLOB_READ_WRITE_TOKEN`, `BLOB_STORE_ID` | Search snapshot in Vercel Blob |                                                                                                  |
| `VERCEL_AUTOMATION_BYPASS_SECRET`        | Smoke workflow                 | GitHub Actions secret                                                                            |
| `NEXT_PUBLIC_*`                          | Public config                  | Not secret                                                                                       |

An old `.env` was committed to this public repository between 2021 and 2024 and is still in git history. Rotate any secret that appears in it (WordPress credentials, preview and revalidation tokens, JWT secret, YouTube key). Rotation date: `TODO`.

## API routes

- Public: `/api/posts`, `/api/search`, `/api/disable-draft`.
- Secret-protected (401 without the secret): `/api/draft`, `/api/revalidate`, `/api/search/refresh`.
- `tests/integration/api-auth.test.ts` enforces this for every route, including new ones.

## Backups

- WordPress content and database host: `TODO`
- Backup schedule and retention: `TODO`
- Last restore test (into a scratch database): `TODO`
- The Vercel Blob search snapshot is rebuilt from WordPress by the daily cron and does not need a backup.

## Monitoring and alerts

- Uptime monitor on the production URL: `TODO`
- Vercel deployment-failure alerts: `TODO`
- Alerts must go to someone other than the developer: `TODO`
- Daily cron `/api/search/refresh` runs at 02:00 UTC (`vercel.json`); check its logs in Vercel if search results look stale.

## Access

| Person       | GitHub role                   | Vercel                      | WordPress / database |
| ------------ | ----------------------------- | --------------------------- | -------------------- |
| RickOliwer   | admin (owner, ruleset bypass) | `TODO`                      | `TODO`               |
| capacemedia  | admin                         | `TODO`                      | `TODO`               |
| DarionV      | write                         | none (no production access) | `TODO`               |
| JunfangAnnie | read                          | `TODO`                      | `TODO`               |

Remove people who have left. Database credentials and third-party accounts stay with authorised people.

## Contacts

- Owner: `TODO`
- Hosting (Vercel) account holder: `TODO`
- WordPress host support: `TODO`
