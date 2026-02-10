import { AUTHORS } from "@/lib/queries/authors";
import WP from "@/lib/wp";
import { AuthorsData, Skribent } from "../../../../types/author";
import Ads from "@/app/_components/ads";
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
                        {(index + 1) % 3 === 0 && <Ads pageType="default" position="MID" />}
                        <AuthorCard author={author} index={index} />
                    </section>
                ))}
            <Ads pageType="default" position="BOTTOM" />
        </div>
    );
}