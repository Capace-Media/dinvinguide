"use client";
import Line from "@/components/shared/line";
import handleParse from "@/lib/utils/handle-parse";
import PrettyDate from "@/lib/utils/pretty-date";
import Image from "next/image";
import Link from "next/link";
import Blocks from "@/components/shared/post/blocks/post-blocks";
import Aside, { type PostAuthor, type RelatedPost } from "./post-aside";

interface PostSection {
  fieldGroupName?: string | null;
}

// Structural on purpose: rendered for pages, posts, draft previews and wine
// atlas pages, each with its own codegen type.
export interface PostTemplatePost {
  title?: string | null;
  uri?: string | null;
  modifiedGmt?: string | null;
  content?: string | null;
  featuredImage?: { node?: { mediaItemUrl?: string | null } | null } | null;
  author?: PostAuthor | AuthorEdge | null;
  acf_posts?: {
    ingress?: string | null;
    sektioner?: readonly (PostSection | null)[] | null;
    lasMer?: readonly (RelatedPost | null)[] | null;
  } | null;
  acf_oldcontent?: { oldContentAcf?: string | null } | null;
}

interface AuthorEdge {
  node?: PostAuthor | null;
}

interface PostTemplateProps {
  post: PostTemplatePost | null;
}

const isAuthorEdge = (author: PostAuthor | AuthorEdge): author is AuthorEdge =>
  "node" in author;

const hasFieldGroupName = (
  section: PostSection | null,
): section is PostSection & { fieldGroupName: string } =>
  typeof section?.fieldGroupName === "string";

const PostTemplate = ({ post }: PostTemplateProps) => {
  // Routes either pass the WPGraphQL `author { node }` edge or an already
  // flattened author; only the flattened one gets the writer breadcrumb.
  const author = !post?.author
    ? null
    : isAuthorEdge(post.author)
      ? post.author.node
      : post.author;
  const writer =
    post?.author && !isAuthorEdge(post.author) ? post.author : null;
  const sections = post?.acf_posts?.sektioner?.filter(hasFieldGroupName);

  return (
    <article className="gap-10 pt-30 lg:grid lg:grid-cols-5">
      <Line />
      <div className="lg:col-span-3">
        <div className="flex flex-col justify-between gap-4 lg:flex-row">
          {writer?.name ? (
            <ul className="flex gap-2 text-[13px] text-brand-secondary">
              <li>
                <Link
                  className="text-brand-secondary lg:hover:underline"
                  href="/"
                >
                  Hem
                </Link>
              </li>
              {" / "}
              <li>
                <Link
                  className="text-brand-secondary lg:hover:underline"
                  href="/skribenter"
                >
                  skribenter
                </Link>
              </li>
              {" / "}
              <li>
                <Link
                  className="whitespace-nowrap text-brand-secondary lg:hover:underline"
                  href={`/skribenter/${writer.slug}`}
                >
                  {writer.name}
                </Link>
              </li>
              {" / "}
              <li>
                <p className="line-clamp-1 text-brand-dark">{post?.title}</p>
              </li>
            </ul>
          ) : post?.uri?.includes("/vinatlas/") ? (
            <ul className="flex gap-2 text-[14px] text-brand-secondary">
              <li>
                <Link
                  className="text-brand-secondary lg:hover:underline"
                  href="/"
                >
                  Hem
                </Link>
              </li>
              {" / "}
              <li>
                <Link
                  className="text-brand-secondary lg:hover:underline"
                  href={`/guide`}
                >
                  Guide
                </Link>
              </li>
              {" / "}
              <li>
                <Link
                  className="text-brand-secondary lg:hover:underline"
                  href="/vinatlas"
                >
                  Vinatlas
                </Link>
              </li>
              {" / "}

              <li>
                <p className="text-brand-dark">{post?.title}</p>
              </li>
            </ul>
          ) : null}
          <time
            className="text-[14px]"
            dateTime={post?.modifiedGmt ?? undefined}
          >
            {PrettyDate(post?.modifiedGmt)}
          </time>
        </div>

        <div className="pt-10 text-brand-dark">
          <h1 className="pb-5 font-sub">{post?.title}</h1>
          {post?.acf_posts?.ingress && (
            <div className="pb-3 text-[14px] italic">
              {handleParse(post.acf_posts.ingress)}
            </div>
          )}
          {post?.featuredImage?.node?.mediaItemUrl && (
            <div className="relative h-80.5 w-full py-10 lg:h-138.75">
              <Image
                src={post?.featuredImage?.node?.mediaItemUrl}
                alt={post?.title ?? ""}
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(min-width: 1880px) 954px, (min-width: 1040px) calc(53.9vw - 49px), (min-width: 780px) calc(100vw - 88px), calc(100vw - 32px)"
              />
            </div>
          )}
        </div>
        {sections && <Blocks blocks={sections} />}
        {post?.content && (
          <div>
            <h1 className="pb-5 font-sub">{post?.title}</h1>
            {handleParse(post.content)}
          </div>
        )}
        {post?.acf_oldcontent?.oldContentAcf && (
          <div>
            <h1 className="pb-5 font-sub">{post?.title}</h1>
            {handleParse(post.acf_oldcontent.oldContentAcf)}
          </div>
        )}
      </div>
      <Aside author={author} related={post?.acf_posts?.lasMer} />
    </article>
  );
};

export default PostTemplate;
