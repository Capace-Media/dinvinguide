# UI Conventions

* Use Tailwind CSS for styling.
* Reuse existing repository components before creating or installing new ones.
* Add missing shadcn/ui components using Bun.
* If a required component cannot be added from shadcn/ui, build it using Base UI primitives.
* Use Lucide icons.
* Do not use `!important`.
* Display shadcn/ui skeletons while data-driven interfaces are loading.
* Prefer canonical Tailwind utilities over arbitrary values whenever an equivalent theme utility exists. For example, use `min-h-136` instead of `min-h-[34rem]`.
* Use arbitrary values only when no equivalent Tailwind utility or theme token exists.
* After changing UI code, run `bun run lint` and fix all Tailwind lint errors.
