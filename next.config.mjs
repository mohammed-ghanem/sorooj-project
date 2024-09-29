
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [],
  },
  // experimental: {
  //   appDir: true,  // Ensure app directory routing is enabled
  // },
}

export default nextConfig



// import createNextIntlPlugin from 'next-intl/plugin';
// const withNextIntl = createNextIntlPlugin();
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     unoptimized: true,
//     domains: [],
//   },
//   // experimental: {
//   //   appDir: true,  // Ensure app directory routing is enabled
//   // },
// }

// export default withNextIntl(nextConfig);


