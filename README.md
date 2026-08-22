# sambitmishra.in

Personal site of Sambit Mishra — PhD student in Electrical & Computer Engineering at USC.
Next.js (pages router) + Tailwind, deployed as a Node server.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Layout

| Path | What it holds |
|---|---|
| `pages/` | Routes. `sitemap.xml.js` and `robots.txt.js` are generated per request. |
| `components/` | `Layout`, `Seo`, `ViewTracker`, and the `stats/` charts. |
| `lib/site.js` | Site metadata: canonical URL, titles, profiles, structured data. |
| `lib/publications.js` | The publication list — one entry per paper, rendered by three pages. |
| `lib/metrics.js` | Page-view counters and their storage adapters. |
| `lib/features.js` | Feature flags for the teaching and writing sections. |
| `cv/` | LaTeX source for the CV; the compiled PDF lives in `public/`. |

Adding a publication means editing `lib/publications.js` only: it feeds the home page,
the research page, the CV page, and the schema.org markup search engines read.

## SEO

Every page renders exactly one `<Seo>` with its own title, description and canonical URL.
`NEXT_PUBLIC_SITE_URL` sets the origin those canonical URLs, Open Graph tags, `robots.txt`
and `sitemap.xml` are built from — set it per deployment so preview builds do not claim the
production domain.

Brand assets in `public/` (`og-image.png`, `favicon.svg`, `icon-*.png`, `apple-touch-icon.png`)
are checked in. Regenerating them is a manual step; the sources are plain HTML rendered at
1200×630 and 512×512.

## Visitor metrics

`/stats` is a public page showing page views, distinct visitors, the last 30 days, and a
per-page breakdown. Every page load POSTs its path to `/api/metrics`; the server keeps
counters and nothing else.

**Storage.** Set both variables to persist counts:

```
UPSTASH_REDIS_REST_URL=https://<your-db>.upstash.io
UPSTASH_REDIS_REST_TOKEN=<rest token>
```

Create a free database at [console.upstash.com](https://console.upstash.com), then copy the
REST URL and token from its **REST API** tab. Without both values the counter falls back to
an in-memory store that resets whenever the server restarts — fine for local work, not for
production. `/stats` says which store is in use.

Also worth setting `METRICS_SALT` to any long random string; it salts the daily visitor hash.

**What is and isn't collected.** No cookies, no client-side identifier, no IP address or user
agent written anywhere. A visitor is a truncated SHA-256 of IP + user agent + a salt that
rotates daily, used only to feed a HyperLogLog distinct-count and a 30-minute key that keeps
a refresh from counting twice. Bots are filtered by user agent, browsers sending Do Not Track
are skipped, and `NEXT_PUBLIC_METRICS_DISABLED=true` turns the beacon off entirely.

Only known routes get their own counter; anything else is bucketed as `/other`, so a flood of
crafted URLs cannot grow the key space.

## Environment

See `.env.example` for the full list — Google OAuth for the (currently disabled) writing
section, the canonical site URL, and the metrics variables above.
