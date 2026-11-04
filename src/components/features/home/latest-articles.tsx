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
    ARTICLE_COUNT,
  );

  return (
    <section className="contain m-auto bg-white px-[4px] md:px-[32px] lg:px-[68px] xl:max-w-444.25">
      <div className="px-3 md:flex md:items-center md:justify-between">
        <h2 className="heading">Upptäck våra artiklar</h2>
        <Link
          href={`/artiklar`}
          aria-label={`Utforska alla våra artiklar`}
          className="hidden gap-3 text-brand-secondary md:flex md:items-center lg:hover:underline"
        >
          <span>Utforska alla våra artiklar</span>
          <MoveRight className="size-6" strokeWidth={1} aria-hidden />
        </Link>
      </div>
      <ul className="grid gap-2 border-b-2 pb-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
      <div className="py-4 md:hidden">
        <Link
          href={`/artiklar`}
          aria-label={`Utforska alla våra artiklar`}
          className="btn"
        >
          Utforska alla våra artiklar
        </Link>
      </div>
    </section>
  );
};

export default LatestArticles;
