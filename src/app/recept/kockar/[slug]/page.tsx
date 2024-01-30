import ChefTemplate from "@/components/Templates/ChefTemplate";
import RecipeCategoryTemplate from "@/components/Templates/RecipeCategoryTemplate";
import { WPnext } from "@/lib/wp";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

export async function generateStaticParams() {
  const data = await WPnext(`
  query chefsdata {
    allGuestWriter {
      nodes {
        slug
      }
    }
  }`);
  const paths: any[] = [];

  data?.allGuestWriter?.nodes &&
    data.allGuestWriter.nodes.map((chef: any) => {
      paths.push({ slug: chef.slug });
    });

  return paths;
}

const Chef = ({ searchParams, params }: Props) => {
  console.log("params.slug =====>", params.slug);
  return (
    <>
      <ChefTemplate
        searchParams={searchParams}
        params={params}
        mainSlug="kockar"
      />
    </>
  );
};

export default Chef;
