import { Client } from '../../apollo';
import { gql } from '@apollo/client';

export const fetchOverviewPage = async (uri) => {
  try {
    const response = await Client.query({
      query: gql`
        query fetchOverviewPageData($uri: String!) {
          pageBy(uri: $uri) {
            id
            title
            acf_overviewPage {
              ingress
              sidor {
                ... on Page {
                  id
                  uri
                  slug
                  title
                  featuredImage {
                    node {
                      mediaItemUrl
                      altText
                    }
                  }
                }
                ... on Post {
                  id
                  uri
                  slug
                  title
                  featuredImage {
                    node {
                      mediaItemUrl
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        uri,
      },
    });

    return response.data.pageBy;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const fetchAtlasPage = async (slug) => {
  try {
    const response = await Client.query({
      query: gql`
        query fetchAtlasPage($uri: String!) {
          pageBy(uri: $uri) {
            id
            title
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            author {
              node {
                nicename
              }
            }
            acf_posts {
              ingress
              sektioner {
                ... on Page_AcfPosts_Sektioner_Brodtext {
                  fieldGroupName
                  text
                }
              }
              lasMer {
                ... on Post {
                  id
                  title
                  uri
                  slug
                  featuredImage {
                    node {
                      mediaItemUrl
                    }
                  }
                }
                ... on Page {
                  id
                  title
                  uri
                  slug
                  featuredImage {
                    node {
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        uri: `/vinguide/vinatlas/${slug}`,
      },
    });
    return response.data.pageBy;
  } catch (error) {
    console.log(error);
    return;
  }
};
