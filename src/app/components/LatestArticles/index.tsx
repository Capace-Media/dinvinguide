import AuthorPost from "@/components/Blocks/skribenter/Posts/post";
import { ArrowRight } from "@/components/icons";
import { getPosts } from "@/lib/queries/getPosts";
import Link from "next/link";

async function fetchPosts() {
  const data = await getPosts();

  return data;
}

const LatestArticles = async () => {
  const posts = await fetchPosts();

  return (
    <div className="layout contain bg-white">
      <div className="flex justify-between items-center">
        <h2 className="heading">Upptäck våra senaste artiklar</h2>
        <Link
          href={`/skribenter`}
          aria-label={`Läs om våra skribenter`}
          className="flex items-center gap-3 lg:hover:underline text-brand-secondary"
        >
          <span>Upptäck alla skribenter</span>
          <span>
            <ArrowRight />
          </span>
        </Link>
      </div>
      <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        {posts.posts.nodes.map((post: any) => (
          <li key={post.id}>
            <AuthorPost post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestArticles;
