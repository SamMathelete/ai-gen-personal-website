import Head from 'next/head';
import Layout from '../components/Layout';

const themes = [
  {
    title: 'Identifiability theory',
    body:
      'Characterizing when causal structure can be uniquely recovered from observational and interventional data, and turning those identifiability conditions into efficient discovery algorithms for identifiable directed acyclic graphs.',
  },
  {
    title: 'Scalable causal discovery',
    body:
      'Continuous-optimization formulations of structure learning that replace combinatorial search over DAGs with differentiable acyclicity constraints, enabling GPU-accelerated estimation on high-dimensional, mixed-distribution data.',
  },
  {
    title: 'Bounds under partial identifiability',
    body:
      'Variance bounds and lowest-variance estimators for the non- and partially-identifiable regimes — quantifying what can still be learned about causal structure when it is not uniquely determined.',
  },
  {
    title: 'Optimized soft interventions',
    body:
      'Intervention-selection policies that maximize identifiability gain per experiment, reducing the number and cost of interventions needed to recover causal structure.',
  },
];

const publications = [
  {
    n: '01',
    venue: 'ICASSP 2026',
    status: 'Barcelona, pp. 6196–6200',
    title: 'Learning to Intervene: Optimized Soft Intervention Selection for Causal Discovery',
    authors: 'C. Peng, S. Mishra, U. Mitra',
    doi: '10.1109/ICASSP55912.2026.11460954',
    url: 'https://ieeexplore.ieee.org/document/11460954/',
    note: 'Proposes a learning-based framework for selecting soft interventions that improves causal-discovery efficiency and reduces experimental cost.',
  },
  {
    n: '02',
    venue: 'IEEE Transactions on Green Communications and Networking',
    status: 'Vol. 10, pp. 1433–1445, 2026',
    title: 'SER-Optimized Multi-Level ASK Modulations for RIS-Assisted Communications With Energy- and Sign-Based Noncoherent Reception',
    authors: 'S. Mishra, S. P. Dash, G. C. Alexandropoulos',
    doi: '10.1109/TGCN.2025.3633182',
    url: 'https://ieeexplore.ieee.org/document/11247934/',
    note: 'Investigates one- and two-sided ASK modulations in noncoherent SISO systems assisted by an RIS, proposing novel energy- and sign-based receiver structures.',
  },
  {
    n: '03',
    venue: 'IEEE Wireless Communications Letters',
    status: 'Vol. 15, pp. 300–304, 2026',
    title: 'Error Analysis With Optimal Receiver and Multi-Level ASK for RIS-Assisted Noncoherent Wireless System',
    authors: 'S. Mishra, S. P. Dash',
    doi: '10.1109/LWC.2025.3624154',
    url: 'https://ieeexplore.ieee.org/document/11214252/',
    note: 'Considers RIS-aided wireless communication with one-sided ASK and an optimal noncoherent maximum-likelihood detection rule.',
  },
];

const earlierProjects = [
  {
    title: 'Fully-analog audio system with active noise cancellation',
    affiliation: 'Electronic System Design Lab, IIT Bhubaneswar',
    period: 'Aug 2024 — Oct 2024',
    points: [
      'Designed a noise-resilient audio system using a fully analog implementation of active noise cancellation.',
      'Performed circuit simulations in Multisim and laid out PCBs in KiCAD.',
    ],
  },
];

