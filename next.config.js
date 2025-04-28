/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com', 'www.linkedin.com'],
  },
  transpilePackages: ['framer-motion'],
};

module.exports = nextConfig; 