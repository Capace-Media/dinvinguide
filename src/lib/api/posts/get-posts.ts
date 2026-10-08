import "server-only";
import { cache } from "react";
import { wpQuery } from "@/lib/wp/client";
import type { PostsQueryVariables } from "@/lib/wp/gql/graphql";
import { isPresent } from "@/lib/utils/is-present";
import {
  PostPathsQuery,
  PostQuery,
  PostsQuery,
  PreviewPostQuery,
  SchoolPostsQuery,
  SearchQuery,
} from "./queries";

// Cached per request so `generateMetadata` and the page share one fetch.
export const getPost = cache(async (uri: string) => {
  const data = await wpQuery(PostQuery, { id: uri }, { tags: ["post"] });
  return data?.post ?? null;
});

// Draft mode: the latest revision if there is one, otherwise the post itself.
export async function getPreviewPost(databaseId: number) {
  const data = await wpQuery(
    PreviewPostQuery,
    { id: String(databaseId) },
    { draft: true },
  );
  const post = data?.post;
  return post?.preview?.node ?? post ?? null;
}

export async function getPosts(variables: PostsQueryVariables) {
  const data = await wpQuery(PostsQuery, variables, { tags: ["post"] });
  return data?.posts ?? null;
}

export type PostsPage = NonNullable<Awaited<ReturnType<typeof getPosts>>>;

export async function getPostPaths() {
  const data = await wpQuery(PostPathsQuery);
  return data?.posts?.nodes ?? [];
}

export async function getSchoolPosts(uri: string) {
  const data = await wpQuery(SchoolPostsQuery, { id: uri });
  const page = data?.page;
  if (!page) return null;
  return page.acf_overviewPage?.sidor?.filter(isPresent) ?? [];
}

export async function getSearchResults(search: string) {
  return wpQuery(SearchQuery, { search });
}
