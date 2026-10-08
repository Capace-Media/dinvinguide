import "server-only";
import { wpQuery } from "@/lib/wp/client";
import { isPresent } from "@/lib/utils/is-present";
import { AuthorQuery, AuthorsQuery } from "./queries";

export async function getAuthor(username: string, search?: string) {
  const data = await wpQuery(
    AuthorQuery,
    { id: username, search },
    { tags: ["post"] },
  );
  return data?.user ?? null;
}

// The writers listed on /skribenter, in the order set in WordPress.
export async function getWriters() {
  const data = await wpQuery(AuthorsQuery);
  return (
    data?.acfOptionsSkribenter?.acf_skribenter?.skribenter?.filter(
      isPresent,
    ) ?? []
  );
}

export type Writer = Awaited<ReturnType<typeof getWriters>>[number];
