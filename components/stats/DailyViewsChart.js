import { useState } from 'react';
import { formatDayLong, formatDayShort, formatExact, plural } from '../../lib/format';

// Fixed drawing space; the SVG scales to its container via viewBox.
const W = 720;
const H = 240;
const M = { top: 18, right: 8, bottom: 26, left: 34 };
const PLOT_W = W - M.left - M.right;
const PLOT_H = H - M.top - M.bottom;
const BAR_GAP = 2; // the surface gap that separates adjacent columns
const MAX_BAR_W = 24;
const CORNER = 4;

/**
 * Views per day over the reported window: one series, so one colour and no
 * legend — the heading names what is plotted. Every value is reachable without
 * hovering, through the extreme's direct label and the table view below.
 */
export default function DailyViewsChart({ series }) {
  const [active, setActive] = useState(null);

  const points = series || [];
  if (points.length === 0) return null;

  const max = Math.max(...points.map((p) => p.views), 0);
  const scaleMax = niceCeil(max);
  const band = PLOT_W / points.length;
  const barW = Math.min(band - BAR_GAP, MAX_BAR_W);
  const peakIndex = max > 0 ? points.findIndex((p) => p.views === max) : -1;

  const x = (i) => M.left + i * band + (band - barW) / 2;
  const y = (value) => M.top + PLOT_H - (value / scaleMax) * PLOT_H;

  const ticks = [0, scaleMax / 2, scaleMax].filter((t, i, arr) => arr.indexOf(t) === i);
  const labelled = [0, Math.floor(points.length / 2), points.length - 1];
  const total = points.reduce((sum, p) => sum + p.views, 0);
  const activePoint = active === null ? null : points[active];

  return (
    <figure className="m-0">
      <div className="relative pt-11">
        {activePoint && (
          <div
            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-lg border border-rule bg-paper px-3 py-2 shadow-sm"
            style={{ left: `${clamp(((M.left + active * band + band / 2) / W) * 100, 8, 92)}%` }}
          >
            <p className="font-sans text-base font-semibold leading-none text-ink">
              {formatExact(activePoint.views)}{' '}
              <span className="text-sm font-normal text-graphite">
                {plural(activePoint.views, 'view')}
              </span>
            </p>
            <p className="mt-1 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
              {formatDayLong(activePoint.date)}
            </p>
          </div>
        )}

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`Daily page views over the last ${points.length} days. ${formatExact(
            total,
          )} views in total, peaking at ${formatExact(max)} on ${
            peakIndex >= 0 ? formatDayLong(points[peakIndex].date) : 'no day'
          }.`}
        >
          {/* Gridlines and y ticks: hairline, one step off the surface. */}
          {ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={M.left}
                x2={W - M.right}
                y1={y(tick)}
                y2={y(tick)}
                style={{ stroke: 'rgb(var(--color-rule))' }}
                strokeWidth="1"
              />
              <text
                x={M.left - 8}
                y={y(tick) + 3.5}
                textAnchor="end"
                fontFamily="JetBrains Mono, ui-monospace, monospace"
                fontSize="10"
                style={{ fill: 'rgb(var(--color-ash))' }}
              >
                {formatExact(tick)}
              </text>
            </g>
          ))}

          {points.map((point, i) => {
            const height = scaleMax === 0 ? 0 : (point.views / scaleMax) * PLOT_H;
            const isActive = active === i;
            return (
              <g key={point.date}>
                {height > 0 && (
                  <path
                    d={columnPath(x(i), y(point.views), barW, height, CORNER)}
                    style={{
                      fill: isActive
                        ? 'rgb(var(--color-accentSoft))'
                        : 'rgb(var(--color-accent))',
                    }}
                  />
                )}
                {/* Hit target spans the full band height, not just the painted bar. */}
                <rect
                  x={M.left + i * band}
                  y={M.top}
                  width={band}
                  height={PLOT_H}
                  fill="transparent"
                  tabIndex={0}
                  role="button"
                  aria-label={`${formatDayLong(point.date)}: ${formatExact(point.views)} ${plural(
                    point.views,
                    'view',
                  )}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive((current) => (current === i ? null : current))}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive((current) => (current === i ? null : current))}
                  className="focus:outline-none"
                />
              </g>
            );
          })}

          {/* Direct-label the extreme only; the axis and table carry the rest. */}
          {peakIndex >= 0 && active === null && (
            <text
              x={x(peakIndex) + barW / 2}
              y={y(max) - 7}
              textAnchor="middle"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize="11"
              fontWeight="600"
              style={{ fill: 'rgb(var(--color-ink))' }}
            >
              {formatExact(max)}
            </text>
          )}

          {/* Baseline */}
          <line
            x1={M.left}
            x2={W - M.right}
            y1={M.top + PLOT_H}
            y2={M.top + PLOT_H}
            style={{ stroke: 'rgb(var(--color-rule))' }}
            strokeWidth="1"
          />

          {labelled.map((i) => (
            <text
              key={points[i].date}
              x={clamp(M.left + i * band + band / 2, M.left + 16, W - M.right - 16)}
              y={H - 8}
              textAnchor="middle"
              fontFamily="JetBrains Mono, ui-monospace, monospace"
              fontSize="10"
              style={{ fill: 'rgb(var(--color-ash))' }}
            >
              {formatDayShort(points[i].date)}
            </text>
          ))}
        </svg>
      </div>

      <details className="mt-6 group">
        <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.2em] text-ash hover:text-ink transition-colors">
          View as table
        </summary>
        <div className="mt-4 max-h-72 overflow-y-auto border-y border-rule">
          <table className="w-full text-sm">
            <caption className="sr-only">Page views per day</caption>
            <thead className="sticky top-0 bg-paper">
              <tr className="border-b border-rule">
                <th scope="col" className="py-2 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-ash">
                  Date
                </th>
                <th scope="col" className="py-2 text-right font-mono text-[10px] uppercase tracking-[0.18em] text-ash">
                  Views
                </th>
              </tr>
            </thead>
            <tbody>
              {[...points].reverse().map((point) => (
                <tr key={point.date} className="border-b border-rule/50 last:border-0">
                  <td className="py-1.5 text-graphite">{formatDayLong(point.date)}</td>
                  <td className="py-1.5 text-right text-ink tabular-nums">
                    {formatExact(point.views)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}

/** A column with rounded data-end and square corners at the baseline. */
function columnPath(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height);
  return [
    `M${x},${y + height}`,
    `L${x},${y + r}`,
    `Q${x},${y} ${x + r},${y}`,
    `L${x + width - r},${y}`,
    `Q${x + width},${y} ${x + width},${y + r}`,
    `L${x + width},${y + height}`,
    'Z',
  ].join(' ');
}

/** Rounds an axis maximum up to a readable number (4, 10, 25, 50, 100, …). */
function niceCeil(value) {
  if (value <= 4) return 4;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalized = value / magnitude;
  const step = [1, 2, 2.5, 5, 10].find((s) => normalized <= s) ?? 10;
  return step * magnitude;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
