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
    console.log('🚀 ~ file: grapes.js ~ line 57 ~ getGrape ~ res', res);

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
