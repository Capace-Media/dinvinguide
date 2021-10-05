import GuideLayout from '../../components/layout/GuideLayout';
import List from '../../components/common/lists/List';
import { PAGE_OVERVIEW } from '../../lib/fragments/pages';
import PageIntro from '../../components/common/PageIntro';
import flattenObject from '../../utils/flattenObject';
import { getAds } from '../../lib/api/ads';
import wpFetch from '../../lib/wpFetch';

const SingleSchoolPage = ({ page, ads }) => {
  return (
    <GuideLayout>
      <PageIntro
        ads={ads}
        title={page.title}
        text={page.acf_overviewPage.ingress}
      />
      <List array={page.acf_overviewPage.sidor} columns={3} ads={ads} />
    </GuideLayout>
  );
};

export default SingleSchoolPage;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  const id = 'skolor/' + context.params.id;
  const resolved = await Promise.all([
    wpFetch(PAGE_OVERVIEW, { id: id }),
    getAds(),
  ]);

  return {
    props: {
      page: resolved[0].page,
      ads: resolved[1],
    },
  };
};
