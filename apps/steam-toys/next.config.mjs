/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        '@repo/shared',
        '@repo/steam-proto',
    ],
    // webpack: (config, { webpack }) => {
    //     config.module.rules.push({
    //         resolve: {
    //             extensionAlias: {
    //                 '.js': ['.ts', '.js'],
    //             },
    //         }
    //     })
    //     return config
    // },
}
export default nextConfig;
