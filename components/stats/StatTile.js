import { formatCount } from '../../lib/format';

/**
 * A single figure with its label. `hero` promotes one tile per view to the
 * headline number; values use proportional figures, as display-size digits look
 * loose when forced to tabular widths.
 */
export default function StatTile({ label, value, hint, hero = false, loading = false }) {
  return (
    <div className="border-t border-rule pt-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">{label}</p>
      <p
        className={`mt-2 font-sans font-semibold text-ink leading-none ${
          hero ? 'text-5xl sm:text-6xl' : 'text-3xl sm:text-4xl'
        } ${loading ? 'opacity-30' : ''}`}
      >
        {loading ? '—' : formatCount(value)}
      </p>
      {hint && <p className="mt-2 text-sm text-ash">{hint}</p>}
    </div>
  );
}
