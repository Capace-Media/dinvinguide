// urlUtils.ts

/**
 * Cleans the provided URL string by decoding it, removing any invisible or unwanted characters,
 * and removing a trailing slash if present.
 *
 * @param url - The URL string to clean.
 * @returns The cleaned URL string.
 */
export const cleanUrl = (url: string): string => {
  // Decode URI to convert percent-encoded parts back to characters
  const decodedUrl = decodeURIComponent(url);

  // Regular expression for removing common invisible characters
  // You can add or remove characters from this pattern as needed
  const invisibleCharPattern = /[\u200B-\u200D\uFEFF]/g;

  // Remove any unwanted invisible characters from the URL
  let sanitizedUrl = decodedUrl.replace(invisibleCharPattern, "");

  // Remove a trailing slash if present
  sanitizedUrl = sanitizedUrl.replace(/\/+$/, "");

  return sanitizedUrl;
};
