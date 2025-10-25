import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Optimize for production
  experimental: {
    optimizeCss: true,
  },
  
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    unoptimized: true, // For static export compatibility
  },
};

export default nextConfig;
