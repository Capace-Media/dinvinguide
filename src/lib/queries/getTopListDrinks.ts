import dayjs from "dayjs";
import toObject from "dayjs/plugin/toObject";
import weekday from "dayjs/plugin/weekday";
import WP, { WPnext } from "../wp";
import { SEO } from "./fragments/Seo";
dayjs.extend(toObject);
dayjs.extend(weekday);

const batchLimit = 20;
export const getToplistPaths = async () => {
  try {
    const res = await WP(`
        query getAllToplists {
          pageBy(uri: "topplistor") {
            id
            acf_topplistor {
              aktivaTopplistor {
                ... on Toplist {
                  uri
                  slug
                }
              }
            }
          }
        }
      `);

    return res.data.pageBy.acf_topplistor.aktivaTopplistor;
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

// export const getToplists = async () => {
//   try {
//     //Get active toplists to display
//     const res = await WP(`
//         query getAllToplists {
//           pageBy(uri: "topplistor") {
//             id
//             acf_topplistor {
//               aktivaTopplistor {
//                 ... on Toplist {
//                   id
//                   uri
//                   title
//                   featuredImage {
//                     node {
//                       altText
//                       mediaItemUrl
//                     }
//                   }
//                   seo {
//                     metaDesc
//                     title
//                     opengraphTitle
//                     opengraphDescription
//                     opengraphImage {
//                       mediaItemUrl
//                     }
//                   }
//                   acf_toplists {
//                     ekologiskt
//                     maxAntal
//                     slogan
//                     text
//                     toplistImg {
//                       desktop {
//                         altText
//                         mediaItemUrl
//                       }
//                       mobile {
//                         altText
//                         mediaItemUrl
//                       }
//                     }
//                     dryckestyper {
//                       name
//                     }
//                     forpackningar {
//                       name
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       `);
//     let toplists = res.data.pageBy.acf_topplistor.aktivaTopplistor;

//     //Get drinks after certain date, will later be split between
//     const currentDrinks = await getCurrentToplistDrinks();

//     const previousDrinks = await getPreviousToplistDrinks();

//     const fallbackDrinks = await getFallbackToplistDrinks();

//     let extendedToplists = [];
//     // Populate each toplists with items

//     for (let i = 0; i < toplists.length; i++) {
//       const drinks = await getToplistItems(toplists[i], currentDrinks);
//       const previous = await getToplistItems(toplists[i], previousDrinks);
//       const fallback = await getToplistItems(toplists[i], fallbackDrinks);

//       const toplistObject = {
//         toplist: toplists[i],
//         currentDrinks: drinks,
//         previousDrinks: previous,
//         fallbackDrinks: fallback,
//       };

//       toplistObject;
//       extendedToplists.push(toplistObject);
//       if (toplists[i].title === "Julens drycker") {
//       }
//     }

//     return extendedToplists;
//   } catch (error) {
//     console.error("getToplists ERROR =>", error);
//     return;
//   }
// };
// Cache object
let cache: { [key: string]: ExtendedToplist[] } = {};

export const getToplists = async (): Promise<ExtendedToplist[]> => {
  // Check if data is already in cache
  if (cache.toplists) {
    return cache.toplists;
  }

  try {
    const res = await WP(`
    query getAllToplists {
      pageBy(uri: "topplistor") {
        id
        acf_topplistor {
          aktivaTopplistor {
            ... on Toplist {
              id
              uri
              title
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
  `);
    const toplists: Toplist[] = res.data.pageBy.acf_topplistor.aktivaTopplistor;

    // Function to fetch data for a single toplist
    // const fetchToplistData = async (
    //   toplist: Toplist
    // ): Promise<ExtendedToplist> => {
    //   // const [drinks, previous, fallback] = await Promise.all([
    //   //   getToplistItems(toplist, await getCurrentToplistDrinks()),
    //   //   getToplistItems(toplist, await getPreviousToplistDrinks()),
    //   //   getToplistItems(toplist, await getFallbackToplistDrinks()),
    //   // ]);
    //   const [drinks, previous] = await Promise.all([
    //     getToplistItems(toplist, await getCurrentToplistDrinks()),
    //     getToplistItems(toplist, await getPreviousToplistDrinks()),
    //   ]);

    //   //console.log("drinks inside my fetch =====>", drinks);
    //   return {
    //     toplist,
    //     currentDrinks: drinks,
    //     previousDrinks: previous,
    //     //fallbackDrinks: fallback,
    //   };
    // };
    const fetchToplistData = async (
      toplist: Toplist
    ): Promise<ExtendedToplist> => {
      let drinks = await getToplistItems(
        toplist,
        await getCurrentToplistDrinks()
      );

      let previous = [];
      if (drinks.length < 3) {
        previous = await getToplistItems(
          toplist,
          await getPreviousToplistDrinks()
        );
      }

      let fallback = [];
      if (drinks.length === 0 && previous.length === 0) {
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

    // Store in cache
    cache.toplists = extendedToplists;

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
      const req = await WPnext(
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
    const currentToday = dayjs().locale("sv");

    //Set after day to last saturday
    const afterDate = currentToday.weekday(-8).toObject();
    //Set before day to closest satur
    const beforeDate = currentToday.weekday(0).toObject();

    let hasNextPage = true;
    let currentCursor = "";
    let array = [];

    const afterYear = afterDate.years;
    const afterMonth = afterDate.months + 1;
    const afterDay = afterDate.date + 1;

    const beforeYear = beforeDate.years;
    const beforeMonth = beforeDate.months + 1;
    const beforeDay = beforeDate.date + 1;

    while (hasNextPage) {
      const req = await WPnext(
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
      const req = await WPnext(
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
