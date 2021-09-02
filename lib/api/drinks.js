import { Client } from '../apollo';
import { gql } from '@apollo/client';

const batchLimit = 200;

export const getDrinkPaths = async () => {
  try {
    let hasNextPage = true;
    let currentCursor = '';
    let array = [];

    while (hasNextPage) {
      const req = await Client.query({
        query: gql`
          query getDrinkPaths($batch: Int!, $cursor: String!) {
            drinks(first: $batch, after: $cursor) {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  slug
                }
              }
            }
          }
        `,
        variables: {
          batch: batchLimit,
          cursor: currentCursor,
        },
      });

      array.push(...req.data.drinks.edges);
      hasNextPage = req.data.drinks.pageInfo.hasNextPage;
      currentCursor = req.data.drinks.pageInfo.endCursor;

      console.log(
        'DRINK BATCH =>',
        hasNextPage,
        currentCursor,
        req.data.drinks.edges.length
      );
    }

    const paths = await array.map((item) => {
      return {
        params: {
          drink: item.node.slug,
        },
      };
    });

    return paths;
  } catch (error) {
    console.log('ERROR getDrinks =>', error);
    return;
  }
};

//Functions to retrieve posts from Custom Post Type "Drycker"
export const getDrinks = async () => {
  try {
    let hasNextPage = true;
    let currentCursor = '';
    let array = [];

    while (hasNextPage) {
      const req = await Client.query({
        query: gql`
          query getMoreArticles($batch: Int!, $cursor: String!) {
            drinks(first: $batch, after: $cursor) {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  id
                  date
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
        `,
        variables: {
          batch: batchLimit,
          cursor: currentCursor,
        },
      });

      array.push(...req.data.drinks.edges);
      hasNextPage = req.data.drinks.pageInfo.hasNextPage;
      currentCursor = req.data.drinks.pageInfo.endCursor;

      console.log(
        'DRINK BATCH =>',
        hasNextPage,
        currentCursor,
        req.data.drinks.edges.length
      );
    }

    console.log('TOTAL DRINKS =>', array.length);
    return array;
  } catch (error) {
    console.log('ERROR getDrinks =>', error);
    return;
  }
};

export const getDrink = async (slug) => {
  try {
    const res = await Client.query({
      query: gql`
        query getDrink($slug: String!) {
          drinkBy(slug: $slug) {
            title
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
    const item = res.data.drinkBy;
    return item;
  } catch (error) {
    console.log('getDrink ERROR =>', error);
    return;
  }
};
