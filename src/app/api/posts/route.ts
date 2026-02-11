import WP from "@/lib/wp";
import { POSTS } from "@/lib/queries/posts";

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

  const res = await WP(POSTS, "post", {
    first,
    after,
    before,
    search,
    year,
    authorName,
  });

  if (!res?.data) {
    return Response.json({ error: "Failed to fetch" }, { status: 502 });
  }

  return Response.json(res.data);
}
