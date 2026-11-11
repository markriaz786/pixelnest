import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep links to the old Framer case-study URLs working.
  async redirects() {
    return [
      { source: "/case-studies/money-flow-mobile-app", destination: "/case-studies/moneyflow", permanent: true },
      {
        source: "/case-studies/caseliq-low-firm-management-web-app",
        destination: "/case-studies/caseiq",
        permanent: true,
      },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
