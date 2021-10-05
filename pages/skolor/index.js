import GuideLayout from '../../components/layout/GuideLayout';
import List from '../../components/common/lists/List';
import { PAGE_OVERVIEW } from '../../lib/fragments/pages';
import PageIntro from '../../components/common/PageIntro';
import ReactHtmlParser from 'react-html-parser';
import { getAds } from '../../lib/api/ads';
import wpFetch from '../../lib/wpFetch';
const SchoolPage = ({ page, ads }) => {
  return (
    <>
      <GuideLayout>
        <PageIntro
          ads={ads}
          title={page.title}
          text={page.acf_overviewPage.ingress}
        />
        <List array={page.acf_overviewPage.sidor} />
      </GuideLayout>
    </>
  );
};

export default SchoolPage;

export const getStaticProps = async () => {
  const data = await wpFetch(PAGE_OVERVIEW, { id: 'skolor' });
  const ads = await getAds();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      page: data.page,
      ads: ads,
    },
  };
};
