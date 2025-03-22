/** @type {import('next').NextConfig} */
// const nextConfig = {
// eslint: {
//     ignoreDuringBuilds: true,
//   }
// };


// export default nextConfig;

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['spurtcms.com'], // Add your hostname here
  },
};

export default nextConfig;