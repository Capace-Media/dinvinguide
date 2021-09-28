import { Client } from '../apollo';
import { gql } from '@apollo/client';

export const getGrapePaths = async () => {
  try {
    const res = await Client.query({
      query: gql`
        query getGrapePaths {
          grapes(first: 200) {
            edges {
              node {
                slug
              }
            }
          }
        }
      `,
    });

    const paths = res.data.grapes.edges.map((grape) => {
      return {
        params: {
          druva: grape.node.slug,
        },
      };
    });

    return paths;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getGrape = async (slug) => {
  try {
    const res = await Client.query({
      query: gql`
        query getGrapeBySlug($slug: String!) {
          grapeBy(slug: $slug) {
            title
            acf_grape {
              text
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
        }
      `,
      variables: {
        slug,
      },
    });

    const data = res.data.grapeBy;
    const grape = {
      title: data.title,
      image:
        data.featuredImage &&
        data.featuredImage.node &&
        data.featuredImage.node.mediaItemUrl,
      text: data.acf_grape.text,
    };
    return grape;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const fetchGrapes = async () => {
  try {
    let hasNextPage = true;
    let currentCursor = '';
    let array = [];
    let batch = 200;
    while (hasNextPage) {
      const response = await Client.query({
        query: gql`
          query fetchAllGrapes($batch: Int!, $cursor: String!) {
            grapes(first: $batch, after: $cursor) {
              edges {
                node {
                  title
                  id
                  uri
                  acf_grape {
                    druvtyp {
                      name
                    }
                  }
                  featuredImage {
                    node {
                      mediaItemUrl
                    }
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        `,
        variables: {
          batch,
          cursor: currentCursor,
        },
      });

      const grapes = response.data.grapes.edges;
      const pageInfo = response.data.grapes.pageInfo;
      hasNextPage = pageInfo.hasNextPage;
      currentCursor = pageInfo.endCursor;
      array.push(...grapes);
    }
    return array;
  } catch (error) {
    console.log(error);
    return;
  }
};
