import GuideLayout from '../layout/GuideLayout';
import List from '../common/lists/List';
import PageIntro from '../common/content/PageIntro';

const ExplorerPageTemplate = ({ data }) => {
  const { page, ads, array, filterKeys, subtitle } = data;
  return (
    <>
      <GuideLayout>
        <PageIntro
          title={page.title}
          text={page.acf_explorer.slogan}
          ads={ads}
        />
        <List
          array={array}
          ads={ads}
          subtitle={subtitle}
          filterKeys={filterKeys}
        />
      </GuideLayout>
    </>
  );
};

export default ExplorerPageTemplate;
