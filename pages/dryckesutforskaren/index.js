import { DRINKS } from '../../lib/fragments/drinks';
import DrinkList from '../../components/drinks/DrinkList';
import { PAGE_EXPLORER } from '../../lib/fragments/pages';
import PageIntro from '../../components/common/content/PageIntro';
import SEO from '../../components/common/SEO';
import flattenObject from '../../utils/flattenObject';
import wpFetch from '../../lib/wpFetch';

const DryckesUtforskarenPage = ({ drycker, page }) => {
  return (
    <>
      <SEO title={page['seo.title']} description={page['seo.metaDesc']} />
      <PageIntro
        ad
        title={page.title}
        text={page['acf_explorer.slogan']}
        crumbs={[
          { text: 'Guider', href: '/guide' },
          { current: true, text: page.title, href: page.uri },
        ]}
      />

      <DrinkList drycker={drycker} />
    </>
  );
};

export default DryckesUtforskarenPage;

export const getStaticProps = async () => {
  const resolved = await Promise.all([
    wpFetch(DRINKS, { batch: 200, type: 'drinks' }),
    wpFetch(PAGE_EXPLORER, { id: 'dryckesutforskaren' }),
  ]);

  return {
    props: {
      drycker: resolved[0],
      page: flattenObject(resolved[1].page),
    },
  };
};
