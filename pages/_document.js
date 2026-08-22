import { Html, Head, Main, NextScript } from 'next/document';

// Applies the saved (or system-preferred) theme before first paint so there is
// no flash of the wrong palette on load.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="Sambit Mishra" />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
