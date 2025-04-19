/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.a.transfermarkt.technology',
        port: '',
        pathname: '/portrait/**',
      },
    ],
  },
};

module.exports = nextConfig; 