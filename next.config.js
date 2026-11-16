/** @type {import('next').NextConfig} */
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_REGION === 'eu' ? 'eu' : 'us';

const nextConfig = {
  images: {
    domains: ['github.com', 'www.linkedin.com'],
  },
  transpilePackages: ['framer-motion'],
  // Proxy do PostHog (evita bloqueio por adblock)
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: `https://${posthogHost}-assets.i.posthog.com/static/:path*` },
      { source: '/ingest/array/:path*', destination: `https://${posthogHost}-assets.i.posthog.com/array/:path*` },
      { source: '/ingest/:path*', destination: `https://${posthogHost}.i.posthog.com/:path*` },
    ];
  },
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
