import {
  PAGE_EXPLORER,
  PAGE_EXPLORER_PREVIEW,
} from '../../lib/fragments/pages';
import { RECIPES, RECIPES_INIT } from '../../lib/fragments/recipes';

import ExplorerPageTemplate from '../../components/templates/ExplorerPageTemplate';
import fetchInitialData from '../../lib/fetchInitialData';
import { getAds } from '../../lib/api/ads';
import wpFetch from '../../lib/wpFetch';

const RecipePage = ({ data }) => {
  console.log(data);
  return (
    <article>
      <ExplorerPageTemplate data={data} />
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
    console.log(response);
    const array = response[0].recipes.edges.map(({ node: item }) => item);
    const page = response[1].page;
    const ads = response[2];

    return {
      props: {
        data: {
          array,
          page,
          ads,
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
