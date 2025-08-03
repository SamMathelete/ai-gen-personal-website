import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';

/**
 * The Blog listing page displays all posts in descending order of
 * publication date. Each entry links to its own page which renders
 * Markdown content. Only a handful of fields are displayed here to
 * encourage click‑through.
 */
export default function Blog({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Blog | Sambit Mishra</title>
      </Head>
      <section>
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        {posts.length === 0 ? (
          <p className="text-gray-700">No posts have been published yet.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map(({ slug, title, date }) => (
              <li key={slug} className="border-b pb-4">
                <Link href={`/blog/${slug}`} legacyBehavior>
                  <a className="text-xl text-blue-600 hover:underline font-medium">{title}</a>
                </Link>
                {date && (
                  <p className="text-sm text-gray-500 mt-1">{new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getSortedPostsData();
  return {
    props: { posts },
  };
}