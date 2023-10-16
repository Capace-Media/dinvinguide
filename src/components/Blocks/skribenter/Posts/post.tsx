import PrettyDate from "@/lib/utils/prettyDate";
import Image from "next/image";
import Link from "next/link";

interface AuthorPostProps {
  post: any;
}

const AuthorPost = ({ post }: AuthorPostProps) => {
  console.log("post =====>", post);
  return (
    <div className="">
      <div className="w-full relative h-[14.2rem] overlay">
        {post?.featuredImage?.node?.mediaItemUrl && (
          <Image
            src={post.featuredImage.node.mediaItemUrl}
            alt={
              post?.featuredImage?.node.altText
                ? post.featuredImage.node.altText
                : `bild på ${post.title}`
            }
            fill
            style={{
              objectFit: "cover",
            }}
            sizes={post.featuredImage.node.sizes}
          />
        )}
        <div className="absolute right-3 top-2 z-10 border-b-2 border-white ">
          <p className="text-white uppercase">{post.author.node.name}</p>
        </div>
      </div>
      <div className="h-[14.9rem] bg-blue-400 flex flex-col justify-between py-2">
        <div className="flex flex-col gap-2">
          {post?.modifiedGmt && <p>{PrettyDate(post.modifiedGmt)}</p>}
          {post?.title && (
            <h2 className=" font-sub text-[24px]">{post.title}</h2>
          )}
          {post?.acf_posts?.ingress && (
            <>
              <p
                className="truncated text-[14px]"
                dangerouslySetInnerHTML={{ __html: post.acf_posts.ingress }}
              />
            </>
          )}
        </div>

        {post?.uri && (
          <Link href={`/skribenter${post.uri}`}>Läs hela artikeln</Link>
        )}
      </div>
    </div>
  );
};

export default AuthorPost;
