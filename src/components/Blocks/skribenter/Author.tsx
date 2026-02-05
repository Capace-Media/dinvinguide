import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";
import AuthorPost from "./Posts/post";
import SocialMedia from "./SocialMedia";

interface AuthorComponentProps {
  author: any;
  index: number;
}

const AuthorComponent = ({ author, index }: AuthorComponentProps) => {
  return (
    <div className="">
      <div
        className={`layout contain flex flex-col md:flex-row md:grid-cols-7 md:gap-24 gap-4 ${
          index % 2 === 0 ? "bg-[#F6F6F6]" : "bg-brand-primary text-white"
        }`}
      >
        <div className="w-full h-92.5 col-span-4 lg:h-122.5 lg:order-2">
          {author?.acf_user?.bildExtra?.mediaItemUrl && (
            <Image
              src={author.acf_user.bildExtra.mediaItemUrl}
              alt={
                author?.acf_user?.bildExtra?.altText
                  ? author.acf_user.bildExtra.altText
                  : author.acf_user.bildExtra.title
              }
              width={author.acf_user.bildExtra?.mediaDetails?.width}
              height={author.acf_user.bildExtra?.mediaDetails?.height}
              className="object-contain h-92.5 lg:h-122.5"
              sizes="
            (min-width: 1880px) 761px,
            (min-width: 1040px) calc(45vw - 76px),
            (min-width: 780px) calc(100vw - 88px),
            calc(100vw - 32px)
          "
            />
          )}
        </div>
        <div
          className={`flex flex-col col-span-3 justify-between lg:order-1 max-w-170 ${
            index % 2 === 0 ? "text-brand-dark" : " text-brand-light"
          }`}
        >
          <div className="flex flex-col gap-4 min-h-60">
            <div>
              <h2
                className={`text-[28px] flex flex-col md:text-[42px] lg:text-[53px] font-sub lg:leading-18  ${
                  index % 2 === 0 ? "text-brand-dark" : " text-brand-light"
                }`}
              >
                <span className=" font-main text-[18px] md:text-[23px] leading-4.5 md:leading-5.75">
                  Skribent
                </span>
                <span className="block">{author?.name}</span>
              </h2>
            </div>

            <div
              className={`line-clamp-6 lg:line-clamp-10 2xl:line-clamp-12 text-[14px] md:text-[15px] leading-6-5 ${
                index % 2 === 0 ? "parse-dark" : " parse-light"
              }`}
            >
              {handleParse(author?.description)}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link
              className={`${index % 2 === 0 ? "btn" : "btn-white"}`}
              href={`/skribenter/${author?.slug}`}
            >
              Upptäck alla Artiklar
            </Link>

            <SocialMedia index={index} social={author?.acf_user} />
          </div>
        </div>
      </div>
      {author?.posts?.nodes ? (
        <div className="layout bg-white contain">
          <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            {author?.posts?.nodes &&
              author.posts.nodes.map((post: any) => {
                return (
                  <li key={post?.id}>
                    <AuthorPost post={post} />
                  </li>
                );
              })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default AuthorComponent;
