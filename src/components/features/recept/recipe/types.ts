import type { RecipeFieldsFragment } from "@/lib/wp/gql/graphql";

export type Recipe = RecipeFieldsFragment;
export type AcfRecipe = NonNullable<Recipe["acf_recipe"]>;
