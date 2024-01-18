/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow all domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  output: 'export',
}

module.exports = nextConfig
