import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    '@repo/shared',
    '@repo/steam-proto',
  ],
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
