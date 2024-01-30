import RecipeCategoryTemplate from "@/components/Templates/RecipeCategoryTemplate";
import { WPnext } from "@/lib/wp";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

export async function generateStaticParams() {
  const data = await WPnext(`
  query MyQuery2($id: ID! = "maltider") {
    recipeCategory(id: $id, idType: SLUG) {
      children(first: 6) {
        nodes {
          slug
        }
      }
    }
  }`);
  const paths: any[] = [];

  data?.data?.recipeCategory?.children?.nodes &&
    data.data.recipeCategory.children.nodes.map((recipe: any) => {
      paths.push({ slug: recipe.slug });
    });

  return paths;
}

const Maltider = ({ searchParams, params }: Props) => {
  return (
    <>
      <RecipeCategoryTemplate
        searchParams={searchParams}
        params={params}
        mainSlug="maltider"
      />
    </>
  );
};

export default Maltider;
