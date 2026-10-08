import PostCard from "@/components/post-card";
import type { FrontPagePost } from "@/lib/api/pages/get-pages";
import { mergeLatestWithHighlighted } from "@/lib/utils/merge-latest-with-highlighted";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const ARTICLE_COUNT = 8;

interface LatestArticlesProps {
  latest: readonly FrontPagePost[];
  highlighted: readonly FrontPagePost[];
}

const LatestArticles = ({ latest, highlighted }: LatestArticlesProps) => {
  const articles = mergeLatestWithHighlighted(
    latest,
    highlighted,
    ARTICLE_COUNT
  );

  return (
    <section className="contain bg-white px-[4px] md:px-[32px] lg:px-[68px] m-auto xl:max-w-444.25">
      <div className="md:flex md:justify-between md:items-center px-3">
        <h2 className="heading">Upptäck våra artiklar</h2>
        <Link
          href={`/artiklar`}
          aria-label={`Utforska alla våra artiklar`}
          className="md:flex md:items-center gap-3 lg:hover:underline text-brand-secondary hidden"
        >
          <span>Utforska alla våra artiklar</span>
          <MoveRight className="size-6" strokeWidth={1} aria-hidden />
        </Link>
      </div>
      <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 border-b-2  pb-4">
        {articles.map((post) => (
          <PostCard key={post.id} post={post} />
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
    </section>
  );
};

export default LatestArticles;
