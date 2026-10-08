// `.filter()` guard for WPGraphQL union lists: keeps the members of one type
// and drops nulls and members the query didn't select (typed as `{}`).
// The query must select `__typename` on the member.
export function isTypename<TName extends string>(typename: TName) {
  return <T>(item: T | null | undefined): item is Extract<T, { __typename: TName }> =>
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    item.__typename === typename;
}
