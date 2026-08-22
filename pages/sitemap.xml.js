import { absoluteUrl } from '../lib/site';
import { isTeachingEnabled, isWritingEnabled } from '../lib/features';
import { getSortedPostsData } from '../lib/posts';

/**
 * Generated at request time so the sitemap always matches the feature flags and
 * the posts actually on disk — a stale sitemap pointing at 404s is worse than
 * none at all.
 */
function buildUrls() {
  const urls = [
    { path: '/', changefreq: 'monthly', priority: '1.0' },
    { path: '/research', changefreq: 'monthly', priority: '0.9' },
    { path: '/cv', changefreq: 'monthly', priority: '0.8' },
    { path: '/stats', changefreq: 'daily', priority: '0.3' },
  ];

  if (isTeachingEnabled) {
    urls.push({ path: '/teaching', changefreq: 'yearly', priority: '0.5' });
  }

  if (isWritingEnabled) {
    urls.push({ path: '/blog', changefreq: 'weekly', priority: '0.7' });
    getSortedPostsData().forEach((post) => {
      urls.push({
        path: `/blog/${post.slug}`,
        changefreq: 'yearly',
        priority: '0.6',
        lastmod: post.date || undefined,
      });
    });
  }

  return urls;
}

function toXml(urls, lastmod) {
  const entries = urls
    .map(
      (url) => `  <url>
    <loc>${absoluteUrl(url.path)}</loc>
    <lastmod>${url.lastmod || lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

export async function getServerSideProps({ res }) {
  const xml = toXml(buildUrls(), new Date().toISOString().slice(0, 10));
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(xml);
  res.end();
  return { props: {} };
}

// Never rendered: getServerSideProps writes the response directly.
export default function Sitemap() {
  return null;
}
