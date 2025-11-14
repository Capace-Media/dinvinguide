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
  featuredImage: {
    node: {
      mediaItemUrl: string;
      altText: string;
      mediaDetails: { width: number; height: number };
    };
  };
}

const LatestArticles = async () => {
  const posts = await fetchPosts();

  const highlightedArticles: ArticleArray[] =
    posts?.page?.GQL_frontPageFields?.highlightedArticles;

  const latestArticles: ArticleArray[] = posts?.posts?.nodes;

  let initialLatestCount = 8 - Math.min(8, highlightedArticles.length);

  let combinedArticles = latestArticles.slice(0, initialLatestCount);

  let remainingSlots = 8 - combinedArticles.length;

  let additionalHighlighted = highlightedArticles.slice(0, remainingSlots);

  combinedArticles = [...combinedArticles, ...additionalHighlighted];

  return (
    <div className="layout contain bg-white">
      <div className="md:flex md:justify-between md:items-center">
        <h2 className="heading">Upptäck våra artiklar</h2>
        <Link
          href={`/artiklar`}
          aria-label={`Utforska alla våra artiklar`}
          className="md:flex md:items-center gap-3 lg:hover:underline text-brand-secondary hidden"
        >
          <span>Utforska alla våra artiklar</span>
          <span>
            <ArrowRight />
          </span>
        </Link>
      </div>
      <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 border-b-2  pb-4">
        {combinedArticles &&
          combinedArticles.map((post: ArticleArray) => (
            <li key={post?.id}>
              <AuthorPost post={post} />
            </li>
          ))}
      </ul>
      <div className="md:hidden py-4">
        <Link
          href={`/artiklar`}
          aria-label={`Utforska alla våra artiklar`}
          className="btn "
        >
          Utforska alla våra artiklar
        </Link>
      </div>
    </div>
  );
};

export default LatestArticles;
