import { getErrorMessage } from "../utils/getErrorMessage";
import { WPnext } from "../wp";

type DataArgs = {
  after?: string;
  before?: string;
  id?: string | null;
  first?: number;
  last?: number | null;
};

export const getWordByLetter = async (args: DataArgs) => {
  console.log("hello =====>");
  const { after, before, first, last, id } = args;

  console.log("args =====>", args);
  try {
    const res = await WPnext(
      `
      query getWordByLetter($id: ID!, $after: String, $before: String, $first: Int, $last: Int) {
        letter(id: $id, idType: SLUG) {
          glossaries(after: $after, before: $before, first: $first, last: $last) {
            pageInfo {
              hasNextPage
              endCursor
              hasPreviousPage
              startCursor
              offsetPagination {
                total
              }
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
      { after, before, first, last, id }
    );

    const word = res.data.letter.glossaries;

    console.log("word =====>", word);
    return word;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
