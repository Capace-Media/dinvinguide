import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import ClientAd from "../../components/ads/ClientAd";
import ExplorerLinks from "../../components/common/explorer/explorerLinks";
import SEO from "../../components/common/SEO";
import Newsletter from "../../components/section/Newsletter";
import { getToplists } from "../../lib/api/toplists";
import { PAGE_SINGLE } from "../../lib/fragments/pages";
import wpFetch from "../../lib/wpFetch";

const ToplistsPage = () => {
  return (
    <Fragment>
      <div className="mb-2">
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
