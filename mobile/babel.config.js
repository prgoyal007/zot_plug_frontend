// mobile/babel.config.js
module.exports = {
  presets: ['babel-preset-expo'],
  overrides: [
    {
      include: ['../lib/ui', '../lib/api/'],
      presets: [], // remove metro-react-native-babel-preset
    },
  ],
};

