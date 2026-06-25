import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const featured = [
  {
    venue: 'ICASSP 2026',
    status: 'Accepted',
    title: 'Learning to Intervene: Optimized Soft Intervention Selection for Causal Discovery',
    authors: 'C. Peng, S. Mishra, U. Mitra',
  },
  {
    venue: 'IEEE TGCN, vol. 10',
    status: '2026',
    title: 'SER-Optimized Multi-Level ASK Modulations for RIS-Assisted Communications With Energy- and Sign-Based Noncoherent Reception',
    authors: 'S. Mishra, S. P. Dash, G. C. Alexandropoulos',
    doi: '10.1109/TGCN.2025.3633182',
  },
  {
    venue: 'IEEE WCL, vol. 15',
    status: '2026',
    title: 'Error Analysis With Optimal Receiver and Multi-Level ASK for RIS-Assisted Noncoherent Wireless System',
    authors: 'S. Mishra, S. P. Dash',
    doi: '10.1109/LWC.2025.3624154',
  },
];

const focus = [
  {
    label: 'Causal discovery',
    body: 'Continuous-optimization methods for scalable DAG estimation with differentiable acyclicity constraints.',
  },
  {
    label: 'Intervention design',
    body: 'Soft-intervention selection frameworks that lower experimental cost while preserving identifiability.',
  },
  {
    label: 'Identifiability',
    body: 'Finite-sample and latent-variable regimes — what can structure tell us, and when does it fail?',
  },
];

function DagFigure() {
  // A small synthetic DAG used as the hero visual. Each node has a stagger.
  return (
    <svg
      viewBox="0 0 360 360"
      className="w-full h-full"
      role="img"
      aria-label="Animated directed acyclic graph illustrating causal structure"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#11100E" />
        </marker>
        <marker id="arrowEmber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#C2410C" />
        </marker>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C2410C" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#C2410C" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#C2410C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Faint halo behind central node */}
      <circle cx="180" cy="180" r="140" fill="url(#halo)" />

      {/* Edges (DAG, no cycles) */}
      <g fill="none" stroke="#11100E" strokeWidth="1.5" markerEnd="url(#arrow)">
        <path className="edge e1" d="M 70 70 L 165 165" />
        <path className="edge e2" d="M 290 70 L 195 165" />
        <path className="edge e3" d="M 70 70 L 70 280" />
        <path className="edge e4" d="M 290 70 L 290 280" />
        <path className="edge e6" d="M 180 195 L 80 275" />
        <path className="edge e7" d="M 180 195 L 280 275" />
      </g>
      <g fill="none" stroke="#C2410C" strokeWidth="1.8" markerEnd="url(#arrowEmber)">
        <path className="edge e5" d="M 180 195 L 180 285" />
      </g>

      {/* Nodes */}
      <g>
        <Node x={70} y={70} label="X₁" delay="0s" />
        <Node x={290} y={70} label="X₂" delay="0.4s" />
        <Node x={180} y={180} label="Z" central delay="0.8s" />
        <Node x={70} y={290} label="Y₁" delay="1.2s" />
        <Node x={180} y={295} label="Y₂" delay="1.4s" emphasized />
        <Node x={290} y={290} label="Y₃" delay="1.6s" />
      </g>
    </svg>
  );
}

