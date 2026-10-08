// Fills `total` slots: latest items first, then the editor-highlighted items
// take the remaining slots. More highlighted items means fewer latest ones.
export function mergeLatestWithHighlighted<T>(
  latest: readonly T[],
  highlighted: readonly T[],
  total: number
): T[] {
  const latestCount = total - Math.min(total, highlighted.length);
  const latestItems = latest.slice(0, latestCount);

  return [
    ...latestItems,
    ...highlighted.slice(0, total - latestItems.length),
  ];
}
