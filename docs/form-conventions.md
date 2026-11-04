# Form Conventions

- **Library:** `@tanstack/react-form` + `zod` (v4, used directly as a Standard Schema — no
  adapter package). `@tanstack/react-form` is not installed yet; add it with
  `bun add @tanstack/react-form` when the first form is migrated.

- **Schema lives in `src/lib/schemas/form/`, not inline in the component.** User-facing
  messages are written in Swedish directly in the schema (the site has no translation keys).

  ```ts
  // src/lib/schemas/form/newsletter.ts
  import { z } from "zod";

  export const newsletterSchema = z.object({
    email: z.email("Ange en giltig e-postadress"),
    ageChecked: z.literal(true, "Du måste vara över 25 år"),
  });
  ```

- **Split the loading state from the form.** Only mount the form after the query data is
  available, so `useForm` can receive the query data as its initial `defaultValues`. Don't
  populate `defaultValues` later with `useEffect`.

- **Use `useSelector`, not `useStore`, for form-state subscriptions outside `form.Field`**
  (e.g. buttons and banners). Fields already subscribe to their own state internally.

- **Let submission errors propagate, and derive submission status from the form store.**
  Await the mutation in `onSubmit` and let failures reject; swallowing them makes the
  form treat the submission as successful. Don't duplicate submission status in
  `useState`. Catch rejections where you call `form.handleSubmit()`.

- **Use `isDefaultValue`, not `isDirty`, for "nothing to save."**
  `isDirty` tracks whether a field has been edited; `isDefaultValue` checks whether
  current values match the defaults, including after an edit is undone.
  After a successful save, call `formApi.reset(values)` to make the saved values
  the new defaults. Derive Save-button and success-banner state from this instead
  of manual comparisons or `onChange` listeners.

- **Wire fields directly to `form.Field`** using the shadcn/ui inputs from
  `src/components/ui`. Don't mirror field state in local state.

  ```tsx
  <form.Field name="email">
    {(field) => (
      <>
        <Input
          type="email"
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          aria-invalid={field.state.meta.errors.length > 0}
        />
        {field.state.meta.errors.map((error) => (
          <p key={error?.message} className="text-sm text-destructive">
            {error?.message}
          </p>
        ))}
      </>
    )}
  </form.Field>
  ```

- **Use local `useState` only for UI state outside the form** (for example, whether an
  unrelated modal is open). Submission and edit state already live in `form.store`; derive
  "is submitting," "did the last submit succeed," and "are there unsaved changes" from there.

- **Out of scope for now:** sharing Zod schemas between forms and API input types, and
  migrating the remaining `useState` form (`src/components/shared/newsletter/newsletter-form.tsx`).
  Migrate it when you're already changing it, following this document rather than its
  existing pattern.
