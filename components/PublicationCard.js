import { useEffect } from 'react';

/**
 * A publication rendered as a card: a representative figure in a fixed 16:10
 * window, a venue badge, then the citation and links. Clicking the figure
 * hands the publication to the page's lightbox via `onExpand`.
 */
export default function PublicationCard({ pub, onExpand }) {
  const { image } = pub;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-rule bg-paper transition-all duration-300 hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink/5">
      {image ? (
        <button
          type="button"
          onClick={() => onExpand(pub)}
          aria-label={`Expand figure for “${pub.title}”`}
          className="figure-panel relative block aspect-[16/10] w-full overflow-hidden border-b border-rule bg-white text-left cursor-zoom-in"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ objectPosition: image.position || '50% 50%' }}
          />
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-rule bg-paper/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink backdrop-blur">
            {pub.venue}
          </span>
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            Expand
          </span>
        </button>
      ) : (
        <div className="flex items-center border-b border-rule px-5 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">{pub.venue}</span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-xs text-ash">[{pub.n}]</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent text-right">
            {pub.status}
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl leading-snug tracking-tightest">
          {pub.url ? (
            <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent transition-colors">
              {pub.title}
            </a>
          ) : (
            <span className="text-ink">{pub.title}</span>
          )}
        </h3>
        <p className="mt-2 text-sm text-ash">{pub.authorsLine}</p>
        <p className="mt-3 text-sm leading-relaxed text-graphite">{pub.note}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {pub.arxiv && (
            <a
              href={`https://arxiv.org/abs/${pub.arxiv}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tag no-underline hover:border-accent hover:text-accent transition-colors"
            >
              arXiv:{pub.arxiv}
            </a>
          )}
          {pub.doi && (
            <a
              href={`https://doi.org/${pub.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tag no-underline hover:border-accent hover:text-accent transition-colors"
            >
              doi:{pub.doi}
            </a>
          )}
          {pub.url && !pub.arxiv && (
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tag no-underline hover:border-accent hover:text-accent transition-colors"
            >
              IEEE Xplore
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * Full-size view of a publication's figure. Closes on Escape, on the close
 * button, or on a click outside the figure. Scroll is locked while open.
 */
export function FigureLightbox({ pub, onClose }) {
  useEffect(() => {
    if (!pub) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [pub, onClose]);

  if (!pub || !pub.image) return null;
  const { image } = pub;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Figure from “${pub.title}”`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8 backdrop-blur-sm animate-fade-in"
      style={{ animationDuration: '0.25s' }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close figure"
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/85 hover:bg-white/10 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <figure
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full w-full max-w-5xl flex-col"
      >
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            className="mx-auto max-h-[70vh] w-auto max-w-full object-contain"
          />
        </div>
        <figcaption className="mt-4 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
            [{pub.n}] · {pub.venue}
          </p>
          <p className="mt-2 font-display text-lg tracking-tightest text-white">{pub.title}</p>
          {image.caption && (
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-white/75">{image.caption}</p>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
