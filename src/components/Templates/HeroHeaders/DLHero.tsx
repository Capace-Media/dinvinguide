import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";

interface DLHeroProps {
  hero: any;
}

const DLHero = ({ hero }: DLHeroProps) => {
  return (
    <div className="w-full top-[72px] lg:h-[52vh] ">
      <div className="relative h-[12rem] md:h-[20rem] lg:h-[52vh] w-full">
        <Image
          src={hero?.featuredImage?.node?.mediaItemUrl}
          alt={
            hero?.featuredImage?.node?.altText
              ? hero.featuredImage.node.altText
              : hero.featuredImage.node.title
          }
          fill
          style={{
            objectFit: "cover",
            objectPosition: "right",
          }}
        />
        <div className="layout hidden lg:block bg-transparent w-[50%] py-4 absolute  bottom-[5rem] ">
          {hero?.page_content?.intro ? (
            handleParse(hero?.page_content?.intro)
          ) : (
            <div>
              <h1 className=" flex flex-col ">
                <span className="uppercase text-[18px] font-main">
                  topplista
                </span>
                <span>{hero?.acf_toplists?.slogan}</span>
              </h1>
              <p>{hero?.acf_toplists?.text}</p>
            </div>
          )}
        </div>
      </div>

      <div className="layout bg-[#F8F8F9] lg:hidden  py-4 ">
        {hero?.page_content?.intro ? (
          handleParse(hero?.page_content?.intro)
        ) : (
          <div>
            <h1 className=" flex flex-col ">
              <span className="uppercase text-[18px] font-main">topplista</span>
              <span>{hero?.acf_toplists?.slogan}</span>
            </h1>
            <p>{hero?.acf_toplists?.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DLHero;
