"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, DvLogoWhiteMini } from "@/components/icons";

import { Badge } from "@/components/ui/badge";
import Overlay from "@/components/shared/overlay";
import PrettyDate from "@/lib/utils/pretty-date";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { PostCardFieldsFragment } from "@/lib/wp/gql/graphql";

export function PostCardSkeleton() {
  return (
    <li>
      <Card className="gap-1 border-none p-3 pt-0">
        <CardHeader className="relative h-45 overflow-hidden p-0">
          <Skeleton className="h-full w-full rounded-lg" />
          <Skeleton className="absolute top-2 right-2 h-6 w-24 rounded-full" />
        </CardHeader>
        <CardContent className="flex h-41.25 flex-col justify-between p-0">
          <div className="space-y-2 pt-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3.5 w-24" />
            <div className="space-y-1.5 pt-1">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-2/3" />
            </div>
          </div>
          <Skeleton className="h-4 w-36" />
        </CardContent>
      </Card>
    </li>
  );
}

// Pages linked from "läs mer" have no author slug, so they link by `uri`.
type PostCardPost = PostCardFieldsFragment & { uri?: string | null };

export default function PostCard({ post }: { post: PostCardPost }) {
  const image = post.featuredImage?.node;
  const articleUrl = post.author?.node?.slug
    ? `/skribenter/${post.author.node.slug}/${post.slug}`
    : (post.uri ?? "");

  return (
    <li>
      <article>
        <Card className="relative gap-1 border-none p-3 pt-0 shadow-md transition-all duration-300 hover:shadow-lg md:shadow-none">
          <CardHeader className="relative h-45 overflow-hidden p-0">
            {image?.mediaItemUrl ? (
              <Image
                src={image.mediaItemUrl}
                alt={image.altText || `Bild på ${post.title}`}
                width={image.mediaDetails?.width ?? undefined}
                height={image.mediaDetails?.height ?? undefined}
                sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, (max-width: 1280px) 27vw, (max-width: 1777px) 22vw, 381px"
                className="absolute top-0 left-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-linear-to-br from-brand-primary to-brand-secondary">
                <DvLogoWhiteMini className="opacity-30" />
              </div>
            )}
            <Overlay direction="t" weight="light" />
            {post?.author?.node?.slug && (
              <Badge variant="ghost" className="absolute top-2 right-2 z-10">
                <Link
                  href={`/skribenter/${post?.author?.node?.slug}`}
                  className="relative z-10 text-[1rem] text-white underline"
                >
                  {post?.author?.node?.name}
                </Link>
              </Badge>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <Link
              href={articleUrl}
              className="group inline-flex h-41.5 flex-col justify-between"
            >
              <div>
                <div className="mb-1">
                  {post?.modifiedGmt && (
                    <time
                      dateTime={post?.modifiedGmt}
                      className="text-xs text-muted-foreground/60"
                    >
                      {PrettyDate(post?.modifiedGmt)}
                    </time>
                  )}
                  <h3 className="line-clamp-2 text-xl font-bold group-hover:underline">
                    {post?.title}
                  </h3>
                </div>
                {post?.acf_posts?.ingress && (
                  <p className="line-clamp-2 text-sm text-muted-foreground group-hover:underline">
                    {post?.acf_posts?.ingress}
                  </p>
                )}
              </div>

              <span className="hidden text-brand-secondary group-hover:underline md:flex md:items-center md:gap-3">
                <span>Läs hela artikeln</span>
                <span>
                  <ArrowRight />
                </span>
              </span>
              <Button variant="outline" className="w-full md:hidden">
                Läs hela artikeln
              </Button>
            </Link>
          </CardContent>
        </Card>
      </article>
    </li>
  );
}
