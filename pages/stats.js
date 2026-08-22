import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import StatTile from '../components/stats/StatTile';
import DailyViewsChart from '../components/stats/DailyViewsChart';
import TopPagesChart from '../components/stats/TopPagesChart';
import { breadcrumbJsonLd } from '../lib/site';
import { formatExact } from '../lib/format';

export default function Stats() {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/metrics')
      .then(async (res) => {
        const payload = await res.json();
        if (!res.ok || !payload.ok) throw new Error(payload.error || 'Request failed');
        return payload;
      })
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', data, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ status: 'error', data: null, error: error.message });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const { status, data } = state;
  const loading = status === 'loading';
  const windowDays = data?.window?.days ?? 30;

  return (
    <Layout>
      <Seo
        title="Site statistics"
        description="Live readership statistics for sambitmishra.in — page views, unique visitors, the last 30 days of traffic, and which pages get read. Counted without cookies or personal data."
        jsonLd={[breadcrumbJsonLd([{ name: 'Site statistics', path: '/stats' }])]}
      />

      <section className="container-wide pt-12 sm:pt-20 pb-12">
        <p className="eyebrow mb-4 flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-accentGlow" /> Statistics
        </p>
        <h1 className="font-display text-5xl sm:text-6xl tracking-tightest text-ink leading-[0.95] max-w-3xl">
          Who&rsquo;s been reading.
        </h1>
        <p className="mt-6 text-lg text-graphite max-w-2xl leading-relaxed">
          A public counter for this site. It records page views and an estimate of distinct
          visitors — no cookies, no accounts, no personal data, and nothing that follows anyone
          from one visit to the next.
        </p>
      </section>

      {status === 'error' && (
        <section className="container-wide pb-12">
          <div className="card">
            <p className="font-display text-2xl text-ink tracking-tightest">
              The counter is offline.
            </p>
            <p className="mt-2 text-graphite">
              Statistics could not be loaded right now. The rest of the site is unaffected.
            </p>
          </div>
        </section>
      )}

      {status !== 'error' && (
        <>
          {/* HEADLINE FIGURES */}
          <section className="container-wide py-12 border-t border-rule">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatTile
                label="Total page views"
                value={data?.totals?.views}
                hero
                loading={loading}
              />
              <StatTile
                label="Distinct visitors"
                value={data?.totals?.visitors}
                hint="All time, estimated"
                loading={loading}
              />
              <StatTile
                label={`Views · last ${windowDays} days`}
                value={data?.window?.views}
                hint={
                  loading
                    ? undefined
                    : `${formatExact(data?.window?.visitors ?? 0)} distinct visitors`
                }
                loading={loading}
              />
              <StatTile
                label="Views today"
                value={data?.today?.views}
                hint={
                  loading
                    ? undefined
                    : `${formatExact(data?.today?.visitors ?? 0)} distinct visitors`
                }
                loading={loading}
              />
            </div>
          </section>

          {/* DAILY SERIES */}
          <section className="bg-cream border-y border-rule">
            <div className="container-wide py-16">
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  <p className="section-marker">§ 01</p>
                  <h2 className="font-display text-3xl tracking-tightest text-ink mt-2">
                    Daily views.
                  </h2>
                  <p className="mt-3 text-sm text-graphite">
                    Page views per day over the last {windowDays} days, in UTC.
                  </p>
                </div>
                <div className="lg:col-span-9">
                  {loading ? (
                    <div className="h-56 rounded-xl border border-rule animate-pulse" />
                  ) : (
                    <DailyViewsChart series={data?.window?.series ?? []} />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* PER-PAGE */}
          <section className="container-wide py-16">
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3">
                <p className="section-marker">§ 02</p>
                <h2 className="font-display text-3xl tracking-tightest text-ink mt-2">
                  Most-read pages.
                </h2>
                <p className="mt-3 text-sm text-graphite">
                  Lifetime views, by page.
                </p>
              </div>
              <div className="lg:col-span-9">
                {loading ? (
                  <div className="h-56 rounded-xl border border-rule animate-pulse" />
                ) : (
                  <TopPagesChart pages={data?.pages ?? []} />
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* METHOD */}
      <section className="container-wide pb-20">
        <div className="grid lg:grid-cols-12 gap-8 border-t border-rule pt-12">
          <div className="lg:col-span-3">
            <p className="section-marker">§ 03</p>
            <h2 className="font-display text-3xl tracking-tightest text-ink mt-2">
              How it&rsquo;s counted.
            </h2>
          </div>
          <div className="lg:col-span-9 space-y-4 text-graphite leading-relaxed max-w-2xl">
            <p>
              Each page load sends the path it was served at, and nothing else. The server keeps
              counters only — a total, one per page, one per day — plus a probabilistic estimate of
              distinct visitors.
            </p>
            <p>
              A visitor is represented by a one-way hash of IP address and browser, salted with a
              value that changes every day. That digest is never stored: it feeds the
              distinct-visitor estimate and a 30-minute key that stops a refresh from counting
              twice, then it stops being meaningful when the day rolls over. No cookies are set and
              no personal data is retained.
            </p>
            <p>
              Requests that identify as bots or crawlers are ignored, as are browsers that send a
              Do Not Track header.
            </p>
            {data?.storage === 'memory' && (
              <p className="text-sm font-mono text-accentAlt">
                Note: no persistent store is configured, so these counters live in memory and reset
                when the server restarts.
              </p>
            )}
            {data?.generatedAt && (
              <p className="font-mono text-xs text-ash pt-2">
                Last computed {new Date(data.generatedAt).toUTCString()}
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
