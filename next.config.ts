import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: true,
  },
  images: {
    remotePatterns: [
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

  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.pexels.com",
      "img-global.cpcdn.com",
      "yaoxcisksxcoidwuqurx.supabase.co",
    ], // Tambahkan domain yang digunakan
  },
};

export default nextConfig;
