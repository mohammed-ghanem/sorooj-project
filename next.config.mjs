/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath: process.env.BASE_PATH ? process.env.BASE_PATH : "",
  // assetPrefix: process.env.URL ? process.env.URL : undefined,
  // trailingSlash : true,
  images: {
    unoptimized: true,
    domains: [''],
  },

}

export default nextConfig
