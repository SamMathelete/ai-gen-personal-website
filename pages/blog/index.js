import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { getSortedPostsData } from '../../lib/posts';

/**
 * The Blog listing page displays all posts in descending order of
 * publication date. Each entry links to its own page which renders
 * Markdown content. Only a handful of fields are displayed here to
 * encourage click‑through.
 */
export default function Blog({ posts }) {
  const { data: session } = useSession();
  const isAuthorized = session?.user?.email === process.env.NEXT_PUBLIC_AUTHORIZED_EMAIL;

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
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8">
          {isAuthorized ? (
            <>
              <Link href="/blog/new" legacyBehavior>
                <a className="text-blue-600 hover:underline font-medium">Create New Post</a>
              </Link>
              <button onClick={() => signOut()} className="ml-4 text-sm text-gray-600">
                Sign out
              </button>
            </>
          ) : (
            <button onClick={() => signIn('google')} className="text-blue-600 hover:underline">
              Sign in to create posts
            </button>
          )}
        </div>
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