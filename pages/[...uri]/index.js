import {
  getAuthorData,
  getAuthorPaths,
  getPostsByAuthor,
} from '../../lib/api/authors';

import AuthorPageTemplate from '../../components/templates/AuthorPageTemplate';
import DrinkPageTemplate from '../../components/templates/DrinkPageTemplate';
import DrinktipPageTemplate from '../../components/templates/DrinktipPageTemplate';
import ExplorerPageTemplate from '../../components/templates/ExplorerPageTemplate';
import GrapePageTemplate from '../../components/templates/GrapePageTemplate';
import OverviewPageTemplate from '../../components/templates/OverviewPageTemplate';
import PageTemplate from '../../components/templates/PageTemplate';
import PostPageTemplate from '../../components/templates/PostPageTemplate';
import RecipePageTemplate from '../../components/templates/RecipePageTemplate';
import dynamic from 'next/dynamic';
import fetchPaths from '../../lib/fragments/paths';
import fetchTemplate from '../../lib/util/fetchTemplate';
import resolveTemplate from '../../lib/resolveTemplate';
import { useRouter } from 'next/dist/client/router';

const FallbackTemplate = dynamic(() =>
  import('../../components/templates/FallbackTemplate')
);

const PagePostHandler = ({ routeType, data }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <FallbackTemplate />;
  }
  switch (routeType) {
    case 'author':
      return (
        <article>
          <AuthorPageTemplate data={data} />
        </article>
      );
      break;
    case 'Default':
      return (
        <article>
          <PageTemplate data={data} />
        </article>
      );
      break;
    case 'page':
      return (
        <article>
          <PageTemplate data={data} />
        </article>
      );
      break;
    case 'Översiktssida':
      return (
        <article>
          <OverviewPageTemplate data={data} />
        </article>
      );
      break;
    case 'Utforskarsida':
      return (
        <article>
          <ExplorerPageTemplate data={data} />
        </article>
      );
    case 'post':
      return (
        <article>
          <PostPageTemplate data={data} />
        </article>
      );
      break;
    case 'grape':
      return (
        <article>
          <GrapePageTemplate data={data} />
        </article>
      );
      break;
    case 'drink':
      return (
        <article>
          <DrinkPageTemplate data={data} />
        </article>
      );
      break;
    case 'drinktip':
      return (
        <article>
          <DrinktipPageTemplate data={data} />
        </article>
      );
      break;
    case 'recipe':
      return (
        <article>
          <RecipePageTemplate data={data} />
        </article>
      );
      break;
  }
};

export default PagePostHandler;

export const getStaticPaths = async () => {
  const staticPaths = [
    { params: { uri: ['recept'] } },
    { params: { uri: ['skolor'] } },
    { params: { uri: ['druvguiden'] } },
    { params: { uri: ['vinguide', 'vinatlas'] } },
    { params: { uri: ['fredrikschelin'] } },
    { params: { uri: ['anders'] } },
    { params: { uri: ['sofiaander'] } },
    { params: { uri: ['magnus'] } },
  ];
  const dynamicPaths = await Promise.all([
    fetchPaths('drinks'),
    fetchPaths('drinktips'),
    fetchPaths('recipes'),
    fetchPaths('grapes'),
    fetchPaths('posts'),
  ]);
  const paths = [
    ...staticPaths,
    ...dynamicPaths[0],
    ...dynamicPaths[1],
    ...dynamicPaths[2],
    ...dynamicPaths[3],
    ...dynamicPaths[4],
  ];
  return {
    paths,
    fallback: 'blocking',
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
    ]);
    data = { author: resolved[0], posts: resolved[1] };
  } else {
    //If not an author page, check the pagetemplate in order to do the correct query
    const content = await fetchTemplate(uri);

    if (!content) {
      return {
        notFound: true,
      };
    }

    const template = content.template;
    const contentType = content.contentType;

    type = contentType;

    //Fetch correct data for the template, real or preview

    //HANDLE DEFAULT TEMPLATE
    if (template === 'Default' || template === 'Recipe') {
      data = await resolveTemplate(template, type, uri, isPreview);

      if (!data.page) {
        return {
          notFound: true,
        };
      }
    }
    //HANDLE OVERVIEW PAGE
    if (template === 'Översiktssida') {
      data = await resolveTemplate(template, type, uri, isPreview);
      type = 'Översiktssida';
      if (!data.page) {
        return {
          notFound: true,
        };
      }
    }

    //HANDLE EXPLORER PAGE
    if (template === 'Utforskarsida') {
      data = await resolveTemplate(template, type, uri, isPreview);
      type = 'Utforskarsida';
      if (!data.page) {
        return {
          notFound: true,
        };
      }
    }
  }
  console.log('DATA =>', data);
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
