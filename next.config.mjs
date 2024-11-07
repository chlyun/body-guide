import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail6.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail1.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail2.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail3.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail4.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail5.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail6.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail7.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail8.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail9.coupangcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'thumbnail10.coupangcdn.com',
      },
    ],
  },
};

export default nextConfig;
