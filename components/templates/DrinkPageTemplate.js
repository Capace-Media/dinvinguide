import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useResized from "../../hooks/useResized";
import alk from "../../public/images/top/alkoholfri.jpg";
import alkCard from "../../public/images/top/alkoholfriCard.jpg";
import defaultImg from "../../public/images/top/default.jpg";
import vittVin from "../../public/images/top/glass-of-white-wine.jpg";
import mossVin from "../../public/images/top/moss-vin.png";
import rottvin from "../../public/images/top/red-wine-bottle-and-glass.jpg";
import rose from "../../public/images/top/rose-wine-bottle-and-glass.jpg";
import ClientAd from "../ads/ClientAd";
import SEO from "../common/SEO";
import {
  ArrowLeft,
  ArrowRight,
  Dollar,
  Flaska,
  LeftSplashSingle,
  Passar,
  RightSplashSingle,
} from "../icons";

import rodflaska from "../../public/images/top/rod-flaska.jpg";

import rodvinflaska from "../../public/images/top/roda-viner-flaska.jpg";

import roseCard from "../../public/images/top/rose-card.jpg";
import roses from "../../public/images/top/rose.jpg";

import dryckes from "../../public/images/top/dryckes.jpg";
import recept from "../../public/images/top/recept.jpg";
import vitflaska from "../../public/images/top/vit-flaska.jpg";
import vitvinflaska from "../../public/images/top/vita-viner-flaska.jpg";

