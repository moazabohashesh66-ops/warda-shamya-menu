import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // تجاهل ملف proxy/middleware لو مش موجود
  skipProxyUrlNormalize: true,
};

export default nextConfig;