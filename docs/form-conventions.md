# Form Conventions

- **Library:** `@tanstack/react-form` + `zod` (v4, used directly as a Standard Schema — no
  adapter package).

- **Schema lives in `lib/schemas/form/`, not inline in the component:**
  ```ts
  // lib/schemas/form/contact-us.ts
  import { z } from 'zod';

  export const profileSchema = z.object({
    name: z.string().trim().min(1, 'profile.nameRequired'),
    phone: z.string().trim(),
    zipCode: z.string().trim(),
  });
  ```

- **Split the loading state from the form.** Only mount the form after the query data is available, so `useForm` can receive the query data as its initial `defaultValues`. Don’t populate `defaultValues` later with `useEffect`.


- **Use `useSelector`, not `useStore`, for form-state subscriptions outside `form.Field`** (e.g. buttons and banners). Fields already subscribe to their own state internally.

- **Let submission errors propagate, and derive submission status from the form store.**
  Await the mutation in `onSubmit` and let failures reject; swallowing them makes the
  form treat the submission as successful. Don’t duplicate submission status in
  `useState`. Catch rejections where you call `form.handleSubmit()`.

- **Use `isDefaultValue`, not `isDirty`, for “nothing to save.”**
  `isDirty` tracks whether a field has been edited; `isDefaultValue` checks whether
  current values match the defaults, including after an edit is undone.
  After a successful save, call `formApi.reset(values)` to make the saved values
  the new defaults. Derive Save-button and success-banner state from this instead
  of manual comparisons or `onChange` listeners.

- **Wire fields directly to `form.Field`.** Input atoms such as `TextField` already accept
  `value`, `onChangeText`, `onBlur`, and `error`; don’t mirror field state in local state.

  ```tsx
  <form.Field name="phone">
    {(field) => (
      <TextField
        value={field.state.value}
        onChangeText={field.handleChange}
        onBlur={field.handleBlur}
        error={fieldError(field.state.meta.errors, t)}
      />
    )}
  </form.Field>
```

- **Use local `useState` only for UI state outside the form** (for example, whether an unrelated
  modal is open). Submission and edit state already live in `form.store`; derive “is submitting,”
  “did the last submit succeed,” and “are there unsaved changes” from there.

- **Out of scope for now:** share Zod schemas between forms and API input types, and migrate the
  remaining `useState` + `useEffect` form screens. Migrate a screen when you’re already changing
  it, following this document rather than its existing pattern.
