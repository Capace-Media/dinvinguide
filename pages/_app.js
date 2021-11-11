import '../styles/globals.css';

import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <DefaultSeo
        titleTemplate='%s DinVinguide'
        defaultTitle='DinVinguide - Din guide om vin'
        openGraph={{
          type: 'website',
          locale: 'sv_SE',
          url: 'https://dinvinguide.se',
          site_name: 'DinVinguide',
        }}
      />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
