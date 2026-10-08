// Type guard for `.filter()`: WPGraphQL lists are typed `Array<T | null>`.
export function isPresent<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
