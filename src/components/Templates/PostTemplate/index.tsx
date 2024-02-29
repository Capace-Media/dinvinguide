import Line from "@/components/graphic/Line";
import handleParse from "@/lib/utils/handleParse";
import PrettyDate from "@/lib/utils/prettyDate";
import Image from "next/image";
import Link from "next/link";
import Blocks from "../../Blocks/PostBlocks";
import Aside from "./Aside";

interface PostTemplateProps {
  post: any;
}

const PostTemplate = ({ post }: PostTemplateProps) => {
  return (
    <article className="lg:grid lg:grid-cols-5 gap-10 pt-[120px]">
      <Line />
      <div className="lg:col-span-3">
        <div className="flex justify-between gap-4 lg:flex-row flex-col">
          {post?.author?.name ? (
            <ul className="flex gap-2 text-[13px] text-brand-secondary">
              <li>
                <Link
                  className=" text-brand-secondary  lg:hover:underline"
                  href="/"
                >
                  Hem
                </Link>
              </li>
              {" / "}
              <li>
                <Link
                  className=" text-brand-secondary lg:hover:underline"
                  href="/skribenter"
                >
                  skribenter
                </Link>
              </li>
              {" / "}
              <li>
                <Link
                  className=" whitespace-nowrap text-brand-secondary lg:hover:underline"
                  href={`/skribenter/${post?.author?.slug}`}
                >
                  {post?.author?.name}
                </Link>
              </li>
              {" / "}
              <li>
                <p className="text-brand-dark truncated-label">{post?.title}</p>
              </li>
            </ul>
          ) : post?.uri?.includes("/vinatlas/") ? (
            <ul className="flex gap-2 text-[14px] text-brand-secondary">
              <li>
                <Link
                  className=" text-brand-secondary lg:hover:underline"
                  href="/"
                >
                  Hem
                </Link>
              </li>
              {" / "}
              <li>
                <Link
                  className=" text-brand-secondary lg:hover:underline"
                  href={`/guide`}
                >
                  Guide
                </Link>
              </li>
              {" / "}
              <li>
                <Link
                  className=" text-brand-secondary lg:hover:underline"
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
          <time className="text-[14px]" dateTime={post?.modifiedGmt}>
            {PrettyDate(post?.modifiedGmt)}
          </time>
        </div>

        <div className=" text-[#333] pt-10">
          <h1 className="font-sub pb-5">{post?.title}</h1>
          {post?.acf_posts?.ingress && (
            <div className=" italic text-[14px] pb-3">
              {handleParse(post?.acf_posts?.ingress)}
            </div>
          )}
          {post?.featuredImage?.node?.mediaItemUrl && (
            <div className=" relative py-10 w-[100%] lg:h-[555px] h-[322px]">
              <Image
                src={post?.featuredImage?.node?.mediaItemUrl}
                alt={post?.title}
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(min-width: 1880px) 954px, (min-width: 1040px) calc(53.9vw - 49px), (min-width: 780px) calc(100vw - 88px), calc(100vw - 32px)"
              />
            </div>
          )}
        </div>
        {post?.acf_posts?.sektioner && (
          <Blocks blocks={post?.acf_posts?.sektioner} />
        )}
        {post?.content && (
          <div>
            <h1 className="font-sub pb-5">{post?.title}</h1>
            {handleParse(post?.content)}
          </div>
        )}
      </div>
      <Aside
        author={post?.author?.node ? post?.author?.node : post?.author}
        related={post?.acf_posts?.lasMer}
      />
    </article>
  );
};

export default PostTemplate;
