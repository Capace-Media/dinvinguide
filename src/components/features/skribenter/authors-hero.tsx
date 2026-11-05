import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";
import links from "./authors-hero-links.json";
interface AuthorsHeroProps {
  promise?: any;
}

const AuthorsHero = async ({ promise }: AuthorsHeroProps) => {
  const data = await promise;
  return (
    <div className="layout w-full bg-white py-[73px] md:pt-[172px]">
      <div className="order-last grid gap-10 md:order-first md:grid-cols-2 lg:gap-[180px]">
        <div className="flex min-h-[461px] flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="front-parse">{handleParse(data?.content)}</div>
            <ul className="flex flex-wrap gap-4 font-main font-medium whitespace-nowrap text-brand-primary uppercase">
              {links?.authors?.map((link: any) => {
                return (
                  <li
                    key={link?.id}
                    className="flex flex-col items-center justify-center lg:duration-300 lg:ease-in-out lg:hover:scale-105"
                  >
                    <Link href={link.uri}>{link.title}</Link>
                    <span className="block h-[2px] w-full bg-brand-primary"></span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="relative order-first h-[370px] w-full md:order-last lg:h-[520px]">
          <div className="center-y absolute left-0 z-10 h-[89%] w-[89%]">
            {data?.featuredImage?.node?.mediaItemUrl && (
              <div className="relative h-full w-full">
                <Image
                  src={data?.featuredImage?.node?.mediaItemUrl}
                  alt={
                    data?.featuredImage?.node?.altText
                      ? data.featuredImage.node.altText
                      : "Bild från DinVinguide.se"
                  }
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
          <div className="center-y absolute right-0 h-full w-[85%] bg-brand-beige"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthorsHero;
