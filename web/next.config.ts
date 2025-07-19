const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui', 'api'],
  webpack: (config: any) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native': require.resolve('react-native-web'),
    };
    return config;
  },
};

export default nextConfig;

