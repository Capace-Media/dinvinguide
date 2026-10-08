import { graphql } from "@/lib/wp/gql";

export const AuthorFieldsFragment = graphql(`
  fragment AuthorFields on User {
    username
    nicename
    slug
    name
    description
    acf_user {
      email
      facebook
      instagram
      kortBeskrivning
      bild {
        ...ImageFields
      }
    }
  }
`);

export const PageQuery = graphql(`
  query Page($id: ID!) {
    page(id: $id, idType: URI) {
      slug
      title
      content
      page_content {
        intro
      }
      acf_explorer {
        slogan
      }
      author {
        node {
          ...AuthorFields
        }
      }
      seo {
        ...SeoFields
      }
      featuredImage {
        node {
          title
          ...ImageFields
        }
      }
    }
  }
`);

export const FrontPageDrinktipFieldsFragment = graphql(`
  fragment FrontPageDrinktipFields on Drinktip {
    __typename
    id
    title
    slug
    featuredImage {
      node {
        ...ImageFields
      }
    }
    acf_dryckestips {
      betyget
      dryckestyper
      forpackningar
    }
  }
`);

export const FrontPageRecipeFieldsFragment = graphql(`
  fragment FrontPageRecipeFields on Recipe {
    __typename
    id
    title
    slug
    featuredImage {
      node {
        ...ImageFields
      }
    }
    acf_recipe {
      recepieCategories {
        name
        slug
      }
      skrivetAv {
        name
      }
    }
  }
`);

export const FrontPageQuery = graphql(`
  query FrontPage {
    page(id: "/", idType: URI) {
      content
      seo {
        title
        metaDesc
      }
      featuredImage {
        node {
          ...ImageFields
        }
      }
      GQL_frontPageFields {
        highlightedArticles {
          ... on Post {
            __typename
            ...PostCardFields
          }
        }
        highlightedDryckestips {
          ...FrontPageDrinktipFields
        }
        highlightedRecept {
          ...FrontPageRecipeFields
        }
      }
    }
    recipePage: page(id: "recept", idType: URI) {
      page_content {
        intro
      }
    }
    posts(first: 8, where: { authorNotIn: [50] }) {
      nodes {
        __typename
        ...PostCardFields
      }
    }
    drinktips(first: 4) {
      nodes {
        ...FrontPageDrinktipFields
      }
    }
    recipes(first: 7) {
      nodes {
        ...FrontPageRecipeFields
      }
    }
  }
`);

export const RecipePageQuery = graphql(`
  query RecipePage {
    page(id: "recept", idType: URI) {
      page_content {
        intro
      }
    }
    recipes(first: 3) {
      nodes {
        title
        slug
        id
        modifiedGmt: dateGmt
        featuredImage {
          node {
            title
            ...ImageFields
          }
        }
        acf_recipe {
          recepieCategories {
            id
            name
            slug
          }
          skrivetAv {
            name
            id
            slug
          }
        }
      }
    }
  }
`);

export const TopListsQuery = graphql(`
  query TopLists {
    page(id: "/topplistor", idType: URI) {
      acf_topplistor {
        aktivaTopplistor {
          ... on Toplist {
            __typename
            id
            title
            slug
            acf_toplists {
              slogan
              toplistImg {
                desktop {
                  title
                  ...ImageFields
                }
                mobile {
                  title
                  ...ImageFields
                }
              }
            }
            forpackningar {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
`);

export const LinkedCardImageFragment = graphql(`
  fragment LinkedCardImage on NodeWithFeaturedImage {
    featuredImage {
      node {
        ...ImageFields
      }
    }
  }
`);

export const WineAtlasPageQuery = graphql(`
  query WineAtlasPage($id: ID!) {
    page(id: $id, idType: URI) {
      title
      content
      id
      uri
      slug
      modifiedGmt
      featuredImage {
        node {
          ...ImageFields
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      acf_overviewPage {
        ingress
      }
      acf_posts {
        sektioner {
          ... on Page_AcfPosts_Sektioner_ExtraPuff {
            fieldGroupName
            extraPuff {
              ... on Grape {
                title
                slug
                uri
                acf_grape {
                  kortBeskrivning
                }
                ...LinkedCardImage
              }
              ... on Drink {
                title
                slug
                uri
                drinkTypes {
                  edges {
                    node {
                      name
                    }
                  }
                }
                ...LinkedCardImage
              }
              ... on Recipe {
                title
                slug
                uri
                passarTills {
                  edges {
                    node {
                      name
                    }
                  }
                }
                ...LinkedCardImage
              }
            }
          }
          ... on Page_AcfPosts_Sektioner_Brodtext {
            text
            fieldGroupName
          }
          ... on Page_AcfPosts_Sektioner_Citat {
            fieldGroupName
            text
          }
          ... on Page_AcfPosts_Sektioner_Mellanbild {
            fieldGroupName
            iGalleri
            img {
              ...ImageFields
            }
          }
          ... on Page_AcfPosts_Sektioner_StorBild {
            fieldGroupName
            iGalleri
            img {
              ...ImageFields
            }
          }
          ... on Page_AcfPosts_Sektioner_Faktalada {
            text
            fieldGroupName
          }
        }
      }
    }
  }
`);

