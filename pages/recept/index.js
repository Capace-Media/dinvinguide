import {
  PAGE_EXPLORER,
  PAGE_EXPLORER_PREVIEW,
} from '../../lib/fragments/pages';
import { RECIPES_ADD, RECIPES_INIT } from '../../lib/fragments/recipes';

import Ad from '../../components/ads/Ad';
import ArrayList from '../../components/common/lists/ArrayList';
import List from '../../components/common/lists/List';
import PageIntro from '../../components/common/content/PageIntro';
import { getAds } from '../../lib/api/ads';
import useInfinite from '../../hooks/useInfinite';
import wpFetch from '../../lib/wpFetch';

const RecipePage = ({ data }) => {
  const { page, ads, initialArray, pageInfo } = data;

  const { array, loadMore } = useInfinite(
    '/api/recept',
    initialArray,
    pageInfo.endCursor
  );
  console.log(array);
  return (
    <article>
      <PageIntro title={page.title} text={page.acf_explorer.slogan} />
      <Ad ads={ads} position='top' />
      <ArrayList array={array} loadMore={loadMore} ads={ads} />
      <p onClick={() => loadMore()}>more</p>
    </article>
  );
};
export default RecipePage;

export const getStaticProps = async (context) => {
  try {
    const response = await Promise.all([
      wpFetch(RECIPES_INIT),
      wpFetch(PAGE_EXPLORER, { id: 'recept' }),
      getAds(),
    ]);

    const array = response[0].recipes.edges.map(({ node: item }) => item);
    const page = response[1].page;
    const ads = response[2];

    return {
      props: {
        data: {
          initialArray: array,
          page,
          ads,
          pageInfo: response[0].recipes.pageInfo,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
