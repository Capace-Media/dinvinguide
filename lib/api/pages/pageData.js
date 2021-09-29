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
