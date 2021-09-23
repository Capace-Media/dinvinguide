import { Client } from '../../apollo';
import { gql } from '@apollo/client';

export const fetchDrinkTips = async () => {
  try {
    let hasNextPage = true;
    let currentCursor = '';
    let array = [];
    let batch = 200;
    while (hasNextPage) {
      const response = await Client.query({
        query: gql`
          query getExclusiveDrinks($cursor: String!, $batch: Int!) {
            drinktips(first: $batch, after: $cursor) {
              pageInfo {
                endCursor
                hasNextPage
              }
              edges {
                node {
                  title
                  featuredImage {
                    node {
                      mediaItemUrl
                    }
                  }
                  acf_dryckestips {
                    dryckestyper
                    forpackningar
                    pris
                  }
                }
              }
            }
          }
        `,
        variables: {
          cursor: currentCursor,
          batch,
        },
      });
      const pageInfo = response.data.drinktips.pageInfo;
      const drinks = response.data.drinktips.edges;
      drinks.map(({ node: drink }) => {
        array.push(drink);
      });
      hasNextPage = pageInfo.hasNextPage;
      currentCursor = pageInfo.endCursor;
    }
    return array;
  } catch (error) {
    console.log(error);
    return;
  }
};
