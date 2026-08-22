import Link from 'next/link';
import { formatExact, plural } from '../../lib/format';

/** Human names for the routes the counter tracks. */
const PAGE_NAMES = {
  '/': 'Home',
  '/research': 'Research',
  '/cv': 'Curriculum Vitae',
  '/blog': 'Writing',
  '/teaching': 'Teaching',
  '/stats': 'Statistics',
  '/other': 'Other pages',
};

// Bars stop short of the track so the value at each tip always has room to sit
// outside the mark; lengths stay proportional because the scale is linear.
const BAR_MAX_PERCENT = 82;

/**
 * Views per page, ranked. One series, one colour: length carries the magnitude
 * and every bar is labelled at its tip, so the ranking reads without hovering.
 */
export default function TopPagesChart({ pages }) {
  if (!pages || pages.length === 0) {
    return <p className="text-ash">No page views recorded yet.</p>;
  }

  const max = Math.max(...pages.map((p) => p.views));

  return (
    <ol className="divide-y divide-rule border-y border-rule">
      {pages.map((page) => {
        const percent = max === 0 ? 0 : (page.views / max) * BAR_MAX_PERCENT;
        const name = PAGE_NAMES[page.path];
        return (
          <li key={page.path} className="group py-4">
            <div className="grid sm:grid-cols-12 items-center gap-2 sm:gap-4">
              <div className="sm:col-span-4">
                {name ? (
                  <Link href={page.path} legacyBehavior>
                    <a className="link-underline text-ink text-sm font-medium">{name}</a>
                  </Link>
                ) : (
                  <span className="text-ink text-sm font-medium">{page.path}</span>
                )}
                <span className="ml-2 font-mono text-[10px] text-ash">{page.path}</span>
              </div>
              <div className="sm:col-span-8 relative h-6 flex items-center">
                <div
                  className="h-3 rounded-r-[4px] transition-[width] duration-500 ease-out"
                  style={{
                    width: `${percent}%`,
                    minWidth: percent > 0 ? '3px' : 0,
                    backgroundColor: 'rgb(var(--color-accent))',
                  }}
                />
                <span
                  className="absolute text-sm text-ink tabular-nums whitespace-nowrap"
                  style={{ left: `calc(${percent}% + 10px)` }}
                >
                  {formatExact(page.views)}
                  <span className="sr-only"> {plural(page.views, 'view')}</span>
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
