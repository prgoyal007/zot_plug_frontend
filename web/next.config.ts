import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  webpack: (config) => {
    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        'react-native$': 'react-native-web',
      },
      extensions: [
        ...(config.resolve?.extensions || []),
        '.web.tsx',
        '.web.ts',
        '.web.js',
        '.tsx',
        '.ts',
        '.js',
      ],
    }
    return config
  },
}

export default nextConfig

