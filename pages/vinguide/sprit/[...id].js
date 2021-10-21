import { PAGE_SINGLE, PAGE_SINGLE_PREVIEW } from '../../../lib/fragments/pages';

import Blocks from '../../../components/common/content/Blocks';
import Content from '../../../components/common/content/content';
import Meta from '../../../components/common/content/meta';
import PageIntro from '../../../components/common/content/PageIntro';
import { getAds } from '../../../lib/api/ads';
import wpFetch from '../../../lib/wpFetch';

const SpritPage = ({ page, ads }) => {
  return (
    <>
      <PageIntro title={page.title} ads={ads} />
      <Meta author={page.author.node.name} datePublished={page.date} />
      {page.content && <Content content={page.content} />}
      {page.acf_posts.sektioner && <Blocks blocks={page.acf_posts.sektioner} />}
    </>
  );
};
export default SpritPage;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  const id = 'vinguide/sprit/' + context.params.id.join('/');
  console.log(id);
  if (context.preview) {
    const resolved = await Promise.all([
      wpFetch(PAGE_SINGLE_PREVIEW, { id: id }),
      getAds(),
    ]);

    return {
      props: {
        page: resolved[0].page.preview.node,
        ads: resolved[1],
      },
    };
  } else {
    const resolved = await Promise.all([
      wpFetch(PAGE_SINGLE, { id: id }),
      getAds(),
    ]);

    return {
      props: {
        page: resolved[0].page,
        ads: resolved[1],
      },
    };
  }
};
