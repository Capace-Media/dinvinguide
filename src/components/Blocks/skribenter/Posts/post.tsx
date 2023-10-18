import { ArrowRight } from "@/components/icons";
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
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="">
      <div className={`w-full relative h-[14.2rem] overlay`}>
        {post?.featuredImage?.node?.mediaItemUrl && (
          <>
            <Image
              src={post.featuredImage.node.mediaItemUrl}
              alt={
                post?.featuredImage?.node.altText
                  ? post.featuredImage.node.altText
                  : `bild på ${post.title}`
              }
              onLoad={() => setImageLoaded(true)}
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(min-width: 1880px) 389px, (min-width: 1040px) calc(22.44vw - 28px), (min-width: 780px) calc(100vw - 88px), calc(100vw - 32px)"
            />

            {!imageLoaded && (
              <div className="absolute top-0 left-0 right-0 bottom-0">
                <SkeletonLoader />
              </div>
            )}
          </>
        )}
        <div className="absolute right-3 top-2 z-10 border-b-2 border-white ">
          <p className="text-white uppercase">{post.author.node.name}</p>
        </div>
      </div>

      <div className="h-[14.9rem]  flex flex-col justify-between py-2">
        <div className="flex flex-col">
          {post?.modifiedGmt && (
            <p className="text-brand-gray">{PrettyDate(post.modifiedGmt)}</p>
          )}
          {post?.title && (
            <h2 className="lg:hover:underline font-sub mb-2 text-[22px] text-brand-dark">
              <Link
                href={`/skribenter${post.uri}`}
                aria-label={`Läs om ${post?.title}`}
              >
                {post.title}
              </Link>
            </h2>
          )}
          {post?.acf_posts?.ingress && (
            <>
              <p
                className="truncated text-[14px] text-brand-gray"
                dangerouslySetInnerHTML={{ __html: post.acf_posts.ingress }}
              />
            </>
          )}
        </div>

        {post?.uri && (
          <Link
            href={`/skribenter${post.uri}`}
            aria-label={`Läs om ${post?.title}`}
            className="flex items-center gap-3 lg:hover:underline text-brand-secondary"
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
