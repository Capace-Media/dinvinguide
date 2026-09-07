import { BannerSkeleton } from "@/app/_components/ads/banner";
import AdTop from "@/app/_components/ads/default/top";
import AdMid from "@/app/_components/ads/default/mid";
import AdBottom from "@/app/_components/ads/default/bottom";
import { Suspense } from "react";
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
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
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
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      <Newsletter />
      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>
    </>
  );
};

export default WordsTemplate;
