"use client";

import { ArrowRight } from "@/components/icons";
import handleParse from "@/lib/utils/handleParse";
import PrettyDate from "@/lib/utils/prettyDate";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface AuthorPostProps {
  post: any;
}

export const SkeletonLoader = () => {
  return (
    <div className="aspect-square animate-pulse h-full w-full overflow-hidden rounded-lg bg-brand-primary"></div>
  );
};

const AuthorPost = ({ post }: AuthorPostProps) => {
  return (
    <div className="group">
      <Link
        href={`/skribenter${post.uri}`}
        aria-label={`Läs om ${post?.title}`}
        className={`block w-full relative h-[12.2rem] overlay`}
      >
        {post?.featuredImage?.node?.mediaItemUrl && (
          <>
            <Image
              src={post.featuredImage.node.mediaItemUrl}
              alt={
                post?.featuredImage?.node?.altText
                  ? post.featuredImage.node.altText
                  : `bild på ${post.title}`
              }
              width={
                post?.featuredImage?.node?.mediaDetails?.width
                  ? post.featuredImage.node.mediaDetails.width
                  : 400
              }
              height={
                post?.featuredImage?.node?.mediaDetails?.height
                  ? post.featuredImage.node.mediaDetails.height
                  : 269
              }
              className="object-cover lg:w-full h-full"
              sizes="(max-width: 768px) 92vw, (max-width: 1024px) 44vw, (max-width: 1790px) 22vw, 390px"
            />
          </>
        )}
        <div className="absolute right-3 top-2 z-10 border-b-2 border-white ">
          {post?.author?.node?.name && (
            <p className="text-white uppercase">{post.author.node.name}</p>
          )}
        </div>
      </Link>

      <div className="h-[12.9rem] flex flex-col justify-between py-2">
        <div className="flex flex-col">
          {post?.modifiedGmt && (
            <div className="text-brand-gray text-[14px]">
              {PrettyDate(post.modifiedGmt)}
            </div>
          )}
          {post?.title && (
            <h2
              aria-label={post.title}
              className="heading_truncated font-sub mb-2 text-[22px] text-brand-dark"
            >
              {post.title}
            </h2>
          )}
          {post?.acf_posts?.ingress && (
            <>
              <p
                className="truncated text-[13px] text-brand-gray"
                dangerouslySetInnerHTML={{ __html: post.acf_posts.ingress }}
              />
            </>
          )}
        </div>

        {post?.uri && (
          <Link
            href={`/skribenter${post.uri}`}
            aria-label={`Läs om ${post?.title}`}
            className="flex items-center justify-center gap-3 lg:hover:underline text-brand-secondary border border-brand-primary px-4 py-2 rounded-md md:border-none md:justify-start md:px-0 md:py-0"
          >
            <span>Läs hela artikeln</span>
            <span>
              <ArrowRight />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthorPost;
