import {
  DRINKTIP_SINGLE_PREVIEW,
  DRINK_SINGLE_PREVIEW,
} from '../../lib/fragments/drinks';
import {
  PAGE_EXPLORER_PREVIEW,
  PAGE_OVERVIEW_PREVIEW,
  PAGE_SINGLE_PREVIEW,
} from '../../lib/fragments/pages';

import { ARTICLE_SINGLE_PREVIEW } from '../../lib/fragments/articles';
import DrinkPageTemplate from '../../components/templates/DrinkPageTemplate';
import DrinktipPageTemplate from '../../components/templates/DrinktipPageTemplate';
import ExplorerPageTemplate from '../../components/templates/ExplorerPageTemplate';
import { GRAPE_SINGLE_PREVIEW } from '../../lib/fragments/grapes';
import GrapePageTemplate from '../../components/templates/GrapePageTemplate';
import { NextSeo } from 'next-seo';
import OverviewPageTemplate from '../../components/templates/OverviewPageTemplate';
import PostPageTemplate from '../../components/templates/PostPageTemplate';
import { RECIPE_SINGLE_PREVIEW } from '../../lib/fragments/recipes';
import RecipePageTemplate from '../../components/templates/RecipePageTemplate';
import wpFetch from '../../lib/wpFetch';

const queryMap = {
  druva: { query: GRAPE_SINGLE_PREVIEW, label: 'grape' },
  post: { query: ARTICLE_SINGLE_PREVIEW, label: 'post' },
  recipe: { query: RECIPE_SINGLE_PREVIEW, label: 'recipe' },
  dryck: { query: DRINK_SINGLE_PREVIEW, label: 'drink' },
  dryckestips: { query: DRINKTIP_SINGLE_PREVIEW, label: 'drinktip' },
  page: { query: PAGE_SINGLE_PREVIEW, label: 'page' },
  Översiktssida: { query: PAGE_OVERVIEW_PREVIEW, label: 'page' },
  Utforskarsida: { query: PAGE_EXPLORER_PREVIEW, label: 'page' },
};
const PreviewPage = ({ data, postType, template }) => {
  if (template) {
    switch (template) {
      case 'Default':
        return <PostPageTemplate data={data} />;
        break;
      case 'Översiktssida':
        return <OverviewPageTemplate data={data} />;
        break;
      case 'Utforskarsida':
        return <ExplorerPageTemplate data={data} />;
        break;
    }
  } else {
    switch (postType) {
      case 'grape':
        return <GrapePageTemplate data={data} />;
        break;
      case 'post':
        return <PostPageTemplate data={data} />;
        break;
      case 'drink':
        return <DrinkPageTemplate data={data} />;
        break;
      case 'drinktip':
        return <DrinktipPageTemplate data={data} />;
        break;
      case 'recipe':
        return <RecipePageTemplate data={data} />;
    }
  }
};

export default PreviewPage;

export const getStaticProps = async (context) => {
  console.log('PREVIEW PAGE CONTEXT =>', context);
  if (!context.preview) {
    return {
      notFound: true,
    };
  } else {
    try {
      //Fetch preview data
      const type =
        context.previewData.template !== 'Default'
          ? context.previewData.template
          : context.previewData.type;
      const pid = context.previewData.pid;
      console.log('TYPE=>', type);
      const response = await wpFetch(queryMap[type].query, { id: pid });

      console.log('PREVIEW RESPONSE =>', response);
      const data = response[queryMap[type].label];
      const dataTemplate = data.preview
        ? data.preview.node.template?.templateName
        : data.template?.templateName;
      console.log('PREVIEW DATA =>', data);
      console.log('DATA TEMPLATE', dataTemplate);
      return {
        props: {
          data: {
            page: data.preview ? data.preview.node : data,
          },
          postType: queryMap[type].label,
          template: dataTemplate || null,
        },
      };
    } catch (error) {
      console.log('ERROR WHILE FETCHING PREVIEW DATA =>', error);
      return {
        notFound: true,
      };
    }
  }
};
