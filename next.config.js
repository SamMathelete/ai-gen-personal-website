/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Nothing here needs to advertise the framework version.
  poweredByHeader: false,
  // Trailing-slash-free canonical URLs, matching what <Seo> emits.
  trailingSlash: false,
  async headers() {
    return [
      {
        // Static brand assets are content-addressed by name and change rarely.
        source: '/:file(favicon.svg|apple-touch-icon.png|icon-192.png|icon-512.png|og-image.png)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
      {
        source: '/Sambit_Mishra_CV.pdf',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
