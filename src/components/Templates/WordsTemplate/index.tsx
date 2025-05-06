import Ads from "@/app/_components/ads";
import words from "@/json/alphabet.json";
import { getPage } from "@/lib/queries/getPage";
import PageHero from "../HeroHeaders/PageHero";

import Newsletter from "@/app/_components/Newsletter";
import links from "@/json/guides.json";
import Link from "next/link";
import LetterFilter from "./LetterFilter";
import WordsByLetter from "./WordsByLetter";
type Props = {
  params?: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const WordsTemplate = async ({ params, searchParams }: Props) => {
  const data = await getPage("/ordlistan");
  return (
    <>
      <PageHero data={data} links={links} guide={"Våra guider"} />
      <Ads pageType="default" position="TOP" />
      <div className="layout bg-white">
        <nav className="w-full">
          <ul className="flex flex-wrap w-full justify-center gap-[1.6rem]">
            {words.map((word: any) => {
              return (
                <li key={word.id}>
                  <LetterFilter word={word} searchParams={searchParams} />
                </li>
              );
            })}
          </ul>
        </nav>
        <section className="py-10 ">
          <WordsByLetter searchParams={searchParams} />
        </section>
      </div>
      <Ads pageType="default" position="MID" />
      <Newsletter />
      <Ads pageType="default" position="BOTTOM" />
    </>
  );
};

export default WordsTemplate;
