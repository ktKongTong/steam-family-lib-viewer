/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        '@repo/shared',
        '@repo/steam-proto',
    ],
}
export default nextConfig;
