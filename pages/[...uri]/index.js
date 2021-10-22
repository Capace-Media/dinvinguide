import {
  ARTICLE_SINGLE,
  ARTICLE_SINGLE_PREVIEW,
} from '../../lib/fragments/articles';
import {
  GRAPES,
  GRAPE_SINGLE,
  GRAPE_SINGLE_PREVIEW,
} from '../../lib/fragments/grapes';
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
import GrapePageTemplate from '../../components/templates/GrapePageTemplate';
import OverviewPageTemplate from '../../components/templates/OverviewPageTemplate';
import PageTemplate from '../../components/templates/PageTemplate';
import PostPageTemplate from '../../components/templates/PostPageTemplate';
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
    case 'page':
      return <PageTemplate data={data} />;
      break;
    case 'Översiktssida':
      return <OverviewPageTemplate data={data} />;
      break;
    case 'Utforskarsida':
      return <ExplorerPageTemplate data={data} />;
    case 'post':
      return <PostPageTemplate data={data} />;
      break;
    case 'grape':
      return <GrapePageTemplate data={data} />;
      break;
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
  };
  const uri = context.params.uri.join('/');

  const isPreview = context.preview ? true : false;
  let type = '';
  let data = null;

  //FIGURE OUT THE PAGE TYPE

  //Get author paths to see if page is an author page
  const authorPaths = await getAuthorPaths();
  const authorSlugs = authorPaths.map((author) => author.params.author);

  if (authorSlugs.includes(uri)) {
    type = 'author';
    const resolved = await Promise.all([
      getAuthorData(uri),
      getPostsByAuthor(uri),
      getAds(),
    ]);
    data = { author: resolved[0], posts: resolved[1], ads: resolved[2] };
  } else {
    //If not an author page, check the pagetemplate in order to do the correct query
    const content = await fetchTemplate(uri);
    const { template, contentType } = content;
    type = contentType;
    console.log(uri, content);
    //Fetch correct data for the template, real or preview

    //HANDLE DEFAULT TEMPLATE
    if (template === 'Default') {
      //HANDLE DEFAULT PREVIEW
      if (isPreview) {
        const resolved = await Promise.all([
          wpFetch(queries[type][template].preview, { id: uri }),
          getAds(),
        ]);

        data = { page: resolved[0][type].preview.node, ads: resolved[1] };
      } else {
        //HANDLE DEFAULT LIVE

        const resolved = await Promise.all([
          wpFetch(queries[type][template].live, { id: uri }),
          getAds(),
        ]);

        data = { page: resolved[0][type], ads: resolved[1] };
      }
    }
    //HANDLE OVERVIEW PAGE
    if (template === 'Översiktssida') {
      //HANDLE OVERVIEW PREVIEW
      if (isPreview) {
        const resolved = await Promise.all([
          wpFetch(queries[type][template].preview, { id: context.params.slug }),
          getAds(),
        ]);
        data = { page: resolved[0].page.preview.node, ads: resolved[1] };
      } else {
        //HANDLE OVERVIEW [NOT PREVIEW]
        const resolved = await Promise.all([
          wpFetch(queries[type][template].live, { id: uri }),
          getAds(),
        ]);
        data = { page: resolved[0].page, ads: resolved[1] };
        type = template;
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
          wpFetch(PAGE_EXPLORER_PREVIEW, { id: uri }),
          getAds(),
        ]);
        const explorerType =
          resolved[0]['page'].preview.node.acf_explorer.plural;

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
          wpFetch(queries['page'][template].live, { id: uri }),
          getAds(),
        ]);
        console.log(resolved);
        const explorerType = resolved[0]['page'].acf_explorer.plural;

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
          page: resolved[0][type],
          ads: resolved[1],
          array,
          filterKeys,
          subtitle,
        };
        type = template;
      }
    }
  }

  if (!data) {
    return {
      notFound: true,
    };
  }
  console.log(data);
  return {
    props: {
      routeType: type,
      data,
    },
  };
};
