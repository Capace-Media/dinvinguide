import { POSTS } from "../queries/posts";
import WP from "../wp";

export async function getPosts() {
  const res = await WP(POSTS);
  const data = res.data;
  return data;
}
