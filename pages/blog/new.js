import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import Layout from '../../components/Layout';

export default function NewPost() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/create-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, date, content }),
    });
    if (res.ok) {
      setTitle('');
      setDate('');
      setContent('');
      alert('Post created');
    } else {
      alert('Error creating post');
    }
  };

  if (!session) {
    return (
      <Layout>
        <section className="container-prose py-20 text-center">
          <p className="font-display text-2xl text-ink mb-6 tracking-tightest">Sign in required.</p>
          <button onClick={() => signIn('google')} className="btn-primary">Sign in with Google</button>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container-prose pt-12 sm:pt-20 pb-20">
        <p className="eyebrow mb-4">New post</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tightest text-ink leading-[1.0] mb-10">
          Create a new entry.
        </h1>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="font-mono text-xs uppercase tracking-[0.18em] text-ash">Title</label>
            <input
              className="mt-2 w-full bg-cream border border-rule rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-ember transition-colors"
              placeholder="A working title…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-[0.18em] text-ash">Date</label>
            <input
              className="mt-2 w-full bg-cream border border-rule rounded-lg px-4 py-3 text-ink focus:outline-none focus:border-ember transition-colors"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-[0.18em] text-ash">Content (Markdown)</label>
            <textarea
              className="mt-2 w-full bg-cream border border-rule rounded-lg px-4 py-3 h-72 text-ink font-mono text-sm focus:outline-none focus:border-ember transition-colors"
              placeholder="# Heading&#10;&#10;Paragraph…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex gap-4 pt-2">
            <button type="submit" className="btn-primary">Publish</button>
            <button type="button" onClick={() => signOut()} className="btn-ghost">Sign out</button>
          </div>
        </form>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session.user.email !== process.env.AUTHORIZED_EMAIL) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${encodeURIComponent('/blog/new')}`,
        permanent: false,
      },
    };
  }
  return { props: {} };
}
