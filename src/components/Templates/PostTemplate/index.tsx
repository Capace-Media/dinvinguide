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
      <div className="lg:col-span-3">
        <div className="flex justify-between">
          <ul className="flex gap-2 text-[14px] text-brand-secondary">
            <li>
              <Link href="/">Hem</Link>
            </li>
            {" / "}
            <li>
              <Link href="/skribenter">skribenter</Link>
            </li>
            {" / "}
            <li>
              <Link href={`/skribenter/${post?.author?.slug}`}>
                {post?.author?.name}
              </Link>
            </li>
            {" / "}
            <li>
              <p className="text-brand-dark">{post?.title}</p>
            </li>
          </ul>
          <time className="text-[14px]" dateTime={post?.modifiedGmt}>
            {PrettyDate(post.modifiedGmt)}
          </time>
        </div>
        <div className=" text-[#333] pt-10">
          <h1 className="font-sub pb-5">{post?.title}</h1>
          <p className=" italic text-[14px]">{post?.acf_posts?.ingress}</p>

          <div className=" py-10">
            <Image
              src={post?.featuredImage?.node?.mediaItemUrl}
              alt={post?.title}
              width={300}
              height={400}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
        <Blocks blocks={post?.acf_posts?.sektioner} />
      </div>
      <Aside author={post?.author} related={post?.acf_posts?.lasMer} />
    </article>
  );
};

export default PostTemplate;
