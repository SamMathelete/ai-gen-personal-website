import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllPostSlugs, getPostData } from '../../lib/posts';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title} | Sambit Mishra</title>
      </Head>
      <article className="container-prose pt-12 sm:pt-20 pb-20">
        <Link href="/blog" legacyBehavior>
          <a className="font-mono text-xs text-ash hover:text-ember no-underline inline-flex items-center gap-2 mb-8">
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

export async function getStaticPaths() {
  const slugs = getAllPostSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.slug);
  return { props: { postData } };
}
