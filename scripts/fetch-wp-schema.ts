// Downloads the WPGraphQL schema so codegen can run without CMS access.
// Introspection needs auth, so this uses the same credentials as the app.
// Run with `bun run schema:pull` after changing fields in WordPress.
import { buildClientSchema, getIntrospectionQuery, printSchema } from "graphql";
import type { IntrospectionQuery } from "graphql";

async function main() {
  const uri = process.env.CMS_GRAPHQL_URI;
  const user = process.env.CMS_GRAPHQL_AUTH_USER;
  const password = process.env.APPLICATION_NEW_PASSWORD;

  if (!uri || !user || !password) {
    throw new Error(
      "Missing CMS_GRAPHQL_URI, CMS_GRAPHQL_AUTH_USER or APPLICATION_NEW_PASSWORD"
    );
  }

  const res = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${user}:${password}`)}`,
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });

  const json = (await res.json()) as {
    data?: IntrospectionQuery;
    errors?: { message: string }[];
  };

  if (!res.ok || !json.data) {
    throw new Error(
      `Introspection failed (${res.status}): ${
        json.errors?.[0]?.message ?? "no data"
      }`
    );
  }

  const schema = printSchema(buildClientSchema(json.data));
  await Bun.write("src/lib/wp/schema.graphql", `${schema}\n`);
  console.log("Wrote src/lib/wp/schema.graphql");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
