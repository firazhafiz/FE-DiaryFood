import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: true,
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
