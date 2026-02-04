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
      <div className="flex justify-between  pb-6">
        <div>
          <h2 className="heading">Exklusiva dryckestips</h2>
          <p className="text-sm max-w-[500px]">
            Dyk in i vårt exklusiva utbud av dryckestips och högkvalitativa
            viner. Varje vin är granskat av våra experter och betygsatt 0-100.
          </p>
        </div>
        <div className="md:block hidden">
          <Link
            href={`/dryckestips`}
            aria-label={`Utforska alla våra dryckestips`}
            className="flex items-center gap-3 py-4 lg:hover:underline text-brand-secondary"
          >
            <span>Utforska alla våra dryckestips</span>
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>
      </div>

      <div className="pb-6">
        <ul className="grid xl:grid-cols-4 md:grid-cols-2 gap-[4.3rem] pb-10 layout bg-white shadow-lg border-[#F0F0CC] border-b-18 ">
          {combinedArticles &&
            combinedArticles.map((wine: any) => {
              return (
                <li key={wine?.id} className="group">
                  <Link
                    href={`/dryckestips/${wine?.slug}`}
                    className="flex"
                    aria-label={`läs mer om ${wine?.title}`}
                  >
                    <div className="min-w-[100px] h-[160px] relative shake-image">
                      {wine?.featuredImage?.node?.mediaItemUrl && (
                        <Image
                          src={wine.featuredImage.node.mediaItemUrl}
                          alt={
                            wine?.featuredImage?.node?.altText
                              ? wine.featuredImage.node.altText
                              : `bild på ${wine?.title}`
                          }
                          width={
                            wine?.featuredImage?.node?.mediaDetails?.width
                              ? wine.featuredImage.node.mediaDetails.width
                              : 400
                          }
                          height={
                            wine?.featuredImage?.node?.mediaDetails?.height
                              ? wine.featuredImage.node.mediaDetails.height
                              : 269
                          }
                          sizes="(max-width: 768px) 26vw, (max-width: 1024px) 15vw, (max-width: 1790px) 10vw, 102px"
                          className="object-contain w-full h-full"
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

      <Link
        href={`/dryckestips`}
        aria-label={`Utforska alla våra artiklar`}
        className="btn md:hidden!"
      >
        <span>Upptäck alla exklusiva drycker</span>
      </Link>
    </div>
  );
};

export default ExclusiveDrinks;
