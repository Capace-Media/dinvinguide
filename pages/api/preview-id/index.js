import { DRINKTIP_IDCHECK, DRINK_IDCHECK } from '../../../lib/fragments/drinks';

import { ARTICLE_IDCHECK } from '../../../lib/fragments/articles';
import { GRAPE_IDCHECK } from '../../../lib/fragments/grapes';
import { PAGE_IDCHECK } from '../../../lib/fragments/pages';
import { RECIPE_IDCHECK } from '../../../lib/fragments/recipes';
import wpFetch from '../../../lib/wpFetch';

const queryMap = {
  grape: { query: GRAPE_IDCHECK, label: 'grape' },
  post: { query: ARTICLE_IDCHECK, label: 'post' },
  recipe: { query: RECIPE_IDCHECK, label: 'recipe' },
  page: { query: PAGE_IDCHECK, label: 'page' },
  drink: { query: DRINK_IDCHECK, label: 'drink' },
  drinktip: { query: DRINKTIP_IDCHECK, label: 'drinktip' },
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
    const template = data[queryType].template.templateName;
    console.log(template);
    if (!data) {
      res.status(404).send('Not found');
      return;
    }
    res.setPreviewData({
      pid: req.query.pid,
      type: req.query.type,
      template: template,
    });
    res.writeHead(307, {
      Location: `/preview?pid=${req.query.pid}`,
    });
    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
};

export default handler;
