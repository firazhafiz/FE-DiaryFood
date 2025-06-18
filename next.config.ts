import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    esmExternals: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    formats: ["image/webp", "image/avif"], // Enable WebP and AVIF

    remotePatterns: [
      {
        protocol: "https",
        hostname: "diary-food1222.vercel.app",
        pathname: "/_next/image/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "yaoxcisksxcoidwuqurx.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "/**",
        pathname: "/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
