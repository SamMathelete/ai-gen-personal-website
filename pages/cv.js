import Head from 'next/head';
import Layout from '../components/Layout';

/**
 * The CV page presents a structured overview of my academic background,
 * professional experience, projects, skills and achievements. The
 * information is adapted from my attached résumé to suit a web
 * format. Feel free to download the full PDF if you'd like a
 * printable version.
 */
export default function CV() {
  const education = [
    {
      degree: 'Bachelor of Technology in Electronics and Communication Engineering',
      institution: 'Indian Institute of Technology Bhubaneswar',
      period: '2021 – 2025',
      details: ['CGPA: 9.09/10'],
    },
    {
      degree: 'Grade 12 (CBSE)',
      institution: 'B.J.E.M. School',
      period: '2021',
      details: ['Score: 97.2%'],
    },
    {
      degree: 'Grade 10 (CBSE)',
      institution: 'B.J.E.M. School',
      period: '2019',
      details: ['Score: 97.6%'],
    },
  ];

  const experience = [
    {
      title: 'ASIC Intern – CHI VIP Team',
      organisation: 'NVIDIA Corporation',
      period: 'May 2024 – Jul 2024',
      responsibilities: [
        'Verified the CHI compliance of a critical verification IP used by CPU, GPU and MSS teams at NVIDIA.',
        'Tested interoperability between NV‑CHI VIP and external verification IPs to ensure protocol compliance.',
        'Designed comprehensive test sequences and interfaces using SystemVerilog and UVM, boosting testing efficiency.',
      ],
    },
  ];

  const projects = [
    {
      name: 'RIS‑Assisted Noncoherent Wireless System: Error Analysis with Optimal Receiver and Multi‑level ASK',
      affiliation: 'Wireless Communication Lab, IIT Bhubaneswar',
      period: 'Sep 2024 – May 2025',
      points: [
        'Developed optimized ASK designs for low symbol error rates in RIS‑assisted systems with non‑coherent receivers.',
        'Modeled and simulated designs in MATLAB to validate performance improvements across various channel conditions.',
        'Gained expertise in Rician fading channels, reconfigurable intelligent surfaces and energy‑based receivers.',
      ],
    },
    {
      name: 'Fully‑Analog Audio System with Active Noise Cancellation',
      affiliation: 'Electronic System Design Lab, IIT Bhubaneswar',
      period: 'Aug 2024 – Oct 2024',
      points: [
        'Designed a noise‑resilient audio system using a fully analog implementation of active noise cancellation.',
        'Conducted circuit simulations with Multisim and created PCBs using KiCAD.',
        'Developed skills in audio system design, active noise cancellation and analog electronics.',
      ],
    },
  ];

  const skills = {
    technical: ['MATLAB', 'KiCAD', 'Cadence Virtuoso', 'SystemVerilog', 'UVM', 'Verilog', 'C++'],
    coursework: [
      'Wireless and Mobile Communication',
      'Digital VLSI Design',
      'Analog VLSI Design',
      'Advanced Communication Engineering',
      'RF and Microwave Engineering',
      'Control Systems',
      'Digital Signal Processing',
    ],
    soft: ['Leadership', 'Problem solving', 'Analytical skills', 'Communication', 'Adaptability'],
  };

  const achievements = [
    'Qualified National Talent Search Examination 2019',
    'Qualified Regional Mathematical Olympiad 2019 and participated in the Indian National Mathematical Olympiad 2020',
    'Qualified Junior Mathematical Olympiad 2016 (Odisha region)',
  ];

  const leadership = [
    {
      role: 'General Secretary',
      organisation: 'Science and Technology Council, Students’ Gymkhana, IIT Bhubaneswar',
      period: 'May 2023 – May 2024',
      duties: [
        'Coordinated and managed five technical societies and two fests, ensuring proper allocation of funds among them.',
        'Led IIT Bhubaneswar’s Inter IIT Tech Meet 2023 team, achieving an overall 10th rank among 23 IITs.',
      ],
    },
  ];

  return (
    <Layout>
      <Head>
        <title>CV | Sambit Mishra</title>
      </Head>
      <section className="space-y-8">
        <h1 className="text-3xl font-bold">Curriculum Vitae</h1>
        {/* Education Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Education</h2>
          {education.map((edu) => (
            <div key={edu.degree} className="mb-4">
              <h3 className="text-lg font-medium">{edu.degree}</h3>
              <p className="text-sm text-gray-500">
                {edu.institution} — {edu.period}
              </p>
              <ul className="list-disc list-inside text-gray-700">
                {edu.details.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Experience Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.title} className="mb-4">
              <h3 className="text-lg font-medium">{exp.title}</h3>
              <p className="text-sm text-gray-500">
                {exp.organisation} — {exp.period}
              </p>
              <ul className="list-disc list-inside text-gray-700">
                {exp.responsibilities.map((res, idx) => (
                  <li key={idx}>{res}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Projects Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.name} className="mb-4">
              <h3 className="text-lg font-medium">{proj.name}</h3>
              <p className="text-sm text-gray-500">
                {proj.affiliation} — {proj.period}
              </p>
              <ul className="list-disc list-inside text-gray-700">
                {proj.points.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Skills Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Skills & Coursework</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-1">Technical Skills</h3>
              <ul className="list-disc list-inside text-gray-700">
                {skills.technical.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Coursework</h3>
              <ul className="list-disc list-inside text-gray-700">
                {skills.coursework.map((cw) => (
                  <li key={cw}>{cw}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Soft Skills</h3>
              <ul className="list-disc list-inside text-gray-700">
                {skills.soft.map((ss) => (
                  <li key={ss}>{ss}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Achievements Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Scholastic Achievements</h2>
          <ul className="list-disc list-inside text-gray-700">
            {achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </div>
        {/* Positions of Responsibility Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Positions of Responsibility</h2>
          {leadership.map((pos) => (
            <div key={pos.role} className="mb-4">
              <h3 className="text-lg font-medium">{pos.role}</h3>
              <p className="text-sm text-gray-500">
                {pos.organisation} — {pos.period}
              </p>
              <ul className="list-disc list-inside text-gray-700">
                {pos.duties.map((duty, idx) => (
                  <li key={idx}>{duty}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Download link to PDF (optional) */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Download</h2>
          <p className="text-gray-700">
            You can download a PDF version of my résumé for your records:
            <a
              href="/Research_Resume.pdf"
              className="text-blue-600 hover:underline ml-2"
              download
            >
              Research_Resume.pdf
            </a>
          </p>
        </div>
      </section>
    </Layout>
  );
}