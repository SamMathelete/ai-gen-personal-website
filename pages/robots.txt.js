import { absoluteUrl, siteUrl } from '../lib/site';

/**
 * Served dynamically so the sitemap line always points at the deployment's own
 * origin (NEXT_PUBLIC_SITE_URL), rather than a hard-coded domain that would be
 * wrong on every preview build.
 */
function buildRobots() {
  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Endpoints and the authenticated editor have nothing to index.
Disallow: /api/
Disallow: /blog/new

Host: ${siteUrl.replace(/^https?:\/\//, '')}
Sitemap: ${absoluteUrl('/sitemap.xml')}
`;
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.write(buildRobots());
  res.end();
  return { props: {} };
}

// Never rendered: getServerSideProps writes the response directly.
export default function Robots() {
  return null;
}
