/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',

  // Image optimization configuration
  images: {
    unoptimized: false,
    domains: [],
  },

  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },

  // Experimental features
  experimental: {
    // Use system TLS certificates
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
