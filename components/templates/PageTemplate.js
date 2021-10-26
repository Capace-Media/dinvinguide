import Blocks from '../common/content/Blocks';
import BreadCrumbs from '../common/BreadCrumbs/Breadcrumbs';
import Content from '../common/content/content';
import { NextSeo } from 'next-seo';
import OldContent from '../common/content/OldContent';
import PageIntro from '../common/content/PageIntro';

const PageTemplate = ({ data }) => {
  const { page, ads } = data;
  console.log(page);

  return (
    <>
      <NextSeo title={page.seo.title} description={page.seo.metaDesc} />
      <PageIntro
        image={page.featuredImage.node.mediaItemUrl}
        title={page.title}
        ads={ads}
        text={page.acf_posts.ingress}
      />

      {page.acf_posts.sektioner && (
        <Blocks blocks={page.acf_posts.sektioner} ads={ads} />
      )}
      {page.content && <Content content={page.content} />}
      {page.acf_oldcontent && page.acf_oldcontent.oldContentAcf && (
        <OldContent content={page.acf_oldcontent.oldContentAcf} />
      )}
    </>
  );
};

export default PageTemplate;
