import dayjs from "dayjs";
import toObject from "dayjs/plugin/toObject";
import weekday from "dayjs/plugin/weekday";

import WP from "../wp";
import { SEO } from "./fragments/Seo";
dayjs.extend(toObject);
dayjs.extend(weekday);

const batchLimit = 20;
export const getToplistPaths = async () => {
  try {
    const res = await WP(
      `
        query getAllToplists {
          pageBy(uri: "topplistor") {
            id
            acf_topplistor {
              aktivaTopplistor {
                ... on Toplist {
                  uri
                  slug
                  modifiedGmt
                }
              }
            }
          }
        }
      `,
      "wine"
    );

    const data = res?.data?.pageBy?.acf_topplistor?.aktivaTopplistor;
    if (!data) {
      throw Error(
        "Something went wrong Could not read res.data.pageBy.acf_topplistor.aktivaTopplistor"
      );
    }
    return data;
  } catch (error) {
    console.error("getTopListPaths ERROR =>", error);
  }
};

// Assuming you have these interfaces defined based on your data structure
interface Toplist {
  // ... define the properties of a Toplist
}

interface ExtendedToplist {
  toplist: Toplist;
  currentDrinks: any[]; // Replace 'any' with the appropriate type
  previousDrinks: any[]; // Replace 'any' with the appropriate type
  fallbackDrinks?: any[]; // Replace 'any' with the appropriate type
}

// Cache object
let cache: { [key: string]: ExtendedToplist[] } = {};

export const getToplists = async (): Promise<ExtendedToplist[]> => {
  // Check if data is already in cache

  try {
    const res = await WP(
      `
    query getAllToplists {
      pageBy(uri: "topplistor") {
        id
        acf_topplistor {
          aktivaTopplistor {
            ... on Toplist {
              id
              uri
              title
              slug
     
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                  mediaDetails {
                  width
                  height
                }
                }
              }
              ${SEO}
              acf_toplists {
                ekologiskt
                maxAntal
                slogan
                dryckestyper {
                  name
                }
                forpackningar {
                  name
                }
              }
            }
          }
        }
      }
    }
  `,
      "wine"
    );
    const toplists: Toplist[] = res.data.pageBy.acf_topplistor.aktivaTopplistor;

    const fetchToplistData = async (
      toplist: Toplist
    ): Promise<ExtendedToplist> => {
      let drinks = await getToplistItems(
        toplist,
        await getCurrentToplistDrinks()
      );

      let previous = [];
      if (drinks?.length < 3) {
        previous = await getToplistItems(
          toplist,
          await getPreviousToplistDrinks()
        );
      }

      let fallback = [];
      if (drinks?.length === 0 && previous?.length === 0) {
        fallback = await getToplistItems(
          toplist,
          await getFallbackToplistDrinks()
        );
      }

      return {
        toplist,
        currentDrinks: drinks,
        previousDrinks: previous,
        fallbackDrinks: fallback,
      };
    };

    // Parallel fetching
    const fetchPromises = toplists.map(fetchToplistData);
    const extendedToplists = await Promise.all(fetchPromises);

    return extendedToplists;
  } catch (error) {
    console.error("Error in getToplists:", error);
    return [];
  }
};

export const getToplistItems = async (toplist: any, drinks: any) => {
  try {
    //Retrieve all types to be included
    const toplistTypes = toplist.acf_toplists.dryckestyper.map((type: any) => {
      if (type && type.name) {
        return type.name;
      }
    });

    //Retrieve all packaging to be included
    const toplistPackaging = toplist.acf_toplists.forpackningar.map(
      (packaging: any) => {
        if (packaging && packaging.name) {
          return packaging.name;
        }
      }
    );

    //Filter drinkes to only return drinks that includes the types and packages
    const filteredAndSortedDrinks = drinks.filter(({ node: drink }: any) => {
      //Handle christmas toplist
      //Filter drink types
      if (!toplist.acf_toplists.ekologiskt) {
        //Check if drink has a type and package set
        if (drink.acf_drinks.dryckestyper && drink.acf_drinks.forpackningar) {
          //If drink has a type and package then check if the current toplist includes any of these types or packagetypes

          if (
            toplistTypes.includes(drink.acf_drinks.dryckestyper.name) &&
            toplistPackaging.includes(drink.acf_drinks.forpackningar.name)
          ) {
            if (drink.acf_drinks.dryckestyper.name === "Glögg och Glühwein") {
            }

            return drink;
          }
        }
      } else {
        if (
          drink.acf_drinks.dryckestyper &&
          drink.acf_drinks.forpackningar &&
          drink.acf_drinks.ekologiskt
        ) {
          //If drink has a type and package then check if the current toplist includes any of these types or packagetypes
          if (
            toplistTypes.includes(drink.acf_drinks.dryckestyper.name) &&
            toplistPackaging.includes(drink.acf_drinks.forpackningar.name)
          ) {
            return drink;
          }
        }
      }
    });

    return filteredAndSortedDrinks;
  } catch (error) {
    console.error("getToplistItems ERROR =>", error);
    return;
  }
};

