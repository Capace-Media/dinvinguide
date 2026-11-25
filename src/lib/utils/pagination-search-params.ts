import { z } from "zod";

export type RouteSearchParams = Readonly<
  Record<string, string | string[] | undefined>
>;

const optionalString = z.string().optional().catch(undefined);
const optionalCount = z.coerce
  .number()
  .int()
  .positive()
  .optional()
  .catch(undefined);

const paginationSearchParamsSchema = z.object({
  after: optionalString,
  before: optionalString,
  first: optionalCount,
  last: optionalCount,
  search: optionalString,
  filter: optionalString,
  page: optionalString,
});

// Cursor pagination params shared by the paginated listing pages.
export function parsePaginationSearchParams(
  searchParams: RouteSearchParams,
  defaultFirst: number,
) {
  const { first, last, ...rest } =
    paginationSearchParamsSchema.parse(searchParams);
  // WPGraphQL rejects `first` and `last` together. Backward pagination
  // (`last`) wins, and the default page size only applies going forward.
  return {
    ...rest,
    first: last === undefined ? (first ?? defaultFirst) : undefined,
    last: last ?? null,
  };
}
