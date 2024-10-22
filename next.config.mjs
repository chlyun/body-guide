import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.cloud.google.com', 'storage.googleapis.com'],
  },
};

export default nextConfig;
