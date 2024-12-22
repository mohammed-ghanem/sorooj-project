/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [],
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/sitemap.xml', // The public route for your sitemap
        destination: '/sitemap', // The internal route to the sitemap page
      },
    ];
  },
};
export default nextConfig
