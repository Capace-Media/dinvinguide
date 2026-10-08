import { getPosts, type PostsPage } from "@/lib/api/posts/get-posts";

export type PostsResponse = { posts: PostsPage };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const first = Math.min(Number(searchParams.get("first")) || 16, 50);
  const after = searchParams.get("after") || undefined;
  const before = searchParams.get("before") || undefined;
  const search = searchParams.get("search")?.slice(0, 100) || undefined;
  const year = searchParams.has("year")
    ? Number(searchParams.get("year"))
    : undefined;
  const authorName = searchParams.get("authorName") || undefined;

  const posts = await getPosts({
    first,
    after,
    before,
    search,
    year,
    authorName,
  });

  if (!posts) {
    return Response.json({ error: "Failed to fetch" }, { status: 502 });
  }

  return Response.json({ posts } satisfies PostsResponse);
}
