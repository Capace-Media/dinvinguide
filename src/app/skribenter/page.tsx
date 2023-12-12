import AuthorsComponent from "@/components/Blocks/skribenter";
import { getAuthors } from "@/lib/queries/getAuthors";
import { getPage } from "@/lib/queries/getPage";
import Ads from "../components/ads";

import { Suspense } from "react";
import Loading from "../loading";
import AuthorsHero from "./components/AuthorsHero";

const getAuthorsData = async () => {
  const data = await getAuthors();
  const pageData = await getPage("skribenter");

  return { data, pageData };
};

const Authors = async () => {
  const { data, pageData } = await getAuthorsData();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <AuthorsHero promise={pageData} />
        <Ads pageType="default" position="TOP" />
        <AuthorsComponent data={data} />
      </Suspense>
    </>
  );
};

export default Authors;
