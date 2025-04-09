/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  images: {
    loader: "akamai",
    path: "/",
    unoptimized: true,
  },
}

module.exports = nextConfig