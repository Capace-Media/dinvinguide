import SocialMedia from "@/components/Blocks/skribenter/SocialMedia";
import { SubmitArrow } from "@/components/icons";
import Image from "next/image";

import handleParse from "@/lib/utils/handleParse";
import heroImage from "../../../../../public/Images/Vinsamling-korkar.jpeg";
import Search from "../Search";

interface AuthorHeroProps {
  promise?: any;
  word?: string;
}

const AuthorHero = async ({ promise, word }: AuthorHeroProps) => {
  const data = await promise;

  return (
    <section className="layout bg-white">
      <div className="overflow-hidden h-[799px] relative lg:h-[711px] text-brand-dark">
        <div className="h-[372px] lg:h-[511px] bg-brand-primary relative mask">
          <Image
            src={heroImage}
            alt="Samling av vinflaskkorkar med olika märken och tryck, perfekt för vinälskare i Sverige."
            fill
            style={{
              objectFit: "cover",
            }}
          />
          <div className="bg-white h-[50%] z-10 rotate-[8deg] lg:rotate-[7deg] center-x -bottom-[30%]  w-[200%] absolute"></div>
        </div>

        <div className=" bg-white w-[89%] lg:w-[85%] lg:h-[511px] h-[655px] absolute top-[13%] lg:top-[50%] lg:-translate-y-[40%] center-x z-10 flex gap-8 lg:flex-row flex-col shadow-lg lg:p-4 p-2">
          <div className="relative aspect-square min-w-[36%]">
            {data?.acf_user?.bild?.mediaItemUrl && (
              <Image
                src={data.acf_user.bild.mediaItemUrl}
                alt={
                  data?.acf_user?.bild?.altText
                    ? data.acf_user.bild.altText
                    : `bild på ${data?.name}`
                }
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            )}
          </div>

          <div className="py-4 flex flex-col justify-between">
            <div>
              <h1 className="text-[28px] flex flex-col md:text-[42px] lg:text-[53px] font-sub lg:leading-[72px]">
                <span className=" font-main text-[18px] md:text-[23px] leading-[18px] md:leading-[23px]">
                  Skribent
                </span>
                <span className="block ">{data?.name}</span>
              </h1>
              <div className="author_text text-[14px] leading-[23px]">
                {handleParse(data?.description)}
              </div>
            </div>
            <div>
              <Search word={word} uri={data?.username} />
              {/* <form action={searchData}>
                <div className="w-full text-[14px] bg-white relative shadow-md">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Den som söker den finner..."
                    className="py-3 pl-2 w-full focus:outline-hidden"
                  />

                  <button
                    type="submit"
                    className=" bg-brand-secondary p-2 absolute right-2 center-y"
                  >
                    <SubmitArrow />
                  </button>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorHero;
