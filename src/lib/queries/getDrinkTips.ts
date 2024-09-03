import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

export const getDrinkTips = async (
  after?: string,
  before?: string,
  first?: number | null,
  last?: number | null,
  search?: string | null
) => {
  try {
    const res = await WP(
      `
      query getDrink($after: String, $before: String, $first: Int, $last: Int) {
        drinktips(after: $after, before: $before, first: $first, last: $last) {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
           
              total
          
          }
          edges {
            node {
              title
              slug
              uri
              drinktipId
              id
              modifiedGmt
              featuredImage {
                node {
                  mediaItemUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              acf_dryckestips {
                potentielltBetyg
                betyget
                dryckestyper
                forpackningar
                pris
                passarTillRecept {
                  ... on Recipe {
                    id
                    title
                    uri
                  }
                }
              }
            }
          }
        }
      }
      `,
      null,
      { after, before, first, last }
    );

    const data = res.data.drinktips;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};

export const fetchDrinktip = async (id: string) => {
  try {
    const res = await WP(
      `query fetchDrinktipBySlug($id: ID!) {
        drinktip(idType: URI, id: $id) {
          title
          date
          id
          slug
          uri
          modifiedGmt
          featuredImage {
            node {
              mediaItemUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          acf_dryckestips {
            potentielltBetyg
            betyget
            pris
            dryckestyper
            ekologiskt
            forpackningar
            recension
            bolagetAdress
            knappUrl
            beskrivning
          }
        }
      }`,
      null,
      { id }
    );

    const data = res.data.drinktip;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
