import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import _import from "eslint-plugin-import";
import { fixupPluginRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([{
    extends: [...nextCoreWebVitals],

    plugins: {
        import: fixupPluginRules(_import),
    },
}]);