/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        '@repo/shared',
        '@repo/steam-proto',
    ],
    typescript: {
        ignoreBuildErrors: true
    }
}
export default nextConfig;
