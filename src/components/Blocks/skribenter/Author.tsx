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
        className={`layout contain flex flex-col md:grid md:grid-cols-2  md:gap-24 gap-4 ${
          index % 2 === 0 ? "bg-[#F6F6F6]" : "bg-brand-primary text-white"
        }`}
      >
        <div className="w-full h-[366px] lg:h-[482px] relative m-auto lg:order-2">
          {author?.acf_user?.bildExtra?.mediaItemUrl && (
            <Image
              src={author.acf_user.bildExtra.mediaItemUrl}
              alt={
                author?.acf_user?.bildExtra?.altText
                  ? author.acf_user.bildExtra.altText
                  : author.acf_user.bildExtra.title
              }
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
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
          className={`flex flex-col justify-between lg:order-1 ${
            index % 2 === 0 ? "text-brand-dark" : " text-brand-light"
          }`}
        >
          <div className="flex flex-col gap-4 min-h-[240px]">
            <div>
              <h2
                className={`text-[28px] flex flex-col md:text-[42px] lg:text-[53px] font-sub lg:leading-[72px]  ${
                  index % 2 === 0 ? "text-brand-dark" : " text-brand-light"
                }`}
              >
                <span className=" font-main text-[18px] md:text-[23px] leading-[18px] md:leading-[23px]">
                  Skribent
                </span>
                <span className="block capitalize-first">{author?.name}</span>
              </h2>
            </div>

            <div
              className={`author_parse text-[14px] md:text-[15px] leading-[26px] ${
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
