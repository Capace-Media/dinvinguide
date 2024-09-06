import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

export const getWineAtlasPage = async (id: string) => {
  try {
    const res = await WP(
      `query GET_PAGE($id: ID!) {
        page(id: $id, idType: URI) {
          title
          content
          id
          uri
          slug
          modifiedGmt
          featuredImage {
            node {
              mediaItemUrl
              mediaDetails {
                width
                height
              }
              altText
              
            }
          }
          author {
            node {
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
                  altText
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
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
                    featuredImage {
                      node {
                        mediaItemUrl
                        mediaDetails {
                          width
                          height
                        }
                        altText
                      }
                    }
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
                    featuredImage {
                      node {
                        mediaItemUrl
                        mediaDetails {
                          width
                          height
                        }
                        altText
                      }
                    }
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
                    featuredImage {
                      node {
                        mediaItemUrl
                        mediaDetails {
                          width
                          height
                        }
                        altText
                      }
                    }
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
                  mediaItemUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              ... on Page_AcfPosts_Sektioner_StorBild {
                fieldGroupName
                iGalleri
                img {
                  mediaItemUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              ... on Page_AcfPosts_Sektioner_Faktalada {
                text
                fieldGroupName
              }
            }
          }
        }
      }`,
      null,
      { id }
    );

    const users = res.data.page;
    return users;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
