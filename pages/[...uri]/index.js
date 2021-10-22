import {
  PAGE_EXPLORER,
  PAGE_EXPLORER_PREVIEW,
  PAGE_OVERVIEW,
  PAGE_OVERVIEW_PREVIEW,
  PAGE_SINGLE,
  PAGE_SINGLE_PREVIEW,
} from '../../lib/fragments/pages';
import {
  getAuthorData,
  getAuthorPaths,
  getPostsByAuthor,
} from '../../lib/api/authors';

import AuthorPageTemplate from '../../components/templates/AuthorPageTemplate';
import ExplorerPageTemplate from '../../components/templates/ExplorerPageTemplate';
import { GRAPES } from '../../lib/fragments/grapes';
import OverviewPageTemplate from '../../components/templates/OverviewPageTemplate';
import PageTemplate from '../../components/templates/PageTemplate';
import { RECIPES } from '../../lib/fragments/recipes';
import fetchTemplate from '../../lib/util/fetchTemplate';
import { getAds } from '../../lib/api/ads';
import wpFetch from '../../lib/wpFetch';

const PagePostHandler = ({ routeType, data }) => {
  switch (routeType) {
    case 'author':
      return <AuthorPageTemplate data={data} />;
      break;
    case 'Default':
      return <PageTemplate data={data} />;
      break;
    case 'Översiktssida':
      return <OverviewPageTemplate data={data} />;
      break;
    case 'Utforskarsida':
      return <ExplorerPageTemplate data={data} />;
  }
};

export default PagePostHandler;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  console.log('CONTEXT =>', context);
  const isPreview = context.preview ? true : false;
  let type = 'Default';
  let data = null;

  //Get author paths to see if page is an author page
  const authorPaths = await getAuthorPaths();
  const authorSlugs = authorPaths.map((author) => author.params.author);
  if (authorSlugs.includes(context.params.slug)) {
    type = 'author';
    const resolved = await Promise.all([
      getAuthorData(context.params.slug),
      getPostsByAuthor(context.params.slug),
      getAds(),
    ]);
    data = { author: resolved[0], posts: resolved[1], ads: resolved[2] };
  } else {
    //If not an author page, check the pagetemplate in order to do the correct query
    const template = await fetchTemplate(context.params.slug);
    type = template;
    console.log(template);

    //Fetch correct data for the template, real or preview

    //HANDLE DEFAULT PAGE
    if (template === 'Default') {
      //HANDLE DEFAULT PAGE PREVIEW
      if (isPreview) {
        const resolved = await Promise.all([
          wpFetch(PAGE_SINGLE_PREVIEW, { id: context.params.slug }),
          getAds(),
        ]);

        data = { page: resolved[0].page.preview.node, ads: resolved[1] };
      } else {
        //HANDLE DEFAULT PAGE [NOT PREVIEW]
        const resolved = await Promise.all([
          wpFetch(PAGE_SINGLE, { id: context.params.slug }),
          getAds(),
        ]);
        data = { page: resolved[0].page, ads: resolved[1] };
      }
    }
    //HANDLE OVERVIEW PAGE
    if (template === 'Översiktssida') {
      //HANDLE OVERVIEW PREVIEW
      if (isPreview) {
        const resolved = await Promise.all([
          wpFetch(PAGE_OVERVIEW_PREVIEW, { id: context.params.slug }),
          getAds(),
        ]);
        data = { page: resolved[0].page.preview.node, ads: resolved[1] };
      } else {
        //HANDLE OVERVIEW [NOT PREVIEW]
        const resolved = await Promise.all([
          wpFetch(PAGE_OVERVIEW, { id: context.params.slug }),
          getAds(),
        ]);
        data = { page: resolved[0].page, ads: resolved[1] };
      }
    }

    //HANDLE EXPLORER PAGE
    if (template === 'Utforskarsida') {
      let array, subtitle;
      let filterKeys = ['title'];
      let res;
      //HANDLE EXPLORER PREVIEW
      if (isPreview) {
        const resolved = await Promise.all([
          wpFetch(PAGE_EXPLORER_PREVIEW, { id: context.params.slug }),
          getAds(),
        ]);
        const explorerType = resolved[0].page.preview.node.acf_explorer.plural;
        console.log(explorerType);
        let queryData;
        switch (explorerType) {
          case 'druvor':
            res = await Promise.all([
              wpFetch(GRAPES, { batch: 200, type: 'grapes' }),
            ]);
            array = res[0].map(({ node: item }) => item);
            filterKeys = ['title', 'acf_grape.druvtyp.name'];
            subtitle = 'acf_grape.druvtyp.name';
            break;
          case 'recept':
            res = await Promise.all([
              wpFetch(RECIPES, { batch: 200, type: 'recipes' }),
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
        //HANDLE EXPLORER [NOT PREVIEW]
        const resolved = await Promise.all([
          wpFetch(PAGE_EXPLORER, { id: context.params.slug }),
          getAds(),
        ]);
        const explorerType = resolved[0].page.acf_explorer.plural;
        console.log(explorerType);
        let queryData;
        switch (explorerType) {
          case 'druvor':
            res = await Promise.all([
              wpFetch(GRAPES, { batch: 200, type: 'grapes' }),
            ]);
            array = res[0].map(({ node: item }) => item);
            filterKeys = ['title', 'acf_grape.druvtyp.name'];
            subtitle = 'acf_grape.druvtyp.name';
            break;
          case 'recept':
            res = await Promise.all([
              wpFetch(RECIPES, { batch: 200, type: 'recipes' }),
            ]);
            array = res[0].map(({ node: item }) => item);
            filterKeys = ['title'];
            subtitle = '';
            break;
        }

        data = {
          page: resolved[0].page,
          ads: resolved[1],
          array: array,
          filterKeys,
          subtitle,
        };
      }
    }
  }
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      routeType: type,
      data,
    },
  };
};
