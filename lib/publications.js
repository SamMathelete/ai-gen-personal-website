/**
 * Canonical publication list.
 *
 * The home page, research page and CV page each render a slightly different
 * citation style, so every entry carries a `display` block per surface. Keeping
 * one list means a new paper is added in exactly one place — and the same list
 * feeds the schema.org `ScholarlyArticle` markup that search engines and
 * Google Scholar read.
 *
 * `image` is the representative figure shown on the research page card:
 * `position` is the CSS object-position used to crop it into the card's
 * 16:10 window, and `caption` is shown under the full figure in the lightbox.
 */

import { siteUrl } from './site';

export const publications = [
  {
    id: 'mixed-ordinal-exponential-identifiability',
    image: {
      src: '/images/papers/mixed-ordinal-exponential-identifiability.jpg',
      position: '50% 10%',
      alt: 'Diagram comparing structural equation models, conditional parametric causal models and linear parametric models, each generating a node from its parents',
      caption: 'Three ways to generate a node from its parents: the classical structural equation model, the conditional parametric causal model (CPCM), and the linear parametric model (LPM) whose identifiability the paper establishes.',
    },
    title:
      'On the Identifiability of Mixed Ordinal and Exponential Family Causal DAGs under Linear Parametric Models',
    authorsLine: 'S. Mishra, U. Mitra',
    authorNames: ['Sambit Mishra', 'Urbashi Mitra'],
    year: '2026',
    url: 'https://arxiv.org/abs/2609.17942',
    arxiv: '2609.17942',
    publisher: 'arXiv',
    note:
      'Proves that every edge between an ordinal node and a one-parameter exponential-family node in a linear parametric causal model is identifiable from the joint distribution alone, with converses showing the three-category and three-support-point conditions are necessary; submitted to the Journal of Machine Learning Research.',
    display: {
      home: { venue: 'arXiv preprint', status: 'Submitted to JMLR · 2026' },
      research: { n: '01', venue: 'arXiv preprint', status: 'Submitted to JMLR · 2026' },
      cv: {
        ref: '[1]',
        venue: 'arXiv preprint arXiv:2609.17942, submitted to Journal of Machine Learning Research',
        year: '2026',
      },
    },
  },
  {
    id: 'sure-tuned-ridge',
    image: {
      src: '/images/papers/sure-tuned-ridge.jpg',
      position: '50% 8%',
      alt: 'Normalized structural Hamming distance against number of samples for DAGMA, GBNSL, NOTEARS and SURE-Ridge on 20-node and 50-node graphs',
      caption: 'Normalized SHD versus sample size on 20- and 50-node graphs. SURE-Ridge reaches near-zero error with far fewer samples than DAGMA, GBNSL and NOTEARS.',
    },
    title:
      'Causal Discovery in Equal Variance Linear Gaussian DAGs via SURE-Tuned Ridge Regression',
    authorsLine: 'S. Mishra, U. Mitra',
    authorNames: ['Sambit Mishra', 'Urbashi Mitra'],
    year: '2026',
    url: 'https://arxiv.org/abs/2608.17132',
    arxiv: '2608.17132',
    publisher: 'arXiv',
    note:
      'Studies causal discovery for equal-variance linear-Gaussian DAGs, tuning ridge-regression regularization by Stein’s unbiased risk estimate (SURE) to recover structure from observational data.',
    display: {
      home: { venue: 'Asilomar 2026', status: 'Oral · arXiv preprint' },
      research: { n: '02', venue: 'Asilomar 2026', status: 'Accepted for oral presentation' },
      cv: {
        ref: '[2]',
        venue:
          'arXiv preprint arXiv:2608.17132, accepted for oral presentation at the 60th Asilomar Conference on Signals, Systems and Computers',
        year: '2026',
      },
    },
  },
  {
    id: 'epidemiological-causal-graph-identification',
    image: {
      src: '/images/papers/epidemiological-causal-graph-identification.jpg',
      position: '0% 50%',
      alt: 'Normalized SHD against number of samples for 50-node ER-2 and ER-4 bipartite DAGs across seven exponential-family node distributions and a full mix',
      caption: 'Masked DAGMA on 50-node bipartite ER-2 and ER-4 graphs: normalized SHD falls to near zero within a few hundred samples for every exponential-family node type, including a full mix of all seven.',
    },
    title: 'Epidemiological Causal Graph Identification: Challenges, Identifiability and Algorithms',
    authorsLine: 'S. Mishra, Y. Wang, C. K. Johnson, U. Mitra',
    authorNames: ['Sambit Mishra', 'Yingying Wang', 'Christine K. Johnson', 'Urbashi Mitra'],
    year: '2026',
    url: 'https://arxiv.org/abs/2609.20676',
    arxiv: '2609.20676',
    publisher: 'arXiv',
    note:
      'Motivated by epidemiological data that mixes ordinal, count and continuous measurements, introduces a structured statistical model, proves identifiability of ordinal–exponential-family edge directions, and gives an exhaustive search and a masked DAGMA procedure for recovering mixed DAGs.',
    display: {
      home: { venue: 'Asilomar 2026', status: 'Oral · arXiv preprint' },
      research: { n: '03', venue: 'Asilomar 2026', status: 'Accepted for oral presentation' },
      cv: {
        ref: '[3]',
        venue:
          'arXiv preprint arXiv:2609.20676, accepted for oral presentation at the 60th Asilomar Conference on Signals, Systems and Computers',
        year: '2026',
      },
    },
  },
  {
    id: 'learning-to-intervene',
    image: {
      src: '/images/papers/learning-to-intervene.jpg',
      position: '50% 50%',
      alt: 'Two seven-node DAGs with different soft-intervention targets highlighted in red and the corresponding intervention vectors',
      caption: 'Two candidate soft interventions on the same seven-node graph. Red nodes are intervened on and the vector a records the selection; the paper learns which selection is most informative.',
    },
    title: 'Learning to Intervene: Optimized Soft Intervention Selection for Causal Discovery',
    authorsLine: 'C. Peng, S. Mishra, U. Mitra',
    authorNames: ['C. Peng', 'Sambit Mishra', 'Urbashi Mitra'],
    year: '2026',
    url: 'https://ieeexplore.ieee.org/document/11460954/',
    doi: '10.1109/ICASSP55912.2026.11460954',
    publisher: 'IEEE',
    note:
      'Proposes a learning-based framework for selecting soft interventions that improves causal-discovery efficiency and reduces experimental cost.',
    display: {
      home: { venue: 'ICASSP 2026', status: 'Barcelona, Spain' },
      research: { n: '04', venue: 'ICASSP 2026', status: 'Barcelona, pp. 6196–6200' },
      cv: {
        ref: '[4]',
        venue:
          'Proc. IEEE Int. Conf. on Acoustics, Speech and Signal Processing (ICASSP), Barcelona, Spain',
        year: '2026, pp. 6196–6200',
      },
    },
  },
  {
    id: 'ser-optimized-ask',
    image: {
      src: '/images/papers/ser-optimized-ask.jpg',
      position: '50% 6%',
      alt: 'Symbol error rate against average SNR for two-sided 4-level and 8-level ASK with 32 to 512 RIS elements, optimized versus traditional, with the threshold SNR marked',
      caption: 'SER versus average SNR for two-sided 4- and 8-level ASK. Optimized constellations (solid) beat traditional ones (dotted) beyond a threshold SNR that falls as the number of RIS elements grows.',
    },
    title:
      'SER-Optimized Multi-Level ASK Modulations for RIS-Assisted Communications With Energy- and Sign-Based Noncoherent Reception',
    authorsLine: 'S. Mishra, S. P. Dash, G. C. Alexandropoulos',
    authorNames: ['Sambit Mishra', 'Soumya P. Dash', 'G. C. Alexandropoulos'],
    year: '2026',
    url: 'https://ieeexplore.ieee.org/document/11247934/',
    doi: '10.1109/TGCN.2025.3633182',
    publisher: 'IEEE',
    note:
      'Investigates one- and two-sided ASK modulations in noncoherent SISO systems assisted by an RIS, proposing novel energy- and sign-based receiver structures.',
    display: {
      home: { venue: 'IEEE TGCN, vol. 10', status: '2026' },
      research: {
        n: '05',
        venue: 'IEEE Transactions on Green Communications and Networking',
        status: 'Vol. 10, pp. 1433–1445, 2026',
      },
      cv: {
        ref: '[5]',
        venue:
          'IEEE Transactions on Green Communications and Networking, vol. 10, pp. 1433–1445',
        year: '2026',
      },
    },
  },
  {
    id: 'error-analysis-optimal-receiver',
    image: {
      src: '/images/papers/error-analysis-optimal-receiver.jpg',
      position: '0% 50%',
      alt: 'Symbol error probability against SNR for traditional and optimized ASK with 32, 64 and 128 RIS elements, a comparison with prior schemes, and the resulting constellations',
      caption: 'Symbol error probability for traditional and optimized multi-level ASK with the optimal noncoherent receiver (a), a comparison with earlier schemes (b), and the optimized constellation points (c).',
    },
    title:
      'Error Analysis With Optimal Receiver and Multi-Level ASK for RIS-Assisted Noncoherent Wireless System',
    authorsLine: 'S. Mishra, S. P. Dash',
    authorNames: ['Sambit Mishra', 'Soumya P. Dash'],
    year: '2026',
    url: 'https://ieeexplore.ieee.org/document/11214252/',
    doi: '10.1109/LWC.2025.3624154',
    publisher: 'IEEE',
    note:
      'Considers RIS-aided wireless communication with one-sided ASK and an optimal noncoherent maximum-likelihood detection rule.',
    display: {
      home: { venue: 'IEEE WCL, vol. 15', status: '2026' },
      research: {
        n: '06',
        venue: 'IEEE Wireless Communications Letters',
        status: 'Vol. 15, pp. 300–304, 2026',
      },
      cv: {
        ref: '[6]',
        venue: 'IEEE Wireless Communications Letters, vol. 15, pp. 300–304',
        year: '2026',
      },
    },
  },
];

