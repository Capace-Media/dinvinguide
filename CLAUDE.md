# DVG - DinVinguide

DinVinguide is a blog about food and drink, especially about Wine that's the main focus. And this blog serve about over 19000 posts about wine, exclusive wine, recipes, posts and diffrent guides.

## Package manager

* Use Bun to install packages and run scripts.
* Do not use npm, pnpm, or Yarn.

## Repository safety

* Never add `.env` files, credentials, or secrets to version control.
* Do not create Git commits or push changes. The repository owner reviews and performs all commits and pushes.
* after every task give me a short commit msg like "feat: implemented a new form for recipies"

## Linting

* After making changes, run `bun run lint` and fix all errors.

## Linting

* After making changes, run `bun run lint` and fix all errors.

## Versioning

* When adding a feature or fixing a bug, bump `version` in the `package.json`.

## Repository layout

* `src/app` — Nextjs Router routes
* `src/components` — components shared across features
* `src/components/ui` — shadcn/ui components
* `src/hooks` — custom hooks
* `src/lib` — utils, queries and fetchers


Do not inspect or modify dependencies and generated directories such as `node_modules/` unless the task explicitly requires it.

## Task-specific instructions

Read only the documentation relevant to the current task:

* Before creating or modifying TypeScript code, read `docs/typescript-conventions.md`.
* Before creating or modifying a form, read `docs/form-conventions.md`.
* Before adding or changing user-facing text or translations, read `docs/i18n-conventions.md`.
* Follow any more-specific `AGENTS.md` files in the directories being modified.
* Before creating or modifying a route or React component, read `docs/component-architecture.md`.
* Before creating or modifying user interface code, styles, icons, or loading states, read `docs/ui-conventions.md`.
