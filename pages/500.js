import ExplorerLinks from '../components/common/explorer/explorerLinks';
import PageIntro from '../components/common/content/PageIntro';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom500 = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined && window) {
      const w = window;
      const dl = (w.dataLayer = w.dataLayer || []);
      dl.push({
        event: 'page_error',
        path: router.asPath,
      });
    }
  }, [router.asPath]);
  return (
    <>
      <PageIntro
        title='Ett problem uppstod'
        text='Ett problem har uppstått när vi skulle hämta sidan.'
      />
      <ExplorerLinks />
    </>
  );
};
export default Custom500;
