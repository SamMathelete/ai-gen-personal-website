import Head from 'next/head';
import Layout from '../components/Layout';

export default function CV() {
  const education = [
    {
      degree: 'Ph.D., Electrical and Computer Engineering',
      institution: 'University of Southern California (USC)',
      location: 'Los Angeles, CA, USA',
      period: 'Aug 2025 — Present',
      details: [
        'Advisor: Prof. Urbashi Mitra, Ming Hsieh Department of ECE',
        'GPA: 4.00/4.00',
        'Key coursework: Probability Theory, Linear Algebra, Supervised Machine Learning, Inference & Estimation Theory.',
      ],
    },
    {
      degree: 'B.Tech. (Hons.), Electronics and Communication Engineering',
      institution: 'Indian Institute of Technology (IIT) Bhubaneswar',
      location: 'Bhubaneswar, Odisha, India',
      period: '2021 — 2025',
      details: [
        'Advisor: Dr. Soumya P. Dash',
        'GPA: 9.14/10.00',
      ],
    },
  ];

  const research = [
    {
      title: 'Graduate Research Assistant',
      org: 'Ming Hsieh Department of Electrical and Computer Engineering, USC',
      location: 'Los Angeles, CA, USA',
      period: 'Aug 2025 — Present',
      points: [
        'Developing continuous-optimization methods for scalable DAG estimation using differentiable acyclicity constraints, reducing iterations and enabling large-scale batching.',
        'Designed a soft-intervention selection framework that improves causal-discovery efficiency and lowers experimental cost.',
        'Studying identifiability of causal graphs under finite samples and latent-variable settings.',
        'Built GPU-accelerated structure-learning pipelines in PyTorch using Adam and L-BFGS for non-convex optimization.',
      ],
    },
    {
      title: 'Undergraduate Researcher',
      org: 'School of Electrical and Computer Sciences, IIT Bhubaneswar',
      location: 'Bhubaneswar, Odisha, India',
      period: 'Aug 2024 — May 2025',
      points: [
        'Developed SER-optimized modulation schemes for RIS-assisted non-coherent communication systems.',
        'Conducted error analysis for multi-level ASK modulations, optimizing energy efficiency.',
      ],
    },
  ];

  const publications = [
    {
      ref: '[1]',
      authors: 'C. Peng, S. Mishra, U. Mitra',
      title: 'Learning to Intervene: Optimized Soft Intervention Selection for Causal Discovery',
      venue: 'Proc. IEEE Int. Conf. on Acoustics, Speech and Signal Processing (ICASSP), Barcelona, Spain',
      year: '2026, pp. 6196–6200',
    },
    {
      ref: '[2]',
      authors: 'S. Mishra, S. P. Dash, G. C. Alexandropoulos',
      title: 'SER-Optimized Multi-Level ASK Modulations for RIS-Assisted Communications With Energy- and Sign-Based Noncoherent Reception',
      venue: 'IEEE Transactions on Green Communications and Networking, vol. 10, pp. 1433–1445',
      year: '2026',
      doi: '10.1109/TGCN.2025.3633182',
    },
    {
      ref: '[3]',
      authors: 'S. Mishra, S. P. Dash',
      title: 'Error Analysis With Optimal Receiver and Multi-Level ASK for RIS-Assisted Noncoherent Wireless System',
      venue: 'IEEE Wireless Communications Letters, vol. 15, pp. 300–304',
      year: '2026',
      doi: '10.1109/LWC.2025.3624154',
    },
  ];

  const industry = [
    {
      title: 'ASIC Engineering Intern, CHI VIP Team',
      org: 'NVIDIA Corporation',
      location: 'Bengaluru, Karnataka, India',
      period: 'May 2024 — Jul 2024',
      points: [
        'Verified CHI protocol compliance for CPU/GPU IPs using SystemVerilog and Perl automation.',
        'Ensured interoperability between internal and external verification IPs.',
      ],
    },
  ];

  const skills = {
    'Causal Inference': ['Causal Discovery', 'Bayesian Networks', 'Structural Equation Models'],
    'Optimization': ['Adam', 'RMSProp', 'L-BFGS', 'Convex Optimization', 'Bilevel Optimization'],
    'Programming & Tools': ['Python', 'PyTorch', 'NumPy', 'SciPy', 'C++', 'CUDA', 'MATLAB', 'Git', 'LaTeX'],
  };

  const awards = [
    'B.Tech. Project Proficiency Award — Best B.Tech Thesis, ECE Department, IIT Bhubaneswar (2024–25).',
    'All India Rank 4000 among ~1,000,000 candidates in JEE Advanced 2021, India.',
    'National Talent Search Scholarship — Top 2000 students of ~1,200,000 candidates in NTSE 2019, Government of India.',
  ];

  const leadership = [
    {
      role: 'General Secretary',
      org: 'Science and Technology Council, Students’ Gymkhana, IIT Bhubaneswar',
      period: 'May 2023 — May 2024',
      duties: [
        'Coordinated and managed five technical societies and two fests, ensuring proper allocation of funds among them.',
        'Led IIT Bhubaneswar’s Inter-IIT Tech Meet 2023 team, achieving an overall 10th rank among 23 IITs.',
      ],
    },
  ];

  return (
    <Layout>
      <Head>
        <title>CV | Sambit Mishra</title>
      </Head>

      <section className="container-wide pt-12 sm:pt-20 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-ember" /> Curriculum Vitae
            </p>
            <h1 className="font-display text-5xl sm:text-6xl tracking-tightest text-ink leading-[0.95]">
              Sambit Mishra
            </h1>
            <p className="mt-5 text-lg text-graphite max-w-2xl">
              PhD Student, Electrical &amp; Computer Engineering · University of Southern California ·
              Advised by Prof. Urbashi Mitra.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <a href="/Sambit_Mishra_CV.pdf" download className="btn-primary">
              Download PDF
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* RESEARCH INTERESTS */}
      <Section number="01" title="Research interests">
        <p className="text-graphite leading-relaxed max-w-3xl">
          Causal inference and probabilistic graphical models, with emphasis on identifiability
          theory and scalable continuous-optimization methods for causal discovery. Interested in
          efficient discovery algorithms for identifiable DAGs, variance bounds for
          non-/partially-identifiable cases, and high-dimensional, mixed-distribution data.
        </p>
      </Section>

      <Section number="02" title="Education">
        <div className="space-y-10">
          {education.map((e) => (
            <Entry
              key={e.degree}
              title={e.degree}
              meta={`${e.institution} · ${e.location}`}
              right={e.period}
              points={e.details}
            />
          ))}
        </div>
      </Section>

      <Section number="03" title="Research experience">
        <div className="space-y-10">
          {research.map((r) => (
            <Entry
              key={r.title}
              title={r.title}
              meta={`${r.org} · ${r.location}`}
              right={r.period}
              points={r.points}
            />
          ))}
        </div>
      </Section>

      <Section number="04" title="Publications">
        <ol className="space-y-6">
          {publications.map((p) => (
            <li key={p.ref} className="grid sm:grid-cols-12 gap-4 pb-6 border-b border-rule last:border-0">
              <div className="sm:col-span-1 font-mono text-xs text-ash">{p.ref}</div>
              <div className="sm:col-span-11">
                <p className="text-sm text-ash">{p.authors}</p>
                <p className="font-display text-lg text-ink mt-1 leading-snug">&ldquo;{p.title}.&rdquo;</p>
                <p className="text-sm text-graphite mt-1">
                  <em className="not-italic">{p.venue}</em>, {p.year}.
                </p>
                {p.doi && (
                  <a
                    href={`https://doi.org/${p.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block font-mono text-xs link-underline text-ember"
                  >
                    doi: {p.doi}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section number="05" title="Industry experience">
        <div className="space-y-10">
          {industry.map((i) => (
            <Entry
              key={i.title}
              title={i.title}
              meta={`${i.org} · ${i.location}`}
              right={i.period}
              points={i.points}
            />
          ))}
        </div>
      </Section>

      <Section number="06" title="Awards & academic distinctions">
        <ul className="space-y-3">
          {awards.map((a, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-mono text-xs text-ash pt-1.5 shrink-0">★</span>
              <span className="text-graphite">{a}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section number="07" title="Technical skills">
        <div className="grid sm:grid-cols-3 gap-8">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink mb-3">{cat}</p>
              <ul className="flex flex-wrap gap-2">
                {items.map((it) => <li key={it} className="tag">{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section number="08" title="Positions of responsibility">
        <div className="space-y-10">
          {leadership.map((l) => (
            <Entry
              key={l.role}
              title={l.role}
              meta={l.org}
              right={l.period}
              points={l.duties}
            />
          ))}
        </div>
      </Section>
    </Layout>
  );
}

function Section({ number, title, children }) {
  return (
    <section className="container-wide py-12 border-t border-rule">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ash">§ {number}</p>
          <h2 className="font-display text-3xl tracking-tightest text-ink mt-2">{title}</h2>
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

function Entry({ title, meta, right, points }) {
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-2 items-baseline">
        <h3 className="font-display text-xl text-ink tracking-tightest">{title}</h3>
        <span className="font-mono text-xs text-ash">{right}</span>
      </div>
      <p className="text-sm text-ash italic mt-1">{meta}</p>
      {points && points.length > 0 && (
        <ul className="mt-4 space-y-2">
          {points.map((p, i) => (
            <li key={i} className="flex gap-3 text-graphite">
              <span className="text-ember mt-2 shrink-0">▹</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
