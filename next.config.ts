import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Production optimizations
  compress: true,
  // Allow Edge Runtime for API routes
  experimental: {},
}

export default nextConfig
