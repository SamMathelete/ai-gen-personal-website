import { Html, Head, Main, NextScript } from 'next/document';

// Applies the saved (or system-preferred) theme before first paint so there is
// no flash of the wrong palette on load.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
