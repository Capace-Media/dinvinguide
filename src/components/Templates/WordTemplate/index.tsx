import handleParse from "@/lib/utils/handleParse";
import PrettyDate from "@/lib/utils/prettyDate";

import WP from "@/lib/wp";
import Image from "next/image";
import Link from "next/link";

async function getWordData(slug: string) {
  const id = `/glossary/${slug}`;
  try {
    const res = await WP(
      `query getWordData($id: ID!) {
        glossary(id: $id, idType: URI) {
        id
        content
        title
        modifiedGmt
        slug
        featuredImage {
          node {
            altText
            mediaItemUrl
            mediaDetails {
              width
              height
            }
          }
        }
        GQL_Word_Content {
          relateradTermer {
            ... on Glossary {
              id
              slug
              title
            }
          }
          hurAndvandsOrdet {
            alternativ1
            alternativ2
            alternativ3
          }
        }
      }
    }`,
      null,
      { id }
    );

    const data = res?.data?.glossary;
    if (!data) {
      throw new Error(`Could not fetch word data for ${id}`);
    }
    return data;
  } catch (error) {
    console.error("error =====>", error);
    return null;
  }
}

const WordTemplate = async ({ params }: { params: { slug: string } }) => {
  const data = await getWordData(params?.slug);

  return (
    <article className="lg:grid lg:grid-cols-5 gap-10 pt-[120px] layout bg-white">
      <div className="w-full h-[30px] bg-[#F7F7E5] lg:col-span-5"></div>
      <div className="lg:col-span-3">
        <div className="flex justify-between">
          {data?.slug && (
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
              <li className="text-[#333]">{data?.title}</li>
            </ul>
          )}
          <time className="text-[14px]" dateTime={data?.modifiedGmt}>
            {PrettyDate(data?.modifiedGmt)}
          </time>
        </div>

        <div className=" text-[#333] pt-10">
          <h1 className="font-sub pb-5">{data?.title}</h1>
          {data?.content && (
            <div className=" italic text-[14px]">
              {handleParse(data?.content)}
            </div>
          )}
          {data?.GQL_Word_Content?.hurAndvandsOrdet?.alternativ1 && (
            <h2 className="font-sub">Hur andvänds ordet?</h2>
          )}

          <ul>
            {data?.GQL_Word_Content?.hurAndvandsOrdet?.alternativ1 && (
              <li className="flex gap-2 pb-7">
                <span className="text-[32px] pr-4 font-sub font-bold">1.</span>
                <span className="pt-3">
                  {data.GQL_Word_Content.hurAndvandsOrdet.alternativ1}
                </span>
              </li>
            )}
            {data?.GQL_Word_Content?.hurAndvandsOrdet?.alternativ2 && (
              <li className="flex gap-2 pb-7">
                <span className="text-[32px] pr-4 font-sub font-bold">2.</span>
                <span className="pt-3">
                  {data.GQL_Word_Content.hurAndvandsOrdet.alternativ2}
                </span>
              </li>
            )}
            {data?.GQL_Word_Content?.hurAndvandsOrdet?.alternativ3 && (
              <li className="flex gap-2 pb-7">
                <span className="text-[32px] pr-4 font-sub font-bold">3.</span>
                <span className="pt-3">
                  {data.GQL_Word_Content.hurAndvandsOrdet.alternativ3}
                </span>
              </li>
            )}
          </ul>
          {data?.featuredImage?.node?.mediaItemUrl && (
            <div className=" relative py-10 w-full lg:h-[555px] h-[322px]">
              <Image
                src={data?.featuredImage?.node?.mediaItemUrl}
                alt={data?.title}
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
        {data?.GQL_Word_Content?.relateradTermer && (
          <div className=" w-full bg-brand-secondary p-4">
            <div className="border-b-2 pb-4">
              <Link className="text-white" href="/ordlistan">
                Ordlistan
              </Link>
              <h3 className="text-white text-[26px]">Relaterade termer</h3>
            </div>
            <ul className="pt-5 flex flex-col gap-3">
              {data.GQL_Word_Content.relateradTermer.map((term: any) => {
                return (
                  <li key={term.id}>
                    <Link
                      className="text-white hover:underline"
                      href={`/ordlistan/${term.slug}`}
                    >
                      {term.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

      </aside>
    </article>
  );
};

export default WordTemplate;
