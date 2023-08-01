/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'route.tsx', 'route.ts'],
  images: {
    domains: ['g10-front-images.s3.amazonaws.com'],
  },
}


module.exports = nextConfig
