const numberFormat = new Intl.NumberFormat('en-US');

/** Thousands-separated count, with a compact form once the number gets long. */
export function formatCount(value) {
  const n = Number(value) || 0;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 100_000) return `${(n / 1_000).toFixed(0)}K`;
  return numberFormat.format(n);
}

/** Exact count with thousands separators — used in tables and tooltips. */
export function formatExact(value) {
  return numberFormat.format(Number(value) || 0);
}

/** "Mar 4" for chart axes; the series is always within a single year. */
export function formatDayShort(isoDate) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** "Mon, Mar 4, 2026" for tooltips and the table view. */
export function formatDayLong(isoDate) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Pluralises a noun against a count without repeating the number. */
export function plural(count, singular, pluralForm = `${singular}s`) {
  return count === 1 ? singular : pluralForm;
}
