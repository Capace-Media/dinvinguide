import Recipe from "@/components/Pagination/Recipes/Recipe";
import WP from "@/lib/wp";

async function getData() {
  try {
    const res = await WP(`
    query getFeaturedRecipes($id: ID! = "/recept") {
      page(id: $id, idType: URI) {
        featured_recipes {
          rubrik
          utvaldaRecept {
            ... on Recipe {
              id
              title
              slug
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                }
              }
              acf_recipe {
                skrivetAv {
                  name
                }
              }
            }
          }
        }
      }
    }`);
    const data = res.data.page.featured_recipes;

    return data;
  } catch (error) {
    console.error("error =====>", error);
    return null;
  }
}

const Highlights = async () => {
  const data = await getData();

  return (
    <div className="">
      <div className="layout bg-white contain">
        <h2 className="py-5">{data?.rubrik}</h2>
        <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          {data &&
            data?.utvaldaRecept?.map((recipe: any, index: number) => {
              return (
                <li key={recipe?.id} className="relative">
                  <Recipe recipe={recipe} />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Highlights;
