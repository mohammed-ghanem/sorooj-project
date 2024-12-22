/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [],
  },
  reactStrictMode: false,
  experimental: {
    metadataRoutes: true,
  },
}

export default nextConfig
