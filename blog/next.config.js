/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Required for GitHub Pages which serves content from a subdirectory
  basePath: process.env.NODE_ENV === 'production' ? '/sioncodes' : '',
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
  },
}

module.exports = nextConfig
