import '../styles/globals.css';

import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import Layout from '../components/layout/layout';
import Script from 'next/script';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  console.log(router);
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-20134807-2', 'auto');
          ga('send', 'pageview');
        `}
      </Script>
      <DefaultSeo
        defaultTitle='DinVinguide - Din guide om vin'
        openGraph={{
          type: 'website',
          locale: 'sv_SE',
          url:
            router.asPath !== '/'
              ? 'https://dinvinguide.se' + router.asPath
              : 'https://dinvinguide.se',
          site_name: 'DinVinguide',
        }}
      />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
