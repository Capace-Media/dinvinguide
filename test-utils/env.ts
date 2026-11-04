// Dummy environment values so tests need no real secrets. Real values must
// never appear in tests, fixtures or CI.
export const TEST_ENV = {
  PREVIEW_TOKEN: "test-preview-token",
  REVALIDATION_SECRET_TOKEN: "test-revalidation-token",
  CRON_SECRET: "test-cron-secret",
  CMS_GRAPHQL_URI: "https://cms.test/graphql",
  CMS_GRAPHQL_AUTH_USER: "test-user",
  APPLICATION_NEW_PASSWORD: "test-password",
  NEXT_PUBLIC_SITE_URL: "https://site.test",
} as const;

export function applyTestEnv(): void {
  for (const [key, value] of Object.entries(TEST_ENV)) {
    process.env[key] = value;
  }
}
