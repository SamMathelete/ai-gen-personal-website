import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Sambit Mishra | Home</title>
      </Head>
      <section className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Hello, I'm Sambit Mishra</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Future PhD student passionate about wireless communication, VLSI design and educating the next generation of engineers.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6">
          <Link href="/research" legacyBehavior>
            <a className="px-6 py-3 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition">Explore Research</a>
          </Link>
          <Link href="/teaching" legacyBehavior>
            <a className="px-6 py-3 bg-gray-800 text-white rounded-md text-center hover:bg-gray-900 transition">Teaching Portfolio</a>
          </Link>
          <Link href="/blog" legacyBehavior>
            <a className="px-6 py-3 bg-green-600 text-white rounded-md text-center hover:bg-green-700 transition">Read Blog</a>
          </Link>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-700 mb-4">
              I'm an aspiring researcher with a strong foundation in electronics and communication engineering, currently completing my undergraduate studies at IIT Bhubaneswar. My interests span across communication theory, integrated circuit design and signal processing, and I'm excited to embark on a PhD journey to deepen my understanding and contribute new knowledge.
            </p>
            <p className="text-gray-700">
              When I'm not engrossed in research, I enjoy mentoring younger students, exploring new technologies and writing about my experiences.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <ul className="text-gray-700">
              <li className="mb-1"><strong>Email:</strong> <a href="mailto:sambit.mishra.2003@outlook.com" className="text-blue-600 hover:underline">sambit.mishra.2003@outlook.com</a></li>
              <li className="mb-1"><strong>Phone:</strong> <a href="tel:+917846850462" className="text-blue-600 hover:underline">(+91) 7846850462</a></li>
              <li className="mb-1"><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/thesambitmishra" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">linkedin.com/in/thesambitmishra</a></li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}