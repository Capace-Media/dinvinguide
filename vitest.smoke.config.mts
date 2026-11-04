import { defineConfig } from "vitest/config";

// Smoke tests hit a running site (`SMOKE_BASE_URL`, default http://localhost:3000).
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/smoke.test.ts"],
    testTimeout: 60_000,
    retry: 2,
    bail: 1,
  },
});
