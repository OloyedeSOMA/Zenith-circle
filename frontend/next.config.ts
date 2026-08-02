import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logos.hunter.io",
      },
    ],
  },
};

export default nextConfig;
