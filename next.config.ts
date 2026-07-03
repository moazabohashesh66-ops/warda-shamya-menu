import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "kercrysjebdbmlqecqso.supabase.co",
      },
    ],
  },

  skipProxyUrlNormalize: true,
};

export default nextConfig;
