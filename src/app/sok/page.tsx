import Search from "@/components/Blocks/Search";
import { getSearchResults } from "@/lib/api/posts/get-posts";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "@/components/shared/newsletter/newsletter";
import type { SearchQuery } from "@/lib/wp/gql/graphql";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | any | undefined | null;
  }>;
  params: Promise<{ slug: string }>;
};

const SearchPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const content = searchParams.search || "";

  const data = content ? await getSearchResults(content) : null;

  return (
    <div className="layout bg-white">
      <div className="pt-[80px] pb-[29px]">
        <h2 className="">Sök på DinVinguide.se</h2>
        <p>Sök bland Recept, Dryckestips, Artiklar, Viner och Druvor</p>
      </div>

      <Search placeholder="sök" />
      {data && (
        <>
          <Results
            nodes={data.recipes?.nodes}
            title="Recept"
            baseURI="/recept/"
          />
          <Results
            nodes={data.drinktips?.nodes}
            title="Dryckestips"
            baseURI="/dryckestips/"
          />
          <Results
            nodes={data.posts?.nodes}
            title="Artiklar"
            baseURI="skribenter"
          />
          <Results
            nodes={data.drinks?.nodes}
            title="Drycker"
            baseURI="/drycker/"
          />
          <Results
            nodes={data.grapes?.nodes}
            title="Druvor"
            baseURI="/druvor/"
          />
        </>
      )}

      <Newsletter />
    </div>
  );
};

export default SearchPage;

// Every result type shares these fields; only posts carry an author.
type SearchHit = NonNullable<SearchQuery["recipes"]>["nodes"][number] & {
  author?: NonNullable<SearchQuery["posts"]>["nodes"][number]["author"];
};

interface ResultsProps {
  nodes?: readonly SearchHit[];
  title: string;
  baseURI: string;
}

const Results = ({ nodes, title, baseURI }: ResultsProps) => {
  if (!nodes?.length) return null;

  return (
    <div className="py-10 border-b-2">
      <h2 className="pb-8 text-[32px]">{title}</h2>

      <ul className="grid gap-6 lg:grid-cols-5 md:grid-cols-3">
        {nodes.map((node) => {
          return (
            <li key={node?.title}>
              <Link
                href={
                  baseURI === "skribenter"
                    ? `/skribenter/${node?.author?.node?.slug}/${node?.slug}`
                    : `${baseURI}${node?.slug}`
                }
                className="flex items-center gap-5"
              >
                <div className="relative w-[50px] h-[50px]">
                  {node?.featuredImage?.node?.mediaItemUrl && (
                    <Image
                      src={node.featuredImage.node.mediaItemUrl}
                      alt={node.featuredImage.node.altText || node.title || ""}
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>
                <p className=" font-sub">{node?.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
