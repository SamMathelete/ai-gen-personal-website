import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { site } from '../lib/site';
import ViewTracker from '../components/ViewTracker';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        {/* Only truly global tags belong here — per-page title, description,
            canonical URL and structured data come from <Seo>. */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content={site.themeColor.light} />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content={site.themeColor.dark} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <ViewTracker />
    </>
  );
}
