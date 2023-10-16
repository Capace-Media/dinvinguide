import FrontHero from "@/components/Blocks/Hero-Header/FrontHero";
import { getFrontPage } from "@/lib/queries/getFrontPage";

async function getData() {
  const res = await getFrontPage();

  return res;
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <FrontHero data={data?.page} />

      <h2 className="">Hello world</h2>
    </>
  );
}
