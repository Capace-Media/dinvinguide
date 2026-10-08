import type { getWord } from "@/lib/api/words/get-words";
import handleParse from "@/lib/utils/handleParse";
import { isPresent } from "@/lib/utils/is-present";
import PrettyDate from "@/lib/utils/prettyDate";
import Image from "next/image";
import Link from "next/link";

export type Word = NonNullable<Awaited<ReturnType<typeof getWord>>>;

interface WordArticleProps {
  word: Word;
}

const WordArticle = ({ word }: WordArticleProps) => {
  const usage = word.GQL_Word_Content?.hurAndvandsOrdet;
  const relatedTerms = word.GQL_Word_Content?.relateradTermer;

  return (
    <article className="lg:grid lg:grid-cols-5 gap-10 pt-30 layout bg-white">
      <div className="w-full h-7.5 bg-brand-beige lg:col-span-5"></div>
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
          <time className="text-[14px]" dateTime={word.modifiedGmt ?? undefined}>
            {PrettyDate(word.modifiedGmt)}
          </time>
        </div>

        <div className="text-brand-dark pt-10">
          <h1 className="font-sub pb-5">{word.title}</h1>
          {word.content && (
            <div className="italic text-[14px]">{handleParse(word.content)}</div>
          )}
          {usage?.alternativ1 && (
            <h2 className="font-sub">Hur andvänds ordet?</h2>
          )}

          <ul>
            {[usage?.alternativ1, usage?.alternativ2, usage?.alternativ3].map(
              (example, i) =>
                example && (
                  <li key={i} className="flex gap-2 pb-7">
                    <span className="text-[32px] pr-4 font-sub font-bold">
                      {i + 1}.
                    </span>
                    <span className="pt-3">{example}</span>
                  </li>
                )
            )}
          </ul>
          {word.featuredImage?.node.mediaItemUrl && (
            <div className="relative py-10 w-full lg:h-138.75 h-80.5">
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
              <h3 className="text-white text-[26px]">Relaterade termer</h3>
            </div>
            <ul className="pt-5 flex flex-col gap-3">
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
