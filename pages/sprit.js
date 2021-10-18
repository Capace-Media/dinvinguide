import GuideLayout from '../components/layout/GuideLayout';
import List from '../components/common/lists/List';
import { PAGE_OVERVIEW } from '../lib/fragments/pages';
import PageIntro from '../components/common/content/PageIntro';
import { getAds } from '../lib/api/ads';
import wpFetch from '../lib/wpFetch';
const SpritPage = ({ page, ads }) => {
  console.log(page);

  return (
    <>
      <GuideLayout>
        <PageIntro
          title={page.title}
          text={page.acf_overviewPage.ingress}
          ads={ads}
        />
        <List array={page.acf_overviewPage.sidor} columns={3} search={false} />
      </GuideLayout>
    </>
  );
};
export default SpritPage;

export const getStaticProps = async () => {
  try {
    const resolved = await Promise.all([
      wpFetch(PAGE_OVERVIEW, { id: 'sprit' }),
      getAds(),
    ]);

    return {
      props: {
        page: resolved[0].page,
        ads: resolved[1],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
