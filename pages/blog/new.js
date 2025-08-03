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
        <p className="mb-4">You must sign in to create a post.</p>
        <button
          onClick={() => signIn('google')}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Sign in with Google
        </button>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={submit} className="flex flex-col space-y-4">
        <input
          className="border p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          className="border p-2 h-60"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Create Post
          </button>
          <button
            type="button"
            onClick={() => signOut()}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Sign out
          </button>
        </div>
      </form>
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
