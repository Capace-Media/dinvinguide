import { getPosts, type PostsPage } from "@/lib/api/posts/get-posts";
import { parsePostsParams } from "@/lib/api/posts/posts-params";

export type PostsResponse = { posts: PostsPage };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const posts = await getPosts(
    parsePostsParams(Object.fromEntries(searchParams)),
  );

  if (!posts) {
    return Response.json({ error: "Failed to fetch" }, { status: 502 });
  }

  return Response.json({ posts } satisfies PostsResponse);
}
