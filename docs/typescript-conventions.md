## TypeScript Conventions

- Keep TypeScript strict and resolve type error instead of weakening compiler options.
- Avoid `any`. Treat data from requests, responses, and other external boundaries as `unknown` until it has been validated or narrowed.
- Derive request and response types from shared Zod schemas when possible so runtime validation and static types stay aligned.
- Use `import type` for type-only imports.
- Mark values `readonly` when callers should not mutate them, and avoid mutatuing objects received from another layer.
- Choose descriptive domain names instead of generic names such as `Data`, `Item`, or `Result`.