function Node({ x, y, label, central = false, emphasized = false, delay }) {
  const fill = emphasized ? '#C2410C' : central ? '#11100E' : '#FAF7F0';
  const stroke = emphasized ? '#C2410C' : '#11100E';
  const textFill = central || emphasized ? '#FAF7F0' : '#11100E';
  return (
    <g style={{ animation: 'fadeUp 0.6s ease-out both', animationDelay: delay }}>
      <circle cx={x} cy={y} r={central ? 18 : 15} fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontFamily="JetBrains Mono, ui-monospace, monospace"
        fontSize="11"
        fontWeight="500"
        fill={textFill}
      >
        {label}
      </text>
    </g>
  );
}

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Sambit Mishra — Causal inference & probabilistic graphical models</title>
      </Head>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-wide pt-12 sm:pt-20 pb-16 sm:pb-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 animate-fade-up">
              <p className="eyebrow mb-6 flex items-center gap-3">
                <span className="inline-block w-6 h-px bg-ember" />
                PhD Student · USC Viterbi
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tightest text-ink">
                Learning the structure
                <br />
                of <em className="text-ember not-italic relative">
                  cause
                  <svg className="absolute -bottom-1 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M0,6 Q50,1 100,6 T200,6" stroke="#C2410C" strokeWidth="2" fill="none" />
                  </svg>
                </em>{' '}and effect.
              </h1>
              <p className="mt-8 text-lg sm:text-xl text-graphite max-w-2xl leading-relaxed">
                I&rsquo;m <span className="text-ink font-medium">Sambit Mishra</span>, a PhD student in Electrical &amp; Computer
                Engineering at the University of Southern California, advised by{' '}
                <a className="link-underline" href="https://viterbi.usc.edu/directory/faculty/Mitra/Urbashi" target="_blank" rel="noopener noreferrer">
                  Prof. Urbashi Mitra
                </a>. My work centers on <span className="text-ink">causal inference</span> and
                {' '}<span className="text-ink">probabilistic graphical models</span> — particularly scalable continuous-optimization
                methods for causal discovery in high-dimensional, distribution-shifted data.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/research" legacyBehavior>
                  <a className="btn-primary">
                    Read the research
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </a>
                </Link>
                <Link href="/cv" legacyBehavior><a className="btn-ghost">Curriculum Vitae</a></Link>
                <a href="mailto:sambitmi@usc.edu" className="btn-ghost">sambitmi@usc.edu</a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square max-w-md mx-auto animate-fade-in">
                <DagFigure />
                <div className="absolute -bottom-3 left-0 right-0 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
                    fig. 01 — a directed acyclic graph
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="border-y border-rule bg-cream/60 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap py-4 font-mono text-xs uppercase tracking-[0.25em] text-ash">
            {Array.from({ length: 2 }).map((_, repeat) => (
              <div key={repeat} className="flex items-center gap-10 px-5 shrink-0">
                <span>Causal Discovery</span><span className="text-ember">◆</span>
                <span>Probabilistic Graphical Models</span><span className="text-ember">◆</span>
                <span>Continuous Optimization</span><span className="text-ember">◆</span>
                <span>Distribution Shift</span><span className="text-ember">◆</span>
                <span>Soft Interventions</span><span className="text-ember">◆</span>
                <span>Structure Learning</span><span className="text-ember">◆</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRENT FOCUS */}
      <section className="container-wide py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">§ 01 — Currently</p>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tightest text-ink">
              Three threads I&rsquo;m pulling on.
            </h2>
            <p className="mt-4 text-graphite leading-relaxed">
              Reliable structure learning under distribution shift, with applications to
              fraud detection and high-stakes decision systems.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ol className="divide-y divide-rule border-y border-rule">
              {focus.map((f, i) => (
                <li key={f.label} className="py-6 grid sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-1 font-mono text-xs text-ash pt-1">0{i + 1}</div>
                  <div className="sm:col-span-3 font-display text-xl text-ink tracking-tightest">{f.label}</div>
                  <div className="sm:col-span-8 text-graphite">{f.body}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FEATURED PUBLICATIONS */}
      <section className="bg-cream border-y border-rule">
        <div className="container-wide py-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="eyebrow mb-4">§ 02 — Selected publications</p>
              <h2 className="font-display text-3xl sm:text-4xl tracking-tightest text-ink">Recent work.</h2>
            </div>
            <Link href="/research" legacyBehavior>
              <a className="link-underline text-sm font-medium">View all research →</a>
            </Link>
          </div>

          <ol className="space-y-2">
            {featured.map((p, i) => (
              <li key={p.title} className="group">
                <div className="grid sm:grid-cols-12 gap-4 py-6 border-b border-rule">
                  <div className="sm:col-span-1 font-mono text-xs text-ash">[{String(i + 1).padStart(2, '0')}]</div>
                  <div className="sm:col-span-3">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink">{p.venue}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember mt-1">{p.status}</p>
                  </div>
                  <div className="sm:col-span-8">
                    <h3 className="font-display text-xl sm:text-2xl tracking-tightest text-ink leading-snug group-hover:text-ember transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-ash">{p.authors}</p>
                    {p.doi && (
                      <a
                        href={`https://doi.org/${p.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block font-mono text-xs link-underline text-ember"
                      >
                        doi: {p.doi}
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ABOUT + CONTACT */}
      <section className="container-wide py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">§ 03 — Background</p>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tightest text-ink mb-6">
              From wireless systems to causal graphs.
            </h2>
            <div className="space-y-5 text-graphite leading-relaxed">
              <p>
                Before USC, I studied Electronics &amp; Communication Engineering at IIT Bhubaneswar,
                graduating with a B.Tech (Hons.) in 2025 and a 9.14/10.00 GPA. There I worked with
                Dr. Soumya P. Dash on SER-optimized modulation schemes for RIS-assisted noncoherent
                wireless systems — work that has since appeared in IEEE TGCN and IEEE WCL.
              </p>
              <p>
                I spent the summer of 2024 as an ASIC Engineering Intern at NVIDIA, verifying CHI
                protocol compliance on the CHI-VIP team. Outside of research I served as
                {' '}<span className="text-ink font-medium">General Secretary of the Science &amp; Technology Council</span> at IIT Bhubaneswar,
                where I led the Inter-IIT Tech Meet team to a top-ten finish among 23 IITs.
              </p>
              <p>
                These days, I&rsquo;m drawn to questions at the intersection of optimization theory and
                inference: when can we recover causal structure cheaply, and what does it take to
                trust the answer?
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="card sticky top-24">
              <p className="eyebrow mb-4">Contact</p>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between gap-4 border-b border-rule pb-3">
                  <span className="text-ash">Email</span>
                  <a href="mailto:sambitmi@usc.edu" className="link-underline text-ink font-medium">sambitmi@usc.edu</a>
                </li>
                <li className="flex justify-between gap-4 border-b border-rule pb-3">
                  <span className="text-ash">Office</span>
                  <span className="text-ink">USC Viterbi · Los Angeles</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-rule pb-3">
                  <span className="text-ash">Scholar</span>
                  <a href="https://scholar.google.com/citations?user=kyCSMKUAAAAJ" target="_blank" rel="noopener noreferrer" className="link-underline text-ink">Google Scholar</a>
                </li>
                <li className="flex justify-between gap-4 border-b border-rule pb-3">
                  <span className="text-ash">LinkedIn</span>
                  <a href="https://linkedin.com/in/thesambitmishra" target="_blank" rel="noopener noreferrer" className="link-underline text-ink">@thesambitmishra</a>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-ash">CV</span>
                  <a href="/Sambit_Mishra_CV.pdf" download className="link-underline text-ink">Download PDF</a>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-rule">
                <p className="text-sm text-graphite">
                  Open to research collaborations on causal discovery, identifiability,
                  and structure learning under distribution shift.
                </p>
                <a href="mailto:sambitmi@usc.edu" className="mt-4 btn-primary w-full justify-center">
                  Say hello
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
