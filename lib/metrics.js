import crypto from 'crypto';

/**
 * Privacy-preserving page-view metrics.
 *
 * Storage is Upstash Redis over its REST API when UPSTASH_REDIS_REST_URL and
 * UPSTASH_REDIS_REST_TOKEN are set, and an in-process map otherwise, so local
 * development and preview deployments work with no configuration (the fallback
 * is per-instance and resets on restart — it is not a production store).
 *
 * What is stored: counters only. No cookies are set, no IP address, user agent
 * or any other identifier is written anywhere. A visitor is represented by a
 * truncated SHA-256 of IP + user agent + a salt that rotates every day, which
 * is used solely to feed a HyperLogLog cardinality estimate and a short-lived
 * de-duplication key; the digest cannot be reversed and stops being meaningful
 * once the day rolls over.
 */

const REDIS_URL = (process.env.UPSTASH_REDIS_REST_URL || '').replace(/\/+$/, '');
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || '';

export const storageKind = REDIS_URL && REDIS_TOKEN ? 'redis' : 'memory';

/** Counters older than this are dropped; ~13 months keeps year-on-year context. */
const RETENTION_SECONDS = 400 * 24 * 60 * 60;
/** A repeat view of the same path by the same visitor is ignored for this long. */
const VIEW_DEDUPE_SECONDS = 30 * 60;
/** Longest path we are willing to turn into a key. */
const MAX_PATH_LENGTH = 128;

const KEY = {
  viewsTotal: 'metrics:views:total',
  viewsPath: (path) => `metrics:views:path:${path}`,
  viewsDay: (day) => `metrics:views:day:${day}`,
  pathSet: 'metrics:paths',
  visitorsTotal: 'metrics:visitors:total',
  visitorsDay: (day) => `metrics:visitors:day:${day}`,
  dedupe: (visitor, path) => `metrics:seen:${visitor}:${path}`,
};

/**
 * Top-level route segments we are willing to create keys for. Anything else is
 * bucketed into /other so a flood of crafted URLs cannot grow the key space.
 */
const KNOWN_SEGMENTS = new Set(['', 'research', 'cv', 'teaching', 'blog', 'stats']);

const BOT_PATTERN =
  /bot|crawler|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|whatsapp|telegram|discord|preview|headless|lighthouse|pagespeed|pingdom|uptime|monitor|curl|wget|python-requests|node-fetch|axios|go-http-client|java\//i;

/** True for requests that should never be counted as a human visit. */
export function isBot(userAgent = '') {
  return !userAgent || BOT_PATTERN.test(userAgent);
}

/** The UTC day a timestamp falls in, as YYYY-MM-DD. */
export function dayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

/** The last `days` UTC day keys, oldest first, ending today. */
export function recentDays(days, from = new Date()) {
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    out.push(dayKey(new Date(from.getTime() - i * 86400000)));
  }
  return out;
}

/**
 * Reduces an arbitrary request path to a stable, bounded key: query and hash
 * dropped, lower-cased, trailing slash removed, unknown routes bucketed.
 */
