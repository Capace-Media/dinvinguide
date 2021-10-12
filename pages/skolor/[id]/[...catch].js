import Blocks from '../../../components/common/content/Blocks';
import Content from '../../../components/common/content/content';
import GuideLayout from '../../../components/layout/GuideLayout';
import { PAGE_SINGLE } from '../../../lib/fragments/pages';
import PageIntro from '../../../components/common/content/PageIntro';
import { getAds } from '../../../lib/api/ads';
import wpFetch from '../../../lib/wpFetch';

const SchoolCatchAll = ({ page, ads }) => {
  console.log(page);
  return (
    <>
      <GuideLayout>
        {page && (
          <PageIntro
            title={page.title}
            text={page.acf_posts.ingress}
            ads={ads}
          />
        )}
        {page && page.content && <Content content={page.content} />}
        {page && page.acf_posts && page.acf_posts.sektioner && (
          <Blocks ads={ads} blocks={page.acf_posts.sektioner} />
        )}
      </GuideLayout>
    </>
  );
};

export default SchoolCatchAll;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
export const getStaticProps = async (context) => {
  const id = `skolor/${context.params.id}/${context.params.catch.join('/')}`;
  console.log(id);
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
};
