/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        '@repo/shared',
        '@repo/steam-proto',
    ],
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    }
}
export default nextConfig;
