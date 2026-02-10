import { QueryClient } from "@tanstack/react-query";

// Server-only: always creates a fresh QueryClient for prefetching
export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}
