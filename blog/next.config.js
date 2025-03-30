/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/sioncodes' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sioncodes/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
  },
}

module.exports = nextConfig