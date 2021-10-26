import GuideLayout from '../layout/GuideLayout';
import List from '../common/lists/List';
import PageIntro from '../common/content/PageIntro';

const OverviewPageTemplate = ({ data }) => {
  const { page, ads } = data;
  return (
    <>
      <GuideLayout>
        <PageIntro
          title={page.title}
          ads={ads}
          text={page.acf_overviewPage.ingress}
        />
        <List array={page.acf_overviewPage.sidor} ads={ads} />
      </GuideLayout>
    </>
  );
};

export default OverviewPageTemplate;
