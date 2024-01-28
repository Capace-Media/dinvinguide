import handleParse from "@/lib/utils/handleParse";
import PrettyDate from "@/lib/utils/prettyDate";
import { WPnext } from "@/lib/wp";
import Image from "next/image";
import Link from "next/link";
import { ParamsProps } from "../../../../types/Global";

async function getWordData(slug: string) {
  const id = `/glossary/${slug}`;
  try {
    const res = await WPnext(
      `query getWordData($id: ID!) {
        glossary(id: $id, idType: URI) {
        id
        content
        title
        modifiedGmt
        title
        featuredImage {
          node {
            altText
            mediaItemUrl
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

const WordTemplate = async ({ searchParams, params }: ParamsProps) => {
  const data = await getWordData(params?.slug);
  console.log("data =====>", data);
  return (
    <article className="lg:grid lg:grid-cols-5 gap-10 pt-[120px] layout bg-white">
      <div className="lg:col-span-3">
        <div className="flex justify-between">
          {data?.author?.name && (
            <ul className="flex gap-2 text-[14px] text-brand-secondary">
              <li>
                <Link href="/">Hem</Link>
              </li>
              {" / "}
              <li>
                <Link href="/ordlistan">Ordlistan</Link>
              </li>
              {" / "}
              <li>
                <Link href={`/ordlistan/${data?.title}`}>{data?.title}</Link>
              </li>
              {" / "}
            </ul>
          )}
          <time className="text-[14px]" dateTime={data?.modifiedGmt}>
            {PrettyDate(data?.modifiedGmt)}
          </time>
        </div>

        <div className=" text-[#333] pt-10">
          <h1 className="font-sub pb-5">{data?.title}</h1>
          {data?.content && (
            <p className=" italic text-[14px]">{handleParse(data?.content)}</p>
          )}

          <h2 className="font-sub">Hur andvänds ordet?</h2>

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
            <div className=" relative py-10 w-[100%] lg:h-[555px] h-[322px]">
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
      <div></div>
    </article>
  );
};

export default WordTemplate;
