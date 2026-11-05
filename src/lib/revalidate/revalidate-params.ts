import { z } from "zod";

// `revalidatePath` only accepts up to 1024 characters and ignores a dynamic
// pattern such as `/recept/[slug]` without a type, logging a warning instead.
const MAX_PATH_LENGTH = 1024;

const pathSchema = z
  .string()
  .trim()
  .max(MAX_PATH_LENGTH)
  .refine((value) => !/[[\]]/.test(value));

export type RevalidateTarget =
  | { readonly ok: true; readonly path: string | null }
  | { readonly ok: false };

// Reads the `path` parameter of `/api/revalidate`. It is a tag keyword such as
// `post`, or a literal path such as `/recept/pasta`. A missing or blank value
// is not an error (`path: null`); a value Next cannot revalidate is.
export function parseRevalidatePath(
  value: string | null | undefined,
): RevalidateTarget {
  const parsed = pathSchema.safeParse(value ?? "");
  if (!parsed.success) return { ok: false };
  return { ok: true, path: parsed.data || null };
}
