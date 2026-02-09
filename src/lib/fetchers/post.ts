import { POSTS } from "../queries/posts";
import WP from "../wp";

export async function getPosts(
  after?: string,
  before?: string,
  search?: string,
  first?: number,
  last?: number,
) {
  const res = await WP(POSTS, null, { after, before, search, first, last });
  const data = res.data;
  return data;
}
