import { ARTICLE_SLUGCHECK } from '../../../lib/fragments/articles';
import { DRINKTIP_SLUGCHECK } from '../../../lib/fragments/drinks';
import { DRINK_SLUGCHECK } from '../../../lib/fragments/drinks';
import { GRAPE_SLUGCHECK } from '../../../lib/fragments/grapes';
import { RECIPE_SLUGCHECK } from '../../../lib/fragments/recipes';
import wpFetch from '../../../lib/wpFetch';

const handler = async (req, res) => {
  console.log('ACTIVATE PREVIEW');
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
      data = await wpFetch(GRAPE_SLUGCHECK, { slug: req.query.slug });
      if (!data) {
        return res.status(401).json({ message: 'Invalid slug' });
      }
      res.setPreviewData({});
      res.redirect(data.grape.uri);
      break;
    case 'post':
      data = await wpFetch(ARTICLE_SLUGCHECK, { slug: req.query.slug });
      if (!data) {
        return res.status(401).json({ message: 'Invalid slug' });
      }
      res.setPreviewData({});
      res.redirect(data.post.uri);
      break;
    case 'dryck':
      data = await wpFetch(DRINK_SLUGCHECK, { slug: req.query.slug });
      if (!data) {
        return res.status(401).json({ message: 'Invalid slug' });
      }
      res.setPreviewData({});
      res.redirect(data.drink.uri);
      break;
    case 'dryckestips':
      data = await wpFetch(DRINKTIP_SLUGCHECK, { slug: req.query.slug });
      if (!data) {
        return res.status(401).json({ message: 'Invalid slug' });
      }
      res.setPreviewData({});
      res.redirect(data.drinktip.uri);
      break;
    case 'recipe':
      data = await wpFetch(RECIPE_SLUGCHECK, { slug: req.query.slug });
      if (!data) {
        return res.status(401).json({ message: 'Invalid slug' });
      }
      res.setPreviewData({});
      res.redirect(data.recipe.uri);
  }

  console.log('PREVIEW DATA =>', data);
};

export default handler;
