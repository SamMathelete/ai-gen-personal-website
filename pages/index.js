import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

/**
 * Landing page showcasing a concise overview and quick links.
 * Designed to remain minimalist while providing a cleaner visual hierarchy.
 */
export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Sambit Mishra | Home</title>
      </Head>
      <section className="space-y-16">
        {/* Hero */}
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-50 to-white rounded-xl p-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">Hi, I'm Sambit Mishra</h1>
          <p className="text-lg text-gray-600 max-w-xl">
            Future PhD student passionate about wireless communication, VLSI design and educating the next generation of engineers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/research" legacyBehavior>
              <a className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Research</a>
            </Link>
            <Link href="/teaching" legacyBehavior>
              <a className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition">Teaching</a>
            </Link>
            <Link href="/blog" legacyBehavior>
              <a className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition">Blog</a>
            </Link>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-700 mb-4">
              I'm an aspiring researcher with a strong foundation in electronics and communication engineering, currently completing my undergraduate studies at IIT Bhubaneswar. My interests span across communication theory, integrated circuit design and signal processing, and I'm excited to embark on a PhD journey to deepen my understanding and contribute new knowledge.
            </p>
            <p className="text-gray-700">
              When I'm not engrossed in research, I enjoy mentoring younger students, exploring new technologies and writing about my experiences.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:sambit.mishra.2003@outlook.com" className="text-blue-600 hover:underline">
                  sambit.mishra.2003@outlook.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <a href="tel:+917846850462" className="text-blue-600 hover:underline">
                  (+91) 7846850462
                </a>
              </li>
              <li>
                <strong>LinkedIn:</strong>{' '}
                <a
                  href="https://linkedin.com/in/thesambitmishra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  linkedin.com/in/thesambitmishra
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}