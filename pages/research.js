import Head from 'next/head';
import Layout from '../components/Layout';

/**
 * The Research page showcases the projects and topics I have explored.
 * It pulls information from my CV and presents it in a reader‑friendly format.
 */
export default function Research() {
  const projects = [
    {
      title: 'RIS-Assisted Noncoherent Wireless System: Error Analysis with Optimal Receiver and Multi-level ASK',
      affiliation: 'Wireless Communication Lab, IIT Bhubaneswar',
      duration: 'Sep 2024 – May 2025',
      description: [
        'Developed optimized Amplitude Shift Keying (ASK) designs for low symbol error rate in reconfigurable intelligent surface (RIS) assisted systems with non‑coherent receivers.',
        'Modeled, simulated and validated designs using MATLAB, enhancing system performance across diverse environments.',
        'Explored Rician fading channels, RIS technology and energy‑based non‑coherent receivers.',
      ],
    },
    {
      title: 'Fully‑Analog Audio System with Active Noise Cancellation',
      affiliation: 'Electronic System Design Lab, IIT Bhubaneswar',
      duration: 'Aug 2024 – Oct 2024',
      description: [
        'Designed and built a noise‑resilient audio system using a fully analog implementation of active noise cancellation.',
        'Performed circuit simulations in Multisim and created printed circuit boards with KiCAD.',
        'Gained hands‑on experience in audio system design, active noise cancellation and analog electronics.',
      ],
    },
  ];
  return (
    <Layout>
      <Head>
        <title>Research | Sambit Mishra</title>
      </Head>
      <section className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Research</h1>
          <p className="text-gray-700">
            My research interests lie at the intersection of wireless communication, signal processing and integrated circuit design. Below are some of the projects I've been involved in. As I transition into PhD work, I look forward to exploring more advanced topics and contributing new insights to the field.
          </p>
        </div>
        {projects.map((project) => (
          <div key={project.title} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-1">{project.title}</h2>
            <p className="text-sm text-gray-500 italic mb-2">
              {project.affiliation} — {project.duration}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {project.description.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </Layout>
  );
}