import dayjs from "dayjs";
import ReactHtmlParser from "html-react-parser";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD
import MedalOne from "../../public/images/no1.png";
import MedalTwo from "../../public/images/no2.png";
import MedalThree from "../../public/images/no3.png";
=======
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Dollar,
  Flaska,
  MedaljBrons,
  MedaljGuld,
  MedaljSilver,
  Passar,
} from "../icons";
>>>>>>> v.1.0.3
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
<<<<<<< HEAD
    <div className="flex flex-col grid-cols-2 gap-10 lg:grid contain-sm">
=======
    <div className="flex flex-col grid-cols-2 gap-16 lg:grid contain-sm">
>>>>>>> v.1.0.3
      <div
        className={`relative ${index % 2 === 0 ? "lg:order-1" : "lg:order-0"}`}
      >
        {data?.featuredImage && data?.featuredImage.node && (
          <>
            <Link href={data.uri}>
<<<<<<< HEAD
              <a>
                <figure className="relative aspect-w-1 aspect-h-1">
                  <figure className="absolute w-full h-full scale-75 translate-y-16 rounded-full bg-brand-red" />
=======
              <a className="">
                <figure className="relative aspect-w-1 aspect-h-1">
>>>>>>> v.1.0.3
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
<<<<<<< HEAD
                  <div className="absolute right-0 w-32 h-32 top-64">
                    <Image
                      src={
                        index === 1
                          ? MedalOne
                          : index === 2
                          ? MedalTwo
                          : MedalThree
                      }
                      objectFit="contain"
                      alt="Medalj"
                    />
=======
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
>>>>>>> v.1.0.3
                  </div>
                )}
              </a>
            </Link>
          </>
        )}
      </div>
<<<<<<< HEAD
      <div>
        <strong className="block mb-5 text-2xl uppercase text-brand-red">
          Nr {index}
        </strong>
        <Link href={data.uri}>
          <a>
            <h2 className="normal-case text-brand-red">{data.title}</h2>
          </a>
        </Link>
        <p className="mt-5 space-x-1">
          {data.acf_drinks.land && <span>{data?.acf_drinks?.land}</span>}
          {data.acf_drinks.argang && <span>{data?.acf_drinks?.argang}</span>}
        </p>
        <p className="mt-5 space-x-1">
          {data.acf_drinks.forpackningar.name && (
            <span>{data?.acf_drinks?.forpackningar.name}</span>
          )}
          {data.acf_drinks.dryckestyper && (
            <span>- {data?.acf_drinks?.dryckestyper.name}</span>
          )}
        </p>
        {data.acf_drinks.pris && (
          <p className="block mt-3 text-2xl font-semibold text-brand-red">
            {data.acf_drinks.pris}:-
          </p>
        )}
        {data.acf_drinks.recension && (
          <div className="mt-5">
            {ReactHtmlParser(data.acf_drinks.recension)}
          </div>
        )}
        {data.acf_drinks.passarTillRecept &&
          data.acf_drinks.passarTillRecept.length > 0 && (
            <>
              <Link href={data.acf_drinks.passarTillRecept[0].uri}>
                <a className="relative block group">
                  <div className="mt-5 overflow-hidden bg-black">
                    <figure className="relative transition-all aspect-w-16 aspect-h-8 opacity-70 group-hover:scale-110">
                      <Image
                        src={
                          data.acf_drinks?.passarTillRecept[0].featuredImage
                            ?.node?.mediaItemUrl
                            ? data.acf_drinks.passarTillRecept[0].featuredImage
                                .node.mediaItemUrl
                            : "/images/recipe-placeholder.jpg"
                        }
                        layout="fill"
                        objectFit="cover"
                        alt={
                          data.acf_drinks.passarTillRecept[0].featuredImage
                            ?.node.altText
                            ? data.acf_drinks.passarTillRecept[0].featuredImage
                                .node.altText
                            : data.acf_drinks.passarTillRecept[0].title
                        }
                      />
                    </figure>
                    <div className="absolute top-0 left-0 p-3 text-white">
                      <p>Passar med</p>
                      <strong className="block">
                        {data.acf_drinks.passarTillRecept[0].title}
                      </strong>
                    </div>
                  </div>
                </a>
              </Link>
            </>
          )}
        {isDebug && (
          <div>
            {data.acf_drinks.betyg} - {dayjs(data.date).format("YYYY-MM-DD")}
=======
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
>>>>>>> v.1.0.3
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
