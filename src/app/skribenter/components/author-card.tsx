import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import PostCard from "@/components/post-card";
import { Skribent } from "../../../../types/author";
import SocialMedia from "@/components/Blocks/skribenter/SocialMedia";

type AuthorComponentProps = {
    author: Skribent;
    index: number;
}

export default function AuthorCard(props: AuthorComponentProps) {
    return (
        <div className="">
            <div
                className={`layout contain flex flex-col md:flex-row lg:gap-24 gap-4 ${props.index % 2 === 0 ? "bg-[#F6F6F6]" : "bg-brand-primary text-white"
                    }`}
            >
                <div className="w-full h-92.5 lg:h-122.5 lg:order-2">
                    {props.author?.acf_user?.bildExtra?.mediaItemUrl && (
                        <Image
                            src={props.author.acf_user.bildExtra.mediaItemUrl}
                            alt={
                                props.author?.acf_user?.bildExtra?.altText
                                    ? props.author.acf_user.bildExtra.altText
                                    : "Bild på " + props.author.name
                            }
                            width={props.author.acf_user.bildExtra?.mediaDetails?.width}
                            height={props.author.acf_user.bildExtra?.mediaDetails?.height}
                            className="object-contain h-92.5 lg:h-122.5"
                            sizes="(max-width: 768px) 90vw, (max-width: 1777px) 45vw, 845px"
                        />
                    )}
                </div>
                <div
                    className={`flex flex-col col-span-3 justify-between lg:order-1 md:w-3/4 lg:w-4/5 max-w-170 ${props.index % 2 === 0 ? "text-brand-dark" : "text-brand-light"}`}
                >
                    <div className="flex flex-col gap-4 min-h-60">
                        <div>
                            <h2
                                className={`text-[28px] flex flex-col md:text-[42px] lg:text-[53px] font-sub lg:leading-18  ${props.index % 2 === 0 ? "text-brand-dark" : "text-brand-light"
                                    }`}
                            >
                                <span className="font-main text-[18px] md:text-[23px] leading-4.5 md:leading-5.75">
                                    Skribent
                                </span>
                                <span className="block">{props.author?.name}</span>
                            </h2>
                        </div>
                        <div
                            className={`line-clamp-6 lg:line-clamp-10 2xl:line-clamp-12 text-[14px] md:text-[15px] leading-6.5 ${props.index % 2 === 0 ? "parse-dark" : "parse-light"}`}
                        >
                            {handleParse(props.author?.description)}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <Link
                            className={`${props.index % 2 === 0 ? "btn" : "btn-white"}`}
                            href={`/skribenter/${props.author?.slug}`}
                        >
                            Upptäck alla Artiklar
                        </Link>

                        <SocialMedia index={props.index} social={props.author?.acf_user} />
                    </div>
                </div>
            </div>

            {props.author?.posts?.nodes ? (
                <div className="layout bg-white contain pt-4! lg:pt-10!">
                    <div className="mb-5 flex justify-between items-center md:mx-3">
                        <h3 className="text-xl">{props.author?.name}s senaste artiklar</h3>
                        <Link
                            className={cn(
                                buttonVariants({ variant: "link" }),
                                "hidden md:block"
                            )}
                            href={`/skribenter/${props.author?.slug}`}
                        >
                            Se alla artiklar
                        </Link>
                    </div>
                    <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-2 md:gap-0">
                        {props.author?.posts?.nodes &&
                            props.author.posts.nodes.map((post: any) => {
                                return (
                                    <PostCard key={post.id} post={post} />
                                );
                            })}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};


