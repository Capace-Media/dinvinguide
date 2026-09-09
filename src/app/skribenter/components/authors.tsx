import { AUTHORS } from "@/lib/queries/authors";
import WP from "@/lib/wp";
import { AuthorsData, Skribent } from "../../../../types/author";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
import { Suspense } from "react";
import AuthorCard from "./author-card";

async function fetchAuthors(): Promise<AuthorsData> {
    const res = await WP(AUTHORS);

    return res?.data;
}

export default async function AllAuthors() {
    const data = await fetchAuthors();

    const { skribenter } = data?.acfOptionsSkribenter?.acf_skribenter;
    return (
        <div>
            {skribenter &&
                skribenter.map((author: Skribent, index: number) => (
                    <section key={author.id}>
                        {(index + 1) % 3 === 0 && <Suspense fallback={<BannerSkeleton />}><AdMid /></Suspense>}
                        <AuthorCard author={author} index={index} />
                    </section>
                ))}
            <Suspense fallback={<BannerSkeleton />}>
              <AdBottom />
            </Suspense>
        </div>
    );
}