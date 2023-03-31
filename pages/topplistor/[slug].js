import { getToplistPaths, getToplists } from "../../lib/api/toplists";

import Image from "next/image";
import { Fragment } from "react";

import Link from "next/link";
import ClientAd from "../../components/ads/ClientAd";
import SEO from "../../components/common/SEO";
import { ArrowLeft } from "../../components/icons";
import Newsletter from "../../components/section/Newsletter";
import Toplist from "../../components/toplists/Tolist";

const SingleToplistPage = ({ data }) => {
  const { toplist } = data;

  return (
    <Fragment>
      <SEO
        title={
          toplist?.toplist?.seo?.title
            ? toplist?.toplist?.seo?.title
            : oplist.toplist.title
        }
        description={
          toplist?.toplist?.seo?.metaDesc
            ? toplist?.toplist?.seo?.metaDesc
            : toplist.toplist.acf_toplists.text
        }
        image={
          toplist?.toplist?.seo?.opengraphImage?.mediaItemUrl
            ? toplist?.toplist?.seo?.opengraphImage?.mediaItemUrl
            : ""
        }
      />
      <div className=" mb-20 relative bg-[#F8F8F9] max-w-screen-2xl mx-auto w-[100%] min-h-[400px] lg:min-h-[547px]">
        <div className="relative h-[170px] lg:h-[547px]">
          <Image
            src={toplist?.toplist?.featuredImage?.node?.mediaItemUrl}
            layout="fill"
            objectFit="cover"
            alt={
              toplist?.toplist?.featuredImage?.node?.altText
                ? toplist?.toplist?.featuredImage?.node?.altText
                : "Hero bild"
            }
          />
        </div>

        <div className="absolute top-[170px] lg:top-[50%] lg:-translate-y-[40%] lg:left-[128px] p-[20px]">
          <h1 className="text-[14px] lg:text-[18px] font-body">TOPPLISTOR</h1>
          <p className="font-display lg:text-[32px] text-[20px] font-bold mb-3">
            {toplist.toplist.title}
          </p>
        </div>
      </div>
      <div className="mb-[90px]">
        <ClientAd position="top" type="dl" />
      </div>
      <div className="contain-md text-[14px] z-20 flex items-center justify-between">
        <Link href="/dryckeslistan">
          <a className="flex items-center gap-3">
            <ArrowLeft /> <span>Tillbaka till alla Topplistor</span>
          </a>
        </Link>

        <p className="font-bold">{toplist?.toplist?.title}</p>
      </div>
      <div className="row ">
        <Toplist data={toplist} />
      </div>
      <div className="">
        <Newsletter />
      </div>
    </Fragment>
  );
};

export default SingleToplistPage;

export const getStaticPaths = async () => {
  const paths = await getToplistPaths();
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const slugArray = params.slug.includes("-")
    ? params.slug.split("-")
    : params.slug;

  const isArray = Array.isArray(slugArray);

  const resolved = await Promise.all([getToplists()]);

  const toplist = resolved[0].filter((toplist) => {
    const slug = toplist.toplist.uri.split("/")[2];
    if (slug === params.slug) {
      return true;
    }

    const isEco = toplist.toplist.acf_toplists.ekologiskt;
    const toplistType = toplist.toplist.acf_toplists.dryckestyper;

    const toplistPackaging = toplist.toplist.acf_toplists.forpackningar;

    if (isArray) {
      if (params.slug.includes("julen")) {
        if (toplistType.includes("glogg")) {
          return true;
        }
      }

      if (
        toplistType.includes(slugArray[1].split(" ")[0]) &&
        toplistPackaging.includes(slugArray[0].split(" ")[0])
      ) {
        return true;
      }
    } else {
      if (slugArray === "ekologiskt" && isEco) {
        return true;
      } else {
        if (toplistType.includes(slugArray)) {
          return true;
        }
      }
    }
  });

  if (!toplist || !toplist[0]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        toplist: toplist[0],
      },
    },
  };
};
