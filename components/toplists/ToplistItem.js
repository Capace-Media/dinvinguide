import dayjs from "dayjs";
import ReactHtmlParser from "html-react-parser";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Brons,
  Dollar,
  Flaska,
  Guld,
  MedaljBrons,
  MedaljGuld,
  MedaljSilver,
  Passar,
  Silver,
} from "../icons";
const ToplistItem = ({ data, index }) => {
  const router = useRouter();
  const [medal, setMedal] = useState(null);

  useEffect(() => {
    switch (index) {
      case 1:
        setMedal(<MedaljGuld />);

        break;

      case 2:
        setMedal(<MedaljSilver />);

        break;

      case 3:
        setMedal(<MedaljBrons />);

        break;

      default:
        break;
    }

    return () => {
      setMedal(null);
    };
  }, [index]);
  const isDebug = router?.query?.debug ? true : false;

  return (
    <div className="flex flex-col grid-cols-2 gap-16 lg:grid contain-sm">
      <div
        className={`relative ${index % 2 === 0 ? "lg:order-1" : "lg:order-0"}`}
      >
        {data?.featuredImage && data?.featuredImage.node && (
          <>
            <Link href={data.uri}>
              <a className="">
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
                    className={`absolute w-[151px] h-[151px] ${
                      index === 2 &&
                      data?.acf_drinks?.forpackningar.name == "Flaska"
                        ? "top-[16%] left-[50%] -translate-x-[67%] rotate-12"
                        : data?.acf_drinks?.forpackningar.name == "Flaska"
                        ? "top-[16%] left-[50%] -translate-x-[30%] -rotate-12"
                        : index === 2 &&
                          data?.acf_drinks?.forpackningar.name == "Box"
                        ? "bottom-[16%] left-[10%] -translate-x-[30%] rotate-12"
                        : "bottom-[16%] -right-[10%] -translate-x-[30%] -rotate-12"
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
                <h2 className="normal-case text-[38px] leading-10 font-display">
                  {data.title}
                </h2>
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
            <p className="flex items-center gap-3">
              <Flaska />
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
                  <Passar />

                  <p>
                    <span>Passar till: </span>
                    <Link href={data.acf_drinks.passarTillRecept[0].uri}>
                      <a className="underline">
                        {data.acf_drinks.passarTillRecept[0].title}
                      </a>
                    </Link>
                  </p>
                </div>
              )}
            {data.acf_drinks.pris && (
              <p className="flex items-center gap-3">
                <Dollar />
                <span>{data.acf_drinks.pris}:-</span>
              </p>
            )}
          </div>

          <Link href={data.uri}>
            <a className="flex items-center gap-3">
              <span>Läs mer om produkten</span> <ArrowRight />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToplistItem;
