import GuideLayout from '../layout/GuideLayout';
import List from '../common/lists/List';
import { NextSeo } from 'next-seo';
import PageIntro from '../common/content/PageIntro';
import { useRouter } from 'next/dist/client/router';

const ExplorerPageTemplate = ({ data }) => {
  const { page, ads, array, filterKeys, subtitle } = data;
  const router = useRouter();

  return (
    <>
      <NextSeo title={page.seo.title} description={page.seo.metaDesc} />
      {router.asPath.includes('druvguiden') ? (
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
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default ExplorerPageTemplate;
