import { ArrowRight } from "@/components/icons";
import PostCard from "@/components/post-card";
import { HIGHLIGHTED_POSTS } from "@/lib/queries/posts";
import WP from "@/lib/wp";
import Link from "next/link";
import type { HighlightedPostsData } from "../../../types/posts";

async function fetchPosts(): Promise<HighlightedPostsData> {
    const res = await WP(HIGHLIGHTED_POSTS);
    return res.data;
}

const LatestArticles = async () => {
    const posts = await fetchPosts();
    const highlightedArticles =
        posts?.page?.GQL_frontPageFields?.highlightedArticles ?? [];

    const latestArticles = posts?.posts?.nodes ?? [];

    let initialLatestCount = 8 - Math.min(8, highlightedArticles.length);

    let combinedArticles = latestArticles.slice(0, initialLatestCount);

    let remainingSlots = 8 - combinedArticles.length;

    let additionalHighlighted = highlightedArticles.slice(0, remainingSlots);

    combinedArticles = [...combinedArticles, ...additionalHighlighted];

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
                    <span>
                        <ArrowRight />
                    </span>
                </Link>
            </div>
            <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 border-b-2  pb-4">
                {combinedArticles &&
                    combinedArticles.map((post) => (
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
