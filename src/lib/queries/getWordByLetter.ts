import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

type DataArgs = {
  after?: string;
  before?: string;
  id?: string | null;
  first?: number;
  last?: number | null;
};

export const getWordByLetter = async (args: DataArgs) => {
  const { after, before, first, last, id } = args;

  try {
    const res = await WP(
      `
      query getWordByLetter($id: ID!, $after: String, $before: String, $first: Int, $last: Int) {
        letter(id: $id, idType: SLUG) {
          glossaries(after: $after, before: $before, first: $first, last: $last) {
            pageInfo {
              hasNextPage
              endCursor
              hasPreviousPage
              startCursor
           
                total
        
            }
            edges {
              node {
                slug
                title
                id
              }
            }
          }
        }
      }
      `,
      null,
      { after, before, first, last, id }
    );

    const word = res.data.letter.glossaries;

    return word;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
