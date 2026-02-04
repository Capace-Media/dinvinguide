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
      <div className="overflow-hidden h-199.75 relative lg:h-177.75 text-brand-dark">
        <div className="h-93 lg:h-127.75 bg-brand-primary relative mask">
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

        <div className=" bg-white w-[89%] lg:w-[85%] lg:h-127.75 h-163.75 absolute top-[13%] lg:top-[50%] lg:-translate-y-[40%] center-x z-10 flex gap-8 lg:flex-row flex-col shadow-lg lg:p-4 p-2">
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
              <h1 className="text-[28px] flex flex-col md:text-[42px] lg:text-[53px] font-sub lg:leading-18">
                <span className=" font-main text-[18px] md:text-[23px] leading-4.5 md:leading-5.75">
                  Skribent
                </span>
                <span className="block ">{data?.name}</span>
              </h1>
              <div className="author_text text-[14px] leading-5.75">
                {handleParse(data?.description)}
              </div>
            </div>
            <div>
              <Search word={word} uri={data?.username} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorHero;
