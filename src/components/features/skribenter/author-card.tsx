import handleParse from "@/lib/utils/handle-parse";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import PostCard from "@/components/shared/post/post-card";
import type { Writer } from "@/lib/api/authors/get-authors";
import SocialMedia from "@/components/features/skribenter/social-media";

type AuthorComponentProps = {
  author: Writer;
  index: number;
};

export default function AuthorCard(props: AuthorComponentProps) {
  return (
    <div className="">
      <div
        className={`layout contain flex flex-col gap-4 md:flex-row lg:gap-24 ${
          props.index % 2 === 0 ? "bg-[#F6F6F6]" : "bg-brand-primary text-white"
        }`}
      >
        <div className="h-92.5 w-full lg:order-2 lg:h-122.5">
          {props.author?.acf_user?.bildExtra?.mediaItemUrl && (
            <Image
              src={props.author.acf_user.bildExtra.mediaItemUrl}
              alt={
                props.author?.acf_user?.bildExtra?.altText
                  ? props.author.acf_user.bildExtra.altText
                  : `Bild på ${props.author.name}`
              }
              width={
                props.author.acf_user.bildExtra?.mediaDetails?.width ??
                undefined
              }
              height={
                props.author.acf_user.bildExtra?.mediaDetails?.height ??
                undefined
              }
              className="h-92.5 object-contain lg:h-122.5"
              sizes="(max-width: 768px) 90vw, (max-width: 1777px) 45vw, 845px"
            />
          )}
        </div>
        <div
          className={`col-span-3 flex max-w-170 flex-col justify-between md:w-3/4 lg:order-1 lg:w-4/5 ${props.index % 2 === 0 ? "text-brand-dark" : "text-brand-light"}`}
        >
          <div className="flex min-h-60 flex-col gap-4">
            <div>
              <h2
                className={`flex flex-col font-sub text-[28px] md:text-[42px] lg:text-[53px] lg:leading-18 ${
                  props.index % 2 === 0 ? "text-brand-dark" : "text-brand-light"
                }`}
              >
                <span className="font-main text-[18px] leading-4.5 md:text-[23px] md:leading-5.75">
                  Skribent
                </span>
                <span className="block">{props.author?.name}</span>
              </h2>
            </div>
            <div
              className={`line-clamp-6 text-[14px] leading-6.5 md:text-[15px] lg:line-clamp-10 2xl:line-clamp-12 ${props.index % 2 === 0 ? "parse-dark" : "parse-light"}`}
            >
              {handleParse(props.author?.description)}
            </div>
          </div>

          <div className="flex items-center justify-between">
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
        <div className="layout bg-white py-4 md:pb-11 lg:pt-10 lg:pb-20">
          <div className="mb-5 flex items-center justify-between md:mx-3">
            <h3 className="text-xl">{props.author?.name}s senaste artiklar</h3>
            <Link
              className={cn(
                buttonVariants({ variant: "link" }),
                "hidden md:block",
              )}
              href={`/skribenter/${props.author?.slug}`}
            >
              Se alla artiklar
            </Link>
          </div>
          <ul className="grid gap-2 md:grid-cols-2 md:gap-0 lg:grid-cols-4">
            {props.author?.posts?.nodes?.map((post) => {
              return <PostCard key={post.id} post={post} />;
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
