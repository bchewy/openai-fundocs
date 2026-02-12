import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Avoid monorepo root inference when other lockfiles exist elsewhere on disk.
    root: __dirname,
  },
};

export default nextConfig;
