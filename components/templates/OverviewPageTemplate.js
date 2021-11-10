import GuideLayout from '../layout/GuideLayout';
import List from '../common/lists/List';
import { NextSeo } from 'next-seo';
import PageIntro from '../common/content/PageIntro';

const OverviewPageTemplate = ({ data }) => {
  const { page, ads } = data;
  return (
    <>
      <NextSeo title={page.seo.title} description={page.seo.metaDesc} />
      <GuideLayout>
        <PageIntro title={page.title} ad text={page.acf_overviewPage.ingress} />
        <List array={page.acf_overviewPage.sidor} ads />
      </GuideLayout>
    </>
  );
};

export default OverviewPageTemplate;
