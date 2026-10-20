// Runs once when a server starts. Production logs showed servers serving pages
// for minutes before their first search, which then waited ~5 s for the search
// index; loading it here means it is usually ready by then. Not awaited:
// `register` must finish before the server handles any request.
export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    void import("@/lib/search/search-service").then(({ preloadSearchIndex }) =>
      preloadSearchIndex()
    );
  }
}