const DrinkPageTemplate = ({ data }) => {
  const { page: drink } = data;

  const details = [
    // {
    //   label: 'Ekologiskt',
    //   value: drink?.acf_drinks?.ekologiskt ? 'Ja' : 'Nej',
    // },
    // { label: 'Veganvin', value: drink?.acf_drinks?.vagn ? 'Ja' : 'Nej' },
    {
      label: "Publiceringsdatum",
      value: dayjs(drink?.date).locale("sv").format("D MMMM, YYYY"),
    },
  ];

  function extractDomainName(url) {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace("www.", "");
    const domainParts = hostname.split(".");
    const domain = domainParts[0];
    const capitalizedDomain = domain.charAt(0).toUpperCase() + domain.slice(1);
    return capitalizedDomain;
  }
  const bAddress = extractDomainName(drink?.acf_drinks?.bolagetAdress);

  const [image, setImage] = useState(defaultImg?.src ? defaultImg?.src : "");
  const [topImg, setTopImg] = useState(defaultImg?.src ? defaultImg?.src : "");
  const [topSmImg, setSmTopImg] = useState(
    defaultImg?.src ? defaultImg?.src : ""
  );
  const size = 641;
  let isSm = useResized(size);

  const router = useRouter();
  const handleBackButtonClick = () => {
    router.back();
  };
  useEffect(() => {
    switch (data?.page?.acf_drinks?.dryckestyper?.name) {
      case "Vitt vin":
        setImage(vittVin?.src);
        setTopImg(vitvinflaska?.src);
        setSmTopImg(vitflaska?.src);

        break;
      case "Rött vin":
        setImage(rottvin?.src);
        setTopImg(rodvinflaska?.src);
        setSmTopImg(rodflaska?.src);

        break;
      case "Rosévin":
        setImage(rose?.src);
        setTopImg(roses?.src);
        setSmTopImg(roseCard?.src);

        break;
      case "Mousserande vin":
        setImage(mossVin?.src);
        setTopImg(mossVin?.src);
        setSmTopImg(mossVin?.src);
        break;
      default:
        setImage(defaultImg?.src);
        setTopImg(defaultImg?.src);
        setSmTopImg(defaultImg?.src);

        break;
    }

    return () => {
      setImage(defaultImg?.src);
      setTopImg(defaultImg?.src);
      setSmTopImg(defaultImg?.src);
    };
  }, [data?.page?.acf_drinks?.dryckestyper?.name]);

  return (
    <>
      <SEO
        title={
          drink?.seo?.title
            ? drink?.seo?.title
            : drink?.title
            ? drink?.title
            : ""
        }
        description={drink?.seo?.metaDesc ? drink?.seo?.metaDesc : ""}
        image={drink?.featuredImage?.node ? drink?.featuredImage?.node : ""}
      />
      <div className=" mb-20 relative bg-[#F8F8F9] max-w-screen-2xl mx-auto w-[100%] min-h-[400px] lg:min-h-[547px]">
        <div className="relative h-[170px] lg:h-[547px]">
          {image && (
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              alt={
                drink?.featuredImage?.node?.altText
                  ? drink?.featuredImage?.node?.altText
                  : "Hero bild"
              }
            />
          )}
        </div>

        <div className="absolute top-[170px] lg:top-[50%] lg:-translate-y-[40%] lg:left-[128px] p-[20px] lg:w-[40%]">
          <h1 className="text-[14px] lg:text-[18px] font-body">TOPPLISTOR</h1>
          {drink?.title && (
            <p className="font-display lg:text-[32px] text-[20px] font-bold mb-3">
              {drink.title}
            </p>
          )}
        </div>
      </div>
      <div className="row">
        <ClientAd position="top" />
      </div>

      <div className="relative overflow-x-hidden overflow-y-hidden">
        <LeftSplashSingle className="absolute -z-10 left-0 top-[0px] lg:z-10" />
        <RightSplashSingle className="absolute right-0 top-[400px] md:-top-[30px] lg:z-10 -z-10" />
        <div className="contain-sm text-[14px] z-20 flex items-center justify-between">
          <button
            className="flex items-center gap-3"
            onClick={handleBackButtonClick}
          >
            <ArrowLeft /> <span>TILLBACK TILL FÖREGÅENDE SIDA</span>
          </button>
          <p className="font-bold">RECENSION {details[0]?.value}</p>
        </div>
        <div className="flex z-20 flex-col py-[101px] grid-cols-2 gap-16 lg:grid contain-sm">
          {drink?.featuredImage && drink?.featuredImage?.node && (
            <>
              <figure className="relative aspect-w-1 aspect-h-1">
                <Image
                  src={drink.featuredImage.node.mediaItemUrl}
                  layout="fill"
                  objectFit="contain"
                  alt={
                    drink?.featuredImage?.node?.altText
                      ? drink.featuredImage.node.altText
                      : drink.title
                  }
                />
              </figure>
            </>
          )}

          <div className="flex justify-center items-center">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-1">
                <Link href={drink.uri}>
                  <a>
                    <h2 className="normal-case text-[38px] leading-10 font-display">
                      {drink.title}
                    </h2>
                  </a>
                </Link>

                {drink?.acf_drinks?.land && (
                  <p className="space-x-1">
                    {drink.acf_drinks.land && (
                      <span>{drink?.acf_drinks?.land}</span>
                    )}
                    {drink?.acf_drinks?.argang && (
                      <span>{drink?.acf_drinks?.argang}</span>
                    )}
                  </p>
                )}
                <p className="flex items-center gap-3">
                  <Flaska />
                  {drink?.acf_drinks?.forpackningar?.name && (
                    <span>{drink?.acf_drinks?.forpackningar.name}</span>
                  )}
                  {drink?.acf_drinks?.dryckestyper && (
                    <span>- {drink?.acf_drinks?.dryckestyper.name}</span>
                  )}
                </p>
                {/* test */}

                {drink.acf_drinks?.passarTillRecept &&
                  drink.acf_drinks?.passarTillRecept?.length > 0 && (
                    <div className="flex items-baseline gap-3">
                      <Passar />
                      <p>
                        <Link href={drink.acf_drinks?.passarTillRecept[0]?.uri}>
                          <a className="underline">
                            {drink.acf_drinks?.passarTillRecept[0]?.title}
                          </a>
                        </Link>
                      </p>
                    </div>
                  )}
                {drink?.acf_drinks?.pris && (
                  <p className="flex items-center gap-3">
                    <Dollar />
                    <span>{drink.acf_drinks.pris}:-</span>
                  </p>
                )}

                {drink?.acf_drinks?.recension && (
                  <div>
                    <p>Recension</p>

                    <p
                      dangerouslySetInnerHTML={{
                        __html: drink?.acf_drinks?.recension,
                      }}
                    />
                  </div>
                )}
              </div>
              {drink?.acf_drinks?.bolagetAdress && (
                <a
                  href={drink?.acf_drinks?.bolagetAdress}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" flex items-center gap-3 cursor-pointer hover:color-[#E1E5D4]"
                >
                  <span>Beställ på {bAddress}</span> <ArrowRight />
                </a>
              )}
            </div>
          </div>
        </div>
        {drink?.acf_drinks?.passarTillRecept && (
          <div className="md:bg-[#F8F8F9]">
            <div className="lg:grid lg:grid-cols-2 flex flex-col-reverse contain py-[101px] ">
              <div className="p-[20px] flex flex-col lg:justify-center gap-4 lg:px-[141px]">
                <Link href={drink?.acf_drinks?.passarTillRecept[0]?.uri}>
                  <a className="z-20">
                    <h2 className=" normal-case text-[33px]">
                      <p className="text-[16px] font-normal">PASSAR MED</p>
                      {drink?.acf_drinks?.passarTillRecept[0]?.title}
                    </h2>
                  </a>
                </Link>
                {drink?.acf_drinks?.passarTillRecept[0]?.acf_recipe?.desc && (
                  <p
                    className="mb-[52px]"
                    dangerouslySetInnerHTML={{
                      __html:
                        drink.acf_drinks?.passarTillRecept[0]?.acf_recipe?.desc,
                    }}
                  />
                )}

                <Link href={drink?.acf_drinks?.passarTillRecept[0]?.uri}>
                  <a className="flex items-center z-20 gap-3 cursor-pointer">
                    <p>GÅ TILL RECEPT</p> <ArrowRight />
                  </a>
                </Link>
              </div>
              <div className="">
                <figure className="relative aspect-w-16 aspect-h-10">
                  {drink.acf_drinks?.passarTillRecept[0]?.featuredImage?.node
                    ?.mediaItemUrl && (
                    <Image
                      src={
                        drink.acf_drinks?.passarTillRecept[0]?.featuredImage
                          ?.node?.mediaItemUrl
                          ? drink.acf_drinks.passarTillRecept[0].featuredImage
                              .node.mediaItemUrl
                          : "/images/recipe-placeholder.jpg"
                      }
                      layout="fill"
                      objectFit="cover"
                      alt={
                        drink.acf_drinks.passarTillRecept[0].featuredImage?.node
                          .altText
                          ? drink.acf_drinks.passarTillRecept[0].featuredImage
                              .node.altText
                          : drink.acf_drinks.passarTillRecept[0].title
                      }
                    />
                  )}
                </figure>
              </div>
            </div>
          </div>
        )}

        <div className="flex contain z-50 flex-col justify-center items-center gap-[20px] lg:flex-row lg:flex-wrap md:grid-cols-2 md:gap-0 my-[101px]">
          {isSm ? (
            <Smd
              img={topSmImg}
              type={data?.page?.acf_drinks?.dryckestyper?.name}
            />
          ) : (
            <Lgd
              img={topImg}
              type={data?.page?.acf_drinks?.dryckestyper?.name}
            />
          )}
          <Link href="/dryckesutforskaren">
            <a className="z-20 overlay-top relative w-[350px] lg:w-[627.9px] h-[314px]">
              {dryckes?.src && (
                <Image
                  src={dryckes.src}
                  layout="fill"
                  objectFit="cover"
                  alt="bild på dryckesutforskaren"
                />
              )}
              {/* hello world */}
              <div className="absolute  bottom-0 text-white p-[20px] lg:p-[30px]">
                <div className="font-body ">
                  <p className="text-[16px]">DRYCKESUTFORSKAREN</p>
                  <p className=" font-display font-bold text-[26px]">
                    Utforska alla drycker
                  </p>
                  <p className=" italic text-[13px]">Testade av redaktionen</p>
                </div>
              </div>
            </a>
          </Link>
          <Link href="/recept">
            <a className="z-20 overlay-top relative w-[350px] lg:w-[627.9px] h-[314px]">
              {recept?.src && (
                <Image
                  src={recept.src}
                  layout="fill"
                  objectFit="cover"
                  alt="bild på receptutforskaren"
                />
              )}
              <div className="absolute  bottom-0 text-white p-[20px] lg:p-[30px]">
                <div className="font-body ">
                  <p className="text-[16px] uppercase">ReceptUTFORSKAREN</p>
                  <p className=" font-display font-bold text-[26px]">
                    Utforska våra härliga recept
                  </p>
                  <p className=" italic text-[13px]">
                    Recept skrivna av redaktionen
                  </p>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DrinkPageTemplate;

export const Smd = ({ type, img }) => {
  if (!type) {
    return;
  }
  return (
    <>
      <Link
        href={
          type === "Rosévin"
            ? "/topplistor/rose"
            : type === "Vitt vin"
            ? "/topplistor/flaska-vitt"
            : type === "Mousserande vin"
            ? "topplistor/flaska-mousserande"
            : "/topplistor/flaska-rott"
        }
        key={top?.id}
      >
        <a>
          <div className="card max-w-[350px] bg-[#F8F8F9] p-[20px] flex flex-col  ">
            <div className="relative w-[310px] h-[190px]">
              {img && (
                <Image
                  src={img}
                  objectFit="cover"
                  layout="fill"
                  alt={
                    type === "Rosévin"
                      ? "Rosévin"
                      : type === "Vitt vin"
                      ? "Vitt vin"
                      : type === "Mousserande vin"
                      ? "Mousserande vin"
                      : "Röda viner"
                  }
                />
              )}
            </div>

            <div className=" grid grid-cols-6 pt-[20px]">
              <div className="font-body col-span-4">
                <p className="text-[14px]">Topplista</p>
                <p className=" font-display font-bold text-[18px]">
                  {type === "Rosévin"
                    ? "Rosévin"
                    : type === "Vitt vin"
                    ? "Vitt vin"
                    : type === "Mousserande vin"
                    ? "Mousserande vin"
                    : "Röda viner"}
                </p>
                <p className=" italic text-[13px]">Testade av redaktionen</p>
              </div>
            </div>
          </div>
        </a>
      </Link>
      <Link
        href={
          type === "Rosévin"
            ? "/topplistor/rose"
            : type === "Vitt vin"
            ? "/topplistor/flaska-vitt"
            : "/topplistor/flaska-rott"
        }
        key={top?.id}
      >
        <a>
          <div className="card max-w-[350px] bg-[#F8F8F9] p-[20px] flex flex-col  ">
            <div className="relative w-[310px] h-[190px]">
              {alkCard && (
                <Image
                  src={alkCard}
                  objectFit="cover"
                  layout="fill"
                  alt={
                    type === "Rosévin"
                      ? "Rosévin"
                      : type === "Vitt vin"
                      ? "Vitt vin"
                      : "Röda viner"
                  }
                />
              )}
            </div>

            <div className=" grid grid-cols-6 pt-[20px]">
              <div className="font-body col-span-4">
                <p className="text-[14px]">Vin & bubbel</p>
                <p className=" font-display font-bold text-[18px]">
                  Topplistor
                </p>
                <p className=" italic text-[13px]">Visa alla topplistor</p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

export const Lgd = ({ img, type }) => {
  if (!type) {
    return null;
  }
  return (
    <>
      <Link
        href={
          type === "Rosévin"
            ? "/topplistor/rose"
            : type === "Vitt vin"
            ? "/topplistor/flaska-vitt"
            : type === "Mousserande vin"
            ? "topplistor/flaska-mousserande"
            : "/topplistor/flaska-rott"
        }
      >
        <a>
          <div className={`flex bg-[#F8F8F9] max-w-[630px] parent`}>
            <div className="relative w-[314px] h-[312px]">
              {img && (
                <Image
                  src={img}
                  objectFit="cover"
                  layout="fill"
                  alt={
                    type === "Rosévin"
                      ? "Rosévin"
                      : type === "Vitt vin"
                      ? "Vitt vin"
                      : type === "Mousserande vin"
                      ? "Mousserande vin"
                      : "Röda viner"
                  }
                />
              )}
            </div>

            <div className="w-[314px] flex flex-col justify-end p-[20px]">
              <div className=" grid grid-cols-6 pt-[20px]">
                <div className="font-body col-span-4">
                  <p className="text-[14px]">Topplista</p>
                  <p className=" font-display font-bold text-[18px]">
                    {type === "Rosévin"
                      ? "Rosévin"
                      : type === "Vitt vin"
                      ? "Vitt vin"
                      : type === "Mousserande vin"
                      ? "Mousserande vin"
                      : "Röda viner"}
                  </p>
                  <p className=" italic text-[13px]">Testade av redaktionen</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>

      <Link href="/dryckeslistan">
        <a>
          <div className={`flex bg-[#F8F8F9] max-w-[630px] parent`}>
            <div className="relative w-[314px] h-[312px]">
              {alk && (
                <Image src={alk} objectFit="cover" layout="fill" alt="hello" />
              )}
            </div>
            <div className="w-[314px] flex flex-col justify-end p-[20px]">
              <div className=" grid grid-cols-6 pt-[20px]">
                <div className="font-body col-span-4">
                  <p className="text-[14px]">Vin & bubbel</p>
                  <p className=" font-display font-bold text-[18px]">
                    Topplistor
                  </p>
                  <p className=" italic text-[13px]">Visa alla topplistor</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};
