const BLOCKED_PREFIXES = [
  "wp-json",
  "wp-admin",
  "wp-login",
  "wp-content",
  "wp-includes",
  "xmlrpc.php",
];

function normalizePath(path: string | string[]): string {
  let p = Array.isArray(path) ? path.join("/") : path;

  // Decode repeatedly so double-encoded probes (%252F) are caught; stop on malformed input.
  for (let i = 0; i < 3; i++) {
    try {
      const decoded = decodeURIComponent(p);
      if (decoded === p) break;
      p = decoded;
    } catch {
      break;
    }
  }

  return p.replace(/\\/g, "/").replace(/^\/+/, "").toLowerCase();
}

/**
 * Paths that must never be looked up in WordPress (WP internals, REST, PHP endpoints).
 * WPGraphQL resolves `page(id, idType: URI)` through WordPress' request parsing, so
 * e.g. `/wp-json/wp/v2/pages` would dispatch the REST route instead of a page lookup.
 */
export function isWordPressInternalPath(path: string | string[]): boolean {
  const p = normalizePath(path);
  return (
    BLOCKED_PREFIXES.some((prefix) => p.startsWith(prefix)) ||
    p.includes(".php")
  );
}
