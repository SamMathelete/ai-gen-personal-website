import Head from 'next/head';
import Layout from '../../components/Layout';
import { getAllPostSlugs, getPostData } from '../../lib/posts';

/**
 * The blog post page renders a single Markdown file as HTML. We
 * convert Markdown to HTML at build time using a custom parser defined
 * in lib/posts.js. The resulting HTML is inserted using
 * dangerouslySetInnerHTML.
 */
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title} | Sambit Mishra</title>
      </Head>
      <article>
        <h1 className="text-3xl font-bold mb-2">{postData.title}</h1>
        {postData.date && (
          <p className="text-sm text-gray-500 mb-6">
            {new Date(postData.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.html }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = getAllPostSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.slug);
  return {
    props: {
      postData,
    },
  };
}