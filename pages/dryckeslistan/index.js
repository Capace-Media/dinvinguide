import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import ClientAd from "../../components/ads/ClientAd";
import ExplorerLinks from "../../components/common/explorer/explorerLinks";
import SEO from "../../components/common/SEO";
import Newsletter from "../../components/section/Newsletter";
import ToplistCategories from "../../components/section/ToplistCategories";
import { getToplists } from "../../lib/api/toplists";
import { PAGE_SINGLE } from "../../lib/fragments/pages";
import wpFetch from "../../lib/wpFetch";

const ToplistsPage = ({ data }) => {
  const { toplists, page } = data;
  const [loading, setLoading] = useState(false);
  <SEO
    title={page?.page?.seo?.title ? page?.page?.seo?.title : "Topplistor"}
    description={page?.page?.seo?.description}
  />;
  return (
    <Fragment>
      <div className="mb-5">
        <ClientAd position="top" type="dl" />
      </div>
      <div>
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
                <Link href={toplist.uri} key={toplist?.id + index}>
                  <a>
                    <ToplistCategories top={toplist} />
                  </a>
                </Link>
              );
            }
          }
        )}
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
