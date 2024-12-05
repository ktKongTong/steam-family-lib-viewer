/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { webpack }) => {
        config.plugins.push(new webpack.IgnorePlugin({
            resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
        }))
        config.module.rules.push({
            resolve: {
                extensionAlias: {
                    '.js': ['.ts', '.js'],
                },
            }
        })
        return config
    },
}
export default nextConfig;
