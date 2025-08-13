const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui', 'api'],
  typescript: { ignoreBuildErrors: true },
  webpack: (config: any) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native': require.resolve('react-native-web'),
    };
    return config;
  },
};

export default nextConfig;

