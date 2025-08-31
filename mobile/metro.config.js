// mobile/metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);
config.watchFolders = [workspaceRoot];
config.resolver = {
  ...config.resolver,
  disableHierarchicalLookup: true,
  nodeModulesPaths: [path.join(projectRoot, 'node_modules')],
  alias: {
    ...(config.resolver?.alias || {}),
    'react-native': path.join(projectRoot, 'node_modules/react-native'),
  },
  sourceExts: [...config.resolver.sourceExts, 'cjs'],
};
module.exports = config;


