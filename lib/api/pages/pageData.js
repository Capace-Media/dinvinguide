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
                  title
                  featuredImage {
                    node {
                      mediaItemUrl
                    }
                  }
                }
                ... on Post {
                  id
                  uri
                  title
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
            acf_posts {
              ingress
              sektioner {
                ... on Page_AcfPosts_Sektioner_Brodtext {
                  fieldGroupName
                  text
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
    console.log(response.data.pageBy);
    return response.data.pageBy;
  } catch (error) {
    console.log(error);
    return;
  }
};
