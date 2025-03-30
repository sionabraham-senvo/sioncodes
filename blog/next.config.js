/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/sioncodes/blog' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sioncodes/blog/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
  },
}

module.exports = nextConfig