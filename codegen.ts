import type { CodegenConfig } from "@graphql-codegen/cli";

// Generates typed documents for every `graphql()` query in src/lib/api from
// the committed WordPress schema. Run `bun run codegen` after editing a query
// and `bun run schema:pull` after changing fields in WordPress.
const config: CodegenConfig = {
  schema: "src/lib/wp/schema.graphql",
  documents: ["src/lib/api/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "src/lib/wp/gql/": {
      preset: "client",
      presetConfig: { fragmentMasking: false },
      config: {
        documentMode: "string",
        enumType: "string-literal",
        useTypeImports: true,
      },
    },
  },
};

export default config;
