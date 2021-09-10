import { Client } from '../apollo';
import dayjs from 'dayjs';
import { gql } from '@apollo/client';
import toObject from 'dayjs/plugin/toObject';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(toObject);
dayjs.extend(weekday);

const batchLimit = 200;
const maxPaths = 100;

export const getDrinkPaths = async () => {
  try {
    let hasNextPage = true;
    let currentCursor = '';
    let array = [];

    while (hasNextPage && array.length <= 100) {
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
                  acf_drinks {
                    betyg
                    dryckestyper {
                      name
                    }
                    forpackningar {
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
export const getFallbackToplistDrinks = async () => {
  try {
    const today = dayjs().locale('sv');
    const afterDate = today.subtract(6, 'months').toObject();
    const beforeDate = today.weekday(-7).toObject();

    let hasNextPage = true;
    let currentCursor = '';
    let array = [];

    const afterYear = afterDate.years;
    const afterMonth = afterDate.months + 1;
    const afterDay = afterDate.date;
    console.log('FALLBACK After =>', afterDay, afterMonth, afterYear);

    const beforeYear = beforeDate.years;
    const beforeMonth = beforeDate.months + 1;
    const beforeDay = beforeDate.date;
    console.log('FALLBACK BEFORE =>', beforeDay, beforeMonth, beforeYear);

    while (hasNextPage) {
      const req = await Client.query({
        query: gql`
          query getMoreArticles(
            $afterYear: Int!
            $afterMonth: Int!
            $afterDay: Int!
            $beforeYear: Int!
            $beforeMonth: Int!
            $beforeDay: Int!
            $batch: Int!
            $cursor: String!
          ) {
            drinks(
              where: {
                dateQuery: {
                  after: {
                    year: $afterYear
                    month: $afterMonth
                    day: $afterDay
                  }
                  before: {
                    year: $beforeYear
                    month: $beforeMonth
                    day: $beforeDay
                  }
                }
              }
              first: $batch
              after: $cursor
            ) {
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
                  acf_drinks {
                    ekologiskt
                    betyg
                    land
                    argang
                    pris
                    recension
                    beskrivning
                    dryckestyper {
                      name
                    }
                    forpackningar {
                      name
                    }
                    passarTillRecept {
                      ... on Recipe {
                        title
                        uri
                        featuredImage {
                          node {
                            mediaItemUrl
                          }
                        }
                      }
                    }
                  }
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
          afterYear,
          afterMonth,
          afterDay,
          beforeYear,
          beforeMonth,
          beforeDay,
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
    return array.sort((a, b) => {
      //If same date, order by score

      if (a.node.acf_drinks.betyg < b.node.acf_drinks.betyg) {
        return +1;
      } else if (a.node.acf_drinks.betyg > b.node.acf_drinks.betyg) {
        return -1;
      } else {
        return 0;
      }
    });
  } catch (error) {
    console.log('ERROR getDrinks =>', error);
    return;
  }
};

export const getCurrentToplistDrinks = async () => {
  try {
    //Function should return drinks published since sunday two weeks back to last saturday
    const today = dayjs().locale('sv');
    //Set after day to last saturday
    const afterDate = today.weekday(-8).toObject();
    //Set before day to closest satur
    const beforeDate = today.weekday(0).toObject();

    console.log('AFTERDATE =>', afterDate);
    let hasNextPage = true;
    let currentCursor = '';
    let array = [];

    const afterYear = afterDate.years;
    const afterMonth = afterDate.months + 1;
    const afterDay = afterDate.date;

    const beforeYear = beforeDate.years;
    const beforeMonth = beforeDate.months + 1;
    const beforeDay = beforeDate.date;

    console.log(
      `AFTER => ${afterDay}/${afterMonth}/${afterYear} - ${today
        .weekday(-8)
        .format('dddd')}`
    );
    console.log(
      `BEFORE => ${beforeDay}/${beforeMonth}/${beforeYear} - ${today
        .weekday(0)
        .format('dddd')}`
    );

    while (hasNextPage) {
      const req = await Client.query({
        query: gql`
          query getMoreArticles(
            $afterYear: Int!
            $afterMonth: Int!
            $afterDay: Int!
            $beforeYear: Int!
            $beforeMonth: Int!
            $beforeDay: Int!
            $batch: Int!
            $cursor: String!
          ) {
            drinks(
              where: {
                dateQuery: {
                  after: {
                    year: $afterYear
                    month: $afterMonth
                    day: $afterDay
                  }
                  before: {
                    year: $beforeYear
                    month: $beforeMonth
                    day: $beforeDay
                  }
                }
              }
              first: $batch
              after: $cursor
            ) {
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
                  acf_drinks {
                    ekologiskt
                    betyg
                    land
                    argang
                    pris
                    recension
                    betyg
                    dryckestyper {
                      name
                    }
                    forpackningar {
                      name
                    }
                    passarTillRecept {
                      ... on Recipe {
                        title
                        uri
                        featuredImage {
                          node {
                            mediaItemUrl
                          }
                        }
                      }
                    }
                  }

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
          afterYear,
          afterMonth,
          afterDay,
          beforeYear,
          beforeMonth,
          beforeDay,
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
    return array.sort((a, b) => {
      //Sort items by rating
      if (a.node.acf_drinks.betyg < b.node.acf_drinks.betyg) {
        return +1;
      } else if (a.node.acf_drinks.betyg > b.node.acf_drinks.betyg) {
        return -1;
      } else {
        return 0;
      }
    });
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
            date
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            acf_drinks {
              land
              argang
              pris
              ekologiskt
              recension
              bolagetAdress
              knappUrl
              betyg
              vagn
              dryckestyper {
                name
              }
              forpackningar {
                name
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
