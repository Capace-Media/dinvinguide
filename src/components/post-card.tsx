"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { ArrowRight, DvLogoWhiteMini } from "./icons";

import { Badge } from "./ui/badge";
import Overlay from "./graphic/overlay";
import PrettyDate from "@/lib/utils/prettyDate";

export default function PostCard({ post }: { post: any }) {
    return (
        <Card className="hover:shadow-lg transition-all duration-300 p-3 gap-1 border-none shadow-none">
            <CardHeader className="relative h-[180px] overflow-hidden p-0">
                {post.featuredImage?.node ? (
                    <Image
                        src={post.featuredImage.node.mediaItemUrl}
                        alt={post.featuredImage.node.altText || `Bild på ${post.title}`}
                        width={post.featuredImage.node.mediaDetails.width}
                        height={post.featuredImage.node.mediaDetails.height}
                        className="object-cover 
                        w-full h-full absolute top-0 left-0"
                    />
                ) : (
                    <div className="w-full h-full absolute top-0 left-0 bg-linear-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                        <DvLogoWhiteMini className="opacity-30" />
                    </div>
                )}
                <Overlay direction="t" weight="light" />
                <Badge variant="ghost" className="absolute top-2 right-2 z-10">
                    <Link href={`/skribenter/${post.author.node.slug}`} className="text-white underline text-[1rem]">
                        {post.author.node.name}
                    </Link>
                </Badge>
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-6">
                <div>

                    <h3 className="line-clamp-1 font-bold text-lg">{post.title}</h3>
                    <time className="text-sm text-muted-foreground/60">{PrettyDate(post.modifiedGmt)}</time>
                    <p className="line-clamp-3 text-sm text-muted-foreground">{post.acf_posts.ingress}</p>
                </div>

                <Link
                    href={`/skribenter/${post.author.node.slug}/${post.slug}`}
                    aria-label={`Läs om ${post?.title}`}
                    className="flex items-center gap-3 lg:hover:underline text-brand-secondary"
                >
                    <span>Läs hela artikeln</span>
                    <span>
                        <ArrowRight />
                    </span>
                </Link>

            </CardContent>
        </Card >
    );
}