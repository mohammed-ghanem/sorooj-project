/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'images.unsplash.com',
      'links.papareact.com',
      'links.papareact.com',
    ],
  },
  experimental: {
    appDir: true,  // Ensure app directory routing is enabled
  },
}

export default nextConfig;
