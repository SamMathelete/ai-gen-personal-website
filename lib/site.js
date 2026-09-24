/**
 * Single source of truth for site-wide metadata.
 *
 * Everything search engines, social cards, the sitemap and the structured-data
 * blocks need lives here, so a change of domain or job title is a one-file edit.
 *
 * The canonical origin can be overridden per deployment with NEXT_PUBLIC_SITE_URL
 * (e.g. a preview deployment); it must be an absolute origin with no trailing
 * slash, since every canonical/OG URL is built from it.
 */

const DEFAULT_SITE_URL = 'https://www.sambitmishra.in';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');

export const site = {
  url: siteUrl,
  name: 'Sambit Mishra',
  shortName: 'S. Mishra',
  jobTitle: 'PhD Student, Electrical & Computer Engineering',
  affiliation: 'University of Southern California',
  affiliationUrl: 'https://viterbi.usc.edu/',
  department: 'Ming Hsieh Department of Electrical and Computer Engineering',
  locality: 'Los Angeles',
  region: 'CA',
  country: 'US',
  email: 'sambitmi@usc.edu',
  locale: 'en_US',
  // Home page <title>. Kept under ~60 characters so it is not truncated in
  // search results; the longer positioning lives in the description.
  defaultTitle: 'Sambit Mishra — Causal Inference & Causal Discovery',
  defaultDescription:
    'Sambit Mishra is a PhD student in Electrical & Computer Engineering at USC, advised by Prof. Urbashi Mitra, working on causal discovery, identifiability theory, probabilistic graphical models, and scalable continuous optimization.',
  ogImage: '/og-image.png',
  ogImageAlt:
    'Sambit Mishra — PhD student in Electrical & Computer Engineering at the University of Southern California, working on causal inference and probabilistic graphical models.',
  themeColor: { light: '#f9faf4', dark: '#12150f' },
};

/** Profiles used both for `rel="me"` links and for schema.org `sameAs`. */
export const profiles = [
  { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=kyCSMKUAAAAJ' },
  { label: 'ORCID', url: 'https://orcid.org/0000-0002-7736-7164' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/thesambitmishra' },
];

/** Topic terms reused in `Person.knowsAbout` and page keywords. */
export const researchTopics = [
  'causal inference',
  'causal discovery',
  'probabilistic graphical models',
  'identifiability',
  'directed acyclic graphs',
  'structure learning',
  'continuous optimization',
  'mixed ordinal and exponential-family data',
  'epidemiological causal graphs',
  'wireless communications',
  'reconfigurable intelligent surfaces',
];

/** Turns a site-relative path into an absolute, canonical URL. */
export function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path;
  const clean = `/${String(path).replace(/^\/+/, '')}`.replace(/\/+$/, '');
  return clean === '' ? `${siteUrl}/` : `${siteUrl}${clean}`;
}

/** schema.org Person — the entity the whole site is about. */
export function personJsonLd() {
  return {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: site.name,
    givenName: 'Sambit',
    familyName: 'Mishra',
    url: `${siteUrl}/`,
    email: `mailto:${site.email}`,
    image: absoluteUrl(site.ogImage),
    jobTitle: site.jobTitle,
    description: site.defaultDescription,
    knowsAbout: researchTopics,
    sameAs: profiles.map((p) => p.url),
    worksFor: {
      '@type': 'CollegeOrUniversity',
      name: site.affiliation,
      url: site.affiliationUrl,
    },
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: site.affiliation,
      department: { '@type': 'Organization', name: site.department },
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Indian Institute of Technology Bhubaneswar',
        url: 'https://www.iitbbs.ac.in/',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
  };
}

/** schema.org WebSite — lets search engines name the site as a whole. */
export function websiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: site.name,
    description: site.defaultDescription,
    inLanguage: 'en-US',
    publisher: { '@id': `${siteUrl}/#person` },
  };
}

/**
 * schema.org BreadcrumbList for a sub-page. `trail` is an ordered list of
 * `{ name, path }`, excluding the implicit Home entry.
 */
export function breadcrumbJsonLd(trail = []) {
  const items = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
