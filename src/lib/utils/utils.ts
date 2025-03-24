/**
 * Truncates a string if it exceeds the specified maximum length.
 * @param text The string to truncate
 * @param maxLength The maximum length before truncation (default: 20)
 * @returns The truncated string with "[...]" appended if it was truncated
 */
export function truncateText(text: string, maxLength: number = 20): string {
  if (!text) return "";

  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength) + "[...]";
}
