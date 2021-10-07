import Blocks from '../../../components/common/content/Blocks';
import Content from '../../../components/common/content/content';
import Meta from '../../../components/common/content/meta';
import { PAGE_SINGLE } from '../../../lib/fragments/pages';
import PageIntro from '../../../components/common/content/PageIntro';
import { getAds } from '../../../lib/api/ads';
import wpFetch from '../../../lib/wpFetch';

const FoodAndWinePage = ({ ads, page }) => {
  console.log(page);
  return (
    <>
      <PageIntro ads={ads} title='Grundstenarna' />
      <Meta author={page.author.node.name} datePublished={page.date} />
      {page.content && <Content content={page.content} />}
      {page.acf_posts.sektioner && <Blocks blocks={page.acf_posts.sektioner} />}
    </>
  );
};

export default FoodAndWinePage;

export const getStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps = async (context) => {
  const id = `vinguide/mat-och-vin/${context.params.slug}`;
  let data;
  if (context.preview) {
    //Nä
  } else {
    data = await wpFetch(PAGE_SINGLE, { id: id });
  }
  const ads = await getAds();
  return {
    props: {
      ads,
      page: data.page,
    },
  };
};
