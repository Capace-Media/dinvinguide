import {
  getAuthorData,
  getAuthorPaths,
  getPostsByAuthor,
} from '../../lib/api/authors';

import AuthorPageTemplate from '../../components/templates/AuthorPageTemplate';
import DrinkPageTemplate from '../../components/templates/DrinkPageTemplate';
import ExplorerPageTemplate from '../../components/templates/ExplorerPageTemplate';
import FallbackTemplate from '../../components/templates/FallbackTemplate';
import GrapePageTemplate from '../../components/templates/GrapePageTemplate';
import OverviewPageTemplate from '../../components/templates/OverviewPageTemplate';
import PageTemplate from '../../components/templates/PageTemplate';
import PostPageTemplate from '../../components/templates/PostPageTemplate';
import RecipePageTemplate from '../../components/templates/RecipePageTemplate';
import fetchTemplate from '../../lib/util/fetchTemplate';
import { getAds } from '../../lib/api/ads';
import resolveTemplate from '../../lib/resolveTemplate';
import { useRouter } from 'next/dist/client/router';

const PagePostHandler = ({ routeType, data }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <FallbackTemplate />;
  }
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
    case 'drink':
      return <DrinkPageTemplate data={data} />;
      break;
    case 'recipe':
      return <RecipePageTemplate data={data} />;
      break;
  }
};

export default PagePostHandler;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
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

    //Fetch correct data for the template, real or preview

    //HANDLE DEFAULT TEMPLATE
    if (template === 'Default' || template === 'Recipe') {
      data = await resolveTemplate(template, type, uri, isPreview);
    }
    //HANDLE OVERVIEW PAGE
    if (template === 'Översiktssida') {
      data = await resolveTemplate(template, type, uri, isPreview);
      type = 'Översiktssida';
    }

    //HANDLE EXPLORER PAGE
    if (template === 'Utforskarsida') {
      data = await resolveTemplate(template, type, uri, isPreview);
      type = 'Utforskarsida';
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
    revalidate: 60,
  };
};
