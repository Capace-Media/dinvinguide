"use client";

import { RedWine, Sparkle, WhiteWine } from "@/components/icons";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import Link from "next/link";

interface TopListCategoryProps {
  data: any;
  index: number;
}

const TopListCategory = ({ data, index }: TopListCategoryProps) => {
  const IconMapping: { [key: string]: JSX.Element } = {
    cG9zdDoxODgzODgzOTYw: <Sparkle />,
    cG9zdDoxODgzOTQxNDkw: <Sparkle />,
    cG9zdDoxODgzODgzOTU2: <RedWine />,
    cG9zdDoxODgzODgzOTUw: <RedWine />,
    cG9zdDoxODgzODgzOTU4: <WhiteWine />,
    cG9zdDoxODgzODgzOTUy: <WhiteWine />,
    cG9zdDoxODgzODgzOTY4: <RedWine />,
    cG9zdDoxODgzODgzOTY2: <WhiteWine />,
  };

  const IconComponent = IconMapping[data.id];
  const width = useWindowSize();
  const mobileBreakpoint = 1024;
  return (
    <li className="">
      <Link
        href={`/topplistor/${data?.slug}`}
        className="lg:relative bg-[#F8F8F9] inline-block w-full group px-3 pt-3 lg:p-0 lg:grid lg:grid-cols-2"
      >
        <div className="hidden lg:block lg:absolute lg:w-full lg:h-full lg:opacity-0 lg:z-10 lg:bg-[#e1e5d458] lg:group-hover:opacity-100 lg:ease-in-out lg:duration-300 lg:cursor-pointer "></div>
        <div
          className={`relative w-full h-[189.54px] lg:h-[312.84px] ${
            index === 2 || index === 3 ? "lg:order-1" : ""
          }`}
        >
          {width && width < mobileBreakpoint ? (
            <Image
              unoptimized
              src={data?.acf_toplists?.toplistImg?.mobile?.mediaItemUrl}
              alt={
                data?.acf_toplists?.toplistImg?.mobile?.altText
                  ? data.acf_toplists.toplistImg.mobile.altText
                  : data?.acf_toplists?.toplistImg?.mobile?.title
              }
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(min-width: 1380px) 980px, (min-width: 1040px) calc(81.25vw - 125px), (min-width: 380px) 280px, calc(73.33vw + 16px)"
            />
          ) : (
            <Image
              unoptimized
              src={data?.acf_toplists?.toplistImg?.desktop?.mediaItemUrl}
              alt={
                data?.acf_toplists?.toplistImg?.desktop?.altText
                  ? data.acf_toplists.toplistImg.desktop.altText
                  : data?.acf_toplists?.toplistImg?.desktop?.title
              }
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(min-width: 1380px) 980px, (min-width: 1040px) calc(81.25vw - 125px), (min-width: 380px) 280px, calc(73.33vw + 16px)"
            />
          )}
        </div>
        <div className="py-5 flex justify-between lg:items-end lg:px-8 lg:py-8">
          <div>
            <p className="uppercase text-[14px]">Topplista</p>
            <h3>{data?.acf_toplists?.slogan}</h3>
          </div>

          <div className=" lg:group-hover:-rotate-12 lg:duration-500 lg:ease-in-out">
            {IconComponent ? IconComponent : <RedWine />}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default TopListCategory;
