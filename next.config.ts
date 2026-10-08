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
  // The blog was Finnish-only at /blog; it lives at /finnish/blog now.
  // Old post URLs (/blog/<date>-<slug>) redirect in app/blog/[slug]/route.ts.
  async redirects() {
    return [
      { source: "/blog", destination: "/finnish/blog", permanent: true },
      // Blog pages were ?page=N; they are static paths now.
      {
        source: "/:lang(finnish|swedish)/blog",
        has: [{ type: "query", key: "page", value: "(?<page>[0-9]+)" }],
        destination: "/:lang/blog/page/:page",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