export function normalizePath(input) {
  if (typeof input !== 'string' || input.length === 0) return null;
  let path = input.split(/[?#]/)[0].trim().toLowerCase();
  if (!path.startsWith('/')) return null;
  if (path.length > MAX_PATH_LENGTH) return null;
  if (!/^\/[a-z0-9\-/_.]*$/.test(path)) return null;
  if (path.includes('..')) return null;
  path = path.replace(/\/+$/, '') || '/';
  const [, first = ''] = path.split('/');
  if (!KNOWN_SEGMENTS.has(first)) return '/other';
  return path;
}

/**
 * A per-day pseudonymous visitor identifier. The salt rotates daily and mixes in
 * METRICS_SALT when present, so the same reader gets a different id tomorrow and
 * ids cannot be recomputed without the deployment's secret.
 */
export function visitorId(req, day = dayKey()) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (Array.isArray(forwarded) ? forwarded[0] : (forwarded || '').split(',')[0]).trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown';
  const salt = process.env.METRICS_SALT || 'sambitmishra.in';
  return crypto
    .createHash('sha256')
    .update(`${ip}|${req.headers['user-agent'] || ''}|${salt}|${day}`)
    .digest('hex')
    .slice(0, 24);
}

/* -------------------------------------------------------------------------- */
/* Storage adapters                                                            */
/* -------------------------------------------------------------------------- */

async function redisPipeline(commands) {
  if (commands.length === 0) return [];
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Upstash request failed with status ${res.status}`);
  }
  const payload = await res.json();
  return payload.map((entry) => {
    if (entry && entry.error) throw new Error(`Upstash command failed: ${entry.error}`);
    return entry ? entry.result : null;
  });
}

/**
 * In-process stand-in for Redis, used when no Upstash credentials are present.
 * Supports exactly the operations below; sets stand in for HyperLogLogs, which
 * is exact rather than approximate and perfectly adequate at dev volumes.
 */
const memory = {
  counters: new Map(),
  sets: new Map(),
  expiries: new Map(),
  set(key, seconds) {
    // Emulates SET key 1 EX <seconds> NX: succeeds only if not already present.
    const now = Date.now();
    const expiresAt = this.expiries.get(key);
    if (expiresAt && expiresAt > now) return false;
    this.expiries.set(key, now + seconds * 1000);
    return true;
  },
  incr(key) {
    const next = (this.counters.get(key) || 0) + 1;
    this.counters.set(key, next);
    return next;
  },
  get(key) {
    return this.counters.get(key) || 0;
  },
  add(key, member) {
    if (!this.sets.has(key)) this.sets.set(key, new Set());
    this.sets.get(key).add(member);
  },
  members(key) {
    return Array.from(this.sets.get(key) || []);
  },
  count(keys) {
    const union = new Set();
    keys.forEach((key) => this.members(key).forEach((m) => union.add(m)));
    return union.size;
  },
};

/* -------------------------------------------------------------------------- */
/* Public API                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Records one page view. Returns `{ counted }` — `false` when the same visitor
 * already registered this path inside the de-duplication window, which keeps a
 * refresh loop from inflating the numbers.
 */
export async function recordView({ path, visitor, day = dayKey() }) {
  const key = normalizePath(path);
  if (!key) return { counted: false, reason: 'invalid-path' };

  if (storageKind === 'memory') {
    if (!memory.set(KEY.dedupe(visitor, key), VIEW_DEDUPE_SECONDS)) {
      return { counted: false, reason: 'duplicate' };
    }
    memory.incr(KEY.viewsTotal);
    memory.incr(KEY.viewsPath(key));
    memory.incr(KEY.viewsDay(day));
    memory.add(KEY.pathSet, key);
    memory.add(KEY.visitorsTotal, visitor);
    memory.add(KEY.visitorsDay(day), visitor);
    return { counted: true };
  }

  const [fresh] = await redisPipeline([
    ['SET', KEY.dedupe(visitor, key), '1', 'EX', String(VIEW_DEDUPE_SECONDS), 'NX'],
  ]);
  if (!fresh) return { counted: false, reason: 'duplicate' };

  await redisPipeline([
    ['INCR', KEY.viewsTotal],
    ['INCR', KEY.viewsPath(key)],
    ['INCR', KEY.viewsDay(day)],
    ['EXPIRE', KEY.viewsDay(day), String(RETENTION_SECONDS)],
    ['SADD', KEY.pathSet, key],
    ['PFADD', KEY.visitorsTotal, visitor],
    ['PFADD', KEY.visitorsDay(day), visitor],
    ['EXPIRE', KEY.visitorsDay(day), String(RETENTION_SECONDS)],
  ]);
  return { counted: true };
}

/**
 * Aggregated, non-identifying statistics: lifetime totals, today, a rolling
 * window with its daily series, and per-page view counts.
 */
export async function getStats({ days = 30, pageLimit = 10 } = {}) {
  const today = dayKey();
  const window = recentDays(days);

  if (storageKind === 'memory') {
    const series = window.map((date) => ({ date, views: memory.get(KEY.viewsDay(date)) }));
    const paths = memory.members(KEY.pathSet);
    return shape({
      totalViews: memory.get(KEY.viewsTotal),
      totalVisitors: memory.count([KEY.visitorsTotal]),
      todayViews: memory.get(KEY.viewsDay(today)),
      todayVisitors: memory.count([KEY.visitorsDay(today)]),
      windowVisitors: memory.count(window.map(KEY.visitorsDay)),
      series,
      pages: paths.map((path) => ({ path, views: memory.get(KEY.viewsPath(path)) })),
      days,
      today,
      pageLimit,
    });
  }

  const [rawTotalViews, totalVisitors, windowVisitors, paths] = await redisPipeline([
    ['GET', KEY.viewsTotal],
    ['PFCOUNT', KEY.visitorsTotal],
    ['PFCOUNT', ...window.map(KEY.visitorsDay)],
    ['SMEMBERS', KEY.pathSet],
  ]);

  const pathList = Array.isArray(paths) ? paths : [];
  const [dayCounts, pathCounts, todayVisitors] = await Promise.all([
    redisPipeline(window.map((date) => ['GET', KEY.viewsDay(date)])),
    pathList.length
      ? redisPipeline(pathList.map((path) => ['GET', KEY.viewsPath(path)]))
      : Promise.resolve([]),
    redisPipeline([['PFCOUNT', KEY.visitorsDay(today)]]).then(([n]) => n),
  ]);

  const series = window.map((date, i) => ({ date, views: toNumber(dayCounts[i]) }));
  return shape({
    totalViews: toNumber(rawTotalViews),
    totalVisitors: toNumber(totalVisitors),
    todayViews: series[series.length - 1]?.views ?? 0,
    todayVisitors: toNumber(todayVisitors),
    windowVisitors: toNumber(windowVisitors),
    series,
    pages: pathList.map((path, i) => ({ path, views: toNumber(pathCounts[i]) })),
    days,
    today,
    pageLimit,
  });
}

function shape({
  totalViews,
  totalVisitors,
  todayViews,
  todayVisitors,
  windowVisitors,
  series,
  pages,
  days,
  today,
  pageLimit,
}) {
  return {
    storage: storageKind,
    generatedAt: new Date().toISOString(),
    totals: { views: totalViews, visitors: totalVisitors },
    today: { date: today, views: todayViews, visitors: todayVisitors },
    window: {
      days,
      views: series.reduce((sum, point) => sum + point.views, 0),
      visitors: windowVisitors,
      series,
    },
    pages: pages
      .filter((page) => page.views > 0)
      .sort((a, b) => b.views - a.views)
      .slice(0, pageLimit),
  };
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}
