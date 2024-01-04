import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";
import links from "./authors.json";
interface AuthorsHeroProps {
  promise?: any;
}

const AuthorsHero = async ({ promise }: AuthorsHeroProps) => {
  const data = await promise;
  return (
    <div className="layout w-full py-[73px] md:pt-[172px] bg-white">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-[180px] order-last md:order-first">
        <div className="flex flex-col justify-between min-h-[461px]">
          <div className="flex flex-col gap-6 ">
            <div className="front-parse">{handleParse(data?.content)}</div>
            <ul className="font-main text-brand-primary uppercase flex whitespace-nowrap flex-wrap gap-4 font-medium">
              {links?.authors &&
                links.authors.map((link: any) => {
                  return (
                    <li
                      key={link?.id}
                      className="flex flex-col lg:hover:scale-105 lg:ease-in-out lg:duration-300 justify-center items-center"
                    >
                      <Link href={link.uri}>{link.title}</Link>
                      <span className="w-full  h-[2px] block bg-brand-primary"></span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="w-full  order-first h-[370px] relative md:order-last lg:h-[520px]">
          <div className="absolute w-[89%] center-y left-0 h-[89%] z-10">
            {data?.featuredImage?.node?.mediaItemUrl && (
              <div className="relative w-full h-full">
                <Image
                  src={data?.featuredImage?.node?.mediaItemUrl}
                  alt={data?.featuredImage?.node?.altText}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  sizes="(min-width: 1880px) 702px, (min-width: 1040px) calc(40vw - 42px), (min-width: 780px) calc(44.58vw - 58px), calc(88.91vw - 28px)"
                  priority
                />
              </div>
            )}
          </div>
          <div className=" bg-brand-beige w-[85%] h-[100%] center-y absolute right-0"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthorsHero;
