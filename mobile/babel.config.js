// mobile/babel.config.js
module.exports = {
  presets: ['babel-preset-expo'],
  overrides: [
    {
      include: ['../ui'],
      presets: [], // remove metro-react-native-babel-preset
    },
  ],
};

