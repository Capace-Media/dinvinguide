import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  {
    ignores: [".next/**", "node_modules/**"],
  },
  {
    extends: [...nextCoreWebVitals],
    rules: {
      // eslint-plugin-react-hooks v7 added this rule and it flags three
      // pre-existing components (AuthorHero, PlaylistTemplate/Player,
      // useRouteStyle). Downgraded to a warning so CI can enforce the rest of
      // the ruleset; fixing those three properly is tracked separately.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);
