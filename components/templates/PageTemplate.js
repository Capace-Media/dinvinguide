import Blocks from '../common/content/Blocks';
import PageIntro from '../common/content/PageIntro';

const PageTemplate = ({ data }) => {
  const { page, ads } = data;

  return (
    <>
      <PageIntro title={page.title} ads={ads} text={page.acf_posts.ingress} />
      <Blocks blocks={page.acf_posts.sektioner} ads={ads} />
    </>
  );
};

export default PageTemplate;
