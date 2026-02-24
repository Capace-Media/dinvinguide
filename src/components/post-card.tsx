"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { ArrowRight, DvLogoWhiteMini } from "./icons";

import { Badge } from "./ui/badge";
import Overlay from "./graphic/overlay";
import PrettyDate from "@/lib/utils/prettyDate";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

export function PostCardSkeleton() {
    return (
        <li>
            <Card className="pt-0 p-3 gap-1 border-none">
                <CardHeader className="relative h-[180px] overflow-hidden p-0">
                    <Skeleton className="w-full h-full rounded-lg" />
                    <Skeleton className="absolute top-2 right-2 w-24 h-6 rounded-full" />
                </CardHeader>
                <CardContent className="p-0 flex flex-col justify-between h-[165px]">
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

export default function PostCard({ post }: { post: any }) {
    const articleUrl = post?.author?.node?.slug ? `/skribenter/${post?.author?.node?.slug}/${post?.slug}` : post?.uri;

    return (
        <li>
            <article>
                <Card className="relative hover:shadow-lg shadow-md md:shadow-none  transition-all duration-300 pt-0 p-3 gap-1 border-none">
                    <CardHeader className="relative h-[180px] overflow-hidden p-0">
                        {post?.featuredImage?.node ? (
                            <Image
                                src={post.featuredImage.node.mediaItemUrl}
                                alt={post?.featuredImage?.node?.altText || `Bild på ${post?.title}`}
                                width={post?.featuredImage?.node?.mediaDetails?.width}
                                height={post?.featuredImage?.node?.mediaDetails?.height}
                                sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, (max-width: 1280px) 27vw, (max-width: 1777px) 22vw, 381px"
                                className="object-cover w-full h-full absolute top-0 left-0"
                            />
                        ) : (
                            <div className="w-full h-full absolute top-0 left-0 bg-linear-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                                <DvLogoWhiteMini className="opacity-30" />
                            </div>
                        )}
                        <Overlay direction="t" weight="light" />
                        {post?.author?.node?.slug && (
                            <Badge variant="ghost" className="absolute top-2 right-2 z-10">
                                <Link href={`/skribenter/${post?.author?.node?.slug}`} className="relative z-10 text-white underline text-[1rem]">
                                    {post?.author?.node?.name}
                                </Link>
                            </Badge>
                        )}
                    </CardHeader>
                    <CardContent className="p-0">
                        <Link href={articleUrl} className="group inline-flex flex-col justify-between h-[166px]">


                            <div>
                                <div className="mb-1">
                                    {post?.modifiedGmt && (

                                        <time dateTime={post?.modifiedGmt} className="text-xs text-muted-foreground/60">
                                            {PrettyDate(post?.modifiedGmt)}
                                        </time>
                                    )}
                                    <h3 className="line-clamp-2 font-bold text-xl group-hover:underline">

                                        {post?.title}

                                    </h3>

                                </div>
                                {post?.acf_posts?.ingress && (
                                    <p className="line-clamp-2 text-sm text-muted-foreground group-hover:underline">{post?.acf_posts?.ingress}</p>
                                )}
                            </div>

                            <span className="hidden md:flex md:items-center md:gap-3 text-brand-secondary group-hover:underline">
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