export const getPreviousToplistDrinks = async () => {
  try {
    //Function should return drinks published since sunday two weeks back to last saturday
    const today = dayjs().locale("sv");
    //Set after day to last saturday
    const afterDate = today.weekday(-25).toObject();
    //Set before day to closest satur
    const beforeDate = today.weekday(-7).toObject();

    let hasNextPage = true;
    let currentCursor = "";
    let array = [];

    const afterYear = afterDate.years;
    const afterMonth = afterDate.months + 1;
    const afterDay = afterDate.date;

    const beforeYear = beforeDate.years;
    const beforeMonth = beforeDate.months + 1;
    const beforeDay = beforeDate.date;

    while (hasNextPage) {
      const req = await WP(
        `
          query getPreviousDrinks(
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
                  slug
                  leverantorer_to_drink {
                    leverantorer {
                      ... on LeverantR {
                        id
                        title
                        slug
                        databaseId
                      }
                    }
                  }
                  acf_drinks {
                    ekologiskt
                    betyg
                    pris
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
                        slug
                        uri
                      }
                    }
                  }

                  featuredImage {
                    node {
                      mediaItemUrl
                      mediaDetails {
                        width
                        height
                      }
                      altText
                    }
                  }
                }
              }
            }
          }
        `,
        "wine",
        {
          batch: batchLimit,
          cursor: currentCursor,
          afterYear,
          afterMonth,
          afterDay,
          beforeYear,
          beforeMonth,
          beforeDay,
        }
      );

      array.push(...req.data.drinks.edges);
      hasNextPage = req.data.drinks.pageInfo.hasNextPage;
      currentCursor = req.data.drinks.pageInfo.endCursor;
    }

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
    console.error("ERROR getDrinks =>", error);
    return;
  }
};
export const getCurrentToplistDrinks = async () => {
  try {
    //Function should return drinks published since sunday two weeks back to last saturday
    //const currentToday = dayjs().locale("sv");
    const currentToday = dayjs().locale("sv");
    // Set after day to the day after last Saturday
    const afterDate = currentToday.weekday(-8).add(1, "day").toObject();

    // Find the day after the closest past Saturday for `beforeDate`
    const beforeDate = currentToday.weekday(0).add(1, "day").toObject();

    let hasNextPage = true;
    let currentCursor = "";
    let array = [];

    // Note: No need to add 1 to the date here since we've already adjusted the dates correctly.
    const afterYear = afterDate.years;
    const afterMonth = afterDate.months + 1; // Month is 0-indexed, so add 1 to normalize.
    const afterDay = afterDate.date; // Correct day already set with .add(1, 'day').

    const beforeYear = beforeDate.years;
    const beforeMonth = beforeDate.months + 1; // Same as above for month.
    const beforeDay = beforeDate.date; // Correct day already set.

    while (hasNextPage) {
      const req = await WP(
        `
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
                  slug
                  leverantorer_to_drink {
                    leverantorer {
                      ... on LeverantR {
                        id
                        title
                        slug
                        databaseId
                      }
                    }
                  }
                  acf_drinks {
                    ekologiskt
                    betyg
                    pris
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
                        slug
                        uri
          
                      }
                    }
                  }

                  featuredImage {
                    node {
                      mediaItemUrl
                      mediaDetails {
                        width
                        height
                      }
                      altText
                    }
                  }
                }
              }
            }
          }
        `,
        "wine",
        {
          batch: batchLimit,
          cursor: currentCursor,
          afterYear,
          afterMonth,
          afterDay,
          beforeYear,
          beforeMonth,
          beforeDay,
        }
      );

      array.push(...req.data.drinks.edges);
      hasNextPage = req.data.drinks.pageInfo.hasNextPage;
      currentCursor = req.data.drinks.pageInfo.endCursor;
    }

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
    console.error("ERROR getDrinks =>", error);
    return;
  }
};
export const getFallbackToplistDrinks = async () => {
  try {
    const today = dayjs().locale("sv");
    const afterDate = today.subtract(12, "months").toObject();
    const beforeDate = today.weekday(-23).toObject();

    let hasNextPage = true;
    let currentCursor = "";
    let array = [];

    const afterYear = afterDate.years;
    const afterMonth = afterDate.months + 1;
    const afterDay = afterDate.date;

    const beforeYear = beforeDate.years;
    const beforeMonth = beforeDate.months + 1;
    const beforeDay = beforeDate.date;

    while (hasNextPage) {
      const req = await WP(
        `
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
                  slug
                  leverantorer_to_drink {
                    leverantorer {
                      ... on LeverantR {
                        id
                        title
                        slug
                        databaseId
                      }
                    }
                  }
                  acf_drinks {
                    ekologiskt
                    betyg
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
                        slug
                        uri
                      }
                    }
                  }
                  featuredImage {
                    node {
                      mediaItemUrl
                      mediaDetails {
                        width
                        height
                      }
                      altText
                    }
                  }
                }
              }
            }
          }
        `,
        "wine",
        {
          batch: batchLimit,
          cursor: currentCursor,
          afterYear,
          afterMonth,
          afterDay,
          beforeYear,
          beforeMonth,
          beforeDay,
        }
      );

      array.push(...req.data.drinks.edges);
      hasNextPage = req.data.drinks.pageInfo.hasNextPage;
      currentCursor = req.data.drinks.pageInfo.endCursor;
    }

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
    console.error("ERROR getDrinks =>", error);
    return;
  }
};
