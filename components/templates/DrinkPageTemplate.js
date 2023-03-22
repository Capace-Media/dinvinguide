import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import vittVin from "../../public/images/top/glass-of-white-wine.jpg";
import rottvin from "../../public/images/top/red-wine-bottle-and-glass.jpg";
import rose from "../../public/images/top/rose-wine-bottle-and-glass.jpg";
import ClientAd from "../ads/ClientAd";
import SEO from "../common/SEO";
import { ArrowRight, Dollar, Flaska, Passar } from "../icons";

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
  console.log("data =>", data);
  const [image, setImage] = useState(rottvin?.src);

  useEffect(() => {
    switch (data?.page?.acf_drinks?.dryckestyper?.name) {
      case "Vitt vin":
        setImage(vittVin?.src);

        break;
      case "Rött vin":
        setImage(rottvin?.src);

        break;
      case "Rosévin":
        setImage(rose?.src);

        break;

      default:
        setImage(rottvin?.src);

        break;
    }

    return () => {
      setImage(rottvin?.src);
    };
  }, [data?.page?.acf_drinks?.dryckestyper?.name]);

  return (
    <>
      <SEO
        title={drink?.seo?.title}
        description={drink?.seo?.metaDesc}
        image={drink?.featuredImage?.node}
      />
      <div className=" mb-20 relative bg-[#F8F8F9] max-w-screen-2xl mx-auto w-[100%] min-h-[400px] lg:min-h-[547px]">
        <div className="relative h-[170px] lg:h-[547px]">
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
        </div>

        <div className="absolute top-[170px] lg:top-[50%] lg:-translate-y-[40%] lg:left-[128px] p-[20px]">
          <h1 className="text-[14px] lg:text-[18px] font-body">TOPPLISTOR</h1>
          <p className="font-display lg:text-[32px] text-[20px] font-bold mb-3">
            {drink?.title}
          </p>
        </div>
      </div>
      <div className="row">
        <ClientAd position="top" />
      </div>
      <div className="flex flex-col grid-cols-2 gap-16 lg:grid contain-sm">
        {drink?.featuredImage && drink?.featuredImage.node && (
          <>
            <figure className="relative aspect-w-1 aspect-h-1">
              <Image
                src={drink.featuredImage.node.mediaItemUrl}
                layout="fill"
                objectFit="contain"
                alt={
                  drink.featuredImage.node.altText
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
                {drink.acf_drinks.forpackningar.name && (
                  <span>{drink?.acf_drinks?.forpackningar.name}</span>
                )}
                {drink.acf_drinks.dryckestyper && (
                  <span>- {drink?.acf_drinks?.dryckestyper.name}</span>
                )}
              </p>
              {/* test */}

              {drink.acf_drinks.passarTillRecept &&
                drink.acf_drinks.passarTillRecept.length > 0 && (
                  <div className="flex items-baseline gap-3">
                    <Passar />
                    <p>
                      <Link href={drink.acf_drinks.passarTillRecept[0].uri}>
                        <a className="underline">
                          {drink.acf_drinks.passarTillRecept[0].title}
                        </a>
                      </Link>{" "}
                    </p>
                  </div>
                )}
              {drink.acf_drinks.pris && (
                <p className="flex items-center gap-3">
                  <Dollar />
                  <span>{drink.acf_drinks.pris}:-</span>
                </p>
              )}

              {drink?.acf_drinks?.recension && (
                <div>
                  <p>Recension</p>
                  <p>{drink?.acf_drinks?.recension} </p>
                </div>
              )}
            </div>

            <a
              href={drink?.acf_drinks?.knappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className=" flex items-center gap-3 cursor-pointer hover:color-[#E1E5D4]"
            >
              <span>Beställ på Systembolaget</span> <ArrowRight />
            </a>
          </div>
        </div>
      </div>

      <div className="h-screen w-full bg-[#F8F8F9]"></div>
    </>
  );
};

export default DrinkPageTemplate;
