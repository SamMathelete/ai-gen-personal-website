import Head from 'next/head';
import Layout from '../components/Layout';

/**
 * The Teaching page outlines my educational philosophy and summarizes
 * instructional roles. As a future PhD student I look forward to
 * teaching courses and supervising labs that bridge theory with
 * practice.
 */
export default function Teaching() {
  return (
    <Layout>
      <Head>
        <title>Teaching | Sambit Mishra</title>
      </Head>
      <section className="space-y-6">
        <h1 className="text-3xl font-bold mb-4">Teaching</h1>
        <p className="text-gray-700">
          Teaching is a core aspect of academia that allows me to share my
          passion for electronics and communication while empowering the next
          generation of engineers. Although I am early in my career,
          I have developed a strong foundation in explaining complex
          concepts through mentoring peers and leading student societies.
        </p>
        <p className="text-gray-700">
          During my tenure as General Secretary of the Science and Technology
          Council at IIT Bhubaneswar, I coordinated numerous technical
          workshops and events, ensuring that resources were allocated to
          maximize learning outcomes. I plan to build on this experience to
          deliver engaging lectures and labs as a teaching assistant and
          eventually as an instructor.
        </p>
        <p className="text-gray-700">
          This page will be updated with specific courses, teaching
          materials and schedules as they become available. Stay tuned!
        </p>
      </section>
    </Layout>
  );
}