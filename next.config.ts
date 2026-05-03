import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configure image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
    ],
  },

  // Headers for security and performance
  async headers() {
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
    ];

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/api/(.*)',
        headers: [
          ...securityHeaders,
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },

  // Output configuration for Vercel deployment
  output: 'standalone',

  // Enable compression
  compress: true,

  // Enable strict mode
  reactStrictMode: true,

  // React Compiler configuration
  reactCompiler: true,

  // TypeScript configuration
  typescript: {
    // Don't fail build on type errors in dev
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },

  // Turbopack configuration
  turbopack: {
    // Add loader rules that you rely on in the codebase
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
    // Make sure common extensions are resolved in the same order that the rest of the toolchain expects.
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
};

export default nextConfig;
