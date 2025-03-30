/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/sioncodes' : '',
  images: {
    loader: "akamai",
    path: "/",
  },
}

module.exports = nextConfig