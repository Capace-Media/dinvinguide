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
    <div className="aspect-square h-full w-full animate-pulse overflow-hidden rounded-lg bg-brand-primary"></div>
  );
};

const AuthorPost = ({ post }: AuthorPostProps) => {
  return (
    <div className="group">
      <Link
        href={`/skribenter${post.uri}`}
        aria-label={`Läs om ${post?.title}`}
        className="relative block h-[12.2rem] w-full after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_16.35%,rgba(0,0,0,0)_49.69%)]"
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
              className="h-full object-cover lg:w-full"
              sizes="(max-width: 768px) 92vw, (max-width: 1024px) 44vw, (max-width: 1790px) 22vw, 390px"
            />
          </>
        )}
        <div className="absolute top-2 right-3 z-10 border-b-2 border-white">
          {post?.author?.node?.name && (
            <p className="text-white uppercase">{post.author.node.name}</p>
          )}
        </div>
      </Link>

      <div className="flex h-[12.9rem] flex-col justify-between py-2">
        <div className="flex flex-col">
          {post?.modifiedGmt && (
            <div className="text-[14px] text-brand-gray">
              {PrettyDate(post.modifiedGmt)}
            </div>
          )}
          {post?.title && (
            <h2
              aria-label={post.title}
              className="mb-2 line-clamp-1 font-sub text-[22px] text-brand-dark"
            >
              {post.title}
            </h2>
          )}
          {post?.acf_posts?.ingress && (
            <>
              <p
                className="line-clamp-3 text-[13px] text-brand-gray"
                dangerouslySetInnerHTML={{ __html: post.acf_posts.ingress }}
              />
            </>
          )}
        </div>

        {post?.uri && (
          <Link
            href={`/skribenter${post.uri}`}
            aria-label={`Läs om ${post?.title}`}
            className="flex items-center justify-center gap-3 rounded-md border border-brand-primary px-4 py-2 text-brand-secondary md:justify-start md:border-none md:px-0 md:py-0 lg:hover:underline"
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
