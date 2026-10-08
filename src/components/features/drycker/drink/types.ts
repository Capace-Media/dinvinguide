import type { DrinkFieldsFragment, DrinkQuery } from "@/lib/wp/gql/graphql";

// Draft previews only fetch `DrinkFields`; the published drink also has its
// importers.
export type Drink = DrinkFieldsFragment &
  Partial<Pick<NonNullable<DrinkQuery["drink"]>, "leverantorer_to_drink">>;

export type DrinkRecipe = NonNullable<
  NonNullable<NonNullable<Drink["acf_drinks"]>["passarTillRecept"]>[number]
>;
