# Testing

## When to add tests

Test important observable behavior, regressions, edge cases, and integration boundaries. Do not add tests merely because a file or function changed.

Prioritize behavior that would be costly or hard to notice if it broke, especially generated schema, entity links, defaults, saved values, frontend/GraphQL consistency, and SEO-plugin compatibility.

For a bug fix, add a regression test when the bug can be reproduced reliably. For straightforward UI or refactoring changes, run existing checks and tests; add a new test only if it protects meaningful behavior.

Test behavior and public contracts rather than implementation details. Avoid tests for private call sequences or trivial wrappers.

## Test integrity

Treat existing tests as evidence of intended behavior. Do not weaken, skip, delete, or change their expectations merely to make an implementation pass.

Change a test expectation only when the requested behavior genuinely changed or the test is demonstrably wrong. Explain why it changed.

## TypeScript tests

Use Vitest for meaningful behavior in type guards, validation, shared utilities, and editor UI.

Test invalid external values as well as valid values when those cases matter.

## Test file placement

Colocate tests with the code they primarily test. Use the source filename followed by `.test`, for example, `admin.ts` → `admin.test.ts` or `Button.tsx` → `Button.test.tsx`.

For tests without a single corresponding source file:
- Keep feature-specific integration tests within the feature, using a `tests/` subdirectory when helpful.
- Place integration tests spanning multiple features in `tests/integration/`.
- Place end-to-end tests covering complete user flows in `e2e/`.
- Place shared test helpers and fixtures in `test-utils/`. Keep helpers used by only one test or feature nearby.

Follow existing test-runner conventions where required. Do not move unrelated tests solely to enforce this structure.

## Running tests

Run the relevant test suite during implementation. Before handoff, run the applicable project checks and tests

Run all tests with `bun run test` (Vitest). `tests/integration/api-auth.test.ts` checks that every route under `app/api` returns 401 without a session. The site has no user accounts, so for routes protected by a secret (`/api/draft`, `/api/revalidate`, `/api/search/refresh`) "without a session" means without that secret. A new route is covered automatically unless it is added to `PUBLIC_ROUTES` in that file, which needs the repository owner's approval.
