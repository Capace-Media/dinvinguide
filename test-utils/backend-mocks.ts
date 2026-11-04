import { vi } from "vitest";

// Spies for everything an API route can reach that has side effects or costs
// something: WordPress, the Next.js cache, draft mode and the search index.
// A protected route that rejects a request must leave all of them untouched.
export const backend = {
  wpQuery: vi.fn(async () => null),
  revalidateTag: vi.fn(),
  revalidatePath: vi.fn(),
  draftEnable: vi.fn(),
  draftDisable: vi.fn(),
  redirect: vi.fn(),
  refreshSearchSnapshot: vi.fn(async () => ({})),
  searchSite: vi.fn(async () => ({})),
};

export function resetBackend(): void {
  for (const spy of Object.values(backend)) {
    spy.mockClear();
  }
}

/** True when any backend spy was called since the last `resetBackend`. */
export function backendWasTouched(): boolean {
  return Object.values(backend).some((spy) => spy.mock.calls.length > 0);
}

export const nextCacheMock = {
  revalidateTag: backend.revalidateTag,
  revalidatePath: backend.revalidatePath,
};

export const nextHeadersMock = {
  draftMode: async () => ({
    enable: backend.draftEnable,
    disable: backend.draftDisable,
    isEnabled: false,
  }),
};

export const nextNavigationMock = { redirect: backend.redirect };

export const wpClientMock = { wpQuery: backend.wpQuery };

export const searchServiceMock = {
  refreshSearchSnapshot: backend.refreshSearchSnapshot,
  searchSite: backend.searchSite,
};
