import Link from 'next/link';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { absoluteUrl, breadcrumbJsonLd, site, siteUrl } from '../../lib/site';
import { getAllPostSlugs, getPostData } from '../../lib/posts';
import { isWritingEnabled } from '../../lib/features';

export default function Post({ postData }) {
  return (
    <Layout>
      <Seo
        title={postData.title}
        description={postData.excerpt || site.defaultDescription}
        type="article"
        openGraph={{
          'article:author': site.name,
          ...(postData.date ? { 'article:published_time': postData.date } : {}),
        }}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Writing', path: '/blog' },
            { name: postData.title, path: `/blog/${postData.slug}` },
          ]),
          {
            '@type': 'BlogPosting',
            headline: postData.title,
            description: postData.excerpt || undefined,
            url: absoluteUrl(`/blog/${postData.slug}`),
            mainEntityOfPage: absoluteUrl(`/blog/${postData.slug}`),
            author: { '@id': `${siteUrl}/#person` },
            publisher: { '@id': `${siteUrl}/#person` },
            inLanguage: 'en-US',
            ...(postData.date ? { datePublished: postData.date } : {}),
          },
        ]}
      />
      <article className="container-prose pt-12 sm:pt-20 pb-20">
        <Link href="/blog" legacyBehavior>
          <a className="font-mono text-xs text-ash hover:text-accent no-underline inline-flex items-center gap-2 mb-8">
            ← all writing
          </a>
        </Link>
        <p className="eyebrow mb-4">Essay</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tightest text-ink leading-[1.0] mb-4">
          {postData.title}
        </h1>
        {postData.date && (
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ash mb-10">
            {new Date(postData.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
        <div className="rule-divider mb-10" />
        <div
          className="prose-classic max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.html }}
        />
      </article>
    </Layout>
  );
}

// While the writing flag is off, no post routes are generated and any request
// for one falls through to the 404 page.
export async function getStaticPaths() {
  if (!isWritingEnabled) {
    return { paths: [], fallback: false };
  }
  const slugs = getAllPostSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  if (!isWritingEnabled) {
    return { notFound: true };
  }
  const postData = getPostData(params.slug);
  return { props: { postData } };
}
