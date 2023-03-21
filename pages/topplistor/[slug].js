import { getToplistPaths, getToplists } from "../../lib/api/toplists";

import { Fragment } from "react";
import slugify from "slugify";
import PageIntro from "../../components/common/content/PageIntro";
import ExplorerLinks from "../../components/common/explorer/explorerLinks";
import SEO from "../../components/common/SEO";
import Newsletter from "../../components/section/Newsletter";
import Toplist from "../../components/toplists/Tolist";

const SingleToplistPage = ({ data }) => {
  const { toplist } = data;
  console.log("toplist =====>", toplist);
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
      <div className="row ">
        <Toplist data={toplist} />
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

  // if (!toplist[0]) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      data: {
        toplist: toplist[0],
      },
    },
  };
};
