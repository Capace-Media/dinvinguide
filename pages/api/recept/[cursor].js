import { RECIPES_ADD } from '../../../lib/fragments/recipes';
import wpFetch from '../../../lib/wpFetch';

const handler = async (req, res) => {
  const { cursor } = req.query;

  try {
    const response = await wpFetch(RECIPES_ADD, { cursor: cursor });
    const array = response.recipes.edges.map(({ node }) => node);
    res
      .status(200)
      .json({ array, cursor: response.recipes.pageInfo.endCursor });
  } catch (error) {
    res.status(500);
  }
};
export default handler;
