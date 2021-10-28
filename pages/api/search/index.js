import {
  SEARCH_DRINKS,
  SEARCH_DRINKTIPS,
  SEARCH_POSTS,
  SEARCH_RECIPES,
} from '../../../lib/fragments/search';

import { Client } from '../../../lib/apollo';

const queryMapping = {
  drinks: SEARCH_DRINKS,
  drinktips: SEARCH_DRINKTIPS,
  posts: SEARCH_POSTS,
  recipes: SEARCH_RECIPES,
};
export const handler = async (req, res) => {
  const { input, batch, cursor, type } = JSON.parse(req.body);
  console.log(input, type);
  try {
    let response;

    response = await Client.query({
      query: queryMapping[type],
      variables: {
        search: input,
        batch,
        cursor,
      },
    });

    if (response.data) {
      res.status(200).json({ data: response.data[type] });
    }
  } catch (error) {
    res.status(500);
  }
};
export default handler;
