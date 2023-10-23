import FrontHero from "@/components/Blocks/Hero-Header/FrontHero";
import { getFrontPage } from "@/lib/queries/getFrontPage";
import Ads from "./components/ads";

async function getData() {
  const res = await getFrontPage();

  return res;
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <FrontHero data={data?.page} />
      <Ads pageType="default" position="TOP" />

      <h2 className="">Hello world</h2>
    </>
  );
}
