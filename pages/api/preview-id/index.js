import { ARTICLE_IDCHECK } from '../../../lib/fragments/articles';
import { GRAPE_IDCHECK } from '../../../lib/fragments/grapes';
import { RECIPE_IDCHECK } from '../../../lib/fragments/recipes';
import wpFetch from '../../../lib/wpFetch';

const queryMap = {
  grape: { query: GRAPE_IDCHECK, label: 'grape' },
  post: { query: ARTICLE_IDCHECK, label: 'post' },
  recipe: { query: RECIPE_IDCHECK, label: 'recipe' },
};

const handler = async (req, res) => {
  let data;
  if (req.query.secret !== process.env.PREVIEW_TOKEN) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
  try {
    const queryType = req.query.type === 'druva' ? 'grape' : req.query.type;
    data = await wpFetch(queryMap[queryType].query, { id: req.query.pid });
    console.log(data);
    if (!data) {
      res.status(404).send('Not found');
      return;
    }
    res.setPreviewData({ pid: req.query.pid, type: req.query.type });
    res.writeHead(307, {
      Location: `/preview?pid=${req.query.pid}&type=${req.query.type}`,
    });
    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
};

export default handler;
