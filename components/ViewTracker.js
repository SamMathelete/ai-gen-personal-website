import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

/**
 * Records one page view per route change.
 *
 * Deliberately quiet: no cookies, no client-side identifier, nothing rendered.
 * It stays silent for local development, for readers who send Do Not Track, and
 * whenever NEXT_PUBLIC_METRICS_DISABLED is set — and a failed request is
 * swallowed, since a counter is never worth breaking a page over.
 */
export default function ViewTracker() {
  const router = useRouter();
  const lastPath = useRef(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_METRICS_DISABLED === 'true') return undefined;
    if (isLocalHost() || hasOptedOut()) return undefined;

    const send = (url) => {
      const path = (url || '/').split(/[?#]/)[0];
      // Next fires routeChangeComplete for hash and query changes too; the same
      // path in a row is the same page view.
      if (path === lastPath.current) return;
      lastPath.current = path;
      fetch('/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
        keepalive: true,
      }).catch(() => {});
    };

    send(router.asPath);
    router.events.on('routeChangeComplete', send);
    return () => router.events.off('routeChangeComplete', send);
  }, [router]);

  return null;
}

function isLocalHost() {
  const { hostname } = window.location;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

function hasOptedOut() {
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  return dnt === '1' || dnt === 'yes';
}
