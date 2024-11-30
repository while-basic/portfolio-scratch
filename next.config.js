/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // Add any custom webpack configurations here if needed
    return config;
  },
}

module.exports = nextConfig
