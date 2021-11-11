import Blocks from '../common/content/Blocks';
import Content from '../common/content/content';
import OldContent from '../common/content/OldContent';
import PageIntro from '../common/content/PageIntro';
import SEO from '../common/SEO';

const PageTemplate = ({ data }) => {
  const { page } = data;
  console.log(page);

  return (
    <>
      <SEO title={page?.seo?.title} description={page?.seo?.metaDesc} />
      <PageIntro
        image={page.featuredImage.node.mediaItemUrl}
        title={page.title}
        ad
        text={page.acf_posts.ingress}
        alt={
          page.featuredImage.node.altText
            ? page.featuredImage.node.altText
            : page.title
        }
      />

      {page.acf_posts.sektioner && <Blocks blocks={page.acf_posts.sektioner} />}
      {page.content && <Content content={page.content} />}
      {page.acf_oldcontent && page.acf_oldcontent.oldContentAcf && (
        <OldContent content={page.acf_oldcontent.oldContentAcf} />
      )}
    </>
  );
};

export default PageTemplate;
