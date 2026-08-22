import { getStats, isBot, recordView, visitorId, dayKey, storageKind } from '../../lib/metrics';

/**
 * GET  /api/metrics  → aggregated, non-identifying site statistics.
 * POST /api/metrics  → records one page view for `{ path }`.
 *
 * Recording never fails loudly: a page view is not worth surfacing an error to
 * a reader, so storage problems are logged and answered with `counted: false`.
 */
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const stats = await getStats({ days: 30 });
      // Short shared-cache window: the numbers move slowly and the page is
      // public, so the origin does not need to be hit on every load.
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
      return res.status(200).json({ ok: true, ...stats });
    } catch (error) {
      console.error('[metrics] failed to read stats:', error.message);
      return res.status(503).json({ ok: false, error: 'Statistics are unavailable right now.' });
    }
  }

  if (req.method === 'POST') {
    res.setHeader('Cache-Control', 'no-store');
    const userAgent = req.headers['user-agent'] || '';
    if (isBot(userAgent)) {
      return res.status(202).json({ ok: true, counted: false, reason: 'bot' });
    }

    const body = typeof req.body === 'string' ? safeParse(req.body) : req.body;
    const path = body?.path;
    if (typeof path !== 'string') {
      return res.status(400).json({ ok: false, error: 'A `path` string is required.' });
    }

    try {
      const day = dayKey();
      const result = await recordView({ path, visitor: visitorId(req, day), day });
      return res.status(202).json({ ok: true, storage: storageKind, ...result });
    } catch (error) {
      console.error('[metrics] failed to record view:', error.message);
      return res.status(202).json({ ok: false, counted: false, reason: 'storage-error' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}
