import {
  getAuthorData,
  getAuthorPaths,
  getPostsByAuthor,
} from '../../lib/api/authors';

import dynamic from 'next/dynamic';
import fetchTemplate from '../../lib/util/fetchTemplate';
import { getAds } from '../../lib/api/ads';
import resolveTemplate from '../../lib/resolveTemplate';
import { useRouter } from 'next/dist/client/router';

const AuthorPageTemplate = dynamic(() =>
  import('../../components/templates/AuthorPageTemplate')
);
const DrinktipPageTemplate = dynamic(() =>
  import('../../components/templates/DrinktipPageTemplate')
);
const DrinkPageTemplate = dynamic(() =>
  import('../../components/templates/DrinkPageTemplate')
);
const ExplorerPageTemplate = dynamic(() =>
  import('../../components/templates/ExplorerPageTemplate')
);
const FallbackTemplate = dynamic(() =>
  import('../../components/templates/FallbackTemplate')
);
const GrapePageTemplate = dynamic(() =>
  import('../../components/templates/GrapePageTemplate')
);
const OverviewPageTemplate = dynamic(() =>
  import('../../components/templates/OverviewPageTemplate')
);

const PageTemplate = dynamic(() =>
  import('../../components/templates/PageTemplate')
);
const PostPageTemplate = dynamic(() =>
  import('../../components/templates/PostPageTemplate')
);
const RecipePageTemplate = dynamic(() =>
  import('../../components/templates/RecipePageTemplate')
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
  console.log(data);
  return {
    props: {
      routeType: type,
      data,
    },
    revalidate: 60,
  };
};
