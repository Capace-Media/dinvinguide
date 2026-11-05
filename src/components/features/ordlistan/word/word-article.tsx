import type { getWord } from "@/lib/api/words/get-words";
import handleParse from "@/lib/utils/handle-parse";
import { isPresent } from "@/lib/utils/is-present";
import PrettyDate from "@/lib/utils/pretty-date";
import Image from "next/image";
import Link from "next/link";

export type Word = NonNullable<Awaited<ReturnType<typeof getWord>>>;

interface WordArticleProps {
  word: Word;
}

const WordArticle = ({ word }: WordArticleProps) => {
  const usage = word.GQL_Word_Content?.hurAndvandsOrdet;
  const relatedTerms = word.GQL_Word_Content?.relateradTermer;
  const usageExamples = [
    { field: "alternativ1", text: usage?.alternativ1 },
    { field: "alternativ2", text: usage?.alternativ2 },
    { field: "alternativ3", text: usage?.alternativ3 },
  ];

  return (
    <article className="layout gap-10 bg-white pt-30 lg:grid lg:grid-cols-5">
      <div className="h-7.5 w-full bg-brand-beige lg:col-span-5"></div>
      <div className="lg:col-span-3">
        <div className="flex justify-between">
          {word.slug && (
            <ul className="flex gap-2 text-[14px] text-brand-secondary">
              <li>
                <Link
                  className="text-brand-secondary lg:hover:underline"
                  href="/"
                >
                  Hem
                </Link>
              </li>
              {" / "}
              <li>
                <Link
                  className="text-brand-secondary lg:hover:underline"
                  href="/ordlistan"
                >
                  Ordlistan
                </Link>
              </li>
              {" / "}
              <li className="text-brand-dark">{word.title}</li>
            </ul>
          )}
          <time
            className="text-[14px]"
            dateTime={word.modifiedGmt ?? undefined}
          >
            {PrettyDate(word.modifiedGmt)}
          </time>
        </div>

        <div className="pt-10 text-brand-dark">
          <h1 className="pb-5 font-sub">{word.title}</h1>
          {word.content && (
            <div className="text-[14px] italic">
              {handleParse(word.content)}
            </div>
          )}
          {usage?.alternativ1 && (
            <h2 className="font-sub">Hur andvänds ordet?</h2>
          )}

          <ul>
            {usageExamples.map(
              ({ field, text }, i) =>
                text && (
                  <li key={field} className="flex gap-2 pb-7">
                    <span className="pr-4 font-sub text-[32px] font-bold">
                      {i + 1}.
                    </span>
                    <span className="pt-3">{text}</span>
                  </li>
                ),
            )}
          </ul>
          {word.featuredImage?.node.mediaItemUrl && (
            <div className="relative h-80.5 w-full py-10 lg:h-138.75">
              <Image
                src={word.featuredImage.node.mediaItemUrl}
                alt={word.title ?? ""}
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(min-width: 1880px) 954px, (min-width: 1040px) calc(53.9vw - 49px), (min-width: 780px) calc(100vw - 88px), calc(100vw - 32px)"
              />
            </div>
          )}
        </div>
      </div>
      <aside className="md:col-span-2 lg:pl-10">
        {relatedTerms && (
          <div className="w-full bg-brand-secondary p-4">
            <div className="border-b-2 pb-4">
              <Link className="text-white" href="/ordlistan">
                Ordlistan
              </Link>
              <h3 className="text-[26px] text-white">Relaterade termer</h3>
            </div>
            <ul className="flex flex-col gap-3 pt-5">
              {relatedTerms.filter(isPresent).map((term) => (
                <li key={term.id}>
                  <Link
                    className="text-white hover:underline"
                    href={`/ordlistan/${term.slug}`}
                  >
                    {term.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </article>
  );
};

export default WordArticle;
