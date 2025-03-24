import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";

interface PageHeroProps {
  data?: any;
  links?: any[];
  guide?: string;
}

const PageHero = ({ data, links, guide }: PageHeroProps) => {
  return (
    <>
      <div className="layout w-full py-[73px] md:pt-[172px] bg-white">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-[180px] order-last md:order-first">
          <div className="flex flex-col justify-between gap-2 lg:min-h-[461px]">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-6 ">
                <div className="text-[14px]">
                  <p>{guide}</p>

                  {data?.page_content?.intro ? (
                    handleParse(data?.page_content?.intro)
                  ) : data?.acf_grape?.kortBeskrivning ? (
                    <>
                      <h1>{data?.title}</h1>
                      <p>{data?.acf_grape?.kortBeskrivning}</p>
                    </>
                  ) : data?.excerpt ? (
                    <>
                      <h1>{data?.title}</h1>
                      <p>{handleParse(data?.excerpt)}</p>
                    </>
                  ) : (
                    <h1>{data?.title}</h1>
                  )}
                </div>
              </div>

              <ul className="flex flex-wrap gap-3 pt-4">
                {links &&
                  links.map((node: any) => {
                    return (
                      <li
                        className="border-b-2 border-brand-primary"
                        key={node?.id}
                      >
                        <Link
                          className="uppercase text-brand-primary text-[14px]"
                          href={`${node?.uri}`}
                        >
                          {node?.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className="w-full  order-first h-[370px] relative md:order-last lg:h-[520px]">
            <div className="absolute w-[85%] center-y left-0 h-[300px] lg:h-[430px] z-10">
              {data?.featuredImage?.node?.mediaItemUrl && (
                <div className="relative w-full h-full shadow-xl">
                  <Image
                    src={data?.featuredImage?.node?.mediaItemUrl}
                    alt={
                      data?.featuredImage?.node?.altText
                        ? data?.featuredImage?.node?.altText
                        : "Bild från DinVinguide"
                    }
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                    sizes="(min-width: 1880px) 687px, (min-width: 1040px) calc(38.17vw - 23px), (min-width: 780px) calc(42.5vw - 38px), (min-width: 380px) calc(85vw - 27px), calc(25vw + 189px)"
                    priority
                  />
                </div>
              )}
            </div>
            <div className=" bg-brand-beige w-[85%] md:w-[100%] h-[100%] center-y absolute -right-4 md:-right-11 lg:-right-20"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHero;
