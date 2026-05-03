import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { getSortedPostsData } from '../../lib/posts';

export default function Blog({ posts }) {
  const { data: session } = useSession();
  const isAuthorized = session?.user?.email === process.env.NEXT_PUBLIC_AUTHORIZED_EMAIL;

  return (
    <Layout>
      <Head>
        <title>Writing | Sambit Mishra</title>
      </Head>

      <section className="container-wide pt-12 sm:pt-20 pb-12">
        <p className="eyebrow mb-4 flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-ember" /> Writing
        </p>
        <h1 className="font-display text-5xl sm:text-6xl tracking-tightest text-ink leading-[0.95] max-w-3xl">
          Notes from the desk.
        </h1>
        <p className="mt-6 text-lg text-graphite max-w-2xl leading-relaxed">
          Occasional essays on causal inference, optimization, the PhD experience, and whatever
          else I happen to be thinking through.
        </p>
      </section>

      <section className="container-wide py-12 border-t border-rule">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-display text-2xl text-ink tracking-tightest">No posts yet.</p>
            <p className="mt-2 text-ash">Check back soon, or follow along on{' '}
              <a className="link-underline" href="https://scholar.google.com/citations?user=kyCSMKUAAAAJ" target="_blank" rel="noopener noreferrer">Scholar</a>.
            </p>
          </div>
        ) : (
          <ol className="divide-y divide-rule border-y border-rule">
            {posts.map(({ slug, title, date }, i) => (
              <li key={slug}>
                <Link href={`/blog/${slug}`} legacyBehavior>
                  <a className="grid sm:grid-cols-12 gap-4 py-7 group no-underline">
                    <div className="sm:col-span-1 font-mono text-xs text-ash">[{String(i + 1).padStart(2, '0')}]</div>
                    <div className="sm:col-span-3 font-mono text-xs text-ash uppercase tracking-[0.18em]">
                      {date && new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}
                    </div>
                    <div className="sm:col-span-7">
                      <h2 className="font-display text-2xl text-ink tracking-tightest leading-snug group-hover:text-ember transition-colors">
                        {title}
                      </h2>
                    </div>
                    <div className="sm:col-span-1 text-right text-ember opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                  </a>
                </Link>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-10 flex items-center gap-4 text-sm">
          {isAuthorized ? (
            <>
              <Link href="/blog/new" legacyBehavior>
                <a className="btn-primary text-xs">+ New post</a>
              </Link>
              <button onClick={() => signOut()} className="text-ash hover:text-ink transition-colors">Sign out</button>
            </>
          ) : (
            <button onClick={() => signIn('google')} className="link-underline text-ash hover:text-ink">
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
  return { props: { posts } };
}
