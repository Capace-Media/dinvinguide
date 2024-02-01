import AuthorPost from "@/components/Blocks/skribenter/Posts/post";
import { ArrowRight } from "@/components/icons";
import { getPosts } from "@/lib/queries/getPosts";
import Link from "next/link";

async function fetchPosts() {
  const data = await getPosts();

  return data;
}

interface ArticleArray {
  id: string;
  title: string;
  uri: string;
  modifiedGmt: string;
  acf_posts: {
    ingress: string;
  };
  author: { node: any[] };
  featuredImage: { node: any[] };
}

const LatestArticles = async () => {
  const posts = await fetchPosts();

  const highlightedArticles: ArticleArray[] =
    posts?.page?.GQL_frontPageFields?.highlightedArticles;

  const latestArticles: ArticleArray[] = posts?.posts?.nodes;

  // Determine the initial number of latest articles to include
  let initialLatestCount = 8 - Math.min(8, highlightedArticles.length);

  // Ensure we do not add more latestArticles than available or exceed the total count of 8
  let combinedArticles = latestArticles.slice(0, initialLatestCount);

  // Calculate remaining slots after adding the initial set of latestArticles
  let remainingSlots = 8 - combinedArticles.length;

  // Add highlightedArticles to fill up the remaining slots, ensuring not to exceed 8 in total
  let additionalHighlighted = highlightedArticles.slice(0, remainingSlots);

  combinedArticles = [...combinedArticles, ...additionalHighlighted];

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
        {combinedArticles &&
          combinedArticles.map((post: any) => (
            <li key={post?.id}>
              <AuthorPost post={post} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LatestArticles;
