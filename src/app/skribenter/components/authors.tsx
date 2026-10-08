import { getWriters } from "@/lib/api/authors/get-authors";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
import { Suspense } from "react";
import AuthorCard from "./author-card";

export default async function AllAuthors() {
    const skribenter = await getWriters();
    return (
        <div>
            {skribenter.map((author, index) => (
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