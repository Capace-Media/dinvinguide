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


export function isWordPressInternalPath(path: string | string[]): boolean {
  const p = normalizePath(path);
  return (
    BLOCKED_PREFIXES.some((prefix) => p.startsWith(prefix)) ||
    p.includes(".php")
  );
}
