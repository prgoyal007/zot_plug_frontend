/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  webpack: (config) => {
    // This is the critical fix: apply alias at the root level
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native': require.resolve('react-native-web'),
    };

    return config;
  },
};

export default nextConfig;

