/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    // `npm run lint` runs as its own CI step, so don't lint a second time during the build.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
