# Component Architecture

## Route files

Keep Nextjs route files small and focused on:

* route definitions;
* route parameters;
* loaders and route-level data dependencies; and
* top-level page composition.

Do not implement an entire page in a route file.

## Component locations

Place components used only by a specific feature under:

`src/components/features/<feature>/`

Use nested directories when a feature contains multiple pages or domains.

Place components shared across multiple features under:

`src/components/shared/`

Do not place globally reusable components under `src/components/features/`.

A component does not need to be reusable outside its feature to justify extracting it.

## Example

Components used only by:

`src/app/skribenter/[slug]/[post]/page.tsx`

should be placed under:

`src/components/features/skribenter/skribent/post`

## Component extraction

Extract a section into a separate component when it:

* represents a distinct part of the page;
* manages its own state, queries, mutations, or event handlers;
* contains substantial JSX or business logic; or
* is easier to understand and test in isolation.

Avoid extracting trivial wrappers that do not improve readability or maintainability.
