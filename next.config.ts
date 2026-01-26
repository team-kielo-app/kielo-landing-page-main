import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination:
          "https://storage.googleapis.com/kielo-media-processor-kielo-backend-prod/assets/:path*",
      },
    ];
  },
};

export default nextConfig;

