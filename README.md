# DinVinguide

DinVinguide is a Swedish editorial site for wine, food, and drink. It brings together wine guides, tasting recommendations, recipes, articles, top lists, a wine atlas, a grape guide, a glossary, video, and content from specialist writers.

The site is a modern frontend for content managed in WordPress. It fetches editorial data through WPGraphQL and renders it with Next.js, with support for previews and targeted cache revalidation when content changes.

## Technology

- [Next.js 16](https://nextjs.org/) with the App Router and Turbopack
- [React 19](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- [Bun](https://bun.sh/) for package management, scripts, and tests
- [Tailwind CSS 4](https://tailwindcss.com/) and Base UI for the interface
- WordPress and WPGraphQL as the content platform
- GraphQL Code Generator for typed content queries
- TanStack Query for client-side data fetching where needed
- Next.js metadata, JSON-LD, robots, and sitemaps for SEO
- Next Image with AVIF/WebP optimization for local and WordPress-hosted media

## Requirements

- Bun
- Access to the DinVinguide WordPress GraphQL endpoint and its credentials

## Getting started

Install dependencies:

```bash
bun install
```

Configure the required environment variables in your local environment. Keep credentials out of version control.

| Variable | Purpose |
| --- | --- |
| `CMS_GRAPHQL_URI` | WordPress WPGraphQL endpoint used by the application and schema pull script. |
| `CMS_GRAPHQL_AUTH_USER` | Username for authenticated GraphQL requests. |
| `APPLICATION_NEW_PASSWORD` | Password for authenticated GraphQL requests. |
| `PREVIEW_TOKEN` | Secret required to enable WordPress draft previews. |
| `REVALIDATION_SECRET_TOKEN` | Secret required by the on-demand revalidation endpoint. |
| `NEXT_PUBLIC_SITE_URL` | Public canonical site URL used by metadata, robots, and sitemaps. |
| `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID` | Google Tag Manager container ID. |
| `NEXT_PUBLIC_COOKIE_PREFIX` | Cookie-consent storage prefix. |

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the local Next.js development server with Turbopack. |
| `bun run build` | Create a production build. |
| `bun run start` | Run the production server after a successful build. |
| `bun run lint` | Run ESLint across the project. |
| `bun run test` | Run the Bun test suite. |
| `bun run test:unit` | Run unit tests under `src`. |
| `bun run test:smoke` | Run browserless smoke tests against `BASE_URL` or `http://localhost:3000`. |
| `bun run codegen` | Generate typed GraphQL documents from the committed WordPress schema. |
| `bun run schema:pull` | Fetch the current WordPress schema, then regenerate typed GraphQL documents. |
| `bun run svg` | Generate React icon components from SVG assets. |

Smoke tests need a reachable running site. When testing a protected Vercel preview, set `BASE_URL` and `VERCEL_AUTOMATION_BYPASS_SECRET` for the test process.

## Content and caching

WordPress is the source of truth for editorial content. The app queries it through a single typed GraphQL client in `src/lib/wp`, and generated documents live beside that client. After changing a GraphQL query, run `bun run codegen`. After WordPress schema changes, run `bun run schema:pull`.

Most WordPress responses are cached with Next.js cache tags. The `GET /api/revalidate` route accepts the configured revalidation secret and clears the requested tag or route, allowing CMS updates to appear without a full redeploy. The `GET /api/draft` route enables Next.js draft mode for authorized WordPress previews.

## Project structure

```text
src/app/          Routes, route handlers, metadata, sitemaps, and page layouts
src/components/   Shared layout, feature, SEO, UI, and content components
src/hooks/        Reusable React hooks
src/lib/          WordPress client, GraphQL queries, utilities, and providers
src/shared/       Components shared across route families
src/json/         Static guide and taxonomy data
public/           Images, icons, consent assets, and web manifest files
scripts/          Repository maintenance scripts, including schema retrieval
tests/            End-to-end smoke tests
```

## Quality checks

Run linting before opening a pull request:

```bash
bun run lint
```

Run the relevant unit tests for code changes, and use smoke tests against a local server or preview deployment when changing routes, templates, CMS queries, or advertising placements.
