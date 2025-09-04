import { ArrowRight } from "@/components/icons";
import { getPosts } from "@/lib/queries/getPosts";
import WP from "@/lib/wp";
import Image from "next/image";
import Link from "next/link";

async function fetchPosts() {
  const res = await WP(`query getQuery($id: ID = "/") {
    drinktips(first: 4){
        nodes {
          title
          slug
          uri
          
          id
          modifiedGmt
          featuredImage {
            node {
              mediaItemUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          acf_dryckestips {
            potentielltBetyg
            betyget
            dryckestyper
            forpackningar
            pris
            passarTillRecept {
              ... on Recipe {
                id
                title
                uri
              }
            }
          }
        }
      }
    page(id: $id, idType: URI) {
      id
      GQL_frontPageFields {
        highlightedDryckestips {
          ... on Drinktip {
            title
            slug
            uri
            
            id
            modifiedGmt
            featuredImage {
              node {
                mediaItemUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            acf_dryckestips {
              potentielltBetyg
              betyget
              dryckestyper
              forpackningar
              pris
              passarTillRecept {
                ... on Recipe {
                  id
                  title
                  uri
                }
              }
            }
          }
        }
      }
    }
  }`);

  const data = res?.data;
  return data;
}

interface ArticleArray {
  id: string;
  title: string;
  uri: string;
  modifiedGmt: string;
  acf_posts: {
    ingress: string;
  };
  author: { node: any[] };
  featuredImage: { node: any[] };
}

const ExclusiveDrinks = async () => {
  const posts = await fetchPosts();
  console.log("posts", posts);

  const highlightedDryckestips: any[] =
    posts?.page?.GQL_frontPageFields?.highlightedDryckestips;

  const latestArticles: any[] = posts?.drinktips?.nodes;

  // Determine the initial number of latest articles to include
  let initialLatestCount = 4 - Math.min(4, highlightedDryckestips?.length);

  // Ensure we do not add more latestArticles than available or exceed the total count of 4
  let combinedArticles = latestArticles?.slice(0, initialLatestCount);

  // Calculate remaining slots after adding the initial set of latestArticles
  let remainingSlots = 4 - combinedArticles?.length;

  // Add highlightedDryckestips to fill up the remaining slots, ensuring not to exceed 8 in total
  let additionalHighlighted = highlightedDryckestips?.slice(0, remainingSlots);

  combinedArticles = [...combinedArticles, ...additionalHighlighted];

  return (
    <div className="layout contain bg-white">
      <div className="flex justify-between items-center">
        <h2 className="heading">Exklusiva dryckestips</h2>
        <Link
          href={`/dryckestips`}
          aria-label={`Utforska alla våra artiklar`}
          className="flex items-center gap-3 lg:hover:underline text-brand-secondary"
        >
          <span>Upptäck alla exklusiva drycker</span>
          <span>
            <ArrowRight />
          </span>
        </Link>
      </div>
      {/* <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        {combinedArticles &&
          combinedArticles.map((post: any) => <li key={post?.id}></li>)}
      </ul> */}

      <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-[4.3rem] pb-10 layout bg-white shadow-lg border-[#F0F0CC] border-b-[18px]">
        {combinedArticles &&
          combinedArticles.map((wine: any) => {
            return (
              <li key={wine?.id} className="group">
                <Link
                  href={`/dryckestips/${wine?.slug}`}
                  className="flex"
                  aria-label={`läs mer om ${wine?.title}`}
                >
                  <div className="min-w-[100px] h-[150px] relative shake-image">
                    {wine?.featuredImage?.node?.mediaItemUrl && (
                      <Image
                        src={wine.featuredImage.node.mediaItemUrl}
                        alt={
                          wine?.featuredImage?.node?.altText
                            ? wine.featuredImage.node.altText
                            : `bild på ${wine?.title}`
                        }
                        fill
                        style={{
                          objectFit: "contain",
                        }}
                        sizes="(min-width: 1200px) 300px, (min-width: 768px) 384px, 100vw"
                        className=""
                      />
                    )}
                  </div>
                  <div className=" flex gap-2 flex-col justify-center w-full p-4 ">
                    <h2 className="text-[17px] lg:group-hover:underline">
                      {wine?.title}
                    </h2>

                    {wine?.acf_dryckestips?.betyget && (
                      <p className="text-[12px]">
                        {wine.acf_dryckestips.betyget}/100
                      </p>
                    )}

                    <p className="text-[14px] flex">
                      {wine?.acf_dryckestips?.dryckestyper} -{" "}
                      {wine?.acf_dryckestips?.forpackningar}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ExclusiveDrinks;