/** Flattens a publication into the props one surface renders. */
export function forSurface(surface) {
  return publications.map((p) => ({ ...p, ...p.display[surface] }));
}

/** schema.org ScholarlyArticle for a single publication. */
export function publicationJsonLd(pub) {
  const article = {
    '@type': 'ScholarlyArticle',
    headline: pub.title,
    name: pub.title,
    author: pub.authorNames.map((name) => ({ '@type': 'Person', name })),
    datePublished: pub.year,
    url: pub.url,
    publisher: { '@type': 'Organization', name: pub.publisher },
    inLanguage: 'en',
  };
  if (pub.image?.src) {
    article.image = `${siteUrl}${pub.image.src}`;
  }
  if (pub.doi) {
    article.identifier = { '@type': 'PropertyValue', propertyID: 'DOI', value: pub.doi };
    article.sameAs = `https://doi.org/${pub.doi}`;
  }
  if (pub.arxiv) {
    article.identifier = { '@type': 'PropertyValue', propertyID: 'arXiv', value: pub.arxiv };
    article.sameAs = `https://arxiv.org/abs/${pub.arxiv}`;
  }
  if (pub.display?.research?.venue) {
    article.publication = pub.display.research.venue;
  }
  return article;
}

/** schema.org ItemList wrapping every publication, for the research page. */
export function publicationListJsonLd() {
  return {
    '@type': 'ItemList',
    name: 'Publications by Sambit Mishra',
    numberOfItems: publications.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: publications.map((pub, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: publicationJsonLd(pub),
    })),
  };
}
