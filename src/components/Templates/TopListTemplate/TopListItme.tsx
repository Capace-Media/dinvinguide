"use client";
import { Bronz, Guld, Silver } from "@/components/icons";
import PrettyDate from "@/lib/utils/prettyDate";
import { cleanUrl } from "@/lib/utils/urlUtils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type JSX } from "react";

interface TopListItemProps {
  data: any;
  index: any;
}

interface MyComponentProps {
  data: {
    acf_drinks?: {
      forpackningar?: {
        name: string;
      };
    };
  };
  index: number;
}

const TopListItem: React.FC<MyComponentProps> = ({
  data,
  index,
}: TopListItemProps) => {
  const getMedal = (index: number): JSX.Element | null => {
    switch (index) {
      case 1:
        return <Guld />;
      case 2:
        return <Silver />;
      case 3:
        return <Bronz />;
      default:
        return null;
    }
  };

  const getMedalClassName = (index: number, packagingName?: string): string => {
    const classMap: { [key: string]: string } = {
      "2-Flaska": " top-[16%] left-[50%] -translate-x-[70%] rotate-12",
      Flaska: " top-[16%] left-[50%] -translate-x-[30%] -rotate-12",
      "2-Box": " bottom-[16%] left-[10%] -translate-x-[30%] -rotate-12",
      Box: " bottom-[18%] left-[10%] -translate-x-[30%] rotate-12",
      "2-Papp": " bottom-[18%] left-[10%] rotate-12",
      "2-Påse": " bottom-[18%] left-[10%] rotate-12",
      "PET-flaska": "top-[16%] left-[50%] -translate-x-[30%] -rotate-12",
      "2-PET-flaska": " top-[16%] left-[50%] -translate-x-[70%] rotate-12",
      default: " top-[16%] left-[50%] -translate-x-[30%] -rotate-12",
    };

    if (index <= 3 && index === 2) {
      let key = packagingName ? `${index}-${packagingName}` : "default";
      return classMap[key] || classMap["default"];
    }
    if (index <= 3 && index !== 2) {
      let key = packagingName ? `${packagingName}` : "default";
      return classMap[key] || classMap["default"];
    }
    return "";
  };

  const medalElement = useMemo(() => getMedal(index), [index]);
  const className = useMemo(
    () => getMedalClassName(index, data?.acf_drinks?.forpackningar?.name),
    [index, data?.acf_drinks?.forpackningar?.name]
  );

  return (
    <li className="lg:grid-cols-2 grid gap-8">
      <div
        className={`relative  ${index % 2 === 0 ? "lg:order-1" : "lg:order-0"}`}
      >
        {data?.featuredImage && data?.featuredImage.node && (
          <Link
            href={`/drycker/${data?.slug}`}
            className={`flex justify-center  ${index % 2 === 0 ? "" : ""} `}
          >
            <figure className={`relative w-[200px] h-[522px]  `}>
              <Image
                src={data?.featuredImage?.node?.mediaItemUrl}
                fill
                style={{
                  objectFit: "contain",
                  alignContent: "end",
                }}
                alt={
                  data.featuredImage.node.altText
                    ? data.featuredImage.node.altText
                    : `Bild på ${data?.title}`
                }
                sizes="200px"
              />
            </figure>
            {index <= 3 && (
              <div className={`absolute  ${className}`}>{medalElement}</div>
            )}
          </Link>
        )}
      </div>

      <div className="flex justify-center items-center ">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-1">
            <div className=" flex items-baseline gap-1">
              <p className=" font-bold text-[18px] uppercase">Nr {index}</p>
              <p className="text-[14px] text-brand-gray">
                {"-"} {PrettyDate(data?.date)}
              </p>
            </div>

            {/* /org-de-rac-la-verne-cap-classique-brut%E2%81%A0 */}
            <Link href={`/drycker/${data?.slug}`}>
              <h2 className="normal-case text-[38px] leading-10 font-display">
                {data.title}
              </h2>
            </Link>

            {data?.acf_drinks?.land && (
              <p className="space-x-1">
                {data?.acf_drinks?.land && (
                  <span>{data?.acf_drinks?.land}</span>
                )}
                {data?.acf_drinks?.argang && (
                  <span>{data?.acf_drinks?.argang}</span>
                )}
              </p>
            )}
            <p className="flex items-center gap-3">
              {/* <Flaska /> */}
              {data.acf_drinks.forpackningar.name && (
                <span>{data?.acf_drinks?.forpackningar.name}</span>
              )}
              {data.acf_drinks.dryckestyper && (
                <span>- {data?.acf_drinks?.dryckestyper.name}</span>
              )}
            </p>
            {/* test */}

            {data.acf_drinks.passarTillRecept &&
              data.acf_drinks.passarTillRecept.length > 0 && (
                <div className="flex items-baseline gap-3">
                  {/* <Passar /> */}

                  <p>
                    <span>Passar till: </span>
                    <Link
                      className="underline"
                      href={cleanUrl(data.acf_drinks.passarTillRecept[0].uri)}
                    >
                      {data.acf_drinks.passarTillRecept[0].title}
                    </Link>
                  </p>
                </div>
              )}
            {data.acf_drinks.pris && (
              <p className="flex items-center gap-3">
                {/* <Dollar /> */}
                <span>{data.acf_drinks.pris}:-</span>
              </p>
            )}
          </div>

          <Link href={data.uri} className="flex items-center gap-3">
            <span>Läs mer om drycken</span>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default TopListItem;
