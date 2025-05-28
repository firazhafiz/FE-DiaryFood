import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: true,
  },

  turbo: {
    enabled: false, // Nonaktifkan Turbopack
  },

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
