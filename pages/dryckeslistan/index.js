import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import ClientAd from "../../components/ads/ClientAd";
import ExplorerLinks from "../../components/common/explorer/explorerLinks";
import SEO from "../../components/common/SEO";
import HeroTop from "../../components/section/HeroTop";
import Newsletter from "../../components/section/Newsletter";
import ToplistCategories from "../../components/section/ToplistCategories";
import { getToplists } from "../../lib/api/toplists";
import { PAGE_SINGLE } from "../../lib/fragments/pages";
import wpFetch from "../../lib/wpFetch";
import dryckes from "../../public/images/top/dryckes.jpg";
import recept from "../../public/images/top/recept.jpg";

const ToplistsPage = ({ data }) => {
  const { toplists, page } = data;
  const [loading, setLoading] = useState(false);
  return (
    <Fragment>
      <SEO
        title={page?.page?.seo?.title ? page?.page?.seo?.title : "Topplistor"}
        description={page?.page?.seo?.description}
      />
      <HeroTop />
      <div className="mb-[90px]">
        <ClientAd position="top" type="dl" />
      </div>
      <div className=" mb-[101px]">
        <div className=" w-[348px] flex justify-between m-auto lg:w-[1256px] md:w-[628px] items-center py-6">
          <p className="font-semibold">Utforska Våra kategorier</p>
          <p className="font-bold">Topplistor</p>
        </div>
        <div className="flex contain flex-col justify-center items-center gap-[20px] lg:flex-row lg:flex-wrap md:grid-cols-2 md:gap-0">
          {toplists.map(
            (
              { toplist, currentDrinks, previousDrinks, fallbackDrinks },
              index
            ) => {
              if (
                toplist.uri.includes("alkoholfritt") ||
                toplist.uri.includes("hallbart-val")
              ) {
                return null;
              } else {
                let slogan = toplist?.acf_toplists?.slogan;
                return (
                  <ToplistCategories
                    key={toplist.id + index}
                    i={index}
                    top={toplist}
                  />
                );
              }
            }
          )}
        </div>
      </div>

      <div className="my-[101px]">
        <div className="">
          <div className="flex contain  flex-col justify-center items-center gap-[20px] lg:flex-row lg:flex-wrap  md:gap-[0]">
            {toplists.map(
              (
                { toplist, currentDrinks, previousDrinks, fallbackDrinks },
                index
              ) => {
                if (
                  toplist.uri.includes("alkoholfritt") ||
                  toplist.uri.includes("hallbart-val")
                ) {
                  return (
                    <ToplistCategories
                      key={toplist.id + index}
                      i={index}
                      top={toplist}
                    />
                  );
                } else {
                  return null;
                }
              }
            )}

            <Link href="/dryckesutforskaren">
              <a className="overlay-top relative w-[350px] lg:w-[627.9px] h-[314px]">
                <Image
                  src={dryckes.src}
                  layout="fill"
                  objectFit="cover"
                  alt="bild på dryckesutforskaren"
                />
                <div className="absolute  bottom-0 text-white p-[20px] lg:p-[30px]">
                  <div className="font-body ">
                    <p className="text-[16px]">DRYCKESUTFORSKAREN</p>
                    <p className=" font-display font-bold text-[26px]">
                      Utforska alla drycker
                    </p>
                    <p className=" italic text-[13px]">
                      Testade av redaktionen
                    </p>
                  </div>
                </div>
              </a>
            </Link>
            <Link href="/recept">
              <a className="overlay-top relative w-[350px] lg:w-[627.9px] h-[314px]">
                <Image
                  src={recept.src}
                  layout="fill"
                  objectFit="cover"
                  alt="bild på receptutforskaren"
                />
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
      </div>
      <div className="">
        <Newsletter />
      </div>
    </Fragment>
  );
};

export default ToplistsPage;

export const getStaticProps = async () => {
  const resolved = await Promise.all([
    getToplists(),
    wpFetch(PAGE_SINGLE, { id: "dryckeslistan" }),
  ]);

  return {
    props: {
      data: {
        page: resolved[1],
        toplists: resolved[0],
      },
    },
  };
};
