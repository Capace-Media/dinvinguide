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

export const getGrape = async (slug, isPreview = false) => {
  try {
    const res = await Client.query({
      query: gql`
        query getGrapeBySlug($slug: ID!, $isPreview: Boolean!) {
          grape(id: $slug, idType: SLUG, asPreview: $isPreview) {
            title
            uri
            acf_grape {
              text
            }
            isPreview
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
        isPreview,
      },
    });

    const data = res.data.grape;
    const grape = {
      title: data.title,
      image:
        data.featuredImage &&
        data.featuredImage.node &&
        data.featuredImage.node.mediaItemUrl,
      text: data.acf_grape.text,
      uri: data.uri,
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
