import GuideLayout from '../../components/layout/GuideLayout';
import { OPTIONS_TV } from '../../lib/fragments/tv';
import PageIntro from '../../components/common/content/PageIntro';
import wpFetch from '../../lib/wpFetch';

const TVPage = ({ page }) => {
  console.log(page);
  return (
    <GuideLayout>
      <PageIntro title={page.vintvTitle} text={page.vintvIngress} />
    </GuideLayout>
  );
};

export default TVPage;

export const getStaticProps = async () => {
  const resolved = await Promise.all([wpFetch(OPTIONS_TV)]);

  return {
    props: {
      page: resolved[0].acfOptionsInstallningarTv.tvOptionsPage,
    },
  };
};
