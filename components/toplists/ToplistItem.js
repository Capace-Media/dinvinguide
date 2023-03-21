import dayjs from "dayjs";
import ReactHtmlParser from "html-react-parser";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Brons, Dollar, Flaska, Guld, Passar, Silver } from "../icons";
const ToplistItem = ({ data, index }) => {
  const router = useRouter();
  const [medal, setMedal] = useState();

  useEffect(() => {
    switch (index) {
      case 1:
        setMedal(<Guld />);

        break;

      case 2:
        setMedal(<Silver />);

        break;

      case 3:
        setMedal(<Brons />);

        break;

      default:
        break;
    }
  }, [index]);
  const isDebug = router?.query?.debug ? true : false;

  return (
    <div className="flex flex-col grid-cols-2 gap-10 lg:grid contain-sm">
      <div
        className={`relative ${index % 2 === 0 ? "lg:order-1" : "lg:order-0"}`}
      >
        {data?.featuredImage && data?.featuredImage.node && (
          <>
            <Link href={data.uri}>
              <a>
                <figure className="relative aspect-w-1 aspect-h-1">
                  <Image
                    src={data.featuredImage.node.mediaItemUrl}
                    layout="fill"
                    objectFit="contain"
                    alt={
                      data.featuredImage.node.altText
                        ? data.featuredImage.node.altText
                        : data.title
                    }
                  />
                </figure>
                {index <= 3 && (
                  <div
                    className={`absolute ${
                      index === 2
                        ? "top-[42px] left-[62px]"
                        : "top-[42px] right-[52px]"
                    }`}
                  >
                    {medal}
                  </div>
                )}
              </a>
            </Link>
          </>
        )}
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-1">
            <p className=" uppercase">Nr {index}</p>
            <Link href={data.uri}>
              <a>
                <h2 className="normal-case font-display">{data.title}</h2>
              </a>
            </Link>

            {data?.acf_drinks?.land && (
              <p className="space-x-1">
                {data.acf_drinks.land && <span>{data?.acf_drinks?.land}</span>}
                {data?.acf_drinks?.argang && (
                  <span>{data?.acf_drinks?.argang}</span>
                )}
              </p>
            )}
            <p className="flex items-center space-x-1">
              <Flaska />
              {data.acf_drinks.forpackningar.name && (
                <span>{data?.acf_drinks?.forpackningar.name}</span>
              )}
              {data.acf_drinks.dryckestyper && (
                <span>- {data?.acf_drinks?.dryckestyper.name}</span>
              )}
            </p>

            {data.acf_drinks.passarTillRecept &&
              data.acf_drinks.passarTillRecept.length > 0 && (
                <div className="flex items-baseline space-x-2">
                  <Passar />
                  <p>
                    Passar till:{" "}
                    <Link href={data.acf_drinks.passarTillRecept[0].uri}>
                      <a className="underline">
                        {data.acf_drinks.passarTillRecept[0].title}
                      </a>
                    </Link>{" "}
                  </p>
                </div>
              )}
            {data.acf_drinks.pris && (
              <p className="flex items-center space-x-2">
                <Dollar />
                <span>{data.acf_drinks.pris}:-</span>
              </p>
            )}
          </div>

          <Link href="/">
            <a>Läs mer om produkten</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToplistItem;
