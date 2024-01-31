import Search from "@/components/Blocks/Search";
import { getSearchData } from "@/lib/queries/getSearchData";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "../components/Newsletter";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

const SearchPage = async ({ searchParams, params }: Props) => {
  const content = searchParams.search || "";

  const data = content ? await getSearchData(content) : null;

  return (
    <div className="layout bg-white">
      <div className="pt-[80px] pb-[29px]">
        <h2 className="">Sök på DinVinguide.se</h2>
        <p>Sök bland Recept, Dryckestips, Artiklar, Viner och Druvor</p>
      </div>

      <Search placeholder="sök" />
      {data?.recipes?.nodes.length >= 1 && (
        <Results data={data?.recipes} title="Recept" baseURI="/recept/" />
      )}
      {data?.drinktips?.nodes.length >= 1 && (
        <Results
          data={data?.drinktips}
          title="Dryckestips"
          baseURI="/drycker/"
        />
      )}
      {data?.posts?.nodes.length >= 1 && (
        <Results data={data?.posts} title="Artiklar" baseURI="skribenter" />
      )}
      {data?.drinks?.nodes.length >= 1 && (
        <Results data={data?.drinks} title="Drycker" baseURI="/drycker/" />
      )}
      {data?.grapes?.nodes.length >= 1 && (
        <Results data={data?.grapes} title="Druvor" baseURI="/druvor/" />
      )}

      <Newsletter />
    </div>
  );
};

export default SearchPage;

const Results = ({ data, title, baseURI }: any) => {
  return (
    <div className="py-10 border-b-2">
      <h2 className="pb-8 text-[32px]">{title}</h2>

      <ul className="grid gap-6 lg:grid-cols-5 md:grid-cols-3">
        {data?.nodes &&
          data.nodes.map((node: any) => {
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
                        src={node?.featuredImage?.node?.mediaItemUrl}
                        alt={
                          node?.featuredImage?.node?.altText
                            ? node.featuredImage.node.altText
                            : node?.title
                        }
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
