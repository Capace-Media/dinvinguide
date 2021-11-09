import { ARTICLE_SINGLE, ARTICLE_SINGLE_PREVIEW } from './fragments/articles';
import {
  DRINKTIP_SINGLE,
  DRINKTIP_SINGLE_PREVIEW,
  DRINK_SINGLE,
  DRINK_SINGLE_PREVIEW,
} from './fragments/drinks';
import { GRAPES, GRAPE_SINGLE, GRAPE_SINGLE_PREVIEW } from './fragments/grapes';
import {
  PAGE_EXPLORER,
  PAGE_EXPLORER_PREVIEW,
  PAGE_OVERVIEW,
  PAGE_OVERVIEW_PREVIEW,
  PAGE_SINGLE,
  PAGE_SINGLE_PREVIEW,
} from './fragments/pages';
import {
  RECIPES,
  RECIPE_SINGLE,
  RECIPE_SINGLE_PREVIEW,
} from './fragments/recipes';

import { getAds } from './api/ads';
import wpFetch from './wpFetch';

const queries = {
  page: {
    Default: {
      live: PAGE_SINGLE,
      preview: PAGE_SINGLE_PREVIEW,
    },
    Översiktssida: {
      live: PAGE_OVERVIEW,
      preview: PAGE_OVERVIEW_PREVIEW,
    },
    Utforskarsida: {
      live: PAGE_EXPLORER,
      preview: PAGE_EXPLORER_PREVIEW,
    },
  },
  post: {
    Default: {
      live: ARTICLE_SINGLE,
      preview: ARTICLE_SINGLE_PREVIEW,
    },
  },
  grape: {
    Default: {
      live: GRAPE_SINGLE,
      preview: GRAPE_SINGLE_PREVIEW,
    },
  },
  drink: {
    Default: {
      live: DRINK_SINGLE,
      preview: DRINK_SINGLE_PREVIEW,
    },
  },
  drinktip: {
    Default: {
      live: DRINKTIP_SINGLE,
      preview: DRINKTIP_SINGLE_PREVIEW,
    },
  },
  recipe: {
    Recipe: {
      live: RECIPE_SINGLE,
      preview: RECIPE_SINGLE_PREVIEW,
    },
  },
};
const resolveTemplate = async (template, type, uri, isPreview) => {
  let data;

  if (template === 'Utforskarsida') {
    let array, subtitle;
    let filterKeys = ['title'];
    let res;

    if (isPreview) {
      const resolved = await Promise.all([
        wpFetch(PAGE_EXPLORER_PREVIEW, { id: uri }),
        getAds(),
      ]);
      const explorerType = resolved[0]['page'].preview.node.acf_explorer.plural;

      let queryData;
      switch (explorerType) {
        case 'druvor':
          res = await Promise.all([
            wpFetch(GRAPES, { batch: 100, type: 'grapes' }),
          ]);
          array = res[0].map(({ node: item }) => item);
          filterKeys = ['title', 'acf_grape.druvtyp.name'];
          subtitle = 'acf_grape.druvtyp.name';
          break;
        case 'recept':
          res = await Promise.all([
            wpFetch(RECIPES, { batch: 100, type: 'recipes' }),
          ]);
          array = res[0].map(({ node: item }) => item);
          filterKeys = ['title'];
          subtitle = '';
          break;
      }

      data = {
        page: resolved[0].page.preview.node,
        ads: resolved[1],
        array: array,
        filterKeys,
        subtitle,
      };
    } else {
      const resolved = await Promise.all([
        wpFetch(queries['page'][template].live, { id: uri }),
        getAds(),
      ]);

      const explorerType = resolved[0]['page'].acf_explorer.plural;

      switch (explorerType) {
        case 'druvor':
          res = await Promise.all([
            wpFetch(GRAPES, { batch: 100, type: 'grapes' }),
          ]);
          array = res[0].map(({ node: item }) => item);
          filterKeys = ['title', 'acf_grape.druvtyp.name'];
          subtitle = 'acf_grape.druvtyp.name';
          break;
        case 'recept':
          res = await Promise.all([
            wpFetch(RECIPES, { batch: 100, type: 'recipes' }),
          ]);
          array = res[0].map(({ node: item }) => item);
          filterKeys = ['title'];
          subtitle = '';
          break;
      }

      data = {
        page: resolved[0][type],
        ads: resolved[1],
        array,
        filterKeys,
        subtitle,
      };
      type = template;
    }
  } else {
    if (isPreview) {
      const resolved = await Promise.all([
        wpFetch(queries[type][template].preview, { id: uri }),
        getAds(),
      ]);

      data = { page: resolved[0][type].preview.node, ads: resolved[1] };
    } else {
      const resolved = await Promise.all([
        wpFetch(queries[type][template].live, { id: uri }),
        getAds(),
      ]);

      data = { page: resolved[0][type], ads: resolved[1] };
    }
  }

  return data;
};

export default resolveTemplate;
