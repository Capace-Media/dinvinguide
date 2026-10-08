import { plugin as shadcn } from "@shadcn/lint";
import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  {
    ignores: [".next/**", "node_modules/**", "src/lib/wp/gql/**"],
  },
  {
    extends: [...nextCoreWebVitals],
    rules: {
      // eslint-plugin-react-hooks v7 added this rule and it flags three
      // pre-existing components (AuthorHero, vin-tv playlist Player,
      // useRouteStyle). Downgraded to a warning so CI can enforce the rest of
      // the ruleset; fixing those three properly is tracked separately.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { shadcn },
    rules: {
      "shadcn/no-unknown-classes": "error",
    },
  },
]);
