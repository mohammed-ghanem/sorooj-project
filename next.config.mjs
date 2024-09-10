/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'export',
  // experimental: {
  //   appDir: true, // Ensure the App Router feature is enabled
  // },
  // trailingSlash: true, // Important for static hosting
  images: {
    unoptimized: true,
    domains: [''],
  },

}

export default nextConfig
