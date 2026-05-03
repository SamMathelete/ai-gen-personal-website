import Head from 'next/head';
import Layout from '../components/Layout';

const principles = [
  {
    n: '01',
    title: 'From intuition to formalism',
    body:
      'Start where the student is. The cleanest definition is rarely the right entry point — analogies, sketches, and worked examples open the door, then formalism is what you walk through.',
  },
  {
    n: '02',
    title: 'Show the moving parts',
    body:
      'Engineering and inference both reward seeing how a system moves. I lean on simulation, visualization, and live derivations rather than finished slides — the work of thinking is the lesson.',
  },
  {
    n: '03',
    title: 'Equity of attention',
    body:
      'Office hours and feedback should not be a privilege of the loudest. I try to make space for quiet questions and to follow up with students who haven’t spoken in class.',
  },
];

export default function Teaching() {
  return (
    <Layout>
      <Head>
        <title>Teaching | Sambit Mishra</title>
      </Head>

      {/* HEADER */}
      <section className="container-wide pt-12 sm:pt-20 pb-12">
        <p className="eyebrow mb-4 flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-ember" /> Teaching
        </p>
        <h1 className="font-display text-5xl sm:text-6xl tracking-tightest text-ink leading-[0.95] max-w-4xl">
          The work of thinking, made visible.
        </h1>
        <p className="mt-6 text-lg text-graphite max-w-3xl leading-relaxed">
          Teaching is, for me, the other half of doing research. Communicating ideas to students
          forces precision in a way that solitary work does not — and watching someone build their
          own intuition is among the most satisfying parts of academic life.
        </p>
      </section>

      {/* PRINCIPLES */}
      <section className="container-wide py-12 border-t border-rule">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ash">§ 01</p>
            <h2 className="font-display text-3xl tracking-tightest text-ink mt-2">Principles.</h2>
          </div>
          <div className="lg:col-span-9">
            <ol className="divide-y divide-rule border-y border-rule">
              {principles.map((p) => (
                <li key={p.n} className="py-7 grid sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-1 font-mono text-xs text-ash pt-1">{p.n}</div>
                  <div className="sm:col-span-3 font-display text-xl text-ink tracking-tightest">{p.title}</div>
                  <div className="sm:col-span-8 text-graphite leading-relaxed">{p.body}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* MENTORSHIP & SERVICE */}
      <section className="container-wide py-12 border-t border-rule">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ash">§ 02</p>
            <h2 className="font-display text-3xl tracking-tightest text-ink mt-2">Mentorship &amp; service.</h2>
          </div>
          <div className="lg:col-span-9 space-y-8">
            <article className="card">
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <h3 className="font-display text-xl tracking-tightest text-ink">General Secretary</h3>
                <span className="font-mono text-xs text-ash">May 2023 — May 2024</span>
              </div>
              <p className="text-sm text-ash italic mt-1">
                Science &amp; Technology Council, Students&rsquo; Gymkhana, IIT Bhubaneswar
              </p>
              <ul className="mt-4 space-y-2 text-graphite">
                <li className="flex gap-3">
                  <span className="text-ember mt-2 shrink-0">▹</span>
                  <span>
                    Coordinated five technical societies and two campus fests, allocating funds and
                    coaching society heads through their first events as student leaders.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ember mt-2 shrink-0">▹</span>
                  <span>
                    Led IIT Bhubaneswar&rsquo;s contingent at <em className="not-italic">Inter-IIT Tech Meet 2023</em>,
                    placing 10th overall among 23 IITs.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-ember mt-2 shrink-0">▹</span>
                  <span>
                    The role taught me that a good lecturer and a good organizer share the same
                    instinct: anticipate where someone is going to get stuck, and clear the path
                    before they get there.
                  </span>
                </li>
              </ul>
            </article>

            <article className="card">
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <h3 className="font-display text-xl tracking-tightest text-ink">Peer mentorship</h3>
                <span className="font-mono text-xs text-ash">Ongoing</span>
              </div>
              <p className="text-sm text-ash italic mt-1">
                Informal mentorship for undergraduates and incoming graduate students
              </p>
              <p className="mt-4 text-graphite leading-relaxed">
                I help students navigate research onboarding, paper reading, and the transition from
                problem-set thinking to open-ended research questions. If you&rsquo;re an undergraduate
                considering a PhD in causal inference or signal processing,{' '}
                <a className="link-underline" href="mailto:sambitmi@usc.edu">drop me a note</a>.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* COURSEWORK */}
      <section className="container-wide py-12 border-t border-rule">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ash">§ 03</p>
            <h2 className="font-display text-3xl tracking-tightest text-ink mt-2">Currently.</h2>
          </div>
          <div className="lg:col-span-9">
            <p className="text-graphite leading-relaxed mb-6">
              At USC I&rsquo;m completing graduate coursework that informs my research and the topics
              I most enjoy explaining to others.
            </p>
            <ul className="grid sm:grid-cols-2 gap-px bg-rule rounded-2xl overflow-hidden border border-rule">
              {[
                { code: 'EE 503', name: 'Probability Theory', term: 'Fall 2025 · A' },
                { code: 'EE 510', name: 'Linear Algebra', term: 'Fall 2025 · A' },
                { code: 'EE 559', name: 'Supervised Machine Learning', term: 'Spring 2026' },
                { code: 'EE 563', name: 'Inference & Estimation Theory', term: 'Spring 2026' },
              ].map((c) => (
                <li key={c.code} className="bg-paper p-6">
                  <p className="font-mono text-xs text-ember">{c.code}</p>
                  <p className="font-display text-lg text-ink tracking-tightest mt-1">{c.name}</p>
                  <p className="font-mono text-xs text-ash mt-1">{c.term}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-ash">
              This page will be updated as I take on TA assignments and course development at USC.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