export default function Research() {
  return (
    <Layout>
      <Head>
        <title>Research | Sambit Mishra</title>
      </Head>

      {/* HEADER */}
      <section className="container-wide pt-12 sm:pt-20 pb-12">
        <p className="eyebrow mb-4 flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-ember" /> Research
        </p>
        <h1 className="font-display text-5xl sm:text-6xl tracking-tightest text-ink leading-[0.95] max-w-4xl">
          Reliable causal structure, learned at scale.
        </h1>
        <p className="mt-6 text-lg text-graphite max-w-3xl leading-relaxed">
          My research lives at the intersection of causal inference, probabilistic graphical models,
          and continuous optimization. The unifying question: when can causal structure be recovered
          from data — efficiently, and with guarantees — and when can it not?
        </p>
      </section>

      {/* THEMES */}
      <section className="container-wide py-12 border-t border-rule">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ash">§ 01</p>
            <h2 className="font-display text-3xl tracking-tightest text-ink mt-2">Themes.</h2>
          </div>
          <div className="lg:col-span-9 grid sm:grid-cols-2 gap-px bg-rule rounded-2xl overflow-hidden border border-rule">
            {themes.map((t, i) => (
              <article key={t.title} className="bg-paper p-6 sm:p-8">
                <p className="font-mono text-xs text-ember mb-3">/ 0{i + 1}</p>
                <h3 className="font-display text-xl tracking-tightest text-ink">{t.title}</h3>
                <p className="mt-3 text-graphite text-sm leading-relaxed">{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="bg-cream border-t border-rule">
        <div className="container-wide py-16">
          <div className="grid lg:grid-cols-12 gap-8 mb-10">
            <div className="lg:col-span-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ash">§ 02</p>
              <h2 className="font-display text-3xl tracking-tightest text-ink mt-2">Publications.</h2>
            </div>
            <div className="lg:col-span-9">
              <p className="text-graphite max-w-2xl">
                Peer-reviewed work in causal inference and wireless communications. For the most
                up-to-date list see my <a className="link-underline" href="https://scholar.google.com/citations?user=kyCSMKUAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a> profile.
              </p>
            </div>
          </div>

          <ol className="space-y-2">
            {publications.map((p) => (
              <li key={p.n} className="border-t border-rule first:border-t-0">
                <div className="grid sm:grid-cols-12 gap-4 py-7">
                  <div className="sm:col-span-1 font-mono text-xs text-ash">[{p.n}]</div>
                  <div className="sm:col-span-3">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink">{p.venue}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember mt-1">{p.status}</p>
                  </div>
                  <div className="sm:col-span-8">
                    <h3 className="font-display text-xl sm:text-2xl leading-snug tracking-tightest">
                      {p.url ? (
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-ember transition-colors">
                          {p.title}
                        </a>
                      ) : (
                        <span className="text-ink">{p.title}</span>
                      )}
                    </h3>
                    <p className="mt-2 text-sm text-ash">{p.authors}</p>
                    <p className="mt-3 text-graphite text-sm leading-relaxed">{p.note}</p>
                    {p.doi && (
                      <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-mono text-xs link-underline text-ember">
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

      {/* EARLIER PROJECTS */}
      <section className="container-wide py-16">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ash">§ 03</p>
            <h2 className="font-display text-3xl tracking-tightest text-ink mt-2">Earlier projects.</h2>
          </div>
          <div className="lg:col-span-9 space-y-8">
            {earlierProjects.map((p) => (
              <article key={p.title} className="card card-hover">
                <div className="flex flex-wrap justify-between items-baseline gap-2">
                  <h3 className="font-display text-xl tracking-tightest text-ink">{p.title}</h3>
                  <span className="font-mono text-xs text-ash">{p.period}</span>
                </div>
                <p className="text-sm text-ash italic mt-1">{p.affiliation}</p>
                <ul className="mt-4 space-y-2">
                  {p.points.map((pt, i) => (
                    <li key={i} className="flex gap-3 text-graphite">
                      <span className="text-ember mt-2 shrink-0">▹</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide pb-20">
        <div className="card border-transparent bg-ember text-paper text-center py-14">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-paper/70 mb-4">Collaborate</p>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tightest text-paper">
            Working on a related question?
          </h2>
          <p className="mt-3 text-paper/80 max-w-xl mx-auto">
            I&rsquo;m always glad to chat about causal discovery, identifiability, or scalable
            structure-learning methods.
          </p>
          <a href="mailto:sambitmi@usc.edu" className="mt-7 inline-flex items-center gap-2 bg-paper text-ember px-5 py-2.5 rounded-full text-sm font-semibold no-underline hover:opacity-90 transition-opacity">
            sambitmi@usc.edu
          </a>
        </div>
      </section>
    </Layout>
  );
}
