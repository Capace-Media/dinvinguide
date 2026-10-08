import { graphql } from "@/lib/wp/gql";

// Body shared by the published recipe and its draft preview.
export const RecipeFieldsFragment = graphql(`
  fragment RecipeFields on Recipe {
    title
    featuredImage {
      node {
        title
        ...ImageFields
      }
    }
    acf_recipe {
      desc
      processen
      recipeAverageRating
      recipeRatingCount
      ingredienserOvrigt
      antalPortioner
      receptdelar {
        rubrik
        ingredienser {
          antal
          enhet {
            name
          }
          namn
        }
      }
      beskrivningStegForSteg {
        instruktion
      }
      skrivetAv {
        slug
        name
        id
      }
      recepieCategories {
        id
        slug
        uri
        name
      }
      kok {
        name
        slug
        id
      }
      passandeDrycker {
        ... on Drink {
          id
          slug
          title
          acf_drinks {
            dryckestyper {
              name
            }
            forpackningar {
              name
            }
          }
          featuredImage {
            node {
              ...ImageFields
            }
          }
        }
      }
      time {
        cookingTime
        prepTime
      }
      bilder {
        kortBeskrivning
        img {
          id
          ...ImageFields
        }
      }
      nutritions {
        energKcal
        fett
        fieldGroupName
        kolhydrater
        protein
      }
    }
  }
`);

export const RecipeQuery = graphql(`
  query Recipe($id: ID!) {
    recipe(id: $id, idType: URI) {
      slug
      modifiedGmt
      seo {
        ...SeoFields
      }
      ...RecipeFields
    }
  }
`);

export const PreviewRecipeQuery = graphql(`
  query PreviewRecipe($id: ID!) {
    recipe(idType: DATABASE_ID, id: $id) {
      ...RecipeFields
      preview {
        node {
          ...RecipeFields
        }
      }
    }
  }
`);

// Prerendered at build; the rest render on demand.
export const RecipeSlugsQuery = graphql(`
  query RecipeSlugs {
    recipes {
      nodes {
        slug
      }
    }
  }
`);

export const RecipeCardFieldsFragment = graphql(`
  fragment RecipeCardFields on Recipe {
    guestWriter {
      nodes {
        name
      }
    }
    acf_recipe {
      recepieCategories {
        slug
        name
      }
      skrivetAv {
        name
      }
      time {
        cookingTime
        prepTime
      }
      recipeAverageRating
    }
    id
    title
    slug
    featuredImage {
      node {
        ...ImageFields
      }
    }
  }
`);

export const RecipeListFieldsFragment = graphql(`
  fragment RecipeListFields on RecipeConnection {
    edges {
      node {
        ...RecipeCardFields
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      total
    }
  }
`);

export const RecipesQuery = graphql(`
  query Recipes(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $search: String
  ) {
    recipes(
      after: $after
      before: $before
      first: $first
      last: $last
      where: { search: $search }
    ) {
      ...RecipeListFields
    }
  }
`);

export const RecipesByCategoryQuery = graphql(`
  query RecipesByCategory(
    $id: ID!
    $after: String
    $before: String
    $first: Int
    $last: Int
    $search: String
  ) {
    recipeCategory(id: $id, idType: URI) {
      recipes(
        after: $after
        before: $before
        first: $first
        last: $last
        where: { search: $search }
      ) {
        ...RecipeListFields
      }
    }
  }
`);

export const ChefRecipesQuery = graphql(`
  query ChefRecipes(
    $id: ID!
    $after: String
    $before: String
    $first: Int
    $last: Int
    $search: String
  ) {
    guestWriter(id: $id, idType: URI) {
      name
      recipes(
        after: $after
        before: $before
        first: $first
        last: $last
        where: { search: $search }
      ) {
        ...RecipeListFields
      }
    }
  }
`);

export const DrinkRecipesQuery = graphql(`
  query DrinkRecipes {
    recipeCategory(id: "drycker", idType: SLUG) {
      recipes(first: 4) {
        nodes {
          ...RecipeCardFields
        }
      }
    }
  }
`);

export const RecipeCategoryQuery = graphql(`
  query RecipeCategory($id: ID!) {
    recipeCategory(id: $id, idType: URI) {
      name
      slug
      seo {
        ...TaxonomySeoFields
      }
    }
  }
`);

// Child categories of a top-level category (`maltider`, `ingrediens`).
export const RecipeCategoryChildrenQuery = graphql(`
  query RecipeCategoryChildren($id: ID!, $first: Int) {
    recipeCategory(id: $id, idType: SLUG) {
      children(first: $first) {
        nodes {
          slug
        }
      }
    }
  }
`);

export const FeaturedRecipesQuery = graphql(`
  query FeaturedRecipes {
    page(id: "/recept", idType: URI) {
      featured_recipes {
        rubrik
        utvaldaRecept {
          ... on Recipe {
            __typename
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
  }
`);
