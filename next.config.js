/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'i.pravatar.cc',
      'images.unsplash.com',
      'randomuser.me'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CUSTOM_API_URL: process.env.CUSTOM_API_URL || '/api',
  },
};

module.exports = nextConfig;
