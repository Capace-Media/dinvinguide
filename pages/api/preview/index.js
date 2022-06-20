import { ARTICLE_SLUGCHECK } from '../../../lib/fragments/articles';
import { DRINKTIP_SLUGCHECK } from '../../../lib/fragments/drinks';
import { DRINK_SLUGCHECK } from '../../../lib/fragments/drinks';
import { GRAPE_SLUGCHECK } from '../../../lib/fragments/grapes';
import { PAGE_SLUGCHECK } from '../../../lib/fragments/pages';
import { RECIPE_SLUGCHECK } from '../../../lib/fragments/recipes';
import wpFetch from '../../../lib/wpFetch';
const pagePrefixes = {
  gin: 'vinguide/sprit',
};
const handler = async (req, res) => {
  if (
    req.query.secret !== process.env.PREVIEW_TOKEN ||
    !req.query.slug ||
    !req.query.type
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  let data;
  switch (req.query.type) {
    case 'druva':
      data = await wpFetch(GRAPE_SLUGCHECK, { id: req.query.slug });
      if (!data) {
        return res.status(401).json({ message: 'Invalid slug' });
      }
      res.setPreviewData({});
      res.redirect(data.grape.uri);
      break;
    case 'post':
      data = await wpFetch(ARTICLE_SLUGCHECK, { id: req.query.slug });
      if (!data) {
        return res.status(401).json({ message: 'Invalid slug' });
      }
      res.setPreviewData({});
      res.redirect(data.post.uri);
      break;
    case 'dryck':
      data = await wpFetch(DRINK_SLUGCHECK, { id: req.query.slug });
      if (!data) {
        return res.status(401).json({ message: 'Invalid slug' });
      }
      res.setPreviewData({});
      res.redirect(data.drink.uri);
      break;
    case 'dryckestips':
      data = await wpFetch(DRINKTIP_SLUGCHECK, { id: req.query.slug });
      if (!data) {
        return res.status(401).json({ message: 'Invalid slug' });
      }
      res.setPreviewData({});
      res.redirect(data.drinktip.uri);
      break;
    case 'recipe':
      data = await wpFetch(RECIPE_SLUGCHECK, { id: req.query.slug });
      if (!data) {
        return res.status(401).json({ message: 'Invalid slug' });
      }
      res.setPreviewData({});
      res.redirect(data.recipe.uri);
    case 'page':
      data = await wpFetch(PAGE_SLUGCHECK, { id: req.query.slug });
      res.setPreviewData({});
      res.redirect(data.page.uri);
  }
};

export default handler;
