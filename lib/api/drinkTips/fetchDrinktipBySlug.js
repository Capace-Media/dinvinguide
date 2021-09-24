import { Client } from '../../apollo';
import { gql } from '@apollo/client';

export const fetchDrinktipsBySlug = async (slug) => {
  try {
    const response = await Client.query({
      query: gql`
        query fetchDrinktipsByslug($slug: String!) {
          drinktipBy(slug: $slug) {
            title
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            acf_dryckestips {
              pris
              dryckestyper
              forpackningar
              recension
            }
          }
        }
      `,
      variables: {
        slug,
      },
    });

    return response.data.drinktipBy;
  } catch (error) {
    console.log(error);
    return;
  }
};
