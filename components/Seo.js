import Head from 'next/head';
import { useRouter } from 'next/router';
import { site, absoluteUrl, profiles, personJsonLd, websiteJsonLd } from '../lib/site';

/**
 * Per-page head tags: title, description, canonical URL, robots directives,
 * Open Graph / Twitter cards and JSON-LD structured data.
 *
 * Every page should render exactly one <Seo>. The canonical URL defaults to the
 * current route with query and hash stripped, so a page reached with tracking
 * parameters still points search engines at a single address.
 *
 * @param {string}   [title]        Page title; omitted on the home page, which uses the site default.
 * @param {string}   description    Unique 140–160 character summary of the page.
 * @param {string}   [path]         Canonical path override (defaults to the current route).
 * @param {boolean}  [noindex]      Keep the page out of search indexes.
 * @param {string}   [type]         Open Graph type ('website' | 'article' | 'profile').
 * @param {object}   [openGraph]    Extra OG properties (e.g. article:published_time).
 * @param {object[]} [jsonLd]       schema.org nodes to add to the page's @graph.
 * @param {string[]} [keywords]     Optional keyword hints.
 */
export default function Seo({
  title,
  description = site.defaultDescription,
  path,
  noindex = false,
  type = 'website',
  openGraph = {},
  jsonLd = [],
  keywords = [],
}) {
  const router = useRouter();
  const routePath = path ?? (router.asPath || '/').split(/[?#]/)[0];
  const canonical = absoluteUrl(routePath);
  const pageTitle = title ? `${title} | ${site.name}` : site.defaultTitle;
  const image = absoluteUrl(site.ogImage);

  // Person and WebSite describe the site itself, so they belong on every page;
  // page-specific nodes are appended to the same graph.
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [personJsonLd(), websiteJsonLd(), ...jsonLd],
  };

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <meta name="author" content={site.name} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={site.ogImageAlt} />
      {Object.entries(openGraph).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={site.ogImageAlt} />

      {/* Identity: the same profiles schema.org lists as `sameAs`. */}
      {profiles.map((profile) => (
        <link key={profile.url} rel="me" href={profile.url} />
      ))}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </Head>
  );
}
