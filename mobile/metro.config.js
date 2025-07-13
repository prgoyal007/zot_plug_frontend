const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, '..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];

config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [path.join(workspaceRoot, 'node_modules')],
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    'react': path.resolve(projectRoot, 'node_modules/react'),
    'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  },
  sourceExts: [...config.resolver.sourceExts, 'cjs'], // needed for react/jsx-runtime
};

module.exports = config;